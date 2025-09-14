import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Users, Shield, Activity, BookOpen, HeartHandshake, CheckCircle, Calendar, Stethoscope, Brain, Heart, Sparkles, ArrowRight, Phone, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'For Clinicians',
  description: 'Refer patients to Udaya\'s medical cannabis retreats. Learn about our clinical protocols and referral process.',
}

const whyRefer = [
  {
    icon: Shield,
    title: 'Medical Supervision',
    description: '24/7 physician and nursing coverage with experience in complex cases',
    color: 'sage'
  },
  {
    icon: FileText,
    title: 'Legal & Compliant',
    description: 'Full adherence to Thai medical cannabis regulations',
    color: 'gold'
  },
  {
    icon: Activity,
    title: 'Continuity of Care',
    description: 'Regular updates and coordination with home medical teams',
    color: 'terracotta'
  },
  {
    icon: BookOpen,
    title: 'Evidence-Based Protocols',
    description: 'Published research guides our cannabinoid applications',
    color: 'sage'
  },
  {
    icon: HeartHandshake,
    title: 'Comprehensive Support',
    description: 'Beyond medicine: nutrition, mindfulness, community, integration',
    color: 'gold'
  },
  {
    icon: Brain,
    title: 'Holistic Approach',
    description: 'Addressing physical, emotional, and spiritual dimensions of healing',
    color: 'terracotta'
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
    description: 'Review patient suitability and medical history',
    icon: Stethoscope
  },
  {
    step: 2,
    title: 'Coordination',
    description: 'Align retreat timing with treatment schedules',
    icon: Calendar
  },
  {
    step: 3,
    title: 'Regular Updates',
    description: 'Progress reports during retreat',
    icon: Activity
  },
  {
    step: 4,
    title: 'Transition Planning',
    description: 'Comprehensive handoff with continuing care recommendations',
    icon: FileText
  },
  {
    step: 5,
    title: 'Follow-up Support',
    description: '6-month integration includes coordination with home team',
    icon: HeartHandshake
  }
]

const whatWeNeed = [
  {
    item: 'Diagnosis and staging information',
    detail: 'Complete diagnostic reports and current disease status'
  },
  {
    item: 'Current treatment plan',
    detail: 'Ongoing therapies, upcoming procedures, and treatment goals'
  },
  {
    item: 'Medication list',
    detail: 'All current medications with dosages and schedules'
  },
  {
    item: 'Travel clearance',
    detail: 'Written approval for international travel and retreat participation'
  },
  {
    item: 'Specific goals or concerns',
    detail: 'What you hope your patient will gain from the retreat'
  }
]

