import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sendNewsletterConfirmation, sendNewsletterAdminNotification } from '@/lib/resend'
import { addNewsletterToKlaviyo } from '@/lib/klaviyo'
import { createNewsletterNotification } from '@/lib/notifications'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({
        error: 'Invalid email address'
      }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()

    // Check if email already exists
    const newsletterRef = collection(db, 'newsletter')
    const q = query(newsletterRef, where('email', '==', normalizedEmail))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed!'
      })
    }

    // Generate unsubscribe token
    const unsubscribeToken = crypto
      .createHash('sha256')
      .update(`${normalizedEmail}-${Date.now()}-${process.env.JWT_SECRET}`)
      .digest('hex')

    // Add new subscription
    const subscription = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
      status: 'active', // active, unsubscribed
      source: 'blog',
      unsubscribeToken,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    const docRef = await addDoc(collection(db, 'newsletter'), subscription)

    console.log('✅ New newsletter subscription:', docRef.id, normalizedEmail)

    // NON-BLOCKING: Send confirmation email
    sendNewsletterConfirmation(normalizedEmail, unsubscribeToken)
      .then((result) => {
        if (result.success) {
          console.log('✅ Newsletter confirmation email sent to:', normalizedEmail)
        } else {
          console.error('⚠️ Failed to send newsletter confirmation:', result.error)
        }
      })
      .catch((error) => {
        console.error('⚠️ Newsletter confirmation email error:', error)
      })

    // NON-BLOCKING: Send admin notification
    const adminEmail = process.env.ADMIN_EMAIL || 'team@udaya.one'

    // Get total subscriber count
    const totalSnapshot = await getDocs(collection(db, 'newsletter'))
    const totalSubscribers = totalSnapshot.size

    sendNewsletterAdminNotification(
      normalizedEmail,
      subscription.subscribedAt,
      subscription.source,
      totalSubscribers,
      adminEmail
    )
      .then((result) => {
        if (result.success) {
          console.log('✅ Admin notification sent for newsletter subscription')
        }
      })
      .catch((error) => {
        console.error('⚠️ Admin notification error:', error)
      })

    // NON-BLOCKING: Add to Klaviyo
    addNewsletterToKlaviyo(normalizedEmail, subscription.source)
      .then((result) => {
        if (result.success) {
          console.log('✅ Added to Klaviyo newsletter list:', normalizedEmail)
        } else {
          console.warn('⚠️ Klaviyo add failed (non-critical):', result.error)
        }
      })
      .catch((error) => {
        console.error('⚠️ Klaviyo error:', error)
      })

    // NON-BLOCKING: Create dashboard notification
    createNewsletterNotification({
      email: normalizedEmail,
      source: subscription.source
    })
      .then((success) => {
        if (success) {
          console.log('✅ Dashboard notification created for newsletter subscription')
        }
      })
      .catch((error) => {
        console.error('⚠️ Dashboard notification error:', error)
      })

    // Return success immediately (don't wait for emails)
    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Successfully subscribed to newsletter!'
    })
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error)
    return NextResponse.json({
      error: 'Failed to subscribe',
      message: 'Please try again or contact us directly'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    error: 'Method not allowed'
  }, { status: 405 })
}
