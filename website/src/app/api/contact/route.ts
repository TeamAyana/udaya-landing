import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: new Date().toISOString()
    })
    
    // Optional: Send email notification using Resend or similar
    // await sendEmail({
    //   to: 'admin@udaya.one',
    //   subject: 'New Contact Form Submission',
    //   text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
    // })
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}