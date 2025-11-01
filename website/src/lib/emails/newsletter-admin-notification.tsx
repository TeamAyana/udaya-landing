import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from '@react-email/components'

interface NewsletterAdminNotificationEmailProps {
  email: string
  subscribedAt: string
  source: string
  totalSubscribers?: number
}

export const NewsletterAdminNotificationEmail = ({
  email,
  subscribedAt,
  source = 'blog',
  totalSubscribers
}: NewsletterAdminNotificationEmailProps) => {
  const dashboardUrl = 'https://www.udaya.one/admin/dashboard/subscribers'
  const formattedDate = new Date(subscribedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  })

  return (
    <Html>
      <Head />
      <Preview>New newsletter subscription from {email}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={heading}>📧 New Newsletter Subscriber</Heading>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              A new user has subscribed to the Udaya newsletter:
            </Text>

            <Section style={infoBox}>
              <Text style={infoLabel}>Email Address:</Text>
              <Text style={infoValue}>{email}</Text>

              <Text style={infoLabel}>Subscribed At:</Text>
              <Text style={infoValue}>{formattedDate}</Text>

              <Text style={infoLabel}>Source:</Text>
              <Text style={infoValue}>{source.charAt(0).toUpperCase() + source.slice(1)}</Text>

              {totalSubscribers && (
                <>
                  <Text style={infoLabel}>Total Subscribers:</Text>
                  <Text style={infoValue}>{totalSubscribers.toLocaleString()}</Text>
                </>
              )}
            </Section>
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          <Section style={ctaSection}>
            <Text style={paragraph}>
              View all subscribers and manage your newsletter list:
            </Text>
            <Link href={dashboardUrl} style={button}>
              View Dashboard
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from your Udaya admin dashboard.
            </Text>
            <Text style={footerText}>
              <Link href={dashboardUrl} style={footerLink}>
                Admin Dashboard
              </Link>
              {' • '}
              <Link href="https://www.udaya.one" style={footerLink}>
                Website
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterAdminNotificationEmail

// Styles
const main = {
  backgroundColor: '#F3F4F6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const container = {
  margin: '40px auto',
  padding: '40px',
  maxWidth: '600px',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

const header = {
  textAlign: 'center' as const,
  padding: '0 0 30px 0',
}

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2B2B2B',
  margin: '0',
}

const contentSection = {
  padding: '20px 0',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#2B2B2B',
  margin: '0 0 20px 0',
}

const infoBox = {
  backgroundColor: '#F6F2E6',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
}

const infoLabel = {
  fontSize: '13px',
  fontWeight: 'bold',
  color: '#5C7B65',
  margin: '12px 0 4px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
}

const infoValue = {
  fontSize: '16px',
  color: '#2B2B2B',
  margin: '0 0 8px 0',
  fontWeight: '500',
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
  borderTop: '1px solid #E5E7EB',
  marginTop: '40px',
}

const footerText = {
  fontSize: '13px',
  lineHeight: '1.6',
  color: '#6B7280',
  margin: '0 0 8px 0',
}

const footerLink = {
  color: '#5C7B65',
  textDecoration: 'none',
}
