import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
          
          <h1 className="text-h1 font-serif text-udaya-charcoal mb-8">Privacy Policy</h1>
          
          <div className="prose prose-udaya max-w-4xl">
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              Last updated: January 2025
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Introduction
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              At Udaya, we are committed to protecting your privacy and ensuring the security of your personal 
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website or participate in our programs.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Information We Collect
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              We may collect the following types of information:
            </p>
            
            <h3 className="text-xl font-semibold text-udaya-charcoal mt-8 mb-3">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Name and contact details (email, phone number, address)</li>
              <li>Date of birth and identification information</li>
              <li>Emergency contact information</li>
              <li>Passport or ID details (for retreat participants)</li>
            </ul>

            <h3 className="text-xl font-semibold text-udaya-charcoal mt-8 mb-3">
              Health Information
            </h3>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Medical history and current health conditions</li>
              <li>Current medications and treatments</li>
              <li>Allergies and dietary restrictions</li>
              <li>Mental health information relevant to program participation</li>
              <li>Treatment outcomes and progress notes</li>
            </ul>

            <h3 className="text-xl font-semibold text-udaya-charcoal mt-8 mb-3">
              Automatically Collected Information
            </h3>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Website usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>To assess your eligibility for our programs</li>
              <li>To provide medical cannabis treatment and supportive care</li>
              <li>To communicate with you about your participation</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To improve our services and programs</li>
              <li>To ensure your safety and well-being during retreats</li>
              <li>For research purposes (with your consent and anonymized)</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Information Sharing and Disclosure
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Licensed medical professionals involved in your care</li>
              <li>Thai health authorities as required by law</li>
              <li>Emergency services in case of medical emergencies</li>
              <li>Service providers who assist in our operations (under strict confidentiality agreements)</li>
              <li>Legal authorities when required by law or court order</li>
            </ul>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We will never sell your personal information to third parties.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Data Security
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information, 
              including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure servers and databases</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Regular security assessments and updates</li>
              <li>Staff training on data protection and confidentiality</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Data Retention
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes outlined 
              in this policy, comply with legal obligations, and resolve disputes. Medical records are retained 
              in accordance with Thai healthcare regulations.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Your Rights
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Restrict or object to certain processing</li>
              <li>Receive a copy of your data in a portable format</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              International Data Transfers
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              If you are accessing our services from outside Thailand, please be aware that your information 
              may be transferred to, stored, and processed in Thailand where our facilities are located. 
              By using our services, you consent to this transfer.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Children's Privacy
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect 
              personal information from children under 18.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Contact Us
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
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