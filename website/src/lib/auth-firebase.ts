import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { adminDb } from './firebase-admin'

const JWT_SECRET = process.env.JWT_SECRET || 'udaya-admin-secret-key-change-in-production'

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export async function loginWithFirebase(email: string, password: string): Promise<{ token: string; user: any } | null> {
  try {
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      console.error('Firebase Admin SDK not initialized')
      return null
    }
    
    // Find user by email
    const usersSnapshot = await adminDb.collection('users')
      .where('email', '==', email)
      .where('isActive', '==', true)
      .limit(1)
      .get()
    
    if (usersSnapshot.empty) {
      return null
    }
    
    const userDoc = usersSnapshot.docs[0]
    const userData = userDoc.data()
    
    // Verify password
    const isValid = await verifyPassword(password, userData.passwordHash)
    if (!isValid) {
      return null
    }
    
    // Update last login
    await adminDb.collection('users').doc(userDoc.id).update({
      lastLogin: new Date().toISOString()
    })
    
    // Generate token
    const token = generateToken(userDoc.id)
    
    // Return user data without password hash
    const { passwordHash, ...userWithoutPassword } = userData
    
    return {
      token,
      user: {
        id: userDoc.id,
        ...userWithoutPassword
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

export async function getSessionWithPermissions() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null
  
  const payload = verifyToken(token)
  if (!payload) return null
  
  try {
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      return null
    }
    
    // Get user data with permissions
    const userDoc = await adminDb.collection('users').doc(payload.userId).get()
    if (!userDoc.exists) return null
    
    const userData = userDoc.data()
    const { passwordHash, ...userWithoutPassword } = userData || {}
    
    return {
      userId: payload.userId,
      user: {
        id: payload.userId,
        ...userWithoutPassword
      }
    }
  } catch {
    return null
  }
}

// Fallback for old auth system - keep for backward compatibility
export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null
  
  const payload = verifyToken(token)
  if (!payload) return null
  
  return { userId: payload.userId }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

// Initialize default admin user if none exists
export async function initializeDefaultAdmin() {
  try {
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      console.warn('Firebase Admin SDK not initialized. Cannot create default admin.')
      return
    }
    
    const adminsSnapshot = await adminDb.collection('users')
      .where('role', '==', 'admin')
      .limit(1)
      .get()
    
    if (adminsSnapshot.empty) {
      // Create default admin user
      const defaultAdmin = {
        email: process.env.ADMIN_EMAIL || 'admin@udaya.one',
        name: 'Admin',
        role: 'admin',
        permissions: {
          posts: { create: true, read: true, update: true, delete: true },
          categories: { create: true, read: true, update: true, delete: true },
          users: { create: true, read: true, update: true, delete: true },
          subscribers: { read: true, export: true }
        },
        passwordHash: await hashPassword(process.env.ADMIN_PASSWORD || 'udaya2024'),
        createdAt: new Date().toISOString(),
        isActive: true
      }
      
      await adminDb.collection('users').add(defaultAdmin)
      console.log('Default admin user created')
    }
  } catch (error) {
    console.error('Error initializing default admin:', error)
  }
}