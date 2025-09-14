'use client'

import * as React from 'react'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted')
    if (!hasAcceptedCookies) {
      // Show popup after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true)
        setTimeout(() => setIsAnimating(true), 100)
      }, 1500)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false')
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-udaya-cream/20 to-udaya-sage/5" />
          
          <div className="relative p-6 md:p-8">
            <button
              onClick={declineCookies}
              className="absolute right-4 top-4 text-udaya-charcoal/40 hover:text-udaya-charcoal/60 transition-colors"
              aria-label="Close cookie notice"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Cookie icon and content */}
              <div className="flex gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-udaya-sage/10 flex items-center justify-center">
                    <Cookie className="h-6 w-6 text-udaya-sage" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-udaya-charcoal mb-2">
                    We value your privacy 🌿
                  </h3>
                  <p className="text-sm text-udaya-charcoal/70 mb-3">
                    We use cookies to enhance your experience on our website. These help us understand 
                    how you use our site and remember your preferences. Your privacy is important to us.
                  </p>
                  <Link 
                    href="/privacy" 
                    className="text-sm text-udaya-sage hover:text-udaya-sage/80 underline underline-offset-2"
                  >
                    Learn more in our Privacy Policy
                  </Link>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  variant="outline"
                  onClick={declineCookies}
                  className="flex-1 md:flex-initial"
                >
                  Decline
                </Button>
                <Button
                  onClick={acceptCookies}
                  className="flex-1 md:flex-initial bg-udaya-sage hover:bg-udaya-sage/90"
                >
                  Accept Cookies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}