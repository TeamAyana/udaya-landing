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
        
        {/* Floating Elements - Hidden on small screens */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          {/* Lotus petals floating */}
          <div className="absolute top-20 left-10 w-16 sm:w-20 h-16 sm:h-20 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-up animation-delay-100">
              <path d="M50 20 C40 35, 35 50, 50 65 C65 50, 60 35, 50 20 Z" fill="#D9A441" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute top-40 right-20 w-12 sm:w-16 h-12 sm:h-16 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-up animation-delay-300">
              <path d="M50 20 C40 35, 35 50, 50 65 C65 50, 60 35, 50 20 Z" fill="#5C7B65" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute bottom-40 left-1/4 w-20 sm:w-24 h-20 sm:h-24 opacity-15">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-float-up animation-delay-200">
              <path d="M50 20 C40 35, 35 50, 50 65 C65 50, 60 35, 50 20 Z" fill="#D9A441" opacity="0.3" />
            </svg>
          </div>
        </div>
        
        {/* Radial glow effect - Smaller on mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-udaya-sage/10 blur-3xl animate-glow" />
      </div>

      {/* Content */}
      <Container className="relative z-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo at the top */}
          <div className="mb-4 md:mb-6 animate-hero-scale-in">
            <img 
              src="/uploads/logo_mid.png" 
              alt="Udaya Logo" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto object-contain drop-shadow-2xl animate-breathing"
            />
          </div>
          
          {/* Tagline after logo */}
          <p className="mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-light text-white/90 drop-shadow-lg animate-hero-slide-up animation-delay-200 px-4">
            A New Dawn for Your Health
          </p>
          
          <div className="mb-4 md:mb-6 animate-hero-slide-up animation-delay-300">
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 text-xs sm:text-sm font-medium text-white bg-udaya-sage/80 backdrop-blur-sm rounded-full">
              Thailand's Premier Medical Cannabis Retreat
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
            <span className="text-white drop-shadow-2xl block animate-hero-slide-up animation-delay-400">
              Beyond Treatment.
            </span>
            <span className="text-white drop-shadow-2xl block animate-hero-slide-up animation-delay-500">
              Toward Transformation.
            </span>
          </h1>
          
          <div className="space-y-2 mb-8 md:mb-0">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-lg animate-hero-fade-in animation-delay-600 px-4">
              Cannabis-assisted, clinician-guided retreats
            </p>
            <p className="text-xs sm:text-sm text-white/80 drop-shadow-lg animate-hero-fade-in animation-delay-2000 px-4">
              จุดเริ่มต้นใหม่ของสุขภาพ • A new beginning for wellness
            </p>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-float-in animation-delay-2000 px-4 sm:px-0">
            <Button size="lg" asChild className="bg-udaya-sage hover:bg-udaya-sage/90 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 text-sm sm:text-base">
              <Link href="/waitlist">
                <span className="block sm:hidden">Join the Cancer Retreat</span>
                <span className="hidden sm:block">Join the Cancer Retreat - Hua Hin Waitlist (Q2 2026)</span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30 shadow-2xl transform transition-all duration-300 hover:scale-105 text-sm sm:text-base">
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