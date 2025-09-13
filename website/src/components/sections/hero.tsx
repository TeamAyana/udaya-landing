import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Placeholder */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-udaya-gold/30 via-udaya-sage/10 to-udaya-cream">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/50 z-10" />
        {/* Placeholder for hero background image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-center">
            <svg className="w-64 h-64 text-udaya-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-4 text-2xl font-light">Thai Sunrise Placeholder</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Container className="relative z-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-hero font-bold text-udaya-charcoal animate-fade-up">
            Beyond Treatment.
            <br />
            Toward Transformation.
          </h1>
          
          <p className="mt-6 text-h3 font-light text-udaya-charcoal/80 animate-fade-up animation-delay-100">
            Udaya. A New Dawn for Your Health.
          </p>
          
          <p className="mt-8 text-body-lg text-udaya-charcoal/70 animate-fade-up animation-delay-200">
            Cannabis-assisted, clinician-guided retreats
          </p>
          
          <p className="mt-4 text-sm text-udaya-charcoal/60 animate-fade-up animation-delay-300">
            A new dawn for your health begins here.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
            <Button size="lg" asChild>
              <Link href="/waitlist">
                Join the Cancer Retreat - Hua Hin Waitlist (Q2 2026)
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/method">
                Learn About Our Approach
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-udaya-sage"
        >
          <path
            d="M12 5v14m0 0l-7-7m7 7l7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}