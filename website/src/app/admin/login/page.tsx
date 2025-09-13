'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login form submitted', { username, password })
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      console.log('Login response status:', response.status)
      const data = await response.json()
      console.log('Login response data:', data)
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      if (data.success) {
        console.log('Login successful, redirecting...')
        // Wait a bit for cookie to be set
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Force hard redirect
        window.location.href = '/admin/dashboard'
      } else {
        throw new Error('Login failed - no success response')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-udaya-cream to-white">
      <Container className="max-w-md">
        <Card className="shadow-2xl border-0 overflow-hidden relative" style={{ zIndex: 1 }}>
          <CardHeader className="bg-gradient-to-r from-udaya-sage to-udaya-sage/90 text-white">
            <CardTitle className="text-center text-2xl font-serif">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="p-8" style={{ position: 'relative', zIndex: 10 }}>
            <form 
              onSubmit={(e) => {
                console.log('Form onSubmit triggered');
                handleLogin(e);
              }} 
              className="space-y-6"
            >
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-udaya-sage transition-all hover:border-udaya-sage/50"
                  placeholder="Enter username"
                  required
                  style={{ position: 'relative', zIndex: 20 }}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-udaya-sage transition-all hover:border-udaya-sage/50"
                  placeholder="Enter password"
                  required
                  style={{ position: 'relative', zIndex: 20 }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-udaya-sage hover:bg-udaya-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-udaya-sage disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={loading}
                onClick={(e) => {
                  console.log('Button clicked!');
                  if (!e.currentTarget.form) {
                    console.error('Form not found!');
                  }
                }}
                style={{ position: 'relative', zIndex: 20 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 p-4 bg-gradient-to-br from-udaya-sage/5 to-udaya-cream/20 rounded-xl">
              <p className="text-center text-sm text-gray-600 font-medium mb-2">
                Default credentials:
              </p>
              <div className="text-center text-sm text-gray-600 space-y-1">
                <p>Username: <span className="font-mono font-semibold text-udaya-sage">admin</span></p>
                <p>Password: <span className="font-mono font-semibold text-udaya-sage">udaya2024</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}