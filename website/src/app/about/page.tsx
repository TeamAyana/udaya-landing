import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Eye, Target, Users, Sparkles, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Udaya',
  description: 'Learn about our vision, mission, and the story behind Thailand\'s premier medical cannabis retreat.',
}

const values = [
  {
    icon: Heart,
    title: 'Medical Integrity',
    description: 'Every protocol is evidence-based. Every prescription is precise.'
  },
  {
    icon: Users,
    title: 'Compassionate Presence',
    description: 'We meet you where you are, without judgment or false promises.'
  },
  {
    icon: Sparkles,
    title: 'Holistic Integration',
    description: 'Body, mind, and spirit are addressed with equal care.'
  },
  {
    icon: Globe,
    title: 'Accessible Excellence',
    description: 'Premium care shouldn\'t be limited to the wealthy.'
  }
]

const udayaFamily = [
  {
    name: 'Udaya',
    description: 'master brand',
    active: true
  },
  {
    name: 'Udaya Method™',
    description: 'our framework',
    active: true
  },
  {
    name: 'Udaya Retreats™',
    description: 'experiences',
    active: true
  },
  {
    name: 'Udaya Botanicals™',
    description: 'future products',
    active: false
  },
  {
    name: 'Udaya Circle™',
    description: 'community',
    active: true
  },
  {
    name: 'Udaya Institute™',
    description: 'future training/research',
    active: false
  }
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-16 bg-gradient-to-b from-udaya-cream to-white">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-h1 font-bold text-udaya-charcoal mb-6">
              We Built the Place We Wished Existed
            </h1>
            <p className="text-body-lg text-udaya-charcoal/80">
              Udaya brings together clinicians, counselors, and program designers who believe 
              relief can be lawful, careful, and deeply human. We measure what we do, teach 
              what works, and lead with respect. We're not a hospital or a promise we can't 
              keep—we're a steady hand and a safe plan.
            </p>
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section>
        <Container>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <Card className="h-full">
              <CardHeader>
                <div className="h-12 w-12 bg-udaya-sage/10 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-udaya-sage" />
                </div>
                <CardTitle className="text-h3 font-serif">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-udaya-charcoal/80">
                  A world where those facing serious medical conditions have access to 
                  transformative natural plant-medicine experiences that address body, 
                  mind, and spirit.
                </p>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <div className="h-12 w-12 bg-udaya-sage/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-udaya-sage" />
                </div>
                <CardTitle className="text-h3 font-serif">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-udaya-charcoal/80">
                  We provide residential retreats that combine prescription-based medical 
                  cannabis with practices that calm the mind and nourish the body, empowering 
                  guests with tools, knowledge, and support to navigate their health with 
                  grace, dignity, and peace.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Our Story */}
      <Section variant="cream">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
              Our Story
            </h2>
            <div className="space-y-6 text-udaya-charcoal/80">
              <p className="text-body-lg">
                Coming from the Canadian Medical cannabis regime with over 10 years of experiences 
                helping and dosing Medical clients across Canada. We notice the lack of education 
                and support from the conventional medical community. From a trip to Indonesia, a 
                beautiful partnership began between Body and Mind. Udaya was born.
              </p>
              <p>
                Udaya emerged from a simple observation: while medical cannabis was becoming legal 
                worldwide, those who needed it most—people with cancer, chronic pain, neurological 
                conditions—had nowhere to go to learn how to use it properly, safely, and transformatively.
              </p>
              <p>
                We watched as patients received prescriptions with little guidance. We saw the 
                isolation of serious illness compounded by confusion. We recognized that healing 
                requires more than medicine—it requires environment, support, and integration.
              </p>
              <p>
                Thailand, with its progressive cannabis laws, Buddhist healing traditions, and 
                culture of compassionate care, became the natural home for our vision.
              </p>
              <Card className="mt-8 bg-udaya-sage/5 border-udaya-sage/20">
                <CardHeader>
                  <CardTitle className="text-lg">Our hopes and dreams for the future:</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-udaya-charcoal/80">
                    That Medical cannabis can be accessible to anyone that needs the healing power 
                    of this beautiful plant. Accessibility should not be dedicated to laws, race, 
                    genders or economics, anyone who wishes to use this natural plant as medicine 
                    should be able to do so without any restrictions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Values */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 bg-udaya-sage text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-udaya-charcoal/70">{value.description}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* The Udaya Family */}
      <Section variant="cream">
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-12">
            The Udaya Family
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {udayaFamily.map((item, index) => (
              <Card key={index} className={!item.active ? 'opacity-60' : ''}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {item.name}
                    {!item.active && (
                      <span className="text-xs bg-udaya-sage/10 text-udaya-sage px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-h2 font-bold text-udaya-charcoal mb-6">
              Join Us on This Journey
            </h2>
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              Whether you're seeking healing for yourself or a loved one, we're here to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/method">Learn About Our Method</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/retreats">View Retreats</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}