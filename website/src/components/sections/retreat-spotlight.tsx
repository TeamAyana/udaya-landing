import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { RETREAT_DETAILS } from '@/lib/constants'
import { ScrollAnimation } from '@/components/ui/scroll-animation'

export function RetreatSpotlight() {
  const cancerRetreat = RETREAT_DETAILS.cancer

  return (
    <Section>
      <Container>
        <ScrollAnimation animation="fade-up">
          <div className="relative rounded-3xl bg-gradient-to-br from-white to-udaya-cream/30 p-8 md:p-12 shadow-2xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-udaya-gold/20 to-transparent rounded-full transform translate-x-32 -translate-y-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-udaya-sage/10 to-transparent rounded-full transform -translate-x-48 translate-y-48 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12 z-10">
            {/* Left Content */}
            <div>
              <ScrollAnimation animation="slide-right" delay={100}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm font-medium mb-4">
                  <span className="h-2 w-2 bg-udaya-sage rounded-full animate-pulse" />
                  Now Accepting Applications
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-right" delay={200}>
                <h2 className="font-serif text-h2 font-bold bg-gradient-to-r from-udaya-charcoal to-udaya-sage bg-clip-text text-transparent">
                  Cancer Retreat Opening Q2 2026 - Hua Hin
                </h2>
              </ScrollAnimation>
              
              <ScrollAnimation animation="slide-right" delay={300}>
                <p className="mt-6 text-body-lg text-udaya-charcoal/80">
                  The retreat focuses on comprehensive cancer care. Join an
                  intimate group of others navigating cancer for 10 transformative
                  days of medical cannabis therapy, community support, and
                  renewal.
                </p>
              </ScrollAnimation>

              {/* Retreat Details */}
              <ScrollAnimation animation="fade-up" delay={400}>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full bg-udaya-sage/10 flex items-center justify-center group-hover:bg-udaya-sage/20 transition-colors">
                      <Calendar className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <span className="text-udaya-charcoal font-medium">
                      {cancerRetreat.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full bg-udaya-sage/10 flex items-center justify-center group-hover:bg-udaya-sage/20 transition-colors">
                      <MapPin className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <span className="text-udaya-charcoal font-medium">
                      {cancerRetreat.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full bg-udaya-sage/10 flex items-center justify-center group-hover:bg-udaya-sage/20 transition-colors">
                      <Clock className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <span className="text-udaya-charcoal font-medium">
                      {cancerRetreat.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 rounded-full bg-udaya-sage/10 flex items-center justify-center group-hover:bg-udaya-sage/20 transition-colors">
                      <Users className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <span className="text-udaya-charcoal font-medium">
                      Limited to {cancerRetreat.capacity} participants
                    </span>
                  </div>
                </div>
              </ScrollAnimation>

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

            {/* Right Image */}
            <ScrollAnimation animation="scale" delay={300}>
              <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl shadow-xl">
                <Image 
                  src="/uploads/cancer_retreat.jpg"
                  alt="Cancer Retreat - Hua Hin"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-udaya-charcoal/80 via-transparent to-transparent" />
              </div>
            </ScrollAnimation>
          </div>
          </div>
        </ScrollAnimation>
      </Container>
    </Section>
  )
}