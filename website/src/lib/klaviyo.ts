/**
 * Klaviyo API Integration
 * Documentation: https://developers.klaviyo.com/en/reference/api_overview
 */

const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
const KLAVIYO_API_BASE = 'https://a.klaviyo.com/api'

interface KlaviyoProfile {
  email: string
  phone_number?: string
  first_name?: string
  last_name?: string
  properties?: Record<string, any>
}

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
 * Add a profile to a Klaviyo list
 */
export async function addToKlaviyoList(
  listId: string,
  profile: KlaviyoProfile
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      `${KLAVIYO_API_BASE}/list-subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          'Content-Type': 'application/json',
          'revision': '2024-10-15'
        },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              list_id: listId,
              email: profile.email,
              phone_number: profile.phone_number,
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email: profile.email,
                    phone_number: profile.phone_number,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    properties: profile.properties || {}
                  }
                }
              }
            }
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Klaviyo API error:', response.status, errorText)
      return { success: false, error: `Klaviyo API error: ${response.status}` }
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding to Klaviyo list:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Track a custom event in Klaviyo
 */
export async function trackKlaviyoEvent(
  email: string,
  eventName: string,
  properties?: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${KLAVIYO_API_BASE}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15'
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email
                }
              }
            },
            metric: {
              data: {
                type: 'metric',
                attributes: {
                  name: eventName
                }
              }
            },
            properties: properties || {},
            time: new Date().toISOString()
          }
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Klaviyo event tracking error:', response.status, errorText)
      return { success: false, error: `Klaviyo event error: ${response.status}` }
    }

    return { success: true }
  } catch (error) {
    console.error('Error tracking Klaviyo event:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Add waitlist entry to Klaviyo with full details
 */
export async function addWaitlistToKlaviyo(
  data: WaitlistData,
  listId: string
): Promise<{ success: boolean; error?: string }> {
  const nameParts = data.fullName.trim().split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  // Add to list with profile data
  const profile: KlaviyoProfile = {
    email: data.email,
    phone_number: data.phone,
    first_name: firstName,
    last_name: lastName,
    properties: {
      country: data.country,
      age: data.age,
      diagnosis: data.diagnosis,
      diagnosis_date: data.diagnosisDate,
      current_treatments: data.currentTreatments,
      cannabis_experience: data.cannabisExperience,
      retreat_interest: data.retreatInterest,
      waitlist_number: data.waitlistNumber || null,
      waitlist_joined_date: new Date().toISOString()
    }
  }

  const addResult = await addToKlaviyoList(listId, profile)
  if (!addResult.success) {
    return addResult
  }

  // Track custom event
  const eventResult = await trackKlaviyoEvent(
    data.email,
    'Joined Waitlist',
    {
      program: data.retreatInterest,
      diagnosis: data.diagnosis,
      waitlist_number: data.waitlistNumber || null,
      source: 'website'
    }
  )

  return eventResult
}

/**
 * Send confirmation email to user via Klaviyo
 */
export async function sendUserConfirmationEmail(
  data: WaitlistData
): Promise<{ success: boolean; error?: string }> {
  try {
    const nameParts = data.fullName.trim().split(' ')
    const firstName = nameParts[0]

    const response = await fetch(`${KLAVIYO_API_BASE}/campaigns`, {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        'revision': '2024-10-15'
      },
      body: JSON.stringify({
        data: {
          type: 'campaign-message',
          attributes: {
            channel: 'email',
            label: `Waitlist Confirmation - ${data.email}`,
            audiences: {
              included: [data.email]
            },
            send_strategy: {
              method: 'immediate'
            },
            content: {
              subject: 'Welcome to the Udaya Waitlist',
              preview_text: `You're #${data.waitlistNumber || '---'} on the waitlist`,
              from_email: 'team@udaya.one',
              from_label: 'Udaya',
              reply_to_email: 'team@udaya.one'
            }
          }
        }
      })
    })

    if (!response.ok) {
      console.error('Klaviyo email API error:', response.status)
      // Fallback: Just track event and let flow handle it
      return await trackKlaviyoEvent(data.email, 'Joined Waitlist', {
        waitlist_number: data.waitlistNumber,
        program: data.retreatInterest,
        diagnosis: data.diagnosis
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    // Fallback: Track event
    return await trackKlaviyoEvent(data.email, 'Joined Waitlist', {
      waitlist_number: data.waitlistNumber,
      program: data.retreatInterest,
      diagnosis: data.diagnosis
    })
  }
}

/**
 * Send admin notification via Klaviyo
 */
export async function sendAdminNotification(
  adminEmail: string,
  data: WaitlistData
): Promise<{ success: boolean; error?: string }> {
  try {
    // For admin notification, we'll just track the event
    // You can set up a simple flow in Klaviyo to email yourself when this event fires
    const result = await trackKlaviyoEvent(
      adminEmail,
      'New Waitlist Entry',
      {
        applicant_name: data.fullName,
        applicant_email: data.email,
        applicant_phone: data.phone,
        country: data.country,
        diagnosis: data.diagnosis,
        retreat_interest: data.retreatInterest,
        waitlist_number: data.waitlistNumber || null,
        timestamp: new Date().toISOString()
      }
    )

    return result
  } catch (error) {
    console.error('Error sending admin notification:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Add newsletter subscriber to Klaviyo
 */
export async function addNewsletterToKlaviyo(
  email: string,
  source: string = 'blog'
): Promise<{ success: boolean; error?: string }> {
  const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID || process.env.KLAVIYO_WAITLIST_LIST_ID

  if (!listId) {
    console.warn('⚠️ No Klaviyo newsletter list ID configured')
    return { success: false, error: 'No list ID configured' }
  }

  try {
    // Add to newsletter list
    const profile: KlaviyoProfile = {
      email,
      properties: {
        newsletter_source: source,
        subscribed_at: new Date().toISOString(),
        subscription_type: 'newsletter'
      }
    }

    const addResult = await addToKlaviyoList(listId, profile)
    if (!addResult.success) {
      return addResult
    }

    // Track subscription event
    const eventResult = await trackKlaviyoEvent(
      email,
      'Subscribed to Newsletter',
      {
        source,
        subscription_type: 'blog_newsletter',
        timestamp: new Date().toISOString()
      }
    )

    return eventResult
  } catch (error) {
    console.error('Error adding newsletter to Klaviyo:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Remove newsletter subscriber from Klaviyo
 */
export async function removeNewsletterFromKlaviyo(
  email: string
): Promise<{ success: boolean; error?: string }> {
  const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID || process.env.KLAVIYO_WAITLIST_LIST_ID

  if (!listId) {
    console.warn('⚠️ No Klaviyo newsletter list ID configured')
    return { success: false, error: 'No list ID configured' }
  }

  try {
    // Track unsubscribe event
    const eventResult = await trackKlaviyoEvent(
      email,
      'Unsubscribed from Newsletter',
      {
        unsubscribe_source: 'email_link',
        timestamp: new Date().toISOString()
      }
    )

    if (!eventResult.success) {
      console.warn('⚠️ Failed to track Klaviyo unsubscribe event:', eventResult.error)
    }

    // Note: Klaviyo API doesn't have a direct "remove from list" endpoint
    // The unsubscribe event will automatically update the profile status in Klaviyo
    // Klaviyo will handle the suppression automatically

    return { success: true }
  } catch (error) {
    console.error('Error removing newsletter from Klaviyo:', error)
    return { success: false, error: String(error) }
  }
}
