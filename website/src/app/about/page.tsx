import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, Target, Users, Sparkles, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Udaya',
  description: 'Learn about our vision, mission, and the story behind our medical cannabis retreats in Thailand.',
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

const teamMembers = [
  {
    name: 'Jean-Luc',
    title: 'Education & Product',
    bio: 'With over 10 years of experience in the Canadian medical cannabis industry, Jean-Luc brings deep knowledge of dosing protocols, patient education, and product development. He leads our curriculum design and ensures every protocol is evidence-based and compassionate.',
    image: '/uploads/jean 2.jpg',
    tbd: false
  },
  {
    name: 'Andrey',
    title: 'Operations & Co-Facilitation',
    bio: 'Andrey oversees the day-to-day operations of Udaya retreats and co-facilitates healing circles and mindfulness sessions. His background in holistic wellness and program management ensures every retreat runs smoothly and safely.',
    image: '/uploads/andrey 2.jpg',
    tbd: false
  },
  {
    name: 'Chris',
    title: 'Retreat Manager',
    bio: 'Chris manages all aspects of the retreat experience, from pre-arrival support to post-retreat integration. With a commitment to creating sanctuary spaces, Chris ensures every guest feels welcomed, supported, and cared for throughout their journey.',
    image: '/uploads/chris 2.jpg',
    tbd: false
  },
  {
    name: 'Thai Assistant',
    title: 'Guest Support',
    bio: 'Coming soon',
    image: '',
    tbd: true
  },
  {
    name: 'Licensed Thai Practitioner',
    title: 'Medical Oversight',
    bio: 'Coming soon',
    image: '',
    tbd: true
  },
  {
    name: 'Registered Nurse',
    title: 'Medical Support',
    bio: 'Coming soon',
    image: '',
    tbd: true
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
              Udaya brings together healthcare practitioners, counselors, and program designers who believe
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
                Udaya emerged from a simple observation: while medical cannabis was becoming legal
                worldwide, those who needed it most—people with cancer, chronic pain, neurological
                conditions—had nowhere to go to learn how to use it properly, safely, and transformatively.
              </p>
              <p>
                Drawing on over 10 years of experience working with clients in the Canadian medical cannabis
                industry, we noticed a consistent gap: patients received prescriptions with little guidance.
                We saw the isolation of serious illness compounded by confusion. We recognized that healing
                requires more than medicine—it requires environment, education, support, and integration.
              </p>
              <p>
                Thailand, with its progressive medical cannabis laws, Buddhist healing traditions, and
                culture of compassionate care, became the natural home for our vision. Udaya was born
                from a partnership between experienced practitioners committed to bridging the gap between
                plant medicine and professional, holistic care.
              </p>
              <Card className="mt-8 bg-udaya-sage/5 border-udaya-sage/20">
                <CardHeader>
                  <CardTitle className="text-lg">Our Vision for the Future</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-udaya-charcoal/80">
                    We believe medical cannabis should be accessible to anyone who needs the healing power
                    of this plant. Access should not be limited by laws, race, gender, or economics. Anyone
                    who wishes to use this natural plant as medicine should be able to do so safely, legally,
                    and with proper professional support.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Team */}
      <Section>
        <Container>
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal text-center mb-4">
            Our Team
          </h2>
          <p className="text-center text-udaya-charcoal/70 mb-12 max-w-2xl mx-auto">
            Meet the people dedicated to supporting your healing journey with expertise, compassion, and care.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.filter(m => !m.tbd).map((member, index) => (
              <Card key={index} className="group hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">
                    <div className="w-full aspect-square bg-gradient-to-br from-udaya-sage/20 to-udaya-gold/10 rounded-lg overflow-hidden relative group/image">
                      {member.image ? (
                        <>
                          <Image
                            src={member.image}
                            alt={`${member.name} - ${member.title}`}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          {/* Visible gradient overlay - sage to gold diagonal */}
                          <div
                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                            style={{
                              background: 'linear-gradient(135deg, rgba(92, 123, 101, 0.35) 0%, rgba(92, 123, 101, 0.15) 40%, transparent 50%, rgba(217, 164, 65, 0.15) 70%, rgba(217, 164, 65, 0.25) 100%)',
                              mixBlendMode: 'multiply'
                            }}
                          />
                          {/* Subtle vignette effect */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: 'radial-gradient(circle at center, transparent 40%, rgba(92, 123, 101, 0.15) 100%)'
                            }}
                          />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="h-20 w-20 text-udaya-sage/40" />
                        </div>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-serif">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-udaya-sage font-medium">
                    {member.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-udaya-charcoal/70">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TBD Roles - Compact Format */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="font-serif text-xl font-semibold text-udaya-charcoal text-center mb-6">
              Additional Team Members (Coming Soon)
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {teamMembers.filter(m => m.tbd).map((member, index) => (
                <div key={index} className="text-center p-4 bg-udaya-sage/5 rounded-lg border border-udaya-sage/10">
                  <p className="font-semibold text-udaya-charcoal mb-1">{member.name}</p>
                  <p className="text-sm text-udaya-sage">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Values */}
      <Section variant="cream">
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
      <Section>
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
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}