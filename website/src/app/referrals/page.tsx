'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import {
  Users,
  Heart,
  Handshake,
  CheckCircle,
  Mail,
  Loader2,
  Building,
  Stethoscope,
  Compass,
  BookOpen,
  Globe2,
  Sparkles,
  Shield
} from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const idealPartners = [
  {
    icon: Stethoscope,
    title: 'Healthcare Providers',
    description: 'Oncologists, integrative physicians, and healthcare practitioners working with patients facing serious illness',
    gradient: 'from-udaya-sage/10 to-udaya-sage/5'
  },
  {
    icon: Users,
    title: 'Support Organizations',
    description: 'Cancer support groups, patient advocacy organizations, and community wellness centers',
    gradient: 'from-udaya-gold/10 to-udaya-gold/5'
  },
  {
    icon: Building,
    title: 'Wellness Professionals',
    description: 'Therapists, counselors, and holistic practitioners supporting patients and caregivers',
    gradient: 'from-udaya-terracotta/10 to-udaya-terracotta/5'
  }
]

const supportOfferings = [
  {
    icon: BookOpen,
    title: 'Education & Guidance',
    description: 'Thai-licensed physicians provide medical cannabis education and personalized dosing guidance'
  },
  {
    icon: Heart,
    title: 'Mindful Support',
    description: 'Meditation, breathwork, and meaning-centered practices to address the emotional weight of serious illness'
  },
  {
    icon: Users,
    title: 'Small Group Setting',
    description: 'Maximum 20 participants with registered nurse on staff for personalized attention and safety'
  },
  {
    icon: Compass,
    title: 'Ongoing Integration',
    description: 'Weekly check-ins and assistance navigating legal access to medical cannabis at home'
  }
]

export default function ReferralsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    country: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSubmitted(true)
      } else {
        throw new Error(result.message || result.error || 'Failed to submit')
      }
    } catch (error) {
      console.error('Referral form error:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-udaya-cream/20 to-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-udaya-sage rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-serif mb-4 text-udaya-charcoal">
              Thank You for Reaching Out
            </h1>
            <p className="text-lg text-udaya-charcoal/80 mb-8 leading-relaxed">
              We've received your inquiry and truly appreciate your interest in collaborating to support your patients or community. Our team will be in touch within 48 hours.
            </p>
            <Button asChild size="lg">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 bg-gradient-to-b from-udaya-cream/30 to-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-udaya-sage/10 text-udaya-sage px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Handshake className="w-4 h-4" />
              <span>Professional Collaboration</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-udaya-charcoal leading-tight">
              Partner With Udaya to Support<br />
              <span className="text-udaya-sage">Those You Serve</span>
            </h1>

            <p className="text-xl text-udaya-charcoal/70 mb-10 max-w-3xl mx-auto">
              If you work with individuals navigating cancer, chronic pain, or serious illness,
              we invite you to learn about our holistic medical cannabis education programs in Thailand.
            </p>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-udaya-charcoal/70">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-udaya-sage" />
                <span>Licensed Medical Oversight</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-udaya-sage" />
                <span>Legal in Thailand</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-udaya-sage" />
                <span>Whole-Person Approach</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Who We Work With */}
      <Section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
              Who We Collaborate With
            </h2>
            <p className="text-lg text-udaya-charcoal/70 max-w-2xl mx-auto">
              We partner with professionals who share our commitment to whole-person, compassionate care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {idealPartners.map((partner, idx) => {
              const Icon = partner.icon
              return (
                <Card
                  key={idx}
                  className={`text-center hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br ${partner.gradient}`}
                >
                  <CardContent className="pt-8 pb-6 px-6">
                    <div className="w-16 h-16 bg-udaya-sage rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-udaya-charcoal">{partner.title}</h3>
                    <p className="text-sm text-udaya-charcoal/70">{partner.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* What We Offer */}
      <Section className="py-20 bg-udaya-cream/30">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif mb-4 text-udaya-charcoal">
                How We Support Your Patients
              </h2>
              <p className="text-lg text-udaya-charcoal/70 max-w-2xl mx-auto">
                Our 10-day programs provide education, community, and practical tools—not promises of cure or treatment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {supportOfferings.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 bg-white rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-udaya-sage/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-udaya-sage" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-udaya-charcoal mb-1">{item.title}</h3>
                      <p className="text-sm text-udaya-charcoal/70">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Important Notice */}
            <div className="mt-10 bg-white rounded-xl border border-udaya-sage/20 p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-udaya-sage mt-0.5 flex-shrink-0" />
                <p className="text-sm text-udaya-charcoal/80">
                  <strong className="text-udaya-charcoal">Important:</strong> Our programs complement conventional medical care—they are not a replacement for treatment. We provide education and support for the compassionate use of medical cannabis within Thailand's legal framework.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-udaya-sage rounded-xl mb-4">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-serif mb-2 text-udaya-charcoal">Get in Touch</h2>
              <p className="text-udaya-charcoal/70">
                Let us know how we can support those you serve
              </p>
            </div>

            <Card className="border border-udaya-sage/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Country *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        placeholder="Your country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Organization/Practice</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
                      placeholder="Your organization or practice name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Your Role *</label>
                    <select
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="">Select your role</option>
                      <option value="physician">Physician/Oncologist</option>
                      <option value="healthcare">Healthcare Provider</option>
                      <option value="therapist">Therapist/Counselor</option>
                      <option value="advocate">Patient Advocate</option>
                      <option value="organization">Support Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-udaya-charcoal">Message *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-udaya-sage focus:border-transparent resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your practice and how you'd like to support those you serve..."
                    />
                  </div>

                  {error && (
                    <div className="bg-udaya-terracotta/10 border border-udaya-terracotta/30 rounded-lg p-3">
                      <p className="text-udaya-terracotta text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-5 w-5" />
                        Send Inquiry
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-udaya-charcoal/60">
                    Or email us directly at{' '}
                    <a href={`mailto:${SITE_CONFIG.links.cliniciansEmail}`} className="text-udaya-sage hover:underline">
                      {SITE_CONFIG.links.cliniciansEmail}
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
