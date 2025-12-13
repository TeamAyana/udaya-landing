import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import { MapPin, Users } from 'lucide-react'

const programs = [
  {
    title: 'Chronic Pain Program',
    description: 'A 10-day, small-cohort retreat focused on education, safe protocols, and support for people navigating cancer.',
    location: 'Thailand (final venue to be announced)',
    participants: '1 / 20',
    badge: 'Accepting Patients Now',
    image: '/uploads/chronic.jpg',
    link: '/programs/chronic-pain',
  },
  {
    title: 'Cancer Retreat',
    description: 'A 10-day, small-cohort retreat focused on education, safe protocols, and support for people navigating cancer.',
    location: 'Thailand (final venue to be announced)',
    participants: '6 / 20',
    badge: 'Accepting Patients Now',
    image: '/uploads/cancer_retreat.jpg',
    link: '/programs/cancer-retreat',
  },
  {
    title: 'Parkinson Retreat',
    description: 'A 10-day, small-cohort retreat focused on education, safe protocols, and support for people navigating cancer.',
    location: 'Thailand (final venue to be announced)',
    participants: '2 / 20',
    badge: 'Accepting Patients Now',
    image: '/uploads/parkinsons.jpg',
    link: '/programs/parkinson-retreat',
  },
]

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

      <Section className="bg-udaya-cream/30">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Content */}
                <div className="p-6 pb-5">
                  <h3 className="font-serif text-[22px] font-semibold text-udaya-charcoal mb-4 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-[13px] text-udaya-charcoal/70 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Details */}
                <div className="px-6 pb-5 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-udaya-charcoal/60">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-udaya-sage" />
                    <span><strong>Location:</strong> {program.location}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-udaya-charcoal/60">
                      <Users className="h-3.5 w-3.5 flex-shrink-0 text-udaya-sage" />
                      <span><strong>Participant:</strong> {program.participants}</span>
                    </div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-udaya-sage/10 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-udaya-sage" />
                      <span className="text-xs text-udaya-sage font-medium">{program.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden px-6 pb-5">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* View Details Button */}
                <div className="px-6 pb-6">
                  <Link
                    href={program.link}
                    className="block w-full text-center py-3 rounded-full border border-udaya-sage text-udaya-sage font-medium hover:bg-udaya-sage hover:text-white transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mailing List Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-body-lg text-udaya-charcoal/80 mb-8 leading-relaxed">
              We are actively developing additional programs to support various health conditions. Join our mailing list to be notified when new programs become available.
            </p>
            <Link
              href="/inquiry"
              className="inline-block bg-udaya-sage hover:bg-udaya-sage/90 text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join Our Mailing List
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}