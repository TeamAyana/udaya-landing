import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { AdminUser } from '@/types/blog'

const JWT_SECRET = process.env.JWT_SECRET || 'udaya-admin-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'udaya2024' // Change this in production!

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

export async function login(username: string, password: string): Promise<string | null> {
  // Simple hardcoded admin check - in production, use database
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return generateToken('admin')
  }
  return null
}

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