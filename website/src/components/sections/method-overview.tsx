import Link from 'next/link'
import { Leaf, Brain, Heart, Users } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { UDAYA_METHOD_PILLARS } from '@/lib/constants'

const iconMap = {
  leaf: Leaf,
  brain: Brain,
  heart: Heart,
  users: Users,
}

export function MethodOverview() {
  return (
    <Section variant="cream">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">
            A Comprehensive Path to Peace
          </h2>
          <p className="mt-6 text-body-lg text-udaya-charcoal/80">
            The Udaya Method™ is an integrated framework for the whole person.
            We weave together four pillars to support common cancer‑related
            challenges—scared of the unknown, anxiety, stress, pain, sleep
            disturbance, appetite, nausea and treatment side effects.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {UDAYA_METHOD_PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap]
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-udaya-sage/10 text-udaya-sage group-hover:bg-udaya-sage group-hover:text-white transition-all">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-udaya-sage">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/method"
            className="inline-flex items-center text-udaya-sage hover:underline"
          >
            Learn more about The Udaya Method™ →
          </Link>
        </div>
      </Container>
    </Section>
  )
}