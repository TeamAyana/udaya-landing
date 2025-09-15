import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { hashPassword } from '@/lib/auth-firebase'

// This is a one-time endpoint to update the admin password
// Remove this file after using it
export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      return NextResponse.json({ error: 'Firebase Admin not initialized' }, { status: 500 })
    }
    
    const { currentPassword, newPassword } = await request.json()
    
    // Verify the request includes the current password as a security measure
    if (currentPassword !== 'udaya2024') {
      return NextResponse.json({ error: 'Invalid current password' }, { status: 401 })
    }
    
    // Find the admin user
    const adminsSnapshot = await adminDb.collection('users')
      .where('email', '==', 'admin@udaya.one')
      .limit(1)
      .get()
    
    if (adminsSnapshot.empty) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 })
    }
    
    const adminDoc = adminsSnapshot.docs[0]
    const hashedPassword = await hashPassword(newPassword)
    
    // Update the password
    await adminDb.collection('users').doc(adminDoc.id).update({
      passwordHash: hashedPassword,
      updatedAt: new Date().toISOString()
    })
    
    return NextResponse.json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error updating password:', error)
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
  }
}