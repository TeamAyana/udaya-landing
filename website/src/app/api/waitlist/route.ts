import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const docRef = await addDoc(collection(db, 'waitlist'), {
      ...data,
      createdAt: new Date().toISOString()
    })
    
    // Optional: Send confirmation email
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}