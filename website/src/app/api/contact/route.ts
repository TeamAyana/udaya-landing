import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { sendContactConfirmation, sendContactAdminNotification } from '@/lib/resend'
import { createContactNotification } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

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