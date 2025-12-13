'use client'

import * as React from 'react'
import Image from 'next/image'
import { X, ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const totalSteps = 2

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentStep(0)
      setIsSubmitted(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[979px] bg-white rounded-[32px] shadow-[0_64px_104px_0_rgba(0,0,0,0.1)] overflow-hidden animate-modalSlideUp">
        {/* Watermark Icon */}
        <div className="absolute -top-[218px] -right-[262px] w-[680px] h-[680px] opacity-[0.05] pointer-events-none">
          <Image
            src="/uploads/icon.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between px-12 pt-8 pb-4">
          {/* Step Indicator on Left */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            {currentStep > 0 && !isSubmitted && (
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-udaya-sage/10 transition-all duration-200 hover:scale-110"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-udaya-charcoal" />
              </button>
            )}

            {/* Book Consultation Badge */}
            {!isSubmitted && (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-udaya-sage" />
                <span className="text-sm text-udaya-charcoal/70 font-medium">Book Consultation</span>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-udaya-sage/10 transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-udaya-charcoal" />
          </button>
        </div>

        {/* Content */}
        <div className="relative px-12 pb-12 min-h-[550px]">
          {!isSubmitted ? (
            <div key={currentStep} className="animate-slideIn">
              {/* Step 1: Tell Us About Yourself */}
              {currentStep === 0 && (
                <div className="space-y-8">
                  <h2 className="text-5xl font-serif font-bold text-udaya-charcoal">
                    Tell Us About Yourself
                  </h2>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Phone (with country code) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                      Country of residence <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                    />
                  </div>

                  {/* Progress and Button */}
                  <div className="flex items-center justify-between pt-8">
                    <div className="flex gap-3">
                      <div className="h-2 w-28 rounded-full bg-udaya-sage transition-all duration-500" />
                      <div className="h-2 w-28 rounded-full bg-gray-200 transition-all duration-500" />
                    </div>
                    <button
                      onClick={handleNext}
                      className="px-10 py-3.5 bg-udaya-sage hover:bg-udaya-sage/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-base"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Your Medical Information */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <h2 className="text-5xl font-serif font-bold text-udaya-charcoal">
                    Your Medical Information
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                      Primary diagnosis <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                      Date of diagnosis <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., January 2024"
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 placeholder:text-gray-400 text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-udaya-charcoal mb-2">
                      Current treatments <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="e.g., chemotherapy, radiation, surgery, etc."
                      rows={4}
                      className="w-full px-5 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage/50 focus:border-udaya-sage transition-all duration-200 placeholder:text-gray-400 resize-none text-base"
                    />
                  </div>

                  {/* Progress and Button */}
                  <div className="flex items-center justify-between pt-8">
                    <div className="flex gap-3">
                      <div className="h-2 w-28 rounded-full bg-gray-200 transition-all duration-500" />
                      <div className="h-2 w-28 rounded-full bg-udaya-sage transition-all duration-500" />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="px-10 py-3.5 bg-udaya-sage hover:bg-udaya-sage/90 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-base"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Success State */
            <div className="text-center py-20 space-y-8 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-udaya-sage text-white mx-auto animate-scaleIn">
                <Check className="w-14 h-14" strokeWidth={3} />
              </div>
              <div className="space-y-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-5xl font-serif font-bold text-udaya-charcoal">
                  Request Received
                </h2>
                <p className="text-base text-udaya-charcoal/60 max-w-lg mx-auto leading-relaxed">
                  We've received your request. Expect an email shortly to complete your consultation booking.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-10 py-3.5 bg-udaya-sage hover:bg-udaya-sage/90 text-white rounded-full font-medium transition-all duration-200 hover:scale-105 text-base animate-fadeIn"
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
