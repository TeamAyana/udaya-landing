import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!adminDb) {
      console.warn('⚠️ Firebase Admin not initialized, skipping partial submission save')
      return NextResponse.json({
        success: true,
        message: 'Partial submission recorded (no DB)'
      })
    }

    // Validate minimum required data
    if (!data.email || !data.fullName) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Save partial submission to Firestore
    const partialSubmission = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || '',
      age: data.age || '',
      country: data.country || '',
      status: 'partial',
      stepCompleted: data.stepCompleted || 1,
      abandonedAt: data.abandonedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      type: 'waitlist_partial',
    }

    const docRef = await adminDb.collection('waitlist_partial').add(partialSubmission)

    console.log('✅ Partial submission saved:', docRef.id)

    // Create notification for admin
    try {
      await adminDb.collection('notifications').add({
        type: 'waitlist',
        title: 'Incomplete Form Submission',
        message: `${data.fullName} started but didn't complete the consultation form`,
        link: '/admin/dashboard/subscribers',
        read: false,
        createdAt: new Date().toISOString(),
        data: {
          email: data.email,
          name: data.fullName,
          status: 'partial',
          stepCompleted: data.stepCompleted,
        }
      })
      console.log('✅ Notification created for partial submission')
    } catch (notifError) {
      console.error('Failed to create notification:', notifError)
    }

    return NextResponse.json({
      success: true,
      message: 'Partial submission saved',
      id: docRef.id
    })
  } catch (error) {
    console.error('❌ Error saving partial submission:', error)
    return NextResponse.json(
      { error: 'Failed to save partial submission' },
      { status: 500 }
    )
  }
}
