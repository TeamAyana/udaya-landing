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
            Restore What Disease Disrupts
          </h2>
          <p className="mt-6 text-body-lg text-udaya-charcoal/80">
            The Udaya Method™ doesn\'t wage war on your body - it restores harmony within it. Medical cannabis for physical healing, mindfulness practices for mental clarity, community for spiritual connection. Three interwoven approaches that treat you as you actually are: complex, complete, and capable of profound healing.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {UDAYA_METHOD_PILLARS.map((pillar, index) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap]
            return (
              <Card 
                key={index} 
                hover3d
                className="group relative overflow-hidden border-0 shadow-lg animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-udaya-sage/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-udaya-sage/20 to-udaya-gold/20 text-udaya-sage group-hover:from-udaya-sage group-hover:to-udaya-sage/80 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-udaya-sage group-hover:text-udaya-sage/90 transition-colors">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
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