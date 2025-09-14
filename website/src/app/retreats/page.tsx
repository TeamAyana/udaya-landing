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
              <div className="relative h-full min-h-[400px] overflow-hidden">
                <img 
                  src="/uploads/retreat_center.jpg"
                  alt="Hua Hin Retreat Center"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-udaya-charcoal/60 via-transparent to-transparent" />
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Future Programs */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-udaya-cream via-white to-udaya-sage/5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-udaya-gold/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-udaya-sage/10 to-transparent rounded-full blur-3xl" />
        
        <Container className="relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-udaya-sage/10 rounded-full mb-6">
              <Calendar className="w-8 h-8 text-udaya-sage" />
            </div>
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
              Future Programs
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 max-w-3xl mx-auto">
              Coming 2026-2027:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {futurePrograms.map((program, index) => (
              <div
                key={index}
                className="group relative transform transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full border-2 border-transparent hover:border-udaya-sage/30 transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="relative">
                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-udaya-sage text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl pt-4">{program.title}</CardTitle>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-udaya-gold/10 text-udaya-gold rounded-full text-sm font-medium mt-2">
                      <Clock className="w-3 h-3" />
                      {program.timeframe}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{program.description}</CardDescription>
                    <div className="mt-4 text-udaya-sage text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-udaya-sage/20 blur-xl rounded-full" />
              <Button 
                variant="outline" 
                size="lg"
                className="relative bg-white hover:bg-udaya-sage hover:text-white hover:border-udaya-sage transition-all duration-300"
                asChild
              >
                <Link href="/waitlist">
                  Join General Waitlist for Updates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
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