'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Script from 'next/script'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement | null
        prefill?: Record<string, any>
        utm?: Record<string, any>
      }) => void
    }
  }
}

export default function SchedulePage() {
  useEffect(() => {
    // Initialize Calendly widget when component mounts
    const initializeCalendly = () => {
      if (window.Calendly && document.getElementById('calendly-embed')) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/andreyd/udaya-consultation',
          parentElement: document.getElementById('calendly-embed'),
          prefill: {},
          utm: {}
        });
      }
    }

    // Try to initialize immediately if Calendly is already loaded
    initializeCalendly()

    // Also set up a listener for when the script loads
    window.addEventListener('load', initializeCalendly)

    return () => {
      window.removeEventListener('load', initializeCalendly)
    }
  }, [])

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize Calendly widget after script loads
          if (window.Calendly && document.getElementById('calendly-embed')) {
            window.Calendly.initInlineWidget({
              url: 'https://calendly.com/andreyd/udaya-consultation',
              parentElement: document.getElementById('calendly-embed'),
              prefill: {},
              utm: {}
            });
          }
        }}
      />

      <Section className="pt-32 pb-12 bg-gradient-to-b from-white to-udaya-cream/20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6 text-udaya-charcoal">
            Schedule a Call
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Book a consultation to learn more about Udaya programs and
            discuss how we can support your healing journey.
          </p>
        </Container>
      </Section>

      <Section className="pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Calendly inline widget will be embedded here */}
            <div
              id="calendly-embed"
              style={{ minWidth: '320px', height: '700px' }}
              className="rounded-lg overflow-hidden shadow-lg"
            />

            {/* Fallback content */}
            <noscript>
              <div className="text-center text-gray-600 p-8">
                <p>
                  Please enable JavaScript to view the scheduling calendar, or{' '}
                  <a href="mailto:team@udaya.one" className="text-udaya-sage underline">
                    email us directly
                  </a>
                  .
                </p>
              </div>
            </noscript>

            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                Having trouble? You can also reach us at{' '}
                <a href="mailto:team@udaya.one" className="text-udaya-sage underline">
                  team@udaya.one
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}