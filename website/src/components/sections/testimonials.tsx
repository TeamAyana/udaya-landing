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
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-play effect
  React.useEffect(() => {
    if (!isAutoPlaying || !mounted) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => setIsAnimating(false), 50)
      }, 300)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, mounted])

  const goToTestimonial = (index: number) => {
    if (index === currentIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setTimeout(() => setIsAnimating(false), 50)
    }, 300)
  }

  const nextTestimonial = () => {
    setIsAutoPlaying(false)
    goToTestimonial((currentIndex + 1) % testimonials.length)
  }

  const previousTestimonial = () => {
    setIsAutoPlaying(false)
    goToTestimonial(
      (currentIndex - 1 + testimonials.length) % testimonials.length
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
            <div className="relative overflow-hidden">
              <div 
                className={cn(
                  "text-center min-h-[200px] flex flex-col justify-center transition-all duration-300",
                  isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                )}
              >
                <blockquote className="text-h3 font-serif italic text-udaya-charcoal">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <p className="mt-6 text-udaya-charcoal/70">
                  — {testimonials[currentIndex].author}, {testimonials[currentIndex].condition}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousTestimonial}
                aria-label="Previous testimonial"
                className="hover:bg-udaya-sage/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots with progress indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false)
                      goToTestimonial(index)
                    }}
                    className={cn(
                      'relative h-2 overflow-hidden rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'w-12 bg-udaya-sage/20'
                        : 'w-2 bg-udaya-sage/20 hover:bg-udaya-sage/30'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    {index === currentIndex && (
                      <div 
                        className={cn(
                          "absolute inset-0 bg-udaya-sage rounded-full",
                          isAutoPlaying ? "animate-[progress_5s_linear_infinite]" : "w-full"
                        )}
                        style={{
                          animationDelay: '0ms',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="hover:bg-udaya-sage/10"
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
                <a href="/inquiry">Get More Information</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}