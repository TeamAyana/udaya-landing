import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { SITE_CONFIG, NAVIGATION_ITEMS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-udaya-sage text-white">
      <Container>
        <div className="py-16">
          {/* Main Footer Content */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/uploads/logo footer.png" 
                  alt="Udaya" 
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-sm opacity-90">{SITE_CONFIG.tagline}</p>
            </div>

            {/* Explore Column */}
            <div>
              <h3 className="mb-4 font-semibold">Explore</h3>
              <ul className="space-y-2 text-sm">
                {NAVIGATION_ITEMS.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="opacity-75 transition-opacity hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="mb-4 font-semibold">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE_CONFIG.links.email}`}
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    {SITE_CONFIG.links.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.links.whatsapp.replace(/\D/g, '')}`}
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    WhatsApp: {SITE_CONFIG.links.whatsapp}
                  </a>
                </li>
                <li>
                  <Link
                    href="/waitlist"
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    Virtual Q&A Sessions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/disclaimer"
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    Medical Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="opacity-75 transition-opacity hover:opacity-100"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-white/20 pt-8">
            <div className="space-y-4 text-center text-sm md:text-left">
              <p className="opacity-75">
                <strong>Standards & Ethics:</strong> Udaya adheres to Thai
                regulations: prescription-based access, licensed dispensing, and
                restrictions on public use and advertising.
              </p>
              <p className="opacity-75">
                <strong>Disclaimer:</strong> Udaya provides adjunctive
                supportive care. We do not diagnose, treat, or cure disease.
                Participation is by clinical approval. If you're in crisis, seek
                emergency medical help.
              </p>
              <p className="opacity-75">
                <strong>Privacy:</strong> We safeguard your data. You may
                request deletion at any time.
              </p>
              <p className="mt-8 text-center opacity-60">
                © {currentYear} Udaya. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}