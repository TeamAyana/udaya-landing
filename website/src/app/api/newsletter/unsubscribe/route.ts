import { NextRequest, NextResponse } from 'next/server'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { removeNewsletterFromKlaviyo } from '@/lib/klaviyo'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    // Validate required parameters
    if (!token || !email) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters',
        message: 'Invalid unsubscribe link. Please contact support.'
      }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()

    // Find subscriber by email and token
    const newsletterRef = collection(db, 'newsletter')
    const q = query(
      newsletterRef,
      where('email', '==', normalizedEmail),
      where('unsubscribeToken', '==', token)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return NextResponse.json({
        success: false,
        error: 'Invalid token',
        message: 'This unsubscribe link is invalid or has expired. Please contact support if you need assistance.'
      }, { status: 404 })
    }

    const subscriberDoc = querySnapshot.docs[0]
    const subscriberData = subscriberDoc.data()

    // Check if already unsubscribed
    if (subscriberData.status === 'unsubscribed') {
      return NextResponse.json({
        success: true,
        alreadyUnsubscribed: true,
        message: 'You are already unsubscribed from our newsletter.',
        email: normalizedEmail
      })
    }

    // Update status to unsubscribed
    const docRef = doc(db, 'newsletter', subscriberDoc.id)
    await updateDoc(docRef, {
      status: 'unsubscribed',
      unsubscribedAt: new Date().toISOString(),
      unsubscribeMethod: 'link'
    })

    console.log('✅ Newsletter unsubscribe:', subscriberDoc.id, normalizedEmail)

    // NON-BLOCKING: Sync unsubscribe to Klaviyo
    removeNewsletterFromKlaviyo(normalizedEmail)
      .then((result) => {
        if (result.success) {
          console.log('✅ Klaviyo unsubscribe synced for:', normalizedEmail)
        } else {
          console.warn('⚠️ Klaviyo unsubscribe failed (non-critical):', result.error)
        }
      })
      .catch((error) => {
        console.error('⚠️ Klaviyo unsubscribe error:', error)
      })

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
      email: normalizedEmail
    })
  } catch (error) {
    console.error('❌ Newsletter unsubscribe error:', error)
    return NextResponse.json({
      success: false,
      error: 'Server error',
      message: 'An error occurred while processing your request. Please try again or contact support.'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json()

    // Validate required parameters
    if (!token || !email) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters',
        message: 'Invalid unsubscribe request. Please contact support.'
      }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase()

    // Find subscriber by email and token
    const newsletterRef = collection(db, 'newsletter')
    const q = query(
      newsletterRef,
      where('email', '==', normalizedEmail),
      where('unsubscribeToken', '==', token)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return NextResponse.json({
        success: false,
        error: 'Invalid token',
        message: 'This unsubscribe request is invalid. Please contact support if you need assistance.'
      }, { status: 404 })
    }

    const subscriberDoc = querySnapshot.docs[0]
    const subscriberData = subscriberDoc.data()

    // Check if already unsubscribed
    if (subscriberData.status === 'unsubscribed') {
      return NextResponse.json({
        success: true,
        alreadyUnsubscribed: true,
        message: 'You are already unsubscribed from our newsletter.',
        email: normalizedEmail
      })
    }

    // Update status to unsubscribed
    const docRef = doc(db, 'newsletter', subscriberDoc.id)
    await updateDoc(docRef, {
      status: 'unsubscribed',
      unsubscribedAt: new Date().toISOString(),
      unsubscribeMethod: 'form'
    })

    console.log('✅ Newsletter unsubscribe (POST):', subscriberDoc.id, normalizedEmail)

    // NON-BLOCKING: Sync unsubscribe to Klaviyo
    removeNewsletterFromKlaviyo(normalizedEmail)
      .then((result) => {
        if (result.success) {
          console.log('✅ Klaviyo unsubscribe synced for:', normalizedEmail)
        }
      })
      .catch((error) => {
        console.error('⚠️ Klaviyo unsubscribe error:', error)
      })

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
      email: normalizedEmail
    })
  } catch (error) {
    console.error('❌ Newsletter unsubscribe error (POST):', error)
    return NextResponse.json({
      success: false,
      error: 'Server error',
      message: 'An error occurred while processing your request. Please try again or contact support.'
    }, { status: 500 })
  }
}
