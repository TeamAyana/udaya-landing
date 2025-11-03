import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { addWaitlistToKlaviyo } from '@/lib/klaviyo'
import { sendWaitlistConfirmation, sendAdminWaitlistNotification } from '@/lib/resend'
import { createWaitlistNotification } from '@/lib/notifications'
import { checkRateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit'
import { sanitizeFormData } from '@/lib/sanitize'

const KLAVIYO_WAITLIST_LIST_ID = process.env.KLAVIYO_WAITLIST_LIST_ID || 'QTTZix'
const ADMIN_EMAIL = 'team@udaya.one'

/**
 * Get next waitlist number
 */
async function getNextWaitlistNumber(): Promise<number> {
  try {
    const waitlistQuery = query(
      collection(db, 'waitlist'),
      orderBy('waitlistNumber', 'desc'),
      limit(1)
    )

    const snapshot = await getDocs(waitlistQuery)

    if (snapshot.empty) {
      return 1 // First entry
    }

    const lastEntry = snapshot.docs[0].data()
    return (lastEntry.waitlistNumber || 0) + 1
  } catch (error) {
    console.error('Error getting waitlist number:', error)
    // Fallback to timestamp-based number if query fails
    return Date.now() % 100000
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, RateLimitPresets.FORM_SUBMISSION)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'You have submitted too many forms. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.reset)
          }
        }
      )
    }

    const rawData = await request.json()

    // Sanitize input data
    const data = sanitizeFormData(rawData)

    // Get next waitlist number
    const waitlistNumber = await getNextWaitlistNumber()

    // Add metadata
    const waitlistEntry = {
      ...data,
      waitlistNumber,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, reviewed, accepted, rejected
      source: 'website',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    // Save to Firebase
    const docRef = await addDoc(collection(db, 'waitlist'), waitlistEntry)
    console.log('✅ Saved to Firebase:', docRef.id)

    // Add to Klaviyo list for marketing automation (non-blocking)
    addWaitlistToKlaviyo(
      {
        ...data,
        waitlistNumber
      } as any,
      KLAVIYO_WAITLIST_LIST_ID
    ).then(result => {
      if (result.success) {
        console.log('✅ Added to Klaviyo list and tracked event')
      } else {
        console.error('⚠️ Klaviyo error (non-blocking):', result.error)
      }
    }).catch(err => {
      console.error('⚠️ Klaviyo error (non-blocking):', err)
    })

    // Send user confirmation email via Resend (non-blocking)
    sendWaitlistConfirmation({
      ...data,
      waitlistNumber
    } as any).then(result => {
      if (result.success) {
        console.log('✅ Confirmation email sent via Resend:', result.messageId)
      } else {
        console.error('⚠️ Confirmation email error (non-blocking):', result.error)
      }
    }).catch(err => {
      console.error('⚠️ Confirmation email error (non-blocking):', err)
    })

    // Send admin notification via Resend (non-blocking)
    sendAdminWaitlistNotification({
      ...data,
      waitlistNumber
    } as any, ADMIN_EMAIL).then(result => {
      if (result.success) {
        console.log('✅ Admin notification sent via Resend:', result.messageId)
      } else {
        console.error('⚠️ Admin notification error (non-blocking):', result.error)
      }
    }).catch(err => {
      console.error('⚠️ Admin notification error (non-blocking):', err)
    })

    // Create dashboard notification (non-blocking)
    createWaitlistNotification({
      fullName: data.fullName,
      email: data.email,
      waitlistNumber,
      retreatInterest: data.retreatInterest
    }).catch(err => {
      console.error('⚠️ Dashboard notification error (non-blocking):', err)
    })

    return NextResponse.json({
      success: true,
      id: docRef.id,
      waitlistNumber,
      message: 'Successfully added to waitlist'
    })
  } catch (error) {
    console.error('❌ Waitlist error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to join waitlist',
      message: 'Please try again or contact us directly at team@udaya.one'
    }, { status: 500 })
  }
}