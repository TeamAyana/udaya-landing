import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Leaf, Brain, Users, CheckCircle, Clock, UserCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Udaya Method™',
  description: 'An integrated framework for whole-person healing via medical cannabis education, mindful support, and community.',
}

const methodPillars = [
  {
    icon: Leaf,
    title: 'Pillar 1 — Prescription Cannabinoid Care',
    subtitle: 'Education and application through physician-guided medical cannabis protocols.',
    includes: [
      'Personalized dosing protocols using full-extract oils (FECO/RSO) and other formulations',
      'Understanding the endocannabinoid system (ECS) and how it supports healing',
      'Daily morning 1:1 check-ins with practitioners during the retreat',
      'Education on timing, interactions, and safe use',
      'Support for at-home continuation where lawful'
    ]
  },
  {
    icon: Brain,
    title: 'Pillar 2 — Mindfulness & Meaning-Centered Support',
    subtitle: 'Meeting uncertainty and fear through presence, breath, and shared meaning.',
    includes: [
      'Meditation and breathwork sessions 2–3 times daily',
      'Evening Yoga Nidra for deep rest and nervous system regulation',
      'Group sharing circles to process experiences together',
      'Meaning-centered support for embracing existential concerns and fear of death',
      'Mindset shifts through compassionate self-inquiry'
    ]
  },
  {
    icon: Users,
    title: 'Pillar 3 — Community Sanctuary (Udaya Circle)',
    subtitle: 'Heal in company. Small cohorts and lasting connections.',
    includes: [
      'Small retreat cohorts (20 participants or fewer) for intimate support',
      'Facilitated sharing circles during the retreat',
      'Post-retreat weekly check-ins to support integration',
      'Help sourcing medicine legally at home after the retreat',
      'Lifetime access to the Udaya Circle community'
    ]
  }
]

const whoThisServes = [
  'Live with cancer, chronic pain, neurological conditions (e.g., Parkinson\'s), or autoimmune disorders',
  'Seek evidence-informed medical cannabis in a legal, supervised setting',
  'Want to address not only symptoms, but the fear, isolation, and existential weight of serious illness',
  'Are ready to complement conventional care with integrative practices',
  'Value healing in community with others walking similar paths',
  'Want their caregivers to be supported and included in the journey'
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
              The Udaya Method is an integrated framework for whole-person healing via medical cannabis education, mindful support, and community.
            </p>
          </div>
        </Container>
      </Section>

      {/* Method Pillars Section */}
      <Section className="py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">A Three-Pillar Framework for Wholeness</h2>
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

      {/* Daily Structure Section */}
      <Section className="py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center mb-12">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">
              Your Day at Udaya
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mt-4">
              Each day is designed to balance personalized care, group connection, and deep learning.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="bg-udaya-cream/30 border-udaya-sage/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <UserCheck className="h-8 w-8 text-udaya-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-h4 font-bold text-udaya-charcoal mb-2">
                      Morning: 1:1 Consultations
                    </h3>
                    <p className="text-body text-udaya-charcoal/80">
                      Each morning begins with a personal check-in with your practitioner to review how you're feeling, adjust dosing, and address any questions or concerns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-udaya-cream/30 border-udaya-sage/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Clock className="h-8 w-8 text-udaya-sage" />
                  </div>
                  <div>
                    <h3 className="font-serif text-h4 font-bold text-udaya-charcoal mb-2">
                      Evening: Education Workshops
                    </h3>
                    <p className="text-body text-udaya-charcoal/80">
                      Evenings include 1–2 hour education sessions covering the endocannabinoid system, dosing strategies, symptom management, and how to continue your protocol at home.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 max-w-3xl mx-auto bg-udaya-sage/10 border border-udaya-sage/20 rounded-lg p-6">
            <p className="text-body text-udaya-charcoal/90 text-center">
              <strong>Our Commitment:</strong> All retreats are designed for cohorts of 20 participants or fewer, with a registered nurse on staff to ensure your safety and comfort.
            </p>
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
                <Link href="/programs">Explore Our Programs</Link>
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
