import Link from 'next/link'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { RETREAT_DETAILS } from '@/lib/constants'

export function RetreatSpotlight() {
  const cancerRetreat = RETREAT_DETAILS.cancer

  return (
    <Section>
      <Container>
        <div className="rounded-2xl bg-gradient-to-br from-udaya-sage/5 to-udaya-cream/50 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div>
              <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">
                Cancer Retreat Opening Q2 2026 - Hua Hin
              </h2>
              <p className="mt-6 text-body-lg text-udaya-charcoal/80">
                The retreat focuses on comprehensive cancer care. Join an
                intimate group of others navigating cancer for 10 transformative
                days of medical cannabis therapy, community support, and
                renewal.
              </p>

              {/* Retreat Details */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-udaya-sage" />
                  <span className="text-udaya-charcoal">
                    {cancerRetreat.date}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-udaya-sage" />
                  <span className="text-udaya-charcoal">
                    {cancerRetreat.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-udaya-sage" />
                  <span className="text-udaya-charcoal">
                    {cancerRetreat.duration}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-udaya-sage" />
                  <span className="text-udaya-charcoal">
                    Limited to {cancerRetreat.capacity} participants
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link href="/retreats/cancer-retreat">
                    Explore the Cancer Retreat
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/waitlist">Join the Waitlist</Link>
                </Button>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="relative h-[400px] overflow-hidden rounded-xl bg-gradient-to-br from-udaya-gold/20 via-udaya-sage/10 to-udaya-cream">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-udaya-sage/30">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Meditation Space Placeholder</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-udaya-sage/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-2xl font-serif font-bold drop-shadow-lg">
                  {cancerRetreat.price}
                </p>
                <p className="text-sm opacity-90">All-inclusive program</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}