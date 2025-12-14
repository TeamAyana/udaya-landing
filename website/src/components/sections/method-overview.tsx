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
    <Section variant="cream" className="py-12 sm:py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center px-4">
          <h2 className="font-serif font-bold text-udaya-charcoal mb-4 sm:mb-5 text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.2] tracking-tight">
            Restore What Disease Disrupts
          </h2>
          <p className="text-[15px] sm:text-base md:text-[17px] text-udaya-charcoal/70 max-w-3xl mx-auto leading-[1.65] font-normal">
            The Udaya Method™ doesn't wage war on your body—it restores harmony within it. Medical cannabis for physical healing, mindfulness practices for mental clarity, community for spiritual connection. Three interwoven approaches that treat you as you actually are: complex, complete, and capable of profound healing.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3 px-4 sm:px-0">
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
                  <div className="mb-4 sm:mb-5 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-udaya-sage to-udaya-sage/80 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <CardTitle className="text-xl sm:text-[22px] font-semibold text-udaya-charcoal tracking-tight group-hover:text-udaya-sage/90 transition-colors">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[14px] sm:text-[15px] text-udaya-charcoal/65 leading-relaxed font-normal">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <Link
            href="/method"
            className="inline-flex items-center text-udaya-sage hover:underline text-sm sm:text-base"
          >
            Learn more about The Udaya Method™ →
          </Link>
        </div>
      </Container>
    </Section>
  )
}