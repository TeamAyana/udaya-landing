import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Users, Shield, Activity, BookOpen, HeartHandshake, CheckCircle, Calendar } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'For Clinicians',
  description: 'Refer patients to Udaya\'s medical cannabis retreats. Learn about our clinical protocols and referral process.',
}

const whyRefer = [
  {
    icon: Shield,
    title: 'Medical Supervision',
    description: '24/7 physician and nursing coverage with experience in complex cases'
  },
  {
    icon: FileText,
    title: 'Legal & Compliant',
    description: 'Full adherence to Thai medical cannabis regulations'
  },
  {
    icon: Activity,
    title: 'Continuity of Care',
    description: 'Regular updates and coordination with home medical teams'
  },
  {
    icon: BookOpen,
    title: 'Evidence-Based Protocols',
    description: 'Published research guides our cannabinoid applications'
  },
  {
    icon: HeartHandshake,
    title: 'Comprehensive Support',
    description: 'Beyond medicine: nutrition, mindfulness, community, integration'
  }
]

const conditionsServed = {
  current: [
    'All cancer types and stages'
  ],
  future: [
    'Parkinson\'s disease',
    'Multiple sclerosis',
    'Chronic pain syndromes',
    'PTSD',
    'Inflammatory bowel disease',
    'Autoimmune conditions'
  ]
}

const referralProcess = [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'Review patient suitability and medical history'
  },
  {
    step: 2,
    title: 'Coordination',
    description: 'Align retreat timing with treatment schedules'
  },
  {
    step: 3,
    title: 'Regular Updates',
    description: 'Progress reports during retreat'
  },
  {
    step: 4,
    title: 'Transition Planning',
    description: 'Comprehensive handoff with continuing care recommendations'
  },
  {
    step: 5,
    title: 'Follow-up Support',
    description: '6-month integration includes coordination with home team'
  }
]

const whatWeNeed = [
  'Diagnosis and staging information',
  'Current treatment plan',
  'Medication list',
  'Travel clearance',
  'Specific goals or concerns'
]

export default function CliniciansPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Refer a Patient
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              If a patient may benefit from structured, prescription-based cannabinoid care 
              with wrap-around support, we welcome your referral. We share intake forms, 
              medication lists, and post-retreat summaries to keep you informed. We respect 
              your plan of care.
            </p>
          </div>
        </Container>
      </Section>

      {/* Why Refer to Udaya */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            Why Refer to Udaya?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyRefer.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="h-12 w-12 bg-udaya-sage/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-udaya-sage" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Conditions We Serve */}
      <Section variant="cream">
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            Conditions We Serve
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Currently accepting (Q2 2026)
                  <span className="h-2 w-2 bg-udaya-sage rounded-full animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conditionsServed.current.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Future programs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conditionsServed.future.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full border-2 border-udaya-sage/30 mt-0.5 flex-shrink-0" />
                      <span className="text-udaya-charcoal/70">{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Our Process */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            Our Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {referralProcess.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-udaya-sage text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-udaya-charcoal/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* What We Need From You */}
      <Section variant="cream">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              What We Need From You
            </h2>
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-3">
                  {whatWeNeed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-udaya-charcoal/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Ready to Refer a Patient?
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              We're here to answer your questions and support your patients' journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Request Clinician Pack
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Consultation
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-udaya-charcoal/60">
              Direct clinical inquiries: <a href={`mailto:${SITE_CONFIG.links.cliniciansEmail}`} className="text-udaya-sage hover:underline">{SITE_CONFIG.links.cliniciansEmail}</a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}