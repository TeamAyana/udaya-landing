import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sendContactConfirmation, sendContactAdminNotification } from '@/lib/resend'
import { createContactNotification } from '@/lib/notifications'
import { checkRateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit'
import { sanitizeFormData } from '@/lib/sanitize'

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

    console.log('📝 Processing contact form submission:', data.email)

    // Save to Firebase (blocking - must succeed)
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: new Date().toISOString()
    })

    console.log('✅ Contact form saved to Firebase:', docRef.id)

    // Send confirmation email to user (non-blocking)
    sendContactConfirmation({
      name: data.name,
      email: data.email,
      country: data.country,
      userType: data.userType,
      subject: data.subject,
      message: data.message
    }).catch(err => {
      console.error('⚠️ Warning: Failed to send confirmation email (non-blocking):', err)
    })

    // Send admin notification (non-blocking)
    sendContactAdminNotification({
      name: data.name,
      email: data.email,
      country: data.country,
      userType: data.userType,
      subject: data.subject,
      message: data.message
    }, 'team@udaya.one').catch(err => {
      console.error('⚠️ Warning: Failed to send admin notification (non-blocking):', err)
    })

    // Create dashboard notification (non-blocking)
    createContactNotification({
      name: data.name,
      email: data.email,
      subject: data.subject,
      userType: data.userType
    }).catch(err => {
      console.error('⚠️ Warning: Failed to create dashboard notification (non-blocking):', err)
    })

    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('❌ Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}