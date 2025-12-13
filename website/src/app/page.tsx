'use client'

import * as React from 'react'
import Image from 'next/image'
import { Hero } from '@/components/sections/hero'
import { MethodOverview } from '@/components/sections/method-overview'
import { RetreatSpotlight } from '@/components/sections/retreat-spotlight'
import { TrustSection } from '@/components/sections/trust-section'
import { Testimonials } from '@/components/sections/testimonials'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'
import { InquiryModal } from '@/components/ui/inquiry-modal'

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <Hero />
      
      {/* You Don't Have to Go Through This Alone Section */}
      <Section className="relative overflow-hidden bg-udaya-cream">
        <Container className="relative z-10">
          {/* Top Section - You Don't Have to Go Through This Alone */}
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start mb-24 animate-fade-up">
            <div>
              <h2 className="font-serif font-bold text-udaya-charcoal mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 45.45px)', lineHeight: '51.43px' }}>
                You Don't Have to Go Through This Alone
              </h2>
              <p className="text-body-lg text-udaya-charcoal/80 mb-8 leading-relaxed">
                Cancer, chronic pain, and serious illness can leave you tired, scared, and unsure of what comes next. It's more than just symptoms, it's the weight on your mind, your body, and your spirit. There is support that brings relief, steadiness, and genuine care. A path that eases pain, softens treatment side effects, and helps you feel like yourself again.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-udaya-sage hover:bg-udaya-sage/90 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Take the next step
              </button>
            </div>
            <div className="flex justify-center -mt-8 md:-mt-12 lg:-mt-16">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[475px] lg:h-[475px]">
                <Image
                  src="/uploads/icon.png"
                  alt="Lotus flower icon"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 475px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section - Care You Can Trust */}
          <div className="text-center mb-12 animate-fade-up animation-delay-200">
            <h2 className="text-h2 font-serif font-bold text-udaya-charcoal mb-4">
              Care You Can Trust, Support You Can Feel
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 max-w-4xl mx-auto">
              When you're facing something this heavy, you deserve a place that holds you with both compassion and professionalism. Every part of your experience is designed to keep you safe, supported, and truly seen.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="mt-16 grid gap-8 md:grid-cols-3 animate-fade-up animation-delay-300">
            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-udaya-sage text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-udaya-charcoal mb-2">Medically Supervised</h3>
              <p className="text-sm text-udaya-charcoal/70">
                Licensed practitioners guide your care, with a nurse present throughout your stay to ensure comfort and safety.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-udaya-sage text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-udaya-charcoal mb-2">Legally Compliant</h3>
              <p className="text-sm text-udaya-charcoal/70">
                All treatments follow Thailand's medical cannabis regulations, with prescriptions and protocols you can rely on.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-udaya-sage text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-udaya-charcoal mb-2">Deeply Compassionate</h3>
              <p className="text-sm text-udaya-charcoal/70">
                Small groups no more than 20 people so you receive the attention, presence, and understanding you deserve.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Harmonious transition to cream section */}
      <div className="relative bg-gradient-to-b from-white to-udaya-cream/40">
        <SectionDivider 
          variant="wave" 
          color="#F6F2E6"
          className="-mb-px" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-udaya-cream/20 to-transparent pointer-events-none" />
      </div>
      
      <MethodOverview />
      
      {/* Harmonious transition to white section */}
      <div className="relative bg-gradient-to-b from-udaya-cream/40 to-white">
        <SectionDivider 
          variant="lotus" 
          color="#FFFFFF"
          className="-mb-px transform rotate-180" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>
      
      <RetreatSpotlight />
      
      {/* Harmonious transition to cream section */}
      <div className="relative bg-gradient-to-b from-white to-udaya-cream/40">
        <SectionDivider 
          variant="wave" 
          color="#F6F2E6"
          className="-mb-px" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-udaya-cream/20 to-transparent pointer-events-none" />
      </div>
      
      <TrustSection />
      
      {/* Harmonious transition to white section */}
      <div className="relative bg-gradient-to-b from-udaya-cream/40 to-white">
        <SectionDivider 
          variant="lotus" 
          color="#FFFFFF"
          className="-mb-px" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>
      
      <Testimonials />

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}