'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateReferralCode } from '@/lib/utils/referral'
import { trackFormSubmit, trackEvent } from '@/lib/analytics'
import Link from 'next/link'
import {
  Users,
  DollarSign,
  Heart,
  Award,
  CheckCircle,
  TrendingUp,
  Globe,
  Shield,
  Sparkles,
  ArrowRight,
  Gift,
  Target,
  Zap,
  Building,
  UserCheck,
  BadgeCheck,
  ChevronRight,
  Mail,
  Copy,
  ExternalLink,
  Star,
  CircleDollarSign,
  Handshake,
  MessageSquare,
  Calendar,
  BarChart3,
  Rocket,
  Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'

const benefits = [
  {
    icon: CircleDollarSign,
    title: 'Generous Commissions',
    description: '10% commission on all successful referrals, paid monthly',
    highlight: '10%'
  },
  {
    icon: Users,
    title: 'Support Your Community',
    description: 'Help people access life-changing medical cannabis programs',
    highlight: 'Impact'
  },
  {
    icon: Shield,
    title: 'Full Transparency',
    description: 'Real-time tracking dashboard with detailed analytics',
    highlight: 'Track'
  },
  {
    icon: Award,
    title: 'Performance Bonuses',
    description: 'Earn extra rewards for high-volume referrals',
    highlight: 'Bonus'
  },
  {
    icon: Heart,
    title: 'Marketing Support',
    description: 'Access professional materials and co-branded content',
    highlight: 'Tools'
  },
  {
    icon: Rocket,
    title: 'Priority Access',
    description: 'First access to new programs and exclusive partner events',
    highlight: 'VIP'
  }
]

const idealPartners = [
  {
    icon: Building,
    title: 'Healthcare Practices',
    description: 'Medical clinics, integrative health centers, oncology practices',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    icon: Users,
    title: 'Patient Advocates',
    description: 'Support groups, patient organizations, advocacy networks',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    icon: Globe,
    title: 'Wellness Influencers',
    description: 'Health bloggers, social media creators, podcast hosts',
    color: 'text-pink-600 bg-pink-50'
  },
  {
    icon: UserCheck,
    title: 'Professional Networks',
    description: 'Therapists, nutritionists, wellness coaches',
    color: 'text-green-600 bg-green-50'
  }
]

const commissionTiers = [
  { referrals: '1-5', rate: '10%', bonus: 'Welcome Kit' },
  { referrals: '6-15', rate: '12%', bonus: '$500 Bonus' },
  { referrals: '16-30', rate: '15%', bonus: '$1500 Bonus' },
  { referrals: '30+', rate: '20%', bonus: 'VIP Partner Status' }
]

const faqs = [
  {
    question: 'How quickly do I get paid?',
    answer: 'Commissions are paid monthly, within 30 days of program completion. We offer multiple payment methods including PayPal, bank transfer, and cryptocurrency.'
  },
  {
    question: 'What support will I receive?',
    answer: 'You\'ll get a dedicated partner manager, marketing materials, training resources, and access to our partner portal with real-time analytics.'
  },
  {
    question: 'Are there any costs involved?',
    answer: 'No! Joining our referral program is completely free. We provide all the tools and support you need at no cost.'
  },
  {
    question: 'Can international partners apply?',
    answer: 'Yes! We welcome partners from around the world. Commission rates and payment methods may vary by country.'
  },
  {
    question: 'How do I track my referrals?',
    answer: 'You\'ll have access to a real-time dashboard showing all your referrals, conversion rates, and pending commissions.'
  },
  {
    question: 'What if my referral needs financial assistance?',
    answer: 'We offer scholarship programs. As a partner, you can nominate deserving participants for financial support.'
  }
]

const processSteps = [
  {
    icon: Mail,
    title: 'Apply Online',
    description: 'Fill out our simple application form',
    time: '2 minutes'
  },
  {
    icon: UserCheck,
    title: 'Get Approved',
    description: 'Quick review within 48 hours',
    time: '48 hours'
  },
  {
    icon: Gift,
    title: 'Receive Your Kit',
    description: 'Get your code and marketing materials',
    time: 'Immediate'
  },
  {
    icon: TrendingUp,
    title: 'Start Earning',
    description: 'Share and track your referrals',
    time: 'Ongoing'
  }
]

export default function ReferralsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    website: '',
    audience: '',
    audienceSize: '',
    country: '',
    expectedVolume: '',
    payoutMethod: '',
    experience: '',
    whyPartner: '',
    socialMedia: '',
    referralSource: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'individual' | 'organization'>('individual')

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://udaya.one/?ref=${referralCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackEvent('referral_code_copied', { code: referralCode })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Generate referral code
    const code = generateReferralCode()
    setReferralCode(code)

    // Submit to API
    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          referralCode: code,
          type: activeTab,
          createdAt: new Date().toISOString(),
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSubmitted(true)
        trackFormSubmit('referral_signup', {
          country: formData.country,
          channel: formData.organization,
          type: activeTab
        })
      } else {
        throw new Error(result.message || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting referral application:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-white to-udaya-cream/20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-serif mb-4 text-udaya-charcoal">
                Welcome to the Udaya Partner Network!
              </h1>
              <p className="text-xl text-gray-600">
                You're now part of a community making healing accessible worldwide
              </p>
            </div>

            <Card className="bg-gradient-to-br from-udaya-sage/5 to-udaya-gold/5 border-2 border-udaya-sage/20 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <p className="text-sm uppercase tracking-wide text-gray-600 mb-2">
                    Your Unique Referral Code
                  </p>
                  <div className="bg-white rounded-lg p-6 shadow-inner border border-gray-200">
                    <p className="text-4xl font-mono font-bold text-udaya-sage mb-4">
                      {referralCode}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-udaya-sage transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy code'}
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Your personalized referral link:
                  </p>
                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <input
                      type="text"
                      readOnly
                      value={`https://udaya.one/?ref=${referralCode}`}
                      className="flex-1 bg-transparent text-sm font-mono text-gray-700 outline-none"
                    />
                    <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <Card className="bg-white/70 border-udaya-sage/20">
                    <CardContent className="p-4 text-center">
                      <BarChart3 className="w-8 h-8 text-udaya-sage mx-auto mb-2" />
                      <p className="text-sm font-medium">Partner Dashboard</p>
                      <p className="text-xs text-gray-600 mt-1">Coming in 24 hours</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/70 border-udaya-sage/20">
                    <CardContent className="p-4 text-center">
                      <Mail className="w-8 h-8 text-udaya-sage mx-auto mb-2" />
                      <p className="text-sm font-medium">Welcome Email</p>
                      <p className="text-xs text-gray-600 mt-1">Check your inbox</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/70 border-udaya-sage/20">
                    <CardContent className="p-4 text-center">
                      <Gift className="w-8 h-8 text-udaya-sage mx-auto mb-2" />
                      <p className="text-sm font-medium">Marketing Kit</p>
                      <p className="text-xs text-gray-600 mt-1">Download ready</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <h3 className="font-serif text-2xl mb-4 text-udaya-charcoal">What's Next?</h3>
              <div className="space-y-3 text-left max-w-2xl mx-auto">
                {[
                  'Check your email for login credentials to the partner portal',
                  'Download marketing materials from your dashboard',
                  'Schedule an optional onboarding call with your partner manager',
                  'Start sharing Udaya with your community',
                  'Track your referrals and earnings in real-time'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-4">
              <Button variant="outline" size="lg" asChild className="w-full">
                <Link href="/">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Link>
              </Button>
              <Button size="lg" className="w-full bg-udaya-sage hover:bg-udaya-sage/90">
                <ExternalLink className="mr-2 h-4 w-4" />
                Access Partner Portal
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <Section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-udaya-cream via-white to-udaya-sage/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-udaya-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-udaya-sage/20 rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-udaya-sage/10 text-udaya-sage px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Join Our Growing Partner Network</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-udaya-charcoal leading-tight">
              Earn While Making<br />
              <span className="text-udaya-sage">Healing Accessible</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Partner with Udaya to help people discover life-changing medical cannabis programs
              while earning generous commissions
            </p>

            <div className="flex flex-wrap gap-6 justify-center mb-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">10-20% Commission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Monthly Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Full Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">No Fees</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-udaya-sage hover:bg-udaya-sage/90 text-white px-8 py-6 text-lg">
                <Rocket className="mr-2 h-5 w-5" />
                Apply Now - Start Earning Today
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Indicators */}
      <Section className="py-12 bg-gray-50 border-y">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-udaya-sage">10-20%</p>
              <p className="text-sm text-gray-600">Commission Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-udaya-sage">Monthly</p>
              <p className="text-sm text-gray-600">Payout Schedule</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-udaya-sage">48hrs</p>
              <p className="text-sm text-gray-600">Approval Time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-udaya-sage">Free</p>
              <p className="text-sm text-gray-600">Zero Costs</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
              Why Partners Love Working With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join a program designed for your success with industry-leading benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-udaya-sage/30">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-udaya-sage/10 rounded-lg flex items-center justify-center group-hover:bg-udaya-sage/20 transition-colors">
                        <Icon className="w-7 h-7 text-udaya-sage" />
                      </div>
                      <span className="text-xs font-bold text-udaya-sage bg-udaya-sage/10 px-2 py-1 rounded-full">
                        {benefit.highlight}
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Commission Structure */}
      <Section className="py-20 bg-gradient-to-b from-udaya-cream/30 to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
              Transparent Commission Structure
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The more you refer, the more you earn. Simple as that.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-4">
                {commissionTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-8 text-center border-r last:border-r-0 hover:bg-gradient-to-b hover:from-udaya-sage/5 hover:to-white transition-colors",
                      idx === commissionTiers.length - 1 && "bg-gradient-to-b from-udaya-gold/10 to-white"
                    )}
                  >
                    <div className="mb-4">
                      {idx === commissionTiers.length - 1 && (
                        <div className="inline-flex items-center gap-1 bg-udaya-gold text-white text-xs px-2 py-1 rounded-full mb-3">
                          <Star className="w-3 h-3" />
                          <span>VIP</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-600 mb-1">Annual Referrals</p>
                      <p className="text-2xl font-bold text-udaya-charcoal">{tier.referrals}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-4xl font-bold text-udaya-sage">{tier.rate}</p>
                      <p className="text-sm text-gray-600">Commission</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-udaya-gold">{tier.bonus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                * Commissions paid monthly. Bonuses awarded annually. Terms and conditions apply.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Ideal Partners */}
      <Section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
              Who Makes a Great Partner?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              If you work with people seeking healing, you're perfect for our program
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {idealPartners.map((partner, idx) => {
              const Icon = partner.icon
              return (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4", partner.color)}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{partner.title}</h3>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
              Start Earning in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From application to first commission in less than a week
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div key={idx} className="relative">
                    {idx < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-udaya-sage to-transparent z-0" />
                    )}
                    <div className="relative z-10">
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-udaya-sage text-white rounded-full flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        <p className="text-xs text-udaya-sage font-medium">{step.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Application Form */}
      <Section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-8 pt-10 bg-gradient-to-b from-udaya-sage/5 to-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-udaya-sage/10 rounded-full mb-4">
                  <Handshake className="w-8 h-8 text-udaya-sage" />
                </div>
                <CardTitle className="text-3xl font-serif mb-3">Partner Application</CardTitle>
                <CardDescription className="text-lg">
                  Takes less than 5 minutes. Approval within 48 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                {/* Tabs for Individual vs Organization */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-8">
                  <button
                    onClick={() => setActiveTab('individual')}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md transition-all",
                      activeTab === 'individual'
                        ? "bg-white shadow text-udaya-sage font-medium"
                        : "text-gray-600 hover:text-gray-800"
                    )}
                  >
                    Individual
                  </button>
                  <button
                    onClick={() => setActiveTab('organization')}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md transition-all",
                      activeTab === 'organization'
                        ? "bg-white shadow text-udaya-sage font-medium"
                        : "text-gray-600 hover:text-gray-800"
                    )}
                  >
                    Organization
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal/Organization Information */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-udaya-sage" />
                      {activeTab === 'individual' ? 'Personal Information' : 'Organization Information'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {activeTab === 'individual' ? 'Full Name' : 'Contact Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder={activeTab === 'individual' ? 'John Doe' : 'Your name'}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Country *
                        </label>
                        <select
                          required
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 bg-white"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="NL">Netherlands</option>
                          <option value="CH">Switzerland</option>
                          <option value="TH">Thailand</option>
                          <option value="SG">Singapore</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {activeTab === 'organization' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Organization Name *
                            </label>
                            <input
                              type="text"
                              required={activeTab === 'organization'}
                              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                              value={formData.organization}
                              onChange={(e) => setFormData({...formData, organization: e.target.value})}
                              placeholder="Your organization"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Website
                            </label>
                            <input
                              type="url"
                              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                              value={formData.website}
                              onChange={(e) => setFormData({...formData, website: e.target.value})}
                              placeholder="https://example.com"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Audience & Reach */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-udaya-sage" />
                      Your Audience & Reach
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Describe Your Audience *
                        </label>
                        <textarea
                          required
                          rows={3}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 resize-none"
                          value={formData.audience}
                          onChange={(e) => setFormData({...formData, audience: e.target.value})}
                          placeholder="Tell us about the people you work with or influence..."
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Audience Size
                          </label>
                          <select
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 bg-white"
                            value={formData.audienceSize}
                            onChange={(e) => setFormData({...formData, audienceSize: e.target.value})}
                          >
                            <option value="">Select Range</option>
                            <option value="<1000">Less than 1,000</option>
                            <option value="1000-5000">1,000 - 5,000</option>
                            <option value="5000-10000">5,000 - 10,000</option>
                            <option value="10000-50000">10,000 - 50,000</option>
                            <option value="50000+">50,000+</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Expected Annual Referrals
                          </label>
                          <select
                            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 bg-white"
                            value={formData.expectedVolume}
                            onChange={(e) => setFormData({...formData, expectedVolume: e.target.value})}
                          >
                            <option value="">Select Range</option>
                            <option value="1-5">1-5 referrals</option>
                            <option value="6-10">6-10 referrals</option>
                            <option value="11-20">11-20 referrals</option>
                            <option value="20-50">20-50 referrals</option>
                            <option value="50+">50+ referrals</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Social Media Profiles (Optional)
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300"
                          value={formData.socialMedia}
                          onChange={(e) => setFormData({...formData, socialMedia: e.target.value})}
                          placeholder="Instagram, LinkedIn, YouTube, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Experience & Motivation */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-udaya-sage" />
                      Experience & Motivation
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Experience with Medical Cannabis
                        </label>
                        <select
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 bg-white"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        >
                          <option value="">Select Experience Level</option>
                          <option value="personal">Personal experience</option>
                          <option value="professional">Professional experience</option>
                          <option value="both">Both personal and professional</option>
                          <option value="learning">Currently learning</option>
                          <option value="none">No direct experience</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Why do you want to partner with Udaya? *
                        </label>
                        <textarea
                          required
                          rows={3}
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 resize-none"
                          value={formData.whyPartner}
                          onChange={(e) => setFormData({...formData, whyPartner: e.target.value})}
                          placeholder="Share your motivation for joining our partner program..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Preferences */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-udaya-sage" />
                      Payment Preferences
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Preferred Payout Method
                        </label>
                        <select
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 bg-white"
                          value={formData.payoutMethod}
                          onChange={(e) => setFormData({...formData, payoutMethod: e.target.value})}
                        >
                          <option value="">Select Method</option>
                          <option value="paypal">PayPal</option>
                          <option value="bank">Bank Transfer (ACH/Wire)</option>
                          <option value="wise">Wise (TransferWise)</option>
                          <option value="crypto">Cryptocurrency</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          How did you hear about us?
                        </label>
                        <select
                          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent transition-all hover:border-gray-300 bg-white"
                          value={formData.referralSource}
                          onChange={(e) => setFormData({...formData, referralSource: e.target.value})}
                        >
                          <option value="">Select Source</option>
                          <option value="search">Search Engine</option>
                          <option value="social">Social Media</option>
                          <option value="referral">Friend/Colleague</option>
                          <option value="email">Email</option>
                          <option value="event">Conference/Event</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-600" />
                      Program Terms
                    </h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>I understand commissions are paid 30 days after program completion</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>I agree to promote Udaya ethically and accurately</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>I understand that approval is at Udaya's discretion</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>I will comply with all applicable laws and regulations</span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm flex items-start gap-2">
                        <span className="text-lg">⚠️</span>
                        <span>{error}</span>
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-udaya-sage hover:bg-udaya-sage/90 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-5 w-5" />
                        Submit Application & Get Your Code
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    By submitting this application, you agree to our Partner Terms of Service and Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our partner program
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Button variant="outline" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Partner Support
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="py-20 bg-gradient-to-br from-udaya-sage to-udaya-sage/90 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start earning while helping people access healing programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-udaya-sage hover:bg-gray-100">
                <Rocket className="mr-2 h-5 w-5" />
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}