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
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-up px-4">
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-3 sm:mb-4">
            Programs
          </h2>
          <p className="text-body text-udaya-charcoal/70 max-w-3xl mx-auto">
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
                <h3 className="font-serif text-[22px] font-semibold text-udaya-charcoal mb-4 leading-tight">
                  {program.title}
                </h3>
                <p className="text-[13px] text-udaya-charcoal/70 leading-relaxed">
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
            className="inline-block bg-udaya-sage hover:bg-udaya-sage/90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            Book Consultation
          </button>
        </div>
      </Container>
    </Section>
  )
}
