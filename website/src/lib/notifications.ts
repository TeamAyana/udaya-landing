/**
 * Notification Helper Functions
 * Create notifications for admin dashboard
 */

import { adminDb } from './firebase-admin'

export interface CreateNotificationParams {
  type: 'waitlist' | 'contact' | 'referral' | 'newsletter'
  title: string
  message: string
  link: string
  data?: any
}

/**
 * Create a new notification in Firebase
 */
export async function createNotification(params: CreateNotificationParams): Promise<boolean> {
  try {
    if (!adminDb) {
      console.warn('⚠️ Firebase Admin not initialized, skipping notification creation')
      return false
    }

    const notification = {
      type: params.type,
      title: params.title,
      message: params.message,
      link: params.link,
      data: params.data || {},
      read: false,
      createdAt: new Date().toISOString()
    }

    await adminDb.collection('notifications').add(notification)
    console.log(`✅ Created ${params.type} notification: ${params.title}`)
    return true
  } catch (error) {
    console.error('❌ Error creating notification:', error)
    return false
  }
}

/**
 * Create waitlist notification
 */
export async function createWaitlistNotification(data: {
  fullName: string
  email: string
  waitlistNumber: number
  retreatInterest: string
}) {
  return createNotification({
    type: 'waitlist',
    title: `New Waitlist Entry #${data.waitlistNumber}`,
    message: `${data.fullName} joined the waitlist for ${data.retreatInterest}`,
    link: '/admin/dashboard/subscribers',
    data: {
      name: data.fullName,
      email: data.email,
      waitlistNumber: data.waitlistNumber,
      program: data.retreatInterest
    }
  })
}

/**
 * Create contact form notification
 */
export async function createContactNotification(data: {
  name: string
  email: string
  subject: string
  userType: string
}) {
  return createNotification({
    type: 'contact',
    title: 'New Contact Form Submission',
    message: `${data.name} sent a message: "${data.subject}"`,
    link: '/admin/dashboard/contacts',
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      userType: data.userType
    }
  })
}

/**
 * Create referral/partnership notification
 */
export async function createReferralNotification(data: {
  name: string
  email: string
  role: string
  organization?: string
}) {
  const roleLabel = {
    physician: 'Physician/Oncologist',
    healthcare: 'Healthcare Provider',
    therapist: 'Therapist/Counselor',
    advocate: 'Patient Advocate',
    organization: 'Support Organization',
    other: 'Professional'
  }[data.role] || 'Partner'

  const orgText = data.organization ? ` from ${data.organization}` : ''

  return createNotification({
    type: 'referral',
    title: 'New Partnership Inquiry',
    message: `${data.name}${orgText} (${roleLabel}) wants to partner`,
    link: '/admin/dashboard/referrals',
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      organization: data.organization
    }
  })
}

/**
 * Create newsletter subscription notification
 */
export async function createNewsletterNotification(data: {
  email: string
  source: string
}) {
  return createNotification({
    type: 'newsletter',
    title: 'New Newsletter Subscriber',
    message: `${data.email} subscribed to the newsletter`,
    link: '/admin/dashboard/subscribers',
    data: {
      email: data.email,
      source: data.source
    }
  })
}
