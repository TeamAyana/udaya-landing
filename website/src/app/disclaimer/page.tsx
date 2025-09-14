import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function MedicalDisclaimerPage() {
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
          
          <h1 className="text-h1 font-serif text-udaya-charcoal mb-8">Medical Disclaimer</h1>
          
          <div className="prose prose-udaya max-w-4xl">
            <p className="text-body-lg text-udaya-charcoal/80 mb-8">
              Last updated: January 2025
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              General Medical Information
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              The information provided by Udaya, including but not limited to text, graphics, images, 
              and other material contained on this website and within our programs, is for informational 
              and educational purposes only.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Not Medical Advice
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              The content provided by Udaya is not intended to be a substitute for professional medical 
              advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified 
              health provider with any questions you may have regarding a medical condition. Never disregard 
              professional medical advice or delay in seeking it because of something you have read on this 
              website or learned through our programs.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Medical Cannabis Use
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              All medical cannabis treatments at Udaya are prescribed and supervised by licensed Thai physicians 
              in full compliance with Thai regulations. Cannabis-based treatments are not suitable for everyone 
              and may have side effects. Individual responses to cannabis vary significantly.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              No Cure Claims
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              Udaya does not claim to diagnose, treat, cure, or prevent any disease. Our programs provide 
              adjunctive supportive care designed to complement, not replace, conventional medical treatment. 
              We strongly encourage all participants to maintain relationships with their primary healthcare providers.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Emergency Medical Situations
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              If you think you may have a medical emergency, call your doctor, go to the emergency department, 
              or call emergency services immediately. Reliance on any information provided by Udaya is solely 
              at your own risk.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Clinical Approval Required
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              Participation in Udaya retreats requires clinical approval. Not all applicants will be approved 
              for participation. Our clinical team reserves the right to decline participation based on medical 
              history, current medications, or other health factors.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Thai Legal Compliance
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              Udaya operates in full compliance with Thai medical cannabis regulations. This includes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-udaya-charcoal/80">
              <li>Prescription-based access only</li>
              <li>Licensed dispensing by qualified professionals</li>
              <li>Restrictions on public use</li>
              <li>Compliance with advertising regulations</li>
            </ul>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              To the maximum extent permitted by law, Udaya, its officers, directors, employees, and agents 
              shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, 
              use, goodwill, or other intangible losses.
            </p>

            <h2 className="text-h3 font-serif text-udaya-charcoal mt-12 mb-4">
              Contact Information
            </h2>
            <p className="text-body text-udaya-charcoal/80 mb-6">
              If you have any questions about this Medical Disclaimer, please contact us at:
            </p>
            <p className="text-body text-udaya-charcoal/80">
              Email: info@udaya.health<br />
              WhatsApp: +66 65 829 5454
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}