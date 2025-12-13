import { Shield, Stethoscope, Heart } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export function TrustSection() {
  const features = [
    {
      icon: Stethoscope,
      title: 'Medically Supervised',
      description:
        'Licensed practitioner oversight and a nurse on staff throughout your stay.',
    },
    {
      icon: Shield,
      title: 'Legally Compliant',
      description:
        'Programs operate within Thailand\'s medical cannabis framework with prescription-based access.',
    },
    {
      icon: Heart,
      title: 'Deeply Compassionate',
      description:
        'Small cohorts (max 20) so every person feels seen and supported.',
    },
  ]

  return (
    <Section variant="cream">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">
            Medically supervised. Legally compliant. Deeply compassionate.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-udaya-sage text-white">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-h3 font-semibold text-udaya-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-3 text-body text-udaya-charcoal/70">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}