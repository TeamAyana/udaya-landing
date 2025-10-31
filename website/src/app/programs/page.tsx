import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { MapPin, Users, Calendar } from 'lucide-react'

export default function ProgramsPage() {
  return (
    <>
      <Section className="pt-32 pb-12 bg-gradient-to-b from-white to-udaya-cream/20">
        <Container>
          <h1 className="text-4xl md:text-5xl font-serif text-center mb-6 text-udaya-charcoal">
            Our Programs
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Comprehensive medical cannabis retreats designed to support your healing journey
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cancer Program Card */}
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-4 right-4">
                <Badge className="bg-udaya-sage text-white">
                  Now Accepting Waitlist
                </Badge>
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-2xl font-serif text-udaya-charcoal">
                  Cancer Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  A 10-day, small-cohort retreat focused on education, safe protocols,
                  and support for people navigating cancer.
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-udaya-sage flex-shrink-0" />
                    <span>Location: Thailand (final venue to be announced)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-udaya-sage flex-shrink-0" />
                    <span>Cohort size: up to 20</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-udaya-sage flex-shrink-0" />
                    <span>Opening 2026</span>
                  </p>
                </div>
                <Button asChild className="w-full bg-udaya-sage hover:bg-udaya-sage/90">
                  <Link href="/programs/cancer">Join Waitlist</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Chronic Pain Program Card */}
            <Card className="relative overflow-hidden opacity-75 hover:opacity-90 transition-opacity">
              <div className="absolute top-4 right-4">
                <Badge variant="outline">In Development</Badge>
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-2xl font-serif text-udaya-charcoal">
                  Chronic Pain Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Specialized support for those living with chronic pain conditions,
                  combining medical cannabis education with integrative therapies.
                </CardDescription>
                <p className="text-sm text-gray-500 mb-6">
                  Program details coming soon.
                </p>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Neurological Program Card */}
            <Card className="relative overflow-hidden opacity-75 hover:opacity-90 transition-opacity">
              <div className="absolute top-4 right-4">
                <Badge variant="outline">In Development</Badge>
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-2xl font-serif text-udaya-charcoal">
                  Neurological Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Supporting individuals with neurological conditions through
                  medical cannabis education and holistic wellness practices.
                </CardDescription>
                <p className="text-sm text-gray-500 mb-6">
                  Program details coming soon.
                </p>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Future Programs Section */}
      <Section id="future" className="bg-gray-50">
        <Container>
          <h2 className="text-3xl font-serif text-center mb-8 text-udaya-charcoal">
            Future Programs in Development
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            We are actively developing additional programs to support various
            health conditions. Join our mailing list to be notified when new
            programs become available.
          </p>
          <div className="text-center">
            <Button asChild className="bg-udaya-sage hover:bg-udaya-sage/90">
              <Link href="/waitlist">Join Our Mailing List</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}