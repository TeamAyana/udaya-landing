'use client'

import * as React from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, CheckCircle, Download, Sun, Sunrise, Sunset, Moon, Info, Heart } from 'lucide-react'
import { RETREAT_DETAILS } from '@/lib/constants'
import { InquiryModal } from '@/components/ui/inquiry-modal'

const includesItems = [
  'Private or shared accommodation',
  'All cancer-appropriate meals',
  'Comprehensive health assessment',
  'All prescribed medical cannabis medicines',
  'Personalized cannabinoid protocol for cancer',
  'Daily health check-ins',
  'All Udaya Method™ sessions',
  'Cancer support groups',
  'Individual counseling',
  'Caregiver workshop (if applicable)',
  'Airport transfers from Bangkok',
  'Professional oversight',
  'Take-home protocols',
  '8 weeks post-program integration support',
  'Lifetime Udaya Circle™ membership'
]

const whatYouLearn = {
  cannabisMastery: [
    'Optimal dosing for your symptoms',
    'Managing treatment side effects',
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
  { time: '9:30 AM', activity: 'Morning consultations', icon: Sun },
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

export default function CancerProgramPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      {/* Important Notice */}
      <Section className="pt-32 pb-8">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-udaya-sage/5 via-white to-udaya-cream/30 border border-udaya-sage/20 shadow-sm">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-udaya-sage/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-udaya-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative px-8 py-10 md:px-12 md:py-12">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-14 h-14 rounded-full bg-udaya-sage/10 flex items-center justify-center">
                      <Heart className="h-7 w-7 text-udaya-sage" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-semibold text-udaya-charcoal mb-4 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-udaya-sage sm:hidden" />
                      Our Commitment to Complementary Care
                    </h3>
                    <div className="space-y-3 text-udaya-charcoal/80 leading-relaxed">
                      <p>
                        This program is designed to <strong className="text-udaya-charcoal">complement your conventional cancer care</strong>—it
                        is not a replacement for medical treatment.
                      </p>
                      <p>
                        Udaya is <strong className="text-udaya-charcoal">not a hospital or primary care facility</strong>. We provide education
                        and support for the therapeutic use of medical cannabis in conjunction with your existing treatment plan.
                      </p>
                      <p className="text-sm text-udaya-sage font-medium pt-2">
                        We work alongside your healthcare team to support your whole-person healing journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section className="pt-8 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Cancer Program — {RETREAT_DETAILS.cancer.location_display}
            </h1>
            <p className="text-h3 font-light text-udaya-charcoal/80 mb-8">
              Our inaugural program for those navigating cancer, with professional medical oversight.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm font-medium">
              <span className="h-2 w-2 bg-udaya-sage rounded-full animate-pulse" />
              Limited to {RETREAT_DETAILS.cancer.capacity} participants
            </div>
          </div>
        </Container>
      </Section>

      {/* Program Overview */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-udaya-sage/30">
              <CardHeader className="text-center">
                <CardTitle className="text-h2 font-serif">10-Day Comprehensive Cancer Program</CardTitle>
                <CardDescription className="text-h3 text-udaya-sage font-bold mt-2">
                  Investment: {RETREAT_DETAILS.cancer.price}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-6">
                <p className="text-body-lg text-center mb-8">
                  Specifically designed for those with cancer—all types, all stages. This carefully
                  calibrated 10-day journey provides optimal time for medical cannabis initiation,
                  symptom management, and community building.
                </p>
                <div className="space-y-4 text-center">
                  <p className="text-sm text-udaya-charcoal/80">
                    <strong>Small cohort (max {RETREAT_DETAILS.cancer.capacity})</strong> ensures personalized attention
                  </p>
                  <p className="text-sm text-udaya-charcoal/80">
                    <strong>Nurse on staff</strong> for medical support
                  </p>
                  <p className="text-sm text-udaya-charcoal/80">
                    <strong>Licensed Thai practitioner</strong> present for consultations
                  </p>
                  <p className="text-sm text-udaya-charcoal/80">
                    <strong>Post-program support:</strong> {RETREAT_DETAILS.cancer.post_retreat_support}
                  </p>
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

      {/* Daily Structure */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-4">
            Daily Structure - Cancer Adapted
          </h2>
          <p className="text-center text-udaya-charcoal/70 mb-12 max-w-2xl mx-auto">
            Carefully designed to honor cancer-related fatigue and treatment schedules.
            {RETREAT_DETAILS.cancer.daily_structure}
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
                <CardTitle className="text-xl">Medical Cannabis Mastery for Cancer</CardTitle>
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
              medical cannabis optimization or aren't ready to leave the sanctuary.
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
                  <CardDescription className="text-2xl font-bold text-udaya-sage">
                    {RETREAT_DETAILS.cancer.price}
                  </CardDescription>
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
            <Card className="border-2 border-udaya-sage/30 overflow-hidden">
              <CardHeader className="bg-udaya-sage/5 border-b border-udaya-sage/10">
                <CardTitle className="text-center text-2xl text-udaya-sage">
                  Required Documentation
                </CardTitle>
                <CardDescription className="text-center text-udaya-charcoal/60 mt-2">
                  Please ensure you have all necessary documentation before applying
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-udaya-sage/10 hover:border-udaya-sage/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-udaya-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-udaya-charcoal">Confirmed cancer diagnosis</h4>
                      <p className="text-sm text-udaya-charcoal/60 mt-1">Official diagnosis from your healthcare provider</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-udaya-sage/10 hover:border-udaya-sage/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-udaya-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-udaya-charcoal">Medical records from oncologist</h4>
                      <p className="text-sm text-udaya-charcoal/60 mt-1">Recent records including treatment history</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-udaya-sage/10 hover:border-udaya-sage/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-udaya-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-udaya-charcoal">Clearance to travel</h4>
                      <p className="text-sm text-udaya-charcoal/60 mt-1">Written approval from your physician for international travel</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-udaya-sage/10 hover:border-udaya-sage/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-udaya-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-udaya-charcoal">Current medication list</h4>
                      <p className="text-sm text-udaya-charcoal/60 mt-1">Complete list of all current medications and dosages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-udaya-sage/10 hover:border-udaya-sage/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-udaya-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-udaya-sage" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-udaya-charcoal">No active medical emergencies</h4>
                      <p className="text-sm text-udaya-charcoal/60 mt-1">Stable condition suitable for program participation</p>
                    </div>
                  </div>
                </div>
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
              Spaces are limited and filled on a best-fit basis. Book a consultation to learn more.
            </p>
            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-udaya-sage hover:bg-udaya-sage/90"
            >
              Book Consultation
            </Button>
          </div>
        </Container>
      </Section>

      {/* Inquiry Modal */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}