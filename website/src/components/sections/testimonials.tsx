'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    quote:
      'I arrived afraid and exhausted. I left with less pain, better sleep, and a way to keep going.',
    author: 'A.',
    condition: 'living with metastatic breast cancer',
  },
  {
    quote:
      'The measured dosing and daily check-ins were the difference. My tremor eased, and my mind was calmer.',
    author: 'S.',
    condition: 'Parkinson\'s',
  },
  {
    quote:
      'I didn\'t expect to feel understood. The circles and staff support changed how I relate to this illness.',
    author: 'J.',
    condition: 'caregiver',
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const previousTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Quote className="mx-auto h-12 w-12 text-udaya-sage/20" />
          </div>

          <div className="mt-8">
            {/* Testimonial Content */}
            <div className="text-center min-h-[200px] flex flex-col justify-center">
              <blockquote className="text-h3 font-serif italic text-udaya-charcoal">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <p className="mt-6 text-udaya-charcoal/70">
                — {testimonials[currentIndex].author}, {testimonials[currentIndex].condition}
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      index === currentIndex
                        ? 'w-8 bg-udaya-sage'
                        : 'bg-udaya-sage/30'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-udaya-charcoal/60">
              Illustrative voices; individual experiences vary. Udaya makes no
              cure claims.
            </p>
            <div className="mt-6">
              <Button variant="outline" asChild>
                <a href="/retreats">See if our program fits your needs →</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}