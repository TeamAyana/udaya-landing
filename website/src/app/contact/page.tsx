'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Phone, MessageSquare, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Please enter your country/region'),
  userType: z.enum(['patient', 'caregiver', 'clinician', 'other']),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters')
})

type ContactFormData = z.infer<typeof contactSchema>

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    value: SITE_CONFIG.links.email,
    href: `mailto:${SITE_CONFIG.links.email}`,
    description: 'General inquiries'
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: SITE_CONFIG.links.whatsapp,
    href: `https://wa.me/${SITE_CONFIG.links.whatsapp.replace(/[^0-9]/g, '')}`,
    description: 'Quick questions'
  },
  {
    icon: MessageSquare,
    title: 'Schedule a Call',
    value: 'Book a consultation',
    href: '#',
    description: '30-minute video call'
  }
]

const specializedContacts = [
  {
    title: 'For Clinicians',
    email: SITE_CONFIG.links.cliniciansEmail,
    description: 'Referrals and clinical inquiries'
  },
  {
    title: 'For Media',
    email: SITE_CONFIG.links.pressEmail,
    description: 'Press and media inquiries'
  }
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              We're Here to Help
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              Questions about eligibility, travel, or clinical pathways? Send a note. 
              A nurse or program lead will reply.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              Ways to Connect
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto mb-4 h-12 w-12 bg-udaya-sage/10 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-udaya-sage" />
                      </div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <a 
                        href={method.href}
                        className="text-udaya-sage hover:underline font-medium"
                      >
                        {method.value}
                      </a>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Specialized Contacts */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {specializedContacts.map((contact, index) => (
                <Card key={index} className="bg-udaya-cream/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{contact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-udaya-sage hover:underline text-sm"
                    >
                      {contact.email}
                    </a>
                    <p className="text-xs text-udaya-charcoal/60 mt-1">
                      {contact.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section variant="cream">
        <Container>
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-udaya-sage text-white">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h2 className="font-serif text-h3 font-bold text-udaya-charcoal mb-4">
                    Message Sent Successfully
                  </h2>
                  <p className="text-body-lg text-udaya-charcoal/80 mb-8">
                    Thank you for reaching out. A member of our team will respond within 48 hours.
                  </p>
                  <Button asChild>
                    <Link href="/">Return to Home</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-h3 font-serif">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          {...register('name')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Country/Region *</label>
                        <input
                          {...register('country')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">I am a: *</label>
                        <select
                          {...register('userType')}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                        >
                          <option value="">Select...</option>
                          <option value="patient">Patient</option>
                          <option value="caregiver">Caregiver</option>
                          <option value="clinician">Clinician</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.userType && (
                          <p className="text-red-500 text-sm mt-1">{errors.userType.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <input
                        {...register('subject')}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        {...register('message')}
                        rows={6}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-udaya-sage"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </Section>

      {/* Mailing Address */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-8">
              Mailing Address
            </h2>
            <Card className="inline-block">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-udaya-sage mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">Udaya</p>
                    <p className="text-udaya-charcoal/80">[Address]</p>
                    <p className="text-udaya-charcoal/80">Hua Hin, Thailand</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}