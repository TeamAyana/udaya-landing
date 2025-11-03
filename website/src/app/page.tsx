import { Hero } from '@/components/sections/hero'
import { MethodOverview } from '@/components/sections/method-overview'
import { RetreatSpotlight } from '@/components/sections/retreat-spotlight'
import { TrustSection } from '@/components/sections/trust-section'
import { Testimonials } from '@/components/sections/testimonials'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionDivider } from '@/components/ui/section-divider'

export default function HomePage() {
  return (
    <>
      <Hero />
      
      {/* Enhanced Opening Section */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-udaya-cream/50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-udaya-sage/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-udaya-gold/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>

        <Container className="relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-serif text-udaya-charcoal mb-6">
              Where Healing Begins With Hope, Not Desperation
            </h2>
            <p className="text-xl text-udaya-charcoal/70 max-w-3xl mx-auto">
              Real healing happens when serious medicine meets holistic care. At Udaya, cannabis treatment protocols integrate with practices for mind and spirit. A sanctuary where medical care and human compassion create true transformation.
            </p>
          </div>

          {/* Key Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-up animation-delay-100">
              <div className="w-20 h-20 mx-auto mb-6 bg-udaya-sage/10 rounded-full flex items-center justify-center group-hover:bg-udaya-sage/20 transition-colors">
                <svg className="w-10 h-10 text-udaya-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-udaya-charcoal">Cancer Treatment</h3>
              <p className="text-udaya-charcoal/60">Beyond managing symptoms - this is active treatment. Medical cannabis combined with mindfulness and community support addresses what cancer really is: a whole-person crisis requiring whole-person medicine.</p>
            </div>

            <div className="text-center group animate-fade-up animation-delay-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-udaya-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-udaya-terracotta/20 transition-colors">
                <svg className="w-10 h-10 text-udaya-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-udaya-charcoal">Chronic Pain Resolution</h3>
              <p className="text-udaya-charcoal/60">Cannabis targets pain at its source while conventional medicine only masks symptoms. Whether it's neuropathy, fibromyalgia, arthritis, or injury - our medical protocols work with your endocannabinoid system to restore balance.</p>
            </div>

            <div className="text-center group animate-fade-up animation-delay-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-udaya-gold/10 rounded-full flex items-center justify-center group-hover:bg-udaya-gold/20 transition-colors">
                <svg className="w-10 h-10 text-udaya-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-xl mb-3 text-udaya-charcoal">Chemotherapy & Radiation Recovery</h3>
              <p className="text-udaya-charcoal/60">Your treatment shouldn't leave you unable to live. Medical Cannabis eases the harshest side effects while supporting immune function and cellular repair. Nausea vanishes, appetite returns, energy rebuilds.</p>
            </div>
          </div>

        </Container>
      </Section>

      {/* Harmonious transition to cream section */}
      <div className="relative bg-gradient-to-b from-white to-udaya-cream/40">
        <SectionDivider 
          variant="wave" 
          color="#F6F2E6"
          className="-mb-px" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-udaya-cream/20 to-transparent pointer-events-none" />
      </div>
      
      <MethodOverview />
      
      {/* Harmonious transition to white section */}
      <div className="relative bg-gradient-to-b from-udaya-cream/40 to-white">
        <SectionDivider 
          variant="lotus" 
          color="#FFFFFF"
          className="-mb-px transform rotate-180" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>
      
      <RetreatSpotlight />
      
      {/* Harmonious transition to cream section */}
      <div className="relative bg-gradient-to-b from-white to-udaya-cream/40">
        <SectionDivider 
          variant="wave" 
          color="#F6F2E6"
          className="-mb-px" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-udaya-cream/20 to-transparent pointer-events-none" />
      </div>
      
      <TrustSection />
      
      {/* Harmonious transition to white section */}
      <div className="relative bg-gradient-to-b from-udaya-cream/40 to-white">
        <SectionDivider 
          variant="lotus" 
          color="#FFFFFF"
          className="-mb-px" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none" />
      </div>
      
      <Testimonials />
    </>
  )
}