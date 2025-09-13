import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Leaf, Brain, Heart, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Udaya Method™',
  description: 'An integrated framework for healing the whole person through medical cannabis, mindfulness, nutrition, and community.',
}

const methodPillars = [
  {
    icon: Leaf,
    title: 'Pillar 1 — Prescription Cannabinoid Care',
    subtitle: 'Our approach to plant medicine is medical, precise, and personalized.',
    includes: [
      'Comprehensive consultation on arrival; review of medications and goals',
      'Personalized plan using physician-prescribed cannabinoid medicines (e.g., FECO/RSO and other formulations when appropriate)',
      'Daily nurse rounds, symptom tracking, and dose titration',
      'Education on timing, interactions, and at-home continuation (where lawful)'
    ]
  },
  {
    icon: Brain,
    title: 'Pillar 2 — Mindfulness & Meaning-Centered Support',
    subtitle: 'A diagnosis can bring our deepest fears to the surface. We create a safe space to meet them.',
    includes: [
      'Trauma-sensitive meditation and breathwork',
      'Optional one-on-one counseling',
      'Gentle practices (e.g., Yoga Nidra, sound rest, massage)'
    ]
  },
  {
    icon: Heart,
    title: 'Pillar 3 — Metabolic & Body Nourishment',
    subtitle: 'We believe food is medicine, and rest is revolutionary.',
    includes: [
      'Organic, anti-inflammatory menus; therapeutic diets accommodated',
      'Doctor-supervised gentle fasting/refeeding for eligible guests',
      'Hydration/rest protocols; digestive support and sleep hygiene'
    ]
  },
  {
    icon: Users,
    title: 'Pillar 4 — Community & Sanctuary (Udaya Circle™)',
    subtitle: 'Healing rarely happens in isolation. It takes a village...stronger together...',
    includes: [
      'Small cohorts; facilitated sharing circles',
      'Caregiver programming and skills for communication and resilience',
      'Post-retreat: monthly small-group calls, resources, referrals'
    ]
  }
]

const whoThisServes = [
  'Live with cancer, chronic pain, neurological conditions (e.g., Parkinson\'s), or autoimmune disorders',
  'Seek evidence-informed cannabis medicine in a legal, supervised setting',
  'Want to address not only symptoms, but the fear, isolation, and existential weight of serious illness',
  'Are ready to complement conventional care with integrative practices',
  'Value community with others walking similar paths',
  'Need caregivers to be supported and included'
]

export default function MethodPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-24 bg-gradient-to-b from-udaya-cream to-white text-center">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              The Udaya Method™
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              An integrated path to peace, born from over 10 years of helping people navigate the complexities of serious illness. The Udaya Method™ addresses body, mind, and spirit with care that is both precise and profoundly humane.
            </p>
          </div>
        </Container>
      </Section>

      {/* Method Pillars Section */}
      <Section className="py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">A Four-Pillar Framework for Wholeness</h2>
            <p className="text-body text-udaya-charcoal/80 mt-4">
              Our method is a comprehensive, evidence-informed system of care designed to support every aspect of your being.
            </p>
          </div>
          <div className="space-y-20">
            {methodPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isReversed = index % 2 !== 0;
              return (
                <div key={index} className={`grid gap-12 lg:grid-cols-12 items-center`}>
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-last' : ''}`}>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-udaya-sage/10 rounded-full transform-gpu transition-transform hover:scale-105"></div>
                      <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-udaya-sage text-white mx-auto mb-6">
                        <Icon className="h-12 w-12" />
                      </div>
                    </div>
                    <h3 className="font-serif text-h3 font-bold text-udaya-charcoal text-center mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-body-lg text-udaya-charcoal/80 text-center">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <Card className="bg-white/50 shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-lg text-udaya-charcoal">What This Includes:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {pillar.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                              <CheckCircle className="h-6 w-6 text-udaya-sage mt-0.5 flex-shrink-0" />
                              <span className="text-udaya-charcoal/90">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      
      {/* Divider */}
      <div className="py-12">
        <Container>
          <div className="border-t border-udaya-sage/20 w-1/2 mx-auto"></div>
        </Container>
      </div>

      {/* Who This Serves Section */}
      <Section variant="cream" className="py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">
              Is The Udaya Method™ For You?
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mt-4">
              Our retreats are designed for individuals who:
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 bg-white rounded-xl p-10 shadow-sm">
              {whoThisServes.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-udaya-sage mt-1 flex-shrink-0" />
                  <span className="text-udaya-charcoal/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-body text-udaya-charcoal/80 mb-8">Ready to take the next step?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/retreats">Explore Upcoming Retreats</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Ask a Question</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
