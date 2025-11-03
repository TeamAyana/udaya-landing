'use client'

import React, { useState } from 'react'
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

  // Health Status Section
  mobilityLevel: z.enum([
    'fully-mobile',
    'minimal-assistance',
    'mobility-aids',
    'significant-assistance',
    'bedridden'
  ], { required_error: 'Please select your mobility level' }),
  prognosis: z.string().optional(),
  travelOrigin: z.string().min(2, 'Please enter your travel origin'),
  preferredLanguage: z.string().min(2, 'Please select your preferred language'),
  preferredLanguageOther: z.string().optional(),
  currentMedications: z.string().min(10, 'Please list your current medications'),
  dietaryRequirements: z.array(z.string()).min(1, 'Please select at least one option'),
  dietaryAllergies: z.string().optional(),
  dietaryOther: z.string().optional(),

  // Your Goals Section
  healingGoals: z.string().min(20, 'Please share what healing looks like to you'),
  yourStory: z.string().optional(),
  treatmentPhilosophy: z.string().min(2, 'Please select your treatment philosophy'),
  treatmentPhilosophyOther: z.string().optional(),
  cannabisExperience: z.string().min(2, 'Please select your cannabis experience'),
  cannabisExperienceOther: z.string().optional(),

  // Who's Involved
  hasCaregiver: z.enum(['yes-traveling', 'yes-not-traveling', 'no', 'considering']),
  hearAboutUs: z.string().min(2, 'Please tell us how you heard about Udaya'),
  hearAboutUsOther: z.string().optional(),

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
  const [waitlistNumber, setWaitlistNumber] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dietaryReqs, setDietaryReqs] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      dietaryRequirements: []
    }
  })

  // Debug: Log form errors
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form validation errors:', errors)
    }
  }, [errors])

  // Handle dietary requirements checkboxes
  const handleDietaryChange = (value: string, checked: boolean) => {
    const updated = checked
      ? [...dietaryReqs, value]
      : dietaryReqs.filter(v => v !== value)
    setDietaryReqs(updated)
    setValue('dietaryRequirements', updated)
  }

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
      setWaitlistNumber(result.waitlistNumber || null)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('There was an error submitting your request. Please try again or contact us directly.')
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
            {waitlistNumber && (
              <div className="mb-6 p-4 bg-udaya-sage/10 rounded-lg border border-udaya-sage/20">
                <p className="text-sm text-udaya-charcoal/70 mb-1">Your Request Number</p>
                <p className="text-3xl font-bold text-udaya-sage">#{waitlistNumber}</p>
              </div>
            )}
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              You&apos;ll receive within 24-48 hours:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Personalized information about your options</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Treatment protocol details relevant to your situation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Honest assessment of whether our program fits your needs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <span>Next steps if you decide to proceed</span>
              </li>
            </ul>
            <p className="text-udaya-charcoal/70 mb-8">
              Our medical team reviews each request individually. We&apos;ll respond with personalized information about your specific situation.
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
              Information Request Form
            </h1>
            <p className="text-h3 font-light text-udaya-charcoal/80 mb-4">
              Share your situation. Get personalized information about your options.
            </p>
            <p className="text-body-lg text-udaya-charcoal/70">
              No commitment required.
            </p>
          </div>
        </Container>
      </Section>

      {/* Waitlist Form */}
      <Section variant="cream">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-h3 font-serif">Tell Us About Your Situation</CardTitle>
                <CardDescription>
                  The more we know, the better we can serve you with relevant information.
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.fullName && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.email && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone (with country code) *</label>
                        <input
                          {...register('phone')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.phone && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country of residence *</label>
                        <input
                          {...register('country')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.country && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.country.message}</p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Age *</label>
                        <input
                          {...register('age')}
                          type="number"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.age && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.age.message}</p>
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
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.diagnosis && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.diagnosis.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Date of diagnosis *</label>
                        <input
                          {...register('diagnosisDate')}
                          placeholder="e.g., January 2024"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.diagnosisDate && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.diagnosisDate.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Current treatments *</label>
                        <textarea
                          {...register('currentTreatments')}
                          rows={3}
                          placeholder="e.g., chemotherapy, radiation, surgery, etc."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent resize-vertical"
                        />
                        {errors.currentTreatments && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.currentTreatments.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Health Status Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Health Status</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Current Mobility Level *</label>
                        <div className="space-y-2">
                          {[
                            { value: 'fully-mobile', label: 'Fully mobile and independent' },
                            { value: 'minimal-assistance', label: 'Mobile with minimal assistance' },
                            { value: 'mobility-aids', label: 'Require mobility aids (walker/wheelchair)' },
                            { value: 'significant-assistance', label: 'Require significant assistance' },
                            { value: 'bedridden', label: 'Bedridden' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <input
                                {...register('mobilityLevel')}
                                type="radio"
                                value={option.value}
                                className="text-udaya-sage focus:ring-udaya-sage"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        {errors.mobilityLevel && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.mobilityLevel.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Prognosis (if applicable)</label>
                        <textarea
                          {...register('prognosis')}
                          rows={3}
                          placeholder="Please share what you've been told about timeline or life expectancy, if relevant"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent resize-vertical"
                        />
                        {errors.prognosis && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.prognosis.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Travel Origin *</label>
                        <input
                          {...register('travelOrigin')}
                          placeholder="Country and city you'll be traveling from"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        />
                        {errors.travelOrigin && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.travelOrigin.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Language *</label>
                        <select
                          {...register('preferredLanguage')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal appearance-none cursor-pointer transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%235C7B65' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="English">English</option>
                          <option value="Thai">Thai</option>
                          <option value="Mandarin">Mandarin</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.preferredLanguage && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.preferredLanguage.message}</p>
                        )}
                        {watch('preferredLanguage') === 'Other' && (
                          <input
                            {...register('preferredLanguageOther')}
                            placeholder="Please specify"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent mt-2"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Current Medications *</label>
                        <textarea
                          {...register('currentMedications')}
                          rows={4}
                          placeholder="Please list all current medications, including chemotherapy, immunotherapy, or other treatments"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent resize-vertical"
                        />
                        {errors.currentMedications && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.currentMedications.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Dietary Requirements *</label>
                        <div className="space-y-2">
                          {[
                            { value: 'no-restrictions', label: 'No restrictions' },
                            { value: 'vegetarian', label: 'Vegetarian' },
                            { value: 'vegan', label: 'Vegan' },
                            { value: 'gluten-free', label: 'Gluten-free' },
                            { value: 'halal', label: 'Halal' },
                            { value: 'kosher', label: 'Kosher' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                value={option.value}
                                checked={dietaryReqs.includes(option.value)}
                                onChange={(e) => handleDietaryChange(option.value, e.target.checked)}
                                className="text-udaya-sage focus:ring-udaya-sage"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <input
                          {...register('dietaryAllergies')}
                          placeholder="Allergies (please specify)"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent mt-2"
                        />
                        <input
                          {...register('dietaryOther')}
                          placeholder="Other dietary requirements"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent mt-2"
                        />
                        {errors.dietaryRequirements && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.dietaryRequirements.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Your Goals Section */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Your Goals</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">What Outcome Are You Seeking? *</label>
                        <textarea
                          {...register('healingGoals')}
                          rows={5}
                          placeholder="Tell us in your own words what healing looks like to you. What would success mean for your journey?"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent resize-vertical"
                        />
                        {errors.healingGoals && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.healingGoals.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Your Story (Optional)</label>
                        <textarea
                          {...register('yourStory')}
                          rows={5}
                          placeholder="Anything else you'd like us to know about your journey, concerns, or hopes"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent resize-vertical"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Treatment Philosophy *</label>
                        <div className="space-y-2">
                          {[
                            { value: 'primary', label: 'I want cannabis as my primary treatment' },
                            { value: 'combined', label: 'I want to combine cannabis with conventional treatment' },
                            { value: 'exploring', label: "I'm exploring all options before deciding" },
                            { value: 'avoid-conventional', label: 'I want to avoid conventional treatment if possible' },
                            { value: 'other', label: 'Other' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <input
                                {...register('treatmentPhilosophy')}
                                type="radio"
                                value={option.value}
                                className="text-udaya-sage focus:ring-udaya-sage"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        {watch('treatmentPhilosophy') === 'other' && (
                          <input
                            {...register('treatmentPhilosophyOther')}
                            placeholder="Please explain"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent mt-2"
                          />
                        )}
                        {errors.treatmentPhilosophy && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.treatmentPhilosophy.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Previous Cannabis Experience *</label>
                        <div className="space-y-2">
                          {[
                            { value: 'never', label: 'Never used cannabis' },
                            { value: 'recreational', label: 'Recreational use only' },
                            { value: 'medical-current', label: 'Current medical cannabis patient' },
                            { value: 'medical-stopped', label: 'Tried medical cannabis but stopped' },
                            { value: 'other', label: 'Other' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <input
                                {...register('cannabisExperience')}
                                type="radio"
                                value={option.value}
                                className="text-udaya-sage focus:ring-udaya-sage"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        {watch('cannabisExperience') === 'other' && (
                          <input
                            {...register('cannabisExperienceOther')}
                            placeholder="Please explain"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent mt-2"
                          />
                        )}
                        {errors.cannabisExperience && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.cannabisExperience.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Who's Involved */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Who&apos;s Involved</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Will you have a caregiver? *</label>
                        <div className="space-y-2">
                          {[
                            { value: 'yes-traveling', label: 'Yes, traveling with me' },
                            { value: 'yes-not-traveling', label: 'Yes, but not traveling with me' },
                            { value: 'no', label: 'No' },
                            { value: 'considering', label: 'Considering it' }
                          ].map((option) => (
                            <label key={option.value} className="flex items-center gap-2">
                              <input
                                {...register('hasCaregiver')}
                                type="radio"
                                value={option.value}
                                className="text-udaya-sage focus:ring-udaya-sage"
                              />
                              <span className="text-sm">{option.label}</span>
                            </label>
                          ))}
                        </div>
                        {errors.hasCaregiver && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.hasCaregiver.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">How did you hear about Udaya? *</label>
                        <select
                          {...register('hearAboutUs')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal appearance-none cursor-pointer transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%235C7B65' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="internet-search">Internet search</option>
                          <option value="healthcare-provider">Healthcare provider</option>
                          <option value="friend-family">Friend/family</option>
                          <option value="support-group">Support group</option>
                          <option value="social-media">Social media</option>
                          <option value="other">Other</option>
                        </select>
                        {watch('hearAboutUs') === 'other' && (
                          <input
                            {...register('hearAboutUsOther')}
                            placeholder="Please specify"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent mt-2"
                          />
                        )}
                        {errors.hearAboutUs && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.hearAboutUs.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Program Interest */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Program Interest</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Which program? *</label>
                        <select
                          {...register('retreatInterest')}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-udaya-charcoal appearance-none cursor-pointer transition-all hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%235C7B65' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem'
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="cancer-q2-2026">Cancer Treatment Program Q2 2026</option>
                          <option value="future-programs">Future programs</option>
                        </select>
                        {errors.retreatInterest && (
                          <p className="text-udaya-terracotta text-sm mt-1">{errors.retreatInterest.message}</p>
                        )}
                      </div>
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
                        By requesting information, I understand that:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>This is legitimate medical treatment, not alternative medicine</li>
                          <li>Cannabis can be a first-line treatment option, not just last resort</li>
                          <li>I&apos;m requesting information only, with no obligation to proceed</li>
                          <li>My information will be kept completely confidential</li>
                          <li>I&apos;ll receive honest information about whether this program fits my needs</li>
                          <li>Spaces are limited and acceptance is based on medical appropriateness</li>
                        </ul>
                      </label>
                    </div>
                    {errors.agreement && (
                      <p className="text-udaya-terracotta text-sm mt-1">{errors.agreement.message}</p>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-udaya-terracotta/10 border border-udaya-terracotta/30 rounded-md">
                      <p className="text-udaya-terracotta text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Get Complete Information'
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