export default function CliniciansPage() {
  return (
    <>
      {/* Hero Section with Enhanced Design */}
      <Section className="pt-32 pb-20 bg-gradient-to-br from-udaya-cream via-white to-udaya-sage/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-udaya-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-udaya-gold/10 rounded-full blur-3xl" />
        
        {/* Medical pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20">
            <Stethoscope className="w-64 h-64 text-udaya-sage" />
          </div>
          <div className="absolute bottom-20 right-20">
            <Heart className="w-48 h-48 text-udaya-terracotta" />
          </div>
        </div>
        
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-udaya-sage/10 text-udaya-sage rounded-full text-sm font-medium mb-6 animate-fade-up">
              <Sparkles className="h-4 w-4" />
              For Healthcare Professionals
            </div>
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6 animate-fade-up animation-delay-100">
              Partner in Your Patients' Healing Journey
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80 max-w-3xl mx-auto animate-fade-up animation-delay-200">
              Udaya offers your patients structured, prescription-based cannabinoid care within a 
              comprehensive healing environment. We work collaboratively with referring physicians 
              to ensure continuity of care and optimal outcomes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                <FileText className="h-4 w-4 mr-2" />
                Request Clinician Pack
              </Button>
              <Button size="lg" variant="outline" className="border-2">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Key Statistics */}
      <Section className="py-12 bg-udaya-sage/5">
        <Container>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-udaya-sage mb-2">24/7</div>
              <div className="text-sm text-udaya-charcoal/70">Medical Supervision</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-udaya-sage mb-2">100%</div>
              <div className="text-sm text-udaya-charcoal/70">Legal Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-udaya-sage mb-2">6mo</div>
              <div className="text-sm text-udaya-charcoal/70">Post-Retreat Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-udaya-sage mb-2">20+</div>
              <div className="text-sm text-udaya-charcoal/70">Years Clinical Experience</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Refer to Udaya - Enhanced */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
              Why Refer to Udaya?
            </h2>
            <p className="text-udaya-charcoal/70 max-w-2xl mx-auto">
              We provide comprehensive care that complements your treatment plan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whyRefer.map((item, index) => {
              const Icon = item.icon
              const colorClasses: Record<string, string> = {
                sage: 'bg-udaya-sage/10 text-udaya-sage border-udaya-sage/20',
                gold: 'bg-udaya-gold/10 text-udaya-gold border-udaya-gold/20',
                terracotta: 'bg-udaya-terracotta/10 text-udaya-terracotta border-udaya-terracotta/20'
              }
              return (
                <Card key={index} className="h-full border-2 hover:shadow-lg transition-all hover:scale-[1.02] overflow-hidden group">
                  <div className={`h-1 ${item.color === 'sage' ? 'bg-udaya-sage' : item.color === 'gold' ? 'bg-udaya-gold' : 'bg-udaya-terracotta'}`} />
                  <CardHeader>
                    <div className={`h-14 w-14 ${colorClasses[item.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Conditions We Serve - Redesigned */}
      <Section className="bg-gradient-to-b from-white to-udaya-cream/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
              Conditions We Serve
            </h2>
            <p className="text-udaya-charcoal/70 max-w-2xl mx-auto">
              Evidence-based cannabis therapy for complex medical conditions
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
            <Card className="border-2 border-udaya-sage/30 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-udaya-sage/10 rounded-full blur-2xl" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="h-10 w-10 bg-udaya-sage/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-udaya-sage" />
                  </div>
                  Currently Accepting
                  <span className="h-3 w-3 bg-udaya-sage rounded-full animate-pulse" />
                </CardTitle>
                <CardDescription className="text-base mt-2">Opening Q2 2026</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="bg-udaya-sage/5 rounded-lg p-6">
                  <ul className="space-y-3">
                    {conditionsServed.current.map((condition, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-udaya-sage/20 flex items-center justify-center mt-0.5">
                          <CheckCircle className="h-4 w-4 text-udaya-sage" />
                        </div>
                        <span className="font-medium text-lg">{condition}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-udaya-charcoal/70">
                    Comprehensive 10-day program with 24/7 medical supervision
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-udaya-gold/20 shadow-lg hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-udaya-gold/10 rounded-full blur-2xl" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="h-10 w-10 bg-udaya-gold/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-udaya-gold" />
                  </div>
                  Future Programs
                </CardTitle>
                <CardDescription className="text-base mt-2">In development</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  {conditionsServed.future.map((condition, idx) => (
                    <li key={idx} className="flex items-start gap-3 group cursor-pointer">
                      <div className="h-6 w-6 rounded-full border-2 border-udaya-gold/30 mt-0.5 flex-shrink-0 group-hover:border-udaya-gold/50 transition-colors" />
                      <span className="text-udaya-charcoal/70 group-hover:text-udaya-charcoal transition-colors">{condition}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Our Process - Timeline Design */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
              Seamless Referral Process
            </h2>
            <p className="text-udaya-charcoal/70 max-w-2xl mx-auto">
              We make it easy to refer patients and stay connected throughout their journey
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-udaya-sage/20 hidden md:block" />
              
              <div className="space-y-8">
                {referralProcess.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="relative flex gap-6 group">
                      {/* Timeline dot */}
                      <div className="flex-shrink-0 relative">
                        <div className="h-16 w-16 bg-white border-2 border-udaya-sage/30 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:border-udaya-sage/50">
                          <Icon className="h-8 w-8 text-udaya-sage" />
                        </div>
                        <div className="absolute -top-2 -right-2 h-6 w-6 bg-udaya-sage text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {item.step}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <Card className="p-6 border-2 border-transparent hover:border-udaya-sage/20 transition-all">
                          <h3 className="font-semibold text-xl mb-2 text-udaya-charcoal">{item.title}</h3>
                          <p className="text-udaya-charcoal/70">{item.description}</p>
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* What We Need From You - Enhanced */}
      <Section className="bg-gradient-to-b from-udaya-cream/30 to-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-4">
                What We Need From You
              </h2>
              <p className="text-udaya-charcoal/70 max-w-2xl mx-auto">
                Help us provide the best care for your patient with complete information
              </p>
            </div>
            <Card className="border-2 border-udaya-sage/30 shadow-xl overflow-hidden">
              <CardHeader className="bg-udaya-sage/5 border-b border-udaya-sage/10 text-center py-8">
                <CardTitle className="text-2xl">Required Documentation</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Comprehensive information ensures optimal patient care
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid gap-4">
                  {whatWeNeed.map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-udaya-sage/10 hover:border-udaya-sage/30 transition-all hover:shadow-md">
                        <div className="h-10 w-10 rounded-full bg-udaya-sage/10 flex items-center justify-center flex-shrink-0 group-hover:bg-udaya-sage/20 transition-colors">
                          <CheckCircle className="h-5 w-5 text-udaya-sage" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-udaya-charcoal mb-1">{item.item}</h4>
                          <p className="text-sm text-udaya-charcoal/60">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Enhanced CTA Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-udaya-sage/5 via-white to-udaya-gold/5">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-udaya-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-udaya-gold/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-udaya-sage/10 mb-8">
              <HeartHandshake className="w-10 h-10 text-udaya-sage" />
            </div>
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Partner With Us in Patient Care
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8 max-w-2xl mx-auto">
              Join a network of forward-thinking clinicians who are expanding treatment 
              options for their patients through evidence-based cannabis medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                <FileText className="h-4 w-4 mr-2" />
                Request Clinician Pack
              </Button>
              <Button size="lg" variant="outline" className="border-2 hover:border-udaya-sage">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Consultation
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12 pt-12 border-t border-udaya-sage/20">
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-5 w-5 text-udaya-sage" />
                <a href={`mailto:${SITE_CONFIG.links.cliniciansEmail}`} className="text-udaya-sage hover:underline font-medium">
                  {SITE_CONFIG.links.cliniciansEmail}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-5 w-5 text-udaya-sage" />
                <span className="text-udaya-charcoal/80 font-medium">+66 65 829 5454</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}