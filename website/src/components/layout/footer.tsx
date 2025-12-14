'use client'

import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SITE_CONFIG } from '@/lib/constants'

interface FooterProps {
  onJoinWaitlist?: () => void
}

export function Footer({ onJoinWaitlist }: FooterProps = {}) {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-udaya-sage to-udaya-sage/95 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl transform -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-udaya-gold/20 rounded-full blur-3xl transform translate-x-48 translate-y-48" />
      </div>
      
      <Container className="relative z-10">
        <div className="pt-24 pb-12">
          {/* Main Footer Content */}
          <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Navigation Links */}
            <div className="text-center md:text-left order-2 md:order-1">
              <h3 className="mb-4 font-serif text-base text-white/90">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Center Column - Logo and Contact */}
            <div className="text-center flex flex-col items-center order-1 md:order-2">
              <Link href="/" aria-label="Go to homepage" className="md:-mt-12 mb-3">
                <img
                  src="/uploads/logo_mid.png"
                  alt="Udaya"
                  className="h-24 w-24 mx-auto rounded-lg object-contain hover:opacity-90 transition-opacity cursor-pointer"
                />
              </Link>
              <h3 className="mb-4 font-serif text-base text-white/90">Connect With Us</h3>
              <button
                onClick={onJoinWaitlist}
                className="px-5 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors duration-200"
              >
                Join Our Waitlist
              </button>
            </div>

            {/* Legal Links */}
            <div className="text-center md:text-right order-3">
              <h3 className="mb-4 font-serif text-base text-white/90">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/disclaimer"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Medical Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section with Legal Text */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center text-xs text-white/60">
                <div>
                  <h4 className="font-semibold text-white/70 mb-2">Standards & Ethics</h4>
                  <p>
                    Udaya operates under Thai regulations, following prescription-based access,
                    licensed dispensing practices, and compliance with public use and advertising laws.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/70 mb-2">Medical Disclaimer</h4>
                  <p>
                    We provide education and support for the therapeutic use of medical cannabis.
                    We are not a hospital or primary care facility. Individual responses vary;
                    medical cannabis complements conventional care.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/70 mb-2">Your Privacy</h4>
                  <p>
                    We protect your personal information with industry-leading security standards.
                    You may request data deletion at any time.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center relative">
                <p className="text-xs text-white/40">
                  © {currentYear} Udaya. All rights reserved.
                </p>
                <button
                  onClick={scrollToTop}
                  className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  aria-label="Go to top"
                >
                  <ChevronUp className="h-5 w-5 text-white/70" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}