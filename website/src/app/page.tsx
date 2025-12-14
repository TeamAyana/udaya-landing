'use client'

import * as React from 'react'
import Image from 'next/image'
import { Hero } from '@/components/sections/hero'
import { MethodOverview } from '@/components/sections/method-overview'
import { ProgramsSection } from '@/components/sections/programs-section'
import { Testimonials } from '@/components/sections/testimonials'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { InquiryModal } from '@/components/ui/inquiry-modal'

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Hero onBookConsultation={() => setIsModalOpen(true)} />
      
      {/* You Don't Have to Go Through This Alone Section */}
      <Section className="relative overflow-hidden bg-udaya-cream py-12 sm:py-16 md:py-20 lg:py-24">
        <Container className="relative z-10">
          {/* Top Section - You Don't Have to Go Through This Alone */}
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 sm:gap-12 md:gap-16 items-start mb-12 sm:mb-16 md:mb-20 animate-fade-up">
            <div>
              <h2 className="font-serif font-bold text-udaya-charcoal mb-4 sm:mb-6" style={{ fontSize: 'clamp(1.75rem, 5vw, 45.45px)', lineHeight: '1.2' }}>
                You Don't Have to Go Through This Alone
              </h2>
              <p className="text-body text-udaya-charcoal/80 mb-6 sm:mb-8 leading-relaxed">
                Cancer, chronic pain, and serious illness can leave you tired, scared, and unsure of what comes next. It's more than just symptoms, it's the weight on your mind, your body, and your spirit. There is support that brings relief, steadiness, and genuine care. A path that eases pain, softens treatment side effects, and helps you feel like yourself again.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-udaya-sage hover:bg-udaya-sage/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                Book Consultation
              </button>
            </div>
            <div className="flex justify-center md:justify-end -mt-4 md:-mt-12 lg:-mt-16">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] xl:w-[475px] xl:h-[475px]">
                <Image
                  src="/uploads/icon.png"
                  alt="Lotus flower icon"
                  fill
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 400px, 475px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section - Care You Can Trust */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-up animation-delay-200">
            <h2 className="text-h2 font-serif font-bold text-udaya-charcoal mb-3 sm:mb-4 px-4">
              Care You Can Trust, Support You Can Feel
            </h2>
            <p className="text-body text-udaya-charcoal/80 max-w-4xl mx-auto px-4">
              When you're facing something this heavy, you deserve a place that holds you with both compassion and professionalism. Every part of your experience is designed to keep you safe, supported, and truly seen.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="mt-8 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3 animate-fade-up animation-delay-300 px-4 sm:px-0">
            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-udaya-sage text-white">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-udaya-charcoal mb-2">Medically Supervised</h3>
              <p className="text-sm text-udaya-charcoal/70">
                Licensed practitioners guide your care, with a nurse present throughout your stay to ensure comfort and safety.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-udaya-sage text-white">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-udaya-charcoal mb-2">Legally Compliant</h3>
              <p className="text-sm text-udaya-charcoal/70">
                All treatments follow Thailand's medical cannabis regulations, with prescriptions and protocols you can rely on.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-udaya-sage text-white">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-udaya-charcoal mb-2">Deeply Compassionate</h3>
              <p className="text-sm text-udaya-charcoal/70">
                Small groups no more than 20 people so you receive the attention, presence, and understanding you deserve.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <MethodOverview />

      <ProgramsSection onScheduleConsultation={() => setIsModalOpen(true)} />

      <SectionDivider variant="wave" color="#FFFFFF" />

      <Testimonials />

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}