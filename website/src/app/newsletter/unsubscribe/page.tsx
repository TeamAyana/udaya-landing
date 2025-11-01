'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Loader2, Mail, Heart, ArrowLeft } from 'lucide-react'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'already' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')
    const emailParam = searchParams.get('email')

    if (!token || !emailParam) {
      setStatus('error')
      setMessage('Invalid unsubscribe link. Please contact support if you need assistance.')
      return
    }

    // Call unsubscribe API
    fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}&email=${encodeURIComponent(emailParam)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEmail(data.email)
          if (data.alreadyUnsubscribed) {
            setStatus('already')
            setMessage(data.message)
          } else {
            setStatus('success')
            setMessage(data.message)
          }
        } else {
          setStatus('error')
          setMessage(data.message || 'An error occurred. Please try again.')
        }
      })
      .catch((error) => {
        console.error('Unsubscribe error:', error)
        setStatus('error')
        setMessage('An error occurred while processing your request. Please try again or contact support.')
      })
  }, [searchParams])

  return (
    <Section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-udaya-cream/30 to-white py-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Loading State */}
          {status === 'loading' && (
            <Card className="text-center border-0 shadow-xl">
              <CardContent className="py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-udaya-sage/10 mb-6">
                  <Loader2 className="w-8 h-8 text-udaya-sage animate-spin" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-udaya-charcoal mb-3">
                  Processing Your Request...
                </h1>
                <p className="text-udaya-charcoal/60">
                  Please wait while we unsubscribe you from our newsletter.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Success State */}
          {status === 'success' && (
            <Card className="text-center border-0 shadow-xl">
              <CardContent className="py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-udaya-charcoal mb-4">
                  You've Been Unsubscribed
                </h1>
                <p className="text-lg text-udaya-charcoal/80 mb-2">
                  {message}
                </p>
                {email && (
                  <p className="text-sm text-udaya-charcoal/60 mb-8">
                    Email: <strong>{email}</strong>
                  </p>
                )}

                <div className="bg-udaya-cream/50 rounded-lg p-6 mb-8">
                  <Heart className="w-6 h-6 text-udaya-sage mx-auto mb-3" />
                  <p className="text-sm text-udaya-charcoal/70 leading-relaxed">
                    We're sorry to see you go! If you changed your mind or unsubscribed by mistake,
                    you can always resubscribe by visiting our blog.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full bg-udaya-sage hover:bg-udaya-sage/90">
                    <Link href="/blog">
                      <Mail className="w-4 h-4 mr-2" />
                      Visit Our Blog
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-udaya-charcoal/60 mb-4">
                    Have feedback about why you unsubscribed?
                  </p>
                  <Button asChild variant="link" className="text-udaya-sage">
                    <Link href="/contact">
                      Share Your Feedback
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Already Unsubscribed State */}
          {status === 'already' && (
            <Card className="text-center border-0 shadow-xl">
              <CardContent className="py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-udaya-charcoal mb-4">
                  Already Unsubscribed
                </h1>
                <p className="text-lg text-udaya-charcoal/80 mb-2">
                  {message}
                </p>
                {email && (
                  <p className="text-sm text-udaya-charcoal/60 mb-8">
                    Email: <strong>{email}</strong>
                  </p>
                )}

                <div className="bg-udaya-cream/50 rounded-lg p-6 mb-8">
                  <p className="text-sm text-udaya-charcoal/70 leading-relaxed">
                    You won't receive any more newsletters from us. If you'd like to resubscribe,
                    you can do so by visiting our blog and signing up again.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full bg-udaya-sage hover:bg-udaya-sage/90">
                    <Link href="/blog">
                      Resubscribe on Blog
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/">
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error State */}
          {status === 'error' && (
            <Card className="text-center border-0 shadow-xl">
              <CardContent className="py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-udaya-charcoal mb-4">
                  Something Went Wrong
                </h1>
                <p className="text-lg text-udaya-charcoal/80 mb-8">
                  {message}
                </p>

                <div className="bg-udaya-cream/50 rounded-lg p-6 mb-8">
                  <p className="text-sm text-udaya-charcoal/70 leading-relaxed mb-4">
                    If you're trying to unsubscribe and this link isn't working, please contact our support team
                    and we'll manually remove you from our list immediately.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-udaya-sage" />
                    <a
                      href="mailto:team@udaya.one"
                      className="text-udaya-sage hover:underline font-medium"
                    >
                      team@udaya.one
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full bg-udaya-sage hover:bg-udaya-sage/90">
                    <Link href="/contact">
                      Contact Support
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/">
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-udaya-charcoal/50">
              Udaya Wellness Retreat • Hua Hin, Thailand
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <Section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-udaya-cream/30 to-white py-20">
          <Container>
            <div className="max-w-2xl mx-auto">
              <Card className="text-center border-0 shadow-xl">
                <CardContent className="py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-udaya-sage/10 mb-6">
                    <Loader2 className="w-8 h-8 text-udaya-sage animate-spin" />
                  </div>
                  <h1 className="text-2xl font-serif font-bold text-udaya-charcoal mb-3">
                    Loading...
                  </h1>
                  <p className="text-udaya-charcoal/60">
                    Please wait while we load your unsubscribe request.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  )
}
