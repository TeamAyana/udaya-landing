'use client'

import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqCategories = [
  {
    title: 'Medical & Safety',
    questions: [
      {
        question: 'Is cannabis legal at your retreats?',
        answer: 'Yes—for medical use with a prescription under Thailand\'s rules. Recreational sale and advertising are restricted; public use is limited. We comply fully.'
      },
      {
        question: 'Do I need my own prescription?',
        answer: 'We review any existing prescription and coordinate with Thai-licensed practitioners. Some guests are evaluated on site.'
      },
      {
        question: 'What if I have a medical emergency?',
        answer: 'We maintain professional medical staff on-site with a registered nurse on staff. We\'re partnered with nearby hospitals for any advanced interventions that may be needed.'
      },
      {
        question: 'Can I attend during chemotherapy or radiation?',
        answer: 'Often, yes—with a letter from your lead clinician and approval from our medical team. We adapt dosing and activities to your energy.'
      }
    ]
  },
  {
    title: 'Medical Cannabis',
    questions: [
      {
        question: 'What if I\'ve never used medical cannabis?',
        answer: 'Perfect. We specialize in medical cannabis-naive patients. We start with micro-doses, educate thoroughly, and increase gradually under medical supervision.'
      },
      {
        question: 'What types of medical cannabis?',
        answer: 'Primarily Rick Simpson Oil (RSO/FECO) for full-spectrum benefits, high-CBD formulations, CBG for inflammation. All administered as oils, capsules, or tinctures—no smoking required.'
      },
      {
        question: 'What if I prefer a non-THC path?',
        answer: 'We can design CBD-forward or non-cannabinoid pathways where appropriate and lawful. (THC is what treats cancer)'
      }
    ]
  },
  {
    title: 'Program Specifics',
    questions: [
      {
        question: 'Why is the first retreat cancer-specific?',
        answer: 'We\'ve chosen to focus our inaugural program on cancer patients to provide specialized support. Future retreats will expand to other conditions.'
      },
      {
        question: 'Why 10 days?',
        answer: 'Our research shows 10 days provides optimal benefit for cancer patients—long enough for cannabis optimization, short enough to fit between treatments. Extensions available.'
      },
      {
        question: 'How big are cohorts?',
        answer: 'Small. Maximum 12 participants. Enough for community, few enough for real attention.'
      },
      {
        question: 'Can my caregiver join?',
        answer: 'Yes—as a participant or day partner. Dedicated caregiver content is included.'
      }
    ]
  },
  {
    title: 'Practical Matters',
    questions: [
      {
        question: 'Travel to Hua Hin?',
        answer: 'Private transfer from Bangkok typically takes 2.5–4 hours for ~200 km. We arrange vetted options.'
      },
      {
        question: 'When exactly in Q2 2026?',
        answer: 'Target windows: late April, May, early June. Dates release to waitlist first.'
      },
      {
        question: 'What about dietary restrictions?',
        answer: 'Our kitchen accommodates all medical diets, allergies, and preferences.'
      },
      {
        question: 'Is this religious?',
        answer: 'No. While we draw from Buddhist mindfulness traditions, the program is entirely secular.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              Find answers to common questions about our retreats, medical protocols, and what to expect.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ Accordion */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Accordion.Root type="single" collapsible className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="font-serif text-h3 font-bold text-udaya-charcoal mb-6">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((item, index) => (
                      <Accordion.Item
                        key={`${categoryIndex}-${index}`}
                        value={`${categoryIndex}-${index}`}
                        className="bg-white rounded-lg border border-udaya-sage/10 overflow-hidden"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="flex w-full items-center justify-between p-6 text-left hover:bg-udaya-cream/50 transition-colors group">
                            <span className="font-medium text-udaya-charcoal pr-4">
                              {item.question}
                            </span>
                            <ChevronDown className="h-5 w-5 text-udaya-sage flex-shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                          <div className="px-6 pb-6 text-udaya-charcoal/80">
                            {item.answer}
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </div>
                </div>
              ))}
            </Accordion.Root>
          </div>
        </Container>
      </Section>

      {/* Still Have Questions */}
      <Section variant="cream">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Still Have Questions?
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              We're here to help. Reach out to our team for personalized answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/inquiry">Join Waitlist</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}