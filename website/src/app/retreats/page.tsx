import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { PlaceholderImage } from '@/components/ui/placeholder-image'

export const metadata: Metadata = {
  title: 'Retreats',
  description: 'Medical cannabis retreats in Thailand for cancer, chronic pain, and serious illness.',
}

const futurePrograms = [
  {
    title: "Parkinson's & Movement Disorders",
    description: "Specialized protocols for tremor, rigidity, and quality of life",
    timeframe: "2026-2027"
  },
  {
    title: "Chronic Pain Conditions",
    description: "Comprehensive approaches to persistent pain syndromes",
    timeframe: "2026-2027"
  },
  {
    title: "Autoimmune & Inflammatory Conditions",
    description: "Targeted support for systemic inflammation and immune dysregulation",
    timeframe: "2026-2027"
  }
]

const whyRetreatBasedCare = [
  {
    title: "Immersion Matters",
    description: "Stepping away from daily stressors allows deep healing to begin."
  },
  {
    title: "Medical Supervision",
    description: "24/7 monitoring ensures safe, optimal cannabis dosing."
  },
  {
    title: "Community Healing",
    description: "Shared experience with others who understand your journey."
  },
  {
    title: "Skill Building",
    description: "Learn practices you can continue at home for lasting benefit."
  }
]

export default function RetreatsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Udaya Retreats™ — Where Healing Happens
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              Each Udaya retreat is carefully designed for a variety of health conditions, 
              ensuring you receive the most relevant care and community. All programs include 
              the full Udaya Method™ adapted to your unique needs.
            </p>
          </div>
        </Container>
      </Section>

      {/* Current Offerings */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            Current Offerings
          </h2>
          
          {/* Cancer Retreat Card */}
          <Card className="overflow-hidden max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm font-medium mb-4">
                  <span className="h-2 w-2 bg-udaya-sage rounded-full animate-pulse" />
                  Now Open for Waitlist
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-h3 font-serif">
                    Cancer Retreat - Hua Hin, Q2 2026
                  </CardTitle>
                  <CardDescription className="text-body-lg mt-4">
                    Our inaugural program focuses exclusively on comprehensive cancer care. 
                    This 10-day retreat welcomes those with all types and stages of cancer.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                  <h4 className="font-semibold mb-4">Highlights:</h4>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Specialized cannabis protocols for various types of cancer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Oncology-experienced medical team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Cancer-specific support groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Flexible extension options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Limited to 20 participants</span>
                    </li>
                  </ul>
                  <p className="text-2xl font-serif font-bold text-udaya-sage mb-6">
                    Investment: $12,000 USD
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link href="/retreats/cancer-retreat">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/waitlist">Join Cancer Waitlist</Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
              <div className="relative bg-gradient-to-br from-udaya-gold/20 via-udaya-sage/10 to-udaya-cream p-12 flex items-center justify-center">
                <div className="text-center text-udaya-sage/30">
                  <svg className="w-32 h-32 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm">Hua Hin Retreat Center</p>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Future Programs */}
      <Section variant="cream">
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-4">
            Future Programs
          </h2>
          <p className="text-body-lg text-udaya-charcoal/80 text-center mb-12 max-w-3xl mx-auto">
            Coming 2026-2027:
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {futurePrograms.map((program, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <div className="text-sm text-udaya-sage font-medium">{program.timeframe}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{program.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/waitlist">Join General Waitlist for Updates</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Why Retreat-Based Care */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            Why Retreat-Based Care?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyRetreatBasedCare.map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-udaya-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-udaya-sage">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-udaya-charcoal/70">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}