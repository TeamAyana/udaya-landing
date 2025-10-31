/**
 * Resend Email Integration
 * Handles transactional emails for all forms (waitlist, contact, referrals)
 */

import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WaitlistConfirmationEmail } from './emails/waitlist-confirmation'
import { AdminNotificationEmail } from './emails/admin-notification'
import { ContactConfirmationEmail } from './emails/contact-confirmation'
import { ContactAdminNotificationEmail } from './emails/contact-admin-notification'
import { ReferralConfirmationEmail } from './emails/referral-confirmation'
import { ReferralAdminNotificationEmail } from './emails/referral-admin-notification'

const resend = new Resend(process.env.RESEND_API_KEY)

interface WaitlistData {
  fullName: string
  email: string
  phone: string
  country: string
  age: string
  diagnosis: string
  diagnosisDate: string
  currentTreatments: string
  cannabisExperience: string
  retreatInterest: string
  waitlistNumber?: number
}

/**
 * Send confirmation email to user who joined waitlist
 */
export async function sendWaitlistConfirmation(
  data: WaitlistData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const nameParts = data.fullName.trim().split(' ')
    const firstName = nameParts[0]

    // Render React component to HTML
    const emailHtml = await render(
      <WaitlistConfirmationEmail
        firstName={firstName}
        waitlistNumber={data.waitlistNumber || 0}
        diagnosis={data.diagnosis}
        retreatInterest={data.retreatInterest}
      />
    )

    const response = await resend.emails.send({
      from: 'Udaya <team@udaya.one>',
      to: data.email,
      subject: `Welcome to Udaya - You're #${data.waitlistNumber} on the waitlist`,
      html: emailHtml,
      replyTo: 'team@udaya.one',
      tags: [
        { name: 'type', value: 'waitlist-confirmation' },
        { name: 'program', value: data.retreatInterest }
      ]
    })

    if (response.error) {
      console.error('❌ Resend error (user confirmation):', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Confirmation email sent to:', data.email, 'ID:', response.data?.id)
    return { success: true, messageId: response.data?.id }
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Send admin notification when someone joins waitlist
 */
export async function sendAdminWaitlistNotification(
  data: WaitlistData,
  adminEmail: string = 'team@udaya.one'
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    // Render React component to HTML
    const emailHtml = await render(
      <AdminNotificationEmail
        waitlistNumber={data.waitlistNumber || 0}
        fullName={data.fullName}
        email={data.email}
        phone={data.phone}
        country={data.country}
        age={data.age}
        diagnosis={data.diagnosis}
        diagnosisDate={data.diagnosisDate}
        currentTreatments={data.currentTreatments}
        cannabisExperience={data.cannabisExperience}
        retreatInterest={data.retreatInterest}
        timestamp={new Date().toISOString()}
      />
    )

    const response = await resend.emails.send({
      from: 'Udaya Waitlist <team@udaya.one>',
      to: adminEmail,
      subject: `🎯 New Waitlist Entry #${data.waitlistNumber} - ${data.fullName}`,
      html: emailHtml,
      replyTo: data.email,
      tags: [
        { name: 'type', value: 'admin-notification' },
        { name: 'program', value: data.retreatInterest }
      ]
    })

    if (response.error) {
      console.error('❌ Resend error (admin notification):', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Admin notification sent to:', adminEmail, 'ID:', response.data?.id)
    return { success: true, messageId: response.data?.id }
  } catch (error) {
    console.error('❌ Error sending admin notification:', error)
    return { success: false, error: String(error) }
  }
}

// ===========================
// CONTACT FORM EMAILS
// ===========================

interface ContactData {
  name: string
  email: string
  country: string
  userType: 'patient' | 'caregiver' | 'clinician' | 'other'
  subject: string
  message: string
}

/**
 * Send confirmation email to user who submitted contact form
 */
export async function sendContactConfirmation(
  data: ContactData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const emailHtml = await render(
      <ContactConfirmationEmail
        name={data.name}
        subject={data.subject}
        userType={data.userType}
      />
    )

    const response = await resend.emails.send({
      from: 'Udaya <team@udaya.one>',
      to: data.email,
      subject: 'Thank you for contacting Udaya - We\'ll be in touch soon',
      html: emailHtml,
      replyTo: 'team@udaya.one',
      tags: [
        { name: 'type', value: 'contact-confirmation' },
        { name: 'user-type', value: data.userType }
      ]
    })

    if (response.error) {
      console.error('❌ Resend error (contact confirmation):', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Contact confirmation sent to:', data.email, 'ID:', response.data?.id)
    return { success: true, messageId: response.data?.id }
  } catch (error) {
    console.error('❌ Error sending contact confirmation:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Send admin notification for contact form submission
 */
export async function sendContactAdminNotification(
  data: ContactData,
  adminEmail: string = 'team@udaya.one'
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const emailHtml = await render(
      <ContactAdminNotificationEmail
        name={data.name}
        email={data.email}
        country={data.country}
        userType={data.userType}
        subject={data.subject}
        message={data.message}
        timestamp={new Date().toISOString()}
      />
    )

    const response = await resend.emails.send({
      from: 'Udaya Contact Form <team@udaya.one>',
      to: adminEmail,
      subject: `📨 New Contact Form - ${data.subject}`,
      html: emailHtml,
      replyTo: data.email,
      tags: [
        { name: 'type', value: 'contact-admin-notification' },
        { name: 'user-type', value: data.userType }
      ]
    })

    if (response.error) {
      console.error('❌ Resend error (contact admin):', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Contact admin notification sent to:', adminEmail, 'ID:', response.data?.id)
    return { success: true, messageId: response.data?.id }
  } catch (error) {
    console.error('❌ Error sending contact admin notification:', error)
    return { success: false, error: String(error) }
  }
}

// ===========================
// REFERRAL FORM EMAILS
// ===========================

interface ReferralData {
  name: string
  email: string
  phone?: string
  country: string
  organization?: string
  role: string
  message: string
}

/**
 * Send confirmation email to referral partner
 */
export async function sendReferralConfirmation(
  data: ReferralData
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const emailHtml = await render(
      <ReferralConfirmationEmail
        name={data.name}
        role={data.role}
        organization={data.organization}
      />
    )

    const response = await resend.emails.send({
      from: 'Udaya Partnerships <team@udaya.one>',
      to: data.email,
      subject: 'Welcome to the Udaya Partnership Community',
      html: emailHtml,
      replyTo: 'team@udaya.one',
      tags: [
        { name: 'type', value: 'referral-confirmation' },
        { name: 'role', value: data.role }
      ]
    })

    if (response.error) {
      console.error('❌ Resend error (referral confirmation):', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Referral confirmation sent to:', data.email, 'ID:', response.data?.id)
    return { success: true, messageId: response.data?.id }
  } catch (error) {
    console.error('❌ Error sending referral confirmation:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Send admin notification for referral partnership inquiry
 */
export async function sendReferralAdminNotification(
  data: ReferralData,
  adminEmail: string = 'team@udaya.one'
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const emailHtml = await render(
      <ReferralAdminNotificationEmail
        name={data.name}
        email={data.email}
        phone={data.phone}
        country={data.country}
        organization={data.organization}
        role={data.role}
        message={data.message}
        timestamp={new Date().toISOString()}
      />
    )

    const response = await resend.emails.send({
      from: 'Udaya Partnerships <team@udaya.one>',
      to: adminEmail,
      subject: `🤝 New Partnership Inquiry - ${data.name}`,
      html: emailHtml,
      replyTo: data.email,
      tags: [
        { name: 'type', value: 'referral-admin-notification' },
        { name: 'role', value: data.role }
      ]
    })

    if (response.error) {
      console.error('❌ Resend error (referral admin):', response.error)
      return { success: false, error: response.error.message }
    }

    console.log('✅ Referral admin notification sent to:', adminEmail, 'ID:', response.data?.id)
    return { success: true, messageId: response.data?.id }
  } catch (error) {
    console.error('❌ Error sending referral admin notification:', error)
    return { success: false, error: String(error) }
  }
}
