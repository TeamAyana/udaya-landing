import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-udaya-cream/50 to-white">
        <Container>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-udaya-sage hover:text-udaya-sage/80 transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-h1 font-serif text-udaya-charcoal mb-8">Terms of Service</h1>
          
          <div className="prose prose-udaya max-w-4xl">
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              Last updated: January 2025
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              By accessing or using Udaya's website, services, or participating in our programs, you agree 
              to be bound by these Terms of Service. If you do not agree to these terms, please do not use 
              our services.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              2. Description of Services
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              Udaya provides holistic wellness retreats in Thailand that combine medical cannabis therapy 
              with supportive care for individuals with cancer, chronic pain, and serious illnesses. Our 
              services include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Medical consultations with licensed Thai physicians</li>
              <li>Prescription and supervised use of medical cannabis</li>
              <li>Supportive therapies and wellness activities</li>
              <li>Accommodation and meals during retreat programs</li>
              <li>Educational resources and ongoing support</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              3. Eligibility and Clinical Approval
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              To participate in Udaya retreats, you must:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Be at least 18 years of age</li>
              <li>Complete our medical screening process</li>
              <li>Receive clinical approval from our medical team</li>
              <li>Provide accurate and complete health information</li>
              <li>Have a qualifying medical condition</li>
              <li>Be able to travel to Thailand</li>
            </ul>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We reserve the right to deny participation based on medical or safety considerations.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              4. Medical Services and Limitations
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              While Udaya provides medical cannabis therapy under physician supervision, we are not a 
              replacement for your primary healthcare. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Our services are adjunctive and supportive in nature</li>
              <li>We do not claim to cure any disease</li>
              <li>You should maintain care with your regular healthcare providers</li>
              <li>Medical cannabis may not be suitable for everyone</li>
              <li>Individual results vary significantly</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              5. Participant Responsibilities
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              As a participant, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Provide truthful and complete medical information</li>
              <li>Follow all medical advice and program guidelines</li>
              <li>Inform staff of any changes in your health condition</li>
              <li>Respect other participants and staff</li>
              <li>Comply with Thai laws and regulations</li>
              <li>Not share or distribute medical cannabis provided to you</li>
              <li>Maintain confidentiality of other participants</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              6. Payment and Refund Policy
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              Payment terms:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Full payment is required to secure your retreat placement</li>
              <li>Prices are quoted in USD but may be paid in other currencies</li>
              <li>Refunds are available up to 30 days before retreat start date</li>
              <li>Within 30 days, refunds are at our discretion based on circumstances</li>
              <li>No refunds for early departure from programs</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              All content on the Udaya website and in our programs, including text, graphics, logos, images, 
              and software, is the property of Udaya or its content suppliers and is protected by international 
              copyright laws.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              8. Privacy and Confidentiality
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which is incorporated into 
              these Terms of Service by reference. We maintain strict confidentiality of all participant 
              medical information in accordance with healthcare privacy laws.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              9. Assumption of Risk
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              You acknowledge that participation in our programs involves certain risks, including but not 
              limited to adverse reactions to medical cannabis, interactions with other medications, and 
              risks associated with international travel. You voluntarily assume these risks.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              To the maximum extent permitted by law, Udaya and its officers, directors, employees, and 
              agents shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages arising out of or related to your use of our services, even if advised of the 
              possibility of such damages.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              11. Indemnification
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              You agree to indemnify and hold harmless Udaya and its affiliates from any claims, damages, 
              or expenses arising from your violation of these terms, misuse of our services, or violation 
              of any laws or rights of third parties.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              12. Thai Law Compliance
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              All services are provided in compliance with Thai medical cannabis laws and regulations. 
              You agree to comply with all applicable Thai laws during your participation in our programs.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              13. Termination
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We reserve the right to terminate your participation in our programs at any time for violation 
              of these terms, safety concerns, or disruptive behavior. In such cases, no refund will be provided.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              14. Modifications to Terms
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We may modify these Terms of Service at any time. Changes will be effective immediately upon 
              posting to our website. Your continued use of our services constitutes acceptance of the 
              modified terms.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              15. Governing Law
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              These Terms of Service are governed by the laws of Thailand. Any disputes arising from these 
              terms shall be resolved in the courts of Thailand.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              16. Contact Information
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              For questions about these Terms of Service, please contact us:
            </p>
            <p className="text-body text-udaya-charcoal/80">
              Email: <a href="mailto:team@udaya.one" className="text-udaya-sage hover:underline">team@udaya.one</a><br />
              Phone: <a href="tel:+16477730296" className="text-udaya-sage hover:underline">+1 (647) 773-0296</a><br />
              Address: Prachuap Khiri Khan Province, Thailand
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}