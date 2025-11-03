import { NextRequest, NextResponse } from 'next/server'
import { loginWithFirebase, initializeDefaultAdmin } from '@/lib/auth-firebase'
import { checkRateLimit, getClientIp, RateLimitPresets } from '@/lib/rate-limit'

// Initialize default admin on startup
initializeDefaultAdmin()

export async function POST(request: NextRequest) {
  try {
    // Check rate limit for authentication attempts
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, RateLimitPresets.AUTH_ATTEMPT)

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many login attempts',
          message: 'You have exceeded the maximum number of login attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000))
          }
        }
      )
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

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

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}