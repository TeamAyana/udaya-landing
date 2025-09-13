import { Shield, Stethoscope, Heart } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export function TrustSection() {
  const features = [
    {
      icon: Stethoscope,
      title: 'Medically Supervised',
      description:
        'On-site medical professionals and registered nurses oversee prescription pathways, monitor responses, and adjust plans as needed.',
    },
    {
      icon: Shield,
      title: 'Legally Compliant',
      description:
        'We operate within Thailand\'s current medical cannabis regulations. Your safety is paramount.',
    },
    {
      icon: Heart,
      title: 'Deeply Compassionate',
      description:
        'Udaya is not a hospital; it is a standards-driven, compassionate adjunct to your existing care.',
    },
  ]

  return (
    <Section variant="cream">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-h2 font-bold text-udaya-charcoal">
            Medically Supervised. Legally Compliant.
            <br />
            Deeply Compassionate.
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
                <h3 className="font-serif text-xl font-semibold text-udaya-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-3 text-udaya-charcoal/70">
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