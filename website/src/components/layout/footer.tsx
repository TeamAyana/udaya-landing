'use client'

import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
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
        <div className="py-12">
          {/* Brand Section */}
          <div className="text-center mb-12">
            <img 
              src="/uploads/logo_mid.png" 
              alt="Udaya" 
              className="h-28 w-28 mx-auto rounded-lg object-contain"
            />
          </div>

          {/* Main Footer Content */}
          <div className="grid gap-10 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Navigation Links */}
            <div className="text-center md:text-left">
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

            {/* Contact Information */}
            <div className="text-center">
              <h3 className="mb-4 font-serif text-base text-white/90">Connect With Us</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.links.email}`}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {SITE_CONFIG.links.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.links.whatsapp.replace(/\D/g, '')}`}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                  >
                    WhatsApp: {SITE_CONFIG.links.whatsapp}
                  </a>
                </li>
                <li className="pt-3">
                  <Link
                    href="/waitlist"
                    className="inline-block px-5 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors duration-200"
                  >
                    Join Our Waitlist
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="text-center md:text-right">
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
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center text-xs text-white/60">
                <div>
                  <h4 className="font-semibold text-white/70 mb-2">Standards & Ethics</h4>
                  <p>
                    Udaya adheres to Thai regulations: prescription-based access, 
                    licensed dispensing, and restrictions on public use and advertising.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/70 mb-2">Medical Disclaimer</h4>
                  <p>
                    Udaya provides adjunctive supportive care. We do not diagnose, 
                    treat, or cure disease. Participation is by clinical approval.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/70 mb-2">Your Privacy</h4>
                  <p>
                    We safeguard your data with the highest standards. 
                    You may request deletion at any time.
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