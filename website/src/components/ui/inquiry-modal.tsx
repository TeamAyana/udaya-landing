'use client'

import * as React from 'react'
import Image from 'next/image'
import { X, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

// Validation schemas for each step
const step1Schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please include country code'),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: 'You must be 18 or older'
  }),
  country: z.string().min(2, 'Please enter your country'),
})

const step2Schema = z.object({
  diagnosis: z.string().min(3, 'Please provide your primary diagnosis'),
  diagnosisDate: z.string().min(4, 'Please provide diagnosis date'),
  currentTreatments: z.string().min(10, 'Please describe current treatments'),
})

// Full schema for API submission with defaults for required fields
const fullFormSchema = step1Schema.merge(step2Schema).extend({
  mobilityLevel: z.enum([
    'fully-mobile',
    'minimal-assistance',
    'mobility-aids',
    'significant-assistance',
    'bedridden'
  ]).default('fully-mobile'),
  travelOrigin: z.string().default('Not specified'),
  preferredLanguage: z.string().default('English'),
  currentMedications: z.string().default('Not specified'),
  dietaryRequirements: z.array(z.string()).default(['no-restrictions']),
  healingGoals: z.string().default('Seeking information about medical cannabis treatment'),
  treatmentPhilosophy: z.string().default('exploring'),
  cannabisExperience: z.string().default('never'),
  hasCaregiver: z.enum(['yes-traveling', 'yes-not-traveling', 'no', 'considering']).default('considering'),
  hearAboutUs: z.string().default('website'),
  retreatInterest: z.enum(['cancer-q2-2026', 'future-programs']).default('future-programs'),
  agreement: z.boolean().default(true),
})

type FullFormData = z.infer<typeof fullFormSchema>

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const totalSteps = 2

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<FullFormData>({
    resolver: zodResolver(fullFormSchema),
    mode: 'onBlur',
  })

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentStep(0)
      setIsSubmitted(false)
      setError(null)
      reset()
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, reset])

  if (!isOpen) return null

  const handleNext = async () => {
    const isValid = await trigger(['fullName', 'email', 'phone', 'age', 'country'])
    if (isValid) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const onSubmit = async (data: FullFormData) => {
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
      setError('There was an error submitting your request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalClose = () => {
    setCurrentStep(0)
    setIsSubmitted(false)
    setError(null)
    reset()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={handleModalClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[979px] max-h-[90vh] sm:max-h-[85vh] overflow-y-auto overflow-x-hidden bg-white rounded-2xl sm:rounded-[32px] shadow-[0_64px_104px_0_rgba(0,0,0,0.1)] animate-modalSlideUp">
        {/* Watermark Icon - Mobile */}
        <div className="absolute -top-20 -right-20 w-72 h-72 opacity-[0.04] pointer-events-none sm:hidden">
          <Image
            src="/uploads/icon.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        {/* Watermark Icon - Desktop */}
        <div className="absolute -top-[218px] -right-[262px] w-[680px] h-[680px] opacity-[0.05] pointer-events-none hidden sm:block">
          <Image
            src="/uploads/icon.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between px-4 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-3 sm:pb-4">
          {/* Step Indicator on Left */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            {currentStep > 0 && !isSubmitted && (
              <button
                onClick={handleBack}
                type="button"
                className="p-2 rounded-full hover:bg-udaya-sage/10 transition-all duration-200 hover:scale-110"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-udaya-charcoal" />
              </button>
            )}

            {/* Book Consultation Badge */}
            {!isSubmitted && (
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-full">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-udaya-sage" />
                <span className="text-xs sm:text-sm text-udaya-charcoal/70 font-medium">Book Consultation</span>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleModalClose}
            type="button"
            className="p-2 rounded-full hover:bg-udaya-sage/10 transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-udaya-charcoal" />
          </button>
        </div>

        {/* Content */}
        <div className="relative px-4 sm:px-8 md:px-12 pb-8 sm:pb-12 min-h-[400px] sm:min-h-[550px]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div key={currentStep} className="animate-slideIn">
                {/* Step 1: Tell Us About Yourself */}
                {currentStep === 0 && (
                  <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-udaya-charcoal">
                      Tell Us About Yourself
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                          Full name <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('fullName')}
                          type="text"
                          className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                          Phone (with country code) <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                          Age <span className="text-red-500">*</span>
                        </label>
                        <input
                          {...register('age')}
                          type="number"
                          className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                        />
                        {errors.age && (
                          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Country of residence <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('country')}
                        type="text"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                      )}
                    </div>

                    {/* Progress and Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 gap-4 sm:gap-0">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="h-2 w-20 sm:w-28 rounded-full bg-udaya-sage transition-all duration-500" />
                        <div className="h-2 w-20 sm:w-28 rounded-full bg-gray-200 transition-all duration-500" />
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-udaya-sage hover:bg-udaya-sage/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-base"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Your Medical Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-udaya-charcoal">
                      Your Medical Information
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Primary diagnosis <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('diagnosis')}
                        type="text"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                      />
                      {errors.diagnosis && (
                        <p className="text-red-500 text-sm mt-1">{errors.diagnosis.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Date of diagnosis <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register('diagnosisDate')}
                        type="text"
                        placeholder="e.g., January 2024"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 placeholder:text-gray-400 text-base"
                      />
                      {errors.diagnosisDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.diagnosisDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Current treatments <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('currentTreatments')}
                        placeholder="e.g., chemotherapy, radiation, surgery, etc."
                        rows={4}
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 placeholder:text-gray-400 resize-none text-base"
                      />
                      {errors.currentTreatments && (
                        <p className="text-red-500 text-sm mt-1">{errors.currentTreatments.message}</p>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Progress and Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 gap-4 sm:gap-0">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="h-2 w-20 sm:w-28 rounded-full bg-gray-200 transition-all duration-500" />
                        <div className="h-2 w-20 sm:w-28 rounded-full bg-udaya-sage transition-all duration-500" />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-udaya-sage hover:bg-udaya-sage/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Continue'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-12 sm:py-20 space-y-6 sm:space-y-8 animate-fadeIn px-4">
              <div className="inline-flex items-center justify-center w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-udaya-sage text-white mx-auto animate-scaleIn">
                <Check className="w-10 sm:w-14 h-10 sm:h-14" strokeWidth={3} />
              </div>
              <div className="space-y-3 sm:space-y-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-udaya-charcoal">
                  Request Received
                </h2>
                <p className="text-sm sm:text-base text-udaya-charcoal/60 max-w-lg mx-auto leading-relaxed">
                  We've received your request. Expect an email shortly to complete your consultation booking.
                </p>
              </div>
              <button
                onClick={handleModalClose}
                className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-udaya-sage hover:bg-udaya-sage/90 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 text-base animate-fadeIn"
                style={{ animationDelay: '0.4s' }}
              >
                Return Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
