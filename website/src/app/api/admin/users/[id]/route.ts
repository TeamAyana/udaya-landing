import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { adminDb } from '@/lib/firebase-admin'
import bcrypt from 'bcryptjs'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // For now, allow all authenticated users to update users
    // TODO: Implement proper permission checking when all users are migrated
    
    const data = await request.json()
    
    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString()
    }
    
    // Only update allowed fields
    if (data.name !== undefined) updateData.name = data.name
    if (data.role !== undefined) updateData.role = data.role
    if (data.permissions !== undefined) updateData.permissions = data.permissions
    if (data.isActive !== undefined) updateData.isActive = data.isActive
    
    // Handle password update if provided
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10)
    }
    
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available. Please check server configuration.' }, { status: 503 })
    }
    
    await adminDb.collection('users').doc(id).update(updateData)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // For now, allow all authenticated users to delete users
    // TODO: Implement proper permission checking when all users are migrated
    
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available. Please check server configuration.' }, { status: 503 })
    }
    
    // Prevent deleting the last admin
    const userToDelete = await adminDb.collection('users').doc(id).get()
    const userData = userToDelete.data()
    
    if (userData?.role === 'admin') {
      // Check if this is the last admin
      const adminsSnapshot = await adminDb.collection('users')
        .where('role', '==', 'admin')
        .get()
      
      if (adminsSnapshot.size <= 1) {
        return NextResponse.json({ 
          error: 'Cannot delete the last admin user' 
        }, { status: 400 })
      }
    }
    
    // Prevent self-deletion (if userId is available)
    if (session.userId && id === session.userId) {
      return NextResponse.json({ 
        error: 'Cannot delete your own account' 
      }, { status: 400 })
    }
    
    await adminDb.collection('users').doc(id).delete()
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}