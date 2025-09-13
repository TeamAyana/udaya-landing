import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/uploads/video.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradients for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-udaya-sage/20 via-transparent to-udaya-gold/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Lotus petals floating */}
          <div className="absolute top-20 left-10 w-20 h-20 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-up animation-delay-100">
              <path d="M50 20 C40 35, 35 50, 50 65 C65 50, 60 35, 50 20 Z" fill="#D9A441" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute top-40 right-20 w-16 h-16 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-up animation-delay-300">
              <path d="M50 20 C40 35, 35 50, 50 65 C65 50, 60 35, 50 20 Z" fill="#5C7B65" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 opacity-15">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-up animation-delay-200">
              <path d="M50 20 C40 35, 35 50, 50 65 C65 50, 60 35, 50 20 Z" fill="#D9A441" opacity="0.3" />
            </svg>
          </div>
        </div>
        
        {/* Radial glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-udaya-sage/10 blur-3xl animate-glow" />
      </div>

      {/* Content */}
      <Container className="relative z-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 animate-fade-up">
            <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-udaya-sage/80 backdrop-blur-sm rounded-full">
              Thailand's Premier Medical Cannabis Retreat
            </span>
          </div>
          
          <h1 className="font-serif text-hero font-bold animate-fade-up animation-delay-100">
            <span className="text-white drop-shadow-2xl">
              Beyond Treatment.
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">
              Toward Transformation.
            </span>
          </h1>
          
          <p className="mt-6 text-h3 font-light text-white drop-shadow-lg animate-fade-up animation-delay-200">
            <span className="font-display">Udaya</span>. A New Dawn for Your Health.
          </p>
          
          <div className="mt-8 space-y-2 animate-fade-up animation-delay-300">
            <p className="text-body-lg text-white/90 drop-shadow-lg">
              Cannabis-assisted, clinician-guided retreats
            </p>
            <p className="text-sm text-white/80 drop-shadow-lg">
              จุดเริ่มต้นใหม่ของสุขภาพ • A new beginning for wellness
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
            <Button size="lg" asChild className="bg-udaya-sage hover:bg-udaya-sage/90 text-white shadow-2xl">
              <Link href="/waitlist">
                Join the Cancer Retreat - Hua Hin Waitlist (Q2 2026)
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30 shadow-2xl">
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
          className="text-white drop-shadow-lg"
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