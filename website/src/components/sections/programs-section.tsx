'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Calendar } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

interface ProgramsSectionProps {
  onScheduleConsultation?: () => void
}

const programs = [
  {
    title: 'Chronic Pain Program',
    description: 'A 10-day, small-cohort retreat focused on education, safe protocols, and support for people navigating cancer.',
    location: 'Thailand (final venue to be announced)',
    participants: '1 / 20',
    badge: 'Accepting Patients Now',
    image: '/uploads/chronic.jpg',
    link: '/programs/chronic-pain',
  },
  {
    title: 'Cancer Retreat',
    description: 'A 10-day, small-cohort retreat focused on education, safe protocols, and support for people navigating cancer.',
    location: 'Thailand (final venue to be announced)',
    participants: '6 / 20',
    badge: 'Accepting Patients Now',
    image: '/uploads/cancer_retreat.jpg',
    link: '/programs/cancer-retreat',
  },
  {
    title: 'Parkinson Retreat',
    description: 'A 10-day, small-cohort retreat focused on education, safe protocols, and support for people navigating cancer.',
    location: 'Thailand (final venue to be announced)',
    participants: '2 / 20',
    badge: 'Accepting Patients Now',
    image: '/uploads/parkinsons.jpg',
    link: '/programs/parkinson-retreat',
  },
]

export function ProgramsSection({ onScheduleConsultation }: ProgramsSectionProps = {}) {
  return (
    <Section variant="cream" className="py-12 sm:py-16 md:py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14 animate-fade-up px-4">
          <h2 className="font-serif font-bold text-udaya-charcoal mb-4 sm:mb-5 text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] tracking-tight">
            Programs
          </h2>
          <p className="text-[15px] sm:text-base md:text-[17px] text-udaya-charcoal/70 max-w-3xl mx-auto leading-[1.65] font-normal">
            At Udaya, we offer several medical cannabis retreats in Thailand, each carefully designed to support individuals seeking holistic relief, guided wellness, and evidence-informed care.
          </p>
        </div>

        {/* Program Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-10 animate-fade-up animation-delay-200 px-4 sm:px-0">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Content */}
              <div className="p-6 pb-5">
                <h3 className="font-serif text-xl sm:text-[22px] font-semibold text-udaya-charcoal mb-4 leading-tight tracking-tight">
                  {program.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-udaya-charcoal/65 leading-relaxed font-normal">
                  {program.description}
                </p>
              </div>

              {/* Details */}
              <div className="px-6 pb-5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 text-xs text-udaya-charcoal/60">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span>Location: {program.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-udaya-charcoal/60">
                    <Users className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Participant: {program.participants}</span>
                  </div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-udaya-sage/10 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-udaya-sage" />
                    <span className="text-xs text-udaya-sage font-medium">{program.badge}</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-b-2xl">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fade-up animation-delay-500 px-4">
          <button
            onClick={onScheduleConsultation}
            className="group inline-flex items-center justify-center gap-2 bg-udaya-sage hover:bg-udaya-sage/90 text-white px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-medium transition-all duration-300 hover:shadow-xl text-[15px] sm:text-base"
          >
            Book Consultation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Container>
    </Section>
  )
}
