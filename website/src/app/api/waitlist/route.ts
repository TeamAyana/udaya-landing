import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add metadata
    const waitlistEntry = {
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, reviewed, accepted, rejected
      source: 'website',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }
    
    const docRef = await addDoc(collection(db, 'waitlist'), waitlistEntry)
    
    // TODO: Send confirmation email
    // TODO: Send notification to admin
    
    console.log('New waitlist entry:', docRef.id, waitlistEntry.email)
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: 'Successfully added to waitlist' 
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ 
      error: 'Failed to join waitlist',
      message: 'Please try again or contact us directly' 
    }, { status: 500 })
  }
}