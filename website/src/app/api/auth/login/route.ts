import { NextRequest, NextResponse } from 'next/server'
import { login } from '@/lib/auth'
import { loginWithFirebase, initializeDefaultAdmin } from '@/lib/auth-firebase'

// Initialize default admin on startup
initializeDefaultAdmin()

export async function POST(request: NextRequest) {
  try {
    const { username, password, email } = await request.json()
    
    // Try new Firebase auth first (if email provided)
    if (email) {
      const result = await loginWithFirebase(email, password)
      
      if (result) {
        const response = NextResponse.json({ 
          success: true,
          user: result.user 
        })
        
        response.cookies.set('auth-token', result.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/'
        })
        
        return response
      }
    }
    
    // Fallback to old auth system (for backward compatibility)
    if (username && !email) {
      const token = await login(username, password)
      
      if (token) {
        const response = NextResponse.json({ success: true })
        
        response.cookies.set('auth-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/'
        })
        
        return response
      }
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}