import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ 
        error: 'Invalid email address' 
      }, { status: 400 })
    }
    
    // Check if email already exists
    const newsletterRef = collection(db, 'newsletter')
    const q = query(newsletterRef, where('email', '==', email.toLowerCase()))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      return NextResponse.json({ 
        success: true,
        message: 'You are already subscribed!' 
      })
    }
    
    // Add new subscription
    const subscription = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      status: 'active', // active, unsubscribed
      source: 'blog',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }
    
    const docRef = await addDoc(collection(db, 'newsletter'), subscription)
    
    console.log('New newsletter subscription:', docRef.id, subscription.email)
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: 'Successfully subscribed to newsletter!' 
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
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