import { Hero } from '@/components/sections/hero'
import { MethodOverview } from '@/components/sections/method-overview'
import { RetreatSpotlight } from '@/components/sections/retreat-spotlight'
import { TrustSection } from '@/components/sections/trust-section'
import { Testimonials } from '@/components/sections/testimonials'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Opening Paragraph */}
      <Section>
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-body-lg text-udaya-charcoal/80">
              Discover Thailand's premier medical cannabis retreat for those
              navigating cancer, chronic pain, and serious illness—where
              prescription-grade plant medicine, thoughtful traditions, and
              modern clinical care meet.
            </p>
          </div>
        </Container>
      </Section>

      <MethodOverview />
      <RetreatSpotlight />
      <TrustSection />
      <Testimonials />
    </>
  )
}