import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sendReferralConfirmation, sendReferralAdminNotification } from '@/lib/resend'
import { createReferralNotification } from '@/lib/notifications'
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

    console.log('🤝 Processing referral partner application:', data.email)

    // Add metadata
    const referralEntry = {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, approved, rejected
      source: 'website',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      totalReferrals: 0,
      successfulReferrals: 0,
      totalEarnings: 0
    }

    // Save to Firebase (blocking - must succeed)
    const docRef = await addDoc(collection(db, 'referrals'), referralEntry)

    console.log('✅ Referral application saved to Firebase:', docRef.id)

    // Send confirmation email to partner (non-blocking)
    sendReferralConfirmation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      organization: data.organization,
      role: data.role,
      message: data.message
    }).catch(err => {
      console.error('⚠️ Warning: Failed to send referral confirmation (non-blocking):', err)
    })

    // Send admin notification (non-blocking)
    sendReferralAdminNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      organization: data.organization,
      role: data.role,
      message: data.message
    }, 'team@udaya.one').catch(err => {
      console.error('⚠️ Warning: Failed to send admin notification (non-blocking):', err)
    })

    // Create dashboard notification (non-blocking)
    createReferralNotification({
      name: data.name,
      email: data.email,
      role: data.role,
      organization: data.organization
    }).catch(err => {
      console.error('⚠️ Warning: Failed to create dashboard notification (non-blocking):', err)
    })

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Successfully submitted referral partner application'
    })
  } catch (error) {
    console.error('❌ Referral application error:', error)
    return NextResponse.json({
      error: 'Failed to submit referral application',
      message: 'Please try again or contact us directly'
    }, { status: 500 })
  }
}
