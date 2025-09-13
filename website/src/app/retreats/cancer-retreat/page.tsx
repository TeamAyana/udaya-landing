import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, CheckCircle, Download, Sun, Sunrise, Sunset, Moon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cancer Retreat - Hua Hin 2026',
  description: 'Comprehensive 10-day medical cannabis retreat for those navigating cancer in Hua Hin, Thailand.',
}

const includesItems = [
  'Private or shared accommodation',
  'All cancer-appropriate meals',
  'Comprehensive medical assessment',
  'All prescribed cannabis medicines',
  'Personalized cannabinoid protocol for cancer',
  'Daily medical monitoring',
  'All Udaya Method™ sessions',
  'Cancer support groups',
  'Individual counseling',
  'Caregiver workshop (if applicable)',
  'Airport transfers from Bangkok',
  '24/7 medical support',
  'Take-home protocols',
  '6-month integration support',
  'Lifetime Udaya Circle™ membership'
]

const whatYouLearn = {
  cannabisMastery: [
    'Optimal dosing for your symptoms',
    'Managing chemo side effects',
    'THC/CBD balancing',
    'Drug interactions',
    'Home protocols'
  ],
  livingWell: [
    'Fatigue management',
    'Nutritional strategies',
    'Managing "scanxiety"',
    'Communication tools',
    'Legacy work'
  ]
}

const dailySchedule = [
  { time: '6:30 AM', activity: 'Gentle wake, vitals check', icon: Sunrise },
  { time: '7:00 AM', activity: 'Morning medicine administration', icon: Sun },
  { time: '7:30 AM', activity: 'Optional gentle movement', icon: Sun },
  { time: '8:30 AM', activity: 'Nourishing breakfast', icon: Sun },
  { time: '9:30 AM', activity: 'Medical rounds', icon: Sun },
  { time: '10:30 AM', activity: 'Cancer education session', icon: Sun },
  { time: '11:30 AM', activity: 'Rest or pool therapy', icon: Sun },
  { time: '12:30 PM', activity: 'Lunch and medications', icon: Sun },
  { time: '2:00 PM', activity: 'Rest time (honoring fatigue)', icon: Sunset },
  { time: '3:30 PM', activity: 'Support group or therapy', icon: Sunset },
  { time: '5:00 PM', activity: 'Gentle practice', icon: Sunset },
  { time: '6:00 PM', activity: 'Dinner and evening medicine', icon: Moon },
  { time: '7:30 PM', activity: 'Wind-down activity', icon: Moon },
  { time: '9:00 PM', activity: 'Sleep support', icon: Moon }
]

export default function CancerRetreatPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Cancer Retreat — Hua Hin, Thailand (Q2 2026)
            </h1>
            <p className="text-h3 font-light text-udaya-charcoal/80 mb-8">
              Our inaugural retreat for those navigating cancer, with medical oversight.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm font-medium">
              <span className="h-2 w-2 bg-udaya-sage rounded-full animate-pulse" />
              Limited to 20 participants
            </div>
          </div>
        </Container>
      </Section>

      {/* Program Overview */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardHeader className="text-center">
                <CardTitle className="text-h2 font-serif">10-Day Comprehensive Cancer Program</CardTitle>
                <CardDescription className="text-h3 text-udaya-sage font-bold mt-2">
                  Investment: $12,000 USD
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-6">
                <p className="text-body-lg text-center mb-8">
                  Specifically designed for those with cancer—all types, all stages. This carefully 
                  calibrated 10-day journey provides optimal time for cannabis medicine initiation, 
                  symptom management, and community building.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Why We Chose Hua Hin</h3>
                    <p className="text-sm text-udaya-charcoal/80">
                      Located 200-220 km southwest of Bangkok (2.5-4 hour transfer), Hua Hin offers 
                      the perfect balance of accessibility and tranquility. This royal seaside retreat 
                      town has been Thailand's destination for healing and restoration for over a century.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Climate Considerations</h3>
                    <p className="text-sm text-udaya-charcoal/80">
                      We schedule around the weather—cool mornings and restorative afternoons to manage 
                      cancer-related fatigue. Target dates: late April, May, early June 2026.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* What's Included */}
      <Section variant="cream">
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            What's Included
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {includesItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                  <span className="text-udaya-charcoal/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Daily Schedule */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-4">
            Daily Schedule - Cancer Adapted
          </h2>
          <p className="text-center text-udaya-charcoal/70 mb-12 max-w-2xl mx-auto">
            Carefully designed to honor cancer-related fatigue and treatment schedules
          </p>
          <div className="max-w-3xl mx-auto space-y-2">
            {dailySchedule.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <Icon className="h-5 w-5 text-udaya-gold flex-shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium text-udaya-sage">{item.time}</span>
                    <span className="mx-2 text-udaya-charcoal/50">—</span>
                    <span className="text-udaya-charcoal/80">{item.activity}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* What You'll Learn */}
      <Section variant="cream">
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            What You'll Learn
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Cannabis Mastery for Cancer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {whatYouLearn.cannabisMastery.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Living Well with Cancer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {whatYouLearn.livingWell.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-udaya-sage mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Extension Options */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Extending Your Stay
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              Need more time? Extensions available at $800/day including all meals, 
              accommodation, and medical support. Perfect for those who need additional 
              cannabis optimization or aren't ready to leave the sanctuary.
            </p>
          </div>
        </Container>
      </Section>

      {/* Investment Options */}
      <Section variant="cream">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              Investment Options
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Base Program</CardTitle>
                  <CardDescription className="text-2xl font-bold text-udaya-sage">$12,000 USD</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-udaya-charcoal/80">10 days all-inclusive</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Adjustments Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Shared accommodation: -20% ($9,600)</li>
                    <li>• Caregiver attendance: 50% ($6,000)</li>
                    <li>• Scholarships: up to 40% reduction</li>
                    <li>• Payment plans available</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Medical Requirements */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              Medical Requirements
            </h2>
            <Card>
              <CardContent className="p-8">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                    <span>Confirmed cancer diagnosis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                    <span>Medical records from oncologist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                    <span>Clearance to travel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                    <span>Current medication list</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                    <span>No active medical emergencies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="cream">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              Spaces are limited and filled on a best-fit basis. Join our waitlist to secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/waitlist">Join Cancer Waitlist</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Information Pack
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}