import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface NewsletterConfirmationEmailProps {
  email: string
  unsubscribeToken?: string
}

export const NewsletterConfirmationEmail = ({
  email,
  unsubscribeToken = ''
}: NewsletterConfirmationEmailProps) => {
  const unsubscribeUrl = `https://www.udaya.one/newsletter/unsubscribe?token=${unsubscribeToken}`

  return (
    <Html>
      <Head />
      <Preview>Welcome to the Udaya Wellness Newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://www.udaya.one/uploads/logo.png"
              alt="Udaya"
              style={logo}
            />
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={heading}>Welcome to Our Wellness Community 🌿</Heading>
            <Text style={paragraph}>
              Thank you for subscribing to the Udaya newsletter! We're thrilled to have you join our community of wellness seekers.
            </Text>
          </Section>

          {/* What to Expect */}
          <Section style={contentSection}>
            <Heading style={subheading}>What You'll Receive:</Heading>
            <Text style={listItem}>
              ✨ <strong>Weekly Wellness Insights</strong> - Evidence-based articles on medical cannabis, integrative health, and holistic healing
            </Text>
            <Text style={listItem}>
              🌱 <strong>Healing Stories</strong> - Transformative journeys from our community members
            </Text>
            <Text style={listItem}>
              🧘 <strong>Expert Guidance</strong> - Tips from healthcare professionals and wellness practitioners
            </Text>
            <Text style={listItem}>
              🏝️ <strong>Retreat Updates</strong> - Exclusive early access to our wellness retreats in Thailand
            </Text>
          </Section>

          <Hr style={divider} />

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={paragraph}>
              While you're here, explore our latest articles on the blog:
            </Text>
            <Link href="https://www.udaya.one/blog" style={button}>
              Read the Blog
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this email because you subscribed to the Udaya newsletter at{' '}
              <strong>{email}</strong>
            </Text>
            <Text style={footerText}>
              Udaya Wellness Retreat<br />
              Hua Hin, Thailand
            </Text>
            <Text style={footerLinks}>
              <Link href="https://www.udaya.one" style={footerLink}>
                Visit Website
              </Link>
              {' • '}
              <Link href="https://www.udaya.one/contact" style={footerLink}>
                Contact Us
              </Link>
              {' • '}
              <Link href={unsubscribeUrl} style={footerLink}>
                Unsubscribe
              </Link>
            </Text>
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} Udaya. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterConfirmationEmail

// Styles
const main = {
  backgroundColor: '#F6F2E6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  backgroundColor: '#FFFFFF',
}

const header = {
  textAlign: 'center' as const,
  padding: '20px 0',
}

const logo = {
  width: '120px',
  height: 'auto',
  margin: '0 auto',
}

const heroSection = {
  textAlign: 'center' as const,
  padding: '40px 20px',
  backgroundColor: '#F6F2E6',
  borderRadius: '8px',
  margin: '20px 0',
}

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#2B2B2B',
  margin: '0 0 20px 0',
  lineHeight: '1.3',
}

const subheading = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#5C7B65',
  margin: '0 0 16px 0',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#2B2B2B',
  margin: '0 0 16px 0',
}

const contentSection = {
  padding: '20px 0',
}

const listItem = {
  fontSize: '15px',
  lineHeight: '1.8',
  color: '#2B2B2B',
  margin: '0 0 12px 0',
}

const divider = {
  borderColor: '#E5E7EB',
  margin: '30px 0',
}

const ctaSection = {
  textAlign: 'center' as const,
  padding: '20px 0',
}

const button = {
  backgroundColor: '#5C7B65',
  borderRadius: '8px',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  margin: '10px 0',
}

const footer = {
  textAlign: 'center' as const,
  padding: '20px 0',
}

const footerText = {
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#6B7280',
  margin: '0 0 8px 0',
}

const footerLinks = {
  fontSize: '13px',
  color: '#6B7280',
  margin: '16px 0 8px 0',
}

const footerLink = {
  color: '#5C7B65',
  textDecoration: 'none',
}

const footerCopyright = {
  fontSize: '12px',
  color: '#9CA3AF',
  margin: '16px 0 0 0',
}
