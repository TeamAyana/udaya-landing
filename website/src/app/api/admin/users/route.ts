import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { adminDb } from '@/lib/firebase-admin'
import { initializeDefaultAdmin } from '@/lib/auth-firebase'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Initialize default admin if needed
    try {
      await initializeDefaultAdmin()
    } catch (initError) {
      console.error('Error initializing default admin:', initError)
    }
    
    // For now, allow all authenticated users to view users
    // TODO: Implement proper permission checking when all users are migrated
    
    // Check if Firebase Admin is properly initialized
    if (!adminDb) {
      console.warn('Firebase Admin SDK not initialized. Returning empty users.')
      return NextResponse.json({ users: [] })
    }
    
    try {
      // Fetch all users
      const usersSnapshot = await adminDb.collection('users').get()
      const users = usersSnapshot.docs.map(doc => {
        const data = doc.data()
        // Don't send password hashes to frontend
        const { passwordHash, ...userData } = data
        return {
          id: doc.id,
          ...userData
        }
      }).sort((a: any, b: any) => {
        // Sort by createdAt if it exists
        const dateA = new Date(a.createdAt || 0)
        const dateB = new Date(b.createdAt || 0)
        return dateB.getTime() - dateA.getTime()
      })
      
      return NextResponse.json({ users })
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError)
      // Return empty users array if collection doesn't exist
      return NextResponse.json({ users: [] })
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // For now, allow all authenticated users to create users
    // TODO: Implement proper permission checking when all users are migrated
    // const currentUserDoc = await adminDb.collection('users').doc(session.userId).get()
    // const currentUser = currentUserDoc.data()
    
    // if (!currentUser?.permissions?.users?.create) {
    //   return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    // }
    
    const data = await request.json()
    
    // Validate required fields
    if (!data.email || !data.name || !data.password) {
      return NextResponse.json({ error: 'Email, name, and password are required' }, { status: 400 })
    }
    
    // Check if Firebase Admin is properly initialized
    if (!adminDb) {
      return NextResponse.json({ error: 'Database not available. Please check server configuration.' }, { status: 503 })
    }
    
    // Check if user already exists
    const existingUser = await adminDb.collection('users')
      .where('email', '==', data.email)
      .limit(1)
      .get()
    
    if (!existingUser.empty) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10)
    
    // Create user document
    const newUser = {
      email: data.email,
      name: data.name,
      role: data.role || 'author',
      permissions: data.permissions || getDefaultPermissions(data.role || 'author'),
      passwordHash,
      createdAt: new Date().toISOString(),
      isActive: true
    }
    
    const docRef = await adminDb.collection('users').add(newUser)
    
    // Return user without password hash
    const { passwordHash: _, ...userWithoutPassword } = newUser
    
    return NextResponse.json({ 
      user: {
        id: docRef.id,
        ...userWithoutPassword
      }
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

function getDefaultPermissions(role: string) {
  const permissions = {
    admin: {
      posts: { create: true, read: true, update: true, delete: true },
      categories: { create: true, read: true, update: true, delete: true },
      users: { create: true, read: true, update: true, delete: true },
      subscribers: { read: true, export: true }
    },
    editor: {
      posts: { create: true, read: true, update: true, delete: false },
      categories: { create: true, read: true, update: true, delete: false },
      users: { create: false, read: false, update: false, delete: false },
      subscribers: { read: true, export: true }
    },
    author: {
      posts: { create: true, read: true, update: false, delete: false },
      categories: { create: false, read: true, update: false, delete: false },
      users: { create: false, read: false, update: false, delete: false },
      subscribers: { read: false, export: false }
    }
  }
  
  return permissions[role as keyof typeof permissions] || permissions.author
}