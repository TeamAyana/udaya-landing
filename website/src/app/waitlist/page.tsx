'use client'

import React, { useState } from 'react'
import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

const waitlistSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please include country code'),
  country: z.string().min(2, 'Please enter your country'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: 'You must be 18 or older'
  }),
  
  // Medical Information
  diagnosis: z.string().min(3, 'Please provide your primary diagnosis'),
  diagnosisDate: z.string().min(4, 'Please provide diagnosis date'),
  currentTreatments: z.string().min(10, 'Please describe current treatments'),
  cannabisExperience: z.enum(['never', 'recreational', 'medical']),
  
  // Program Interest
  retreatInterest: z.enum(['cancer-q2-2026', 'future-programs']),
  
  // Agreement
  agreement: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms'
  })
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema)
  })

  // Debug: Log form errors
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form validation errors:', errors)
    }
  }, [errors])

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const result = await response.json()
      console.log('Form submitted successfully:', result)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('There was an error submitting your application. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Section className="pt-32 pb-16 min-h-screen flex items-center">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-udaya-sage text-white">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
              Thank you. We see you.
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              You'll receive within 24 hours:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Your waitlist number</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Preparation resources</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Medical documentation checklist</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Scholarship application (if requested)</span>
              </li>
            </ul>
            <p className="text-udaya-charcoal/70 mb-8">
              Our clinical team reviews applications weekly. Expect an update within 10 days.
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Secure Your Place for Hua Hin (Q2 2026)
            </h1>
            <p className="text-h3 font-light text-udaya-charcoal/80 mb-4">
              Priority dates, first pricing, and pre-opening Q&A.
            </p>
            <p className="text-body-lg text-udaya-charcoal/70">
              Cohorts are small and fill from the waitlist. Add your name for early access 
              to dates, pricing, and clinical intake. No obligation.
            </p>
          </div>
        </Container>
      </Section>

      {/* Application Process */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              Application Process
            </h2>
            <div className="grid md:grid-cols-5 gap-8">
              {[
                'Waitlist Registration',
                'Medical Pre-Screening',
                'Discovery Call',
                'Formal Application',
                'Acceptance & Preparation'
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className={cn(
                    'h-10 w-10 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold',
                    index === 0 ? 'bg-udaya-sage' : 'bg-udaya-sage/30'
                  )}>
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Waitlist Form */}
      <Section variant="cream">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 font-serif">Waitlist Registration Form</CardTitle>
                <CardDescription>
                  Step 1 — Share basic information to reserve your spot in the review queue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Your Information */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Your Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full name *</label>
                        <input
                          {...register('fullName')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone (with country code) *</label>
                        <input
                          {...register('phone')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country of residence *</label>
                        <input
                          {...register('country')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Age *</label>
                        <input
                          {...register('age')}
                          type="number"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.age && (
                          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Medical Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Primary diagnosis *</label>
                        <input
                          {...register('diagnosis')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.diagnosis && (
                          <p className="text-red-500 text-sm mt-1">{errors.diagnosis.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date of diagnosis *</label>
                        <input
                          {...register('diagnosisDate')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.diagnosisDate && (
                          <p className="text-red-500 text-sm mt-1">{errors.diagnosisDate.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Current treatments *</label>
                        <textarea
                          {...register('currentTreatments')}
                          rows={3}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.currentTreatments && (
                          <p className="text-red-500 text-sm mt-1">{errors.currentTreatments.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Have you used cannabis medicinally or recreationally? *</label>
                        <select
                          {...register('cannabisExperience')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        >
                          <option value="">Select...</option>
                          <option value="never">Never</option>
                          <option value="recreational">Recreationally only</option>
                          <option value="medical">Medicinally</option>
                        </select>
                        {errors.cannabisExperience && (
                          <p className="text-red-500 text-sm mt-1">{errors.cannabisExperience.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Program Interest */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Program Interest</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Which retreat? *</label>
                        <select
                          {...register('retreatInterest')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        >
                          <option value="">Select...</option>
                          <option value="cancer-q2-2026">Cancer Q2 2026</option>
                          <option value="future-programs">Future programs</option>
                        </select>
                        {errors.retreatInterest && (
                          <p className="text-red-500 text-sm mt-1">{errors.retreatInterest.message}</p>
                        )}
                      </div>
                      {/* Additional fields continue... */}
                    </div>
                  </div>

                  {/* Agreement */}
                  <div className="border-t pt-6">
                    <div className="flex items-start gap-3">
                      <input
                        {...register('agreement')}
                        type="checkbox"
                        className="mt-1"
                      />
                      <label className="text-sm text-udaya-charcoal/80">
                        By joining this waitlist, I understand that this is a medical program requiring 
                        physician approval, I will need to provide complete medical records, cannabis 
                        medicine is one component of a comprehensive program, this is not a replacement 
                        for conventional medical care, and spaces are limited and filled on a best-fit basis.
                      </label>
                    </div>
                    {errors.agreement && (
                      <p className="text-red-500 text-sm mt-1">{errors.agreement.message}</p>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                    onClick={() => console.log('Button clicked, errors:', errors)}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Reserve My Space'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Questions */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Questions?
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-4">
              Email: <a href={`mailto:${SITE_CONFIG.links.email}`} className="text-udaya-sage hover:underline">{SITE_CONFIG.links.email}</a>
            </p>
            <p className="text-body-lg text-udaya-charcoal/80 mb-4">
              WhatsApp: <a href={`https://wa.me/${SITE_CONFIG.links.whatsapp.replace(/[^0-9]/g, '')}`} className="text-udaya-sage hover:underline">{SITE_CONFIG.links.whatsapp}</a>
            </p>
            <Button variant="outline" asChild>
              <Link href="/contact">Schedule a call</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}