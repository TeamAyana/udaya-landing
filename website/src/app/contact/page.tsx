'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Phone, MessageSquare, CheckCircle, Loader2, Send, Globe, Users, Clock } from 'lucide-react'
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

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: SITE_CONFIG.links.email,
    href: `mailto:${SITE_CONFIG.links.email}`,
    description: 'General inquiries'
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: SITE_CONFIG.links.whatsapp,
    href: `https://wa.me/${SITE_CONFIG.links.whatsapp.replace(/[^0-9]/g, '')}`,
    description: 'Quick questions'
  },
  {
    icon: MessageSquare,
    title: 'Schedule a Call',
    value: 'Book a consultation',
    href: '#',
    description: '30-minute video call'
  }
]

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
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream/30 to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-udaya-sage/10 text-udaya-sage px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4" />
              <span>Available for urgent inquiries</span>
            </div>
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Let's Start Your Journey Together
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80 max-w-2xl mx-auto">
              Whether you're exploring treatment options or ready to begin, our compassionate team 
              is here to guide you every step of the way.
            </p>
            <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2 text-udaya-charcoal/70">
                <Clock className="h-4 w-4 text-udaya-sage" />
                <span>Response within 48 hours</span>
              </div>
              <div className="flex items-center gap-2 text-udaya-charcoal/70">
                <Globe className="h-4 w-4 text-udaya-sage" />
                <span>Support in multiple languages</span>
              </div>
              <div className="flex items-center gap-2 text-udaya-charcoal/70">
                <Mail className="h-4 w-4 text-udaya-sage" />
                <span>Secure & confidential</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
                Choose Your Preferred Way to Connect
              </h2>
              <p className="text-body-lg text-udaya-charcoal/70">
                We're available through multiple channels to ensure you get the support you need
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                const isScheduleCall = method.title === 'Schedule a Call'

                return (
                  <Card
                    key={index}
                    className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-udaya-sage/30 h-full flex flex-col"
                  >
                    <CardHeader className="text-center flex-grow">
                      <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-udaya-sage/20 to-udaya-sage/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-udaya-sage" />
                      </div>
                      <CardTitle className="text-xl mb-2">{method.title}</CardTitle>
                      <CardDescription className="text-base">{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <a
                        href={isScheduleCall ? 'https://calendly.com/andreyd/udaya-consultation' : method.href}
                        target={isScheduleCall ? '_blank' : undefined}
                        rel={isScheduleCall ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 text-udaya-sage hover:text-udaya-sage/80 font-semibold text-lg group-hover:underline"
                      >
                        <span>{method.value}</span>
                        <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </a>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section id="contact-section" className="py-16 bg-gradient-to-b from-white to-udaya-cream/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-udaya-sage text-white">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h2 className="font-serif text-h3 font-bold text-udaya-charcoal mb-4">
                    Message Sent Successfully
                  </h2>
                  <p className="text-body-lg text-udaya-charcoal/80 mb-8">
                    Thank you for reaching out. A member of our team will respond within 48 hours.
                  </p>
                  <Button asChild>
                    <Link href="/">Return to Home</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center h-16 w-16 bg-udaya-sage/10 rounded-full mb-6">
                    <Send className="h-8 w-8 text-udaya-sage" />
                  </div>
                  <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
                    Send Us a Message
                  </h2>
                  <p className="text-body-lg text-udaya-charcoal/70 max-w-2xl mx-auto">
                    Share your story and questions. Our care team will provide personalized guidance.
                  </p>
                </div>
                <Card className="shadow-xl border-0">
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-udaya-charcoal">Name *</label>
                          <input
                            id="name"
                            {...register('name')}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                            placeholder="Your full name"
                          />
                          {errors.name && (
                            <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                              <span className="text-xs">⚠</span> {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-semibold text-udaya-charcoal">Email *</label>
                          <input
                            id="email"
                            {...register('email')}
                            type="email"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
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
                        <div className="space-y-2">
                          <label htmlFor="country" className="block text-sm font-semibold text-udaya-charcoal">Country/Region *</label>
                          <input
                            id="country"
                            {...register('country')}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                            placeholder="Your country or region"
                          />
                          {errors.country && (
                            <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                              <span className="text-xs">⚠</span> {errors.country.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="userType" className="block text-sm font-semibold text-udaya-charcoal">I am a: *</label>
                          <select
                            id="userType"
                            {...register('userType')}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 appearance-none bg-white cursor-pointer"
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

                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-semibold text-udaya-charcoal">Subject *</label>
                        <input
                          id="subject"
                          {...register('subject')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                          placeholder="What would you like to discuss?"
                        />
                        {errors.subject && (
                          <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                            <span className="text-xs">⚠</span> {errors.subject.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-semibold text-udaya-charcoal">Message *</label>
                        <textarea
                          id="message"
                          {...register('message')}
                          rows={6}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 resize-none"
                          placeholder="Please share your questions, medical history, or any concerns you'd like to discuss..."
                        />
                        {errors.message && (
                          <p className="text-udaya-terracotta text-sm mt-1 flex items-center gap-1">
                            <span className="text-xs">⚠</span> {errors.message.message}
                          </p>
                        )}
                      </div>

                      {error && (
                        <div className="bg-udaya-terracotta/10 border-2 border-udaya-terracotta/30 rounded-lg p-4">
                          <p className="text-udaya-terracotta text-sm flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <span>{error}</span>
                          </p>
                        </div>
                      )}

                      <div className="space-y-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
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