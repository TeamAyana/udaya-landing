'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Please enter your country/region'),
  userType: z.enum(['patient', 'caregiver', 'clinician', 'other']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSubmitted(true)
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Contact Form Section */}
      <Section id="contact-section" className="pt-32 pb-16 bg-gradient-to-b from-white to-udaya-cream/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
                <CardContent className="py-20 text-center">
                  <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-udaya-sage to-udaya-sage/80 text-white shadow-xl">
                    <CheckCircle className="h-12 w-12" strokeWidth={2.5} />
                  </div>
                  <h2 className="font-serif text-h3 font-bold text-udaya-charcoal mb-6">
                    Message Sent Successfully
                  </h2>
                  <p className="text-body-lg text-udaya-charcoal/80 mb-10 max-w-lg mx-auto">
                    Thank you for reaching out. A member of our team will respond within 48 hours.
                  </p>
                  <Button asChild className="rounded-2xl px-8 py-6">
                    <Link href="/">Return to Home</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-br from-udaya-sage/20 to-udaya-sage/10 rounded-full mb-8">
                    <Send className="h-10 w-10 text-udaya-sage" />
                  </div>
                  <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
                    Send Us a Message
                  </h2>
                  <p className="text-body-lg text-udaya-charcoal/70 max-w-2xl mx-auto">
                    Share your story and questions. Our care team will provide personalized guidance.
                  </p>
                </div>
                <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="name" className="block text-sm font-semibold text-udaya-charcoal">Name *</label>
                          <input
                            id="name"
                            {...register('name')}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                            placeholder="Your full name"
                          />
                          {errors.name && (
                            <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                              <span className="text-xs">⚠</span> {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <label htmlFor="email" className="block text-sm font-semibold text-udaya-charcoal">Email *</label>
                          <input
                            id="email"
                            {...register('email')}
                            type="email"
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                            placeholder="your@email.com"
                          />
                          {errors.email && (
                            <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                              <span className="text-xs">⚠</span> {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="country" className="block text-sm font-semibold text-udaya-charcoal">Country/Region *</label>
                          <input
                            id="country"
                            {...register('country')}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                            placeholder="Your country or region"
                          />
                          {errors.country && (
                            <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                              <span className="text-xs">⚠</span> {errors.country.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <label htmlFor="userType" className="block text-sm font-semibold text-udaya-charcoal">I am a: *</label>
                          <select
                            id="userType"
                            {...register('userType')}
                            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all hover:border-gray-300 appearance-none bg-white/50 backdrop-blur-sm cursor-pointer"
                          >
                            <option value="">Select your role...</option>
                            <option value="patient">Patient</option>
                            <option value="caregiver">Caregiver</option>
                            <option value="clinician">Clinician</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.userType && (
                            <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                              <span className="text-xs">⚠</span> {errors.userType.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="subject" className="block text-sm font-semibold text-udaya-charcoal">Subject *</label>
                        <input
                          id="subject"
                          {...register('subject')}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                          placeholder="What would you like to discuss?"
                        />
                        {errors.subject && (
                          <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                            <span className="text-xs">⚠</span> {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="message" className="block text-sm font-semibold text-udaya-charcoal">Message *</label>
                        <textarea
                          id="message"
                          {...register('message')}
                          rows={6}
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all hover:border-gray-300 resize-none bg-white/50 backdrop-blur-sm"
                          placeholder="Please share your questions, medical history, or any concerns you'd like to discuss..."
                        />
                        {errors.message && (
                          <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                            <span className="text-xs">⚠</span> {errors.message.message}
                          </p>
                        )}
                      </div>

                      {error && (
                        <div className="bg-udaya-terracotta/10 border-2 border-udaya-terracotta/30 rounded-2xl p-5">
                          <p className="text-udaya-terracotta text-sm flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <span>{error}</span>
                          </p>
                        </div>
                      )}

                      <div className="space-y-5 pt-2">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full rounded-2xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending your message...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                        <p className="text-center text-sm text-udaya-charcoal/60">
                          By submitting this form, you agree to our privacy policy and consent to receive communications from our team.
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </Section>

    </>
  )
}