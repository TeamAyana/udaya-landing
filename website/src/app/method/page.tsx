import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              The Udaya Method™ — An Integrated Path to Peace
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              Born from over 10 years of dosing and helping people with the realities of serious illness, 
              the Udaya Method™ addresses body, mind, and spirit with care that is precise and humane.
            </p>
            <p className="mt-4 text-body text-udaya-charcoal/70">
              It is not just about treating the symptoms but also treating the diseases.
            </p>
          </div>
        </Container>
      </Section>

      {/* Method Pillars */}
      <Section>
        <Container>
          <div className="space-y-16">
            {methodPillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <div key={index} className="grid gap-8 lg:grid-cols-12 items-start">
                  <div className="lg:col-span-2">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-udaya-sage text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="lg:col-span-10">
                    <h2 className="font-serif text-h3 font-bold text-udaya-charcoal mb-3">
                      {pillar.title}
                    </h2>
                    <p className="text-body-lg text-udaya-charcoal/80 mb-6">
                      {pillar.subtitle}
                    </p>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">What This Includes:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {pillar.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                              <span className="text-udaya-charcoal/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Who This Serves */}
      <Section variant="cream">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              Who This Serves
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 text-center mb-8">
              Udaya serves people who:
            </p>
            <div className="bg-white rounded-lg p-8">
              <ul className="space-y-4">
                {whoThisServes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                    <span className="text-udaya-charcoal/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 text-center space-y-4">
              <Button size="lg" asChild>
                <Link href="/retreats">Explore Our Retreats</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/waitlist">Join the Waitlist</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}