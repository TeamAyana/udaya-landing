import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/admin/contacts
 * Fetch all contact form submissions
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if Firebase Admin is initialized
    if (!adminDb) {
      console.warn('Firebase Admin SDK not initialized. Returning empty contacts.')
      return NextResponse.json({
        contacts: [],
        stats: {
          totalContacts: 0,
          patientContacts: 0,
          caregiverContacts: 0,
          clinicianContacts: 0
        }
      })
    }

    // Fetch all contact form submissions
    let contacts: any[] = []
    try {
      const contactsSnapshot = await adminDb
        .collection('contacts')
        .orderBy('createdAt', 'desc')
        .get()

      contacts = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || new Date().toISOString()
      }))

      console.log(`✅ Fetched ${contacts.length} contact submissions`)
    } catch (error) {
      console.error('❌ Error fetching contacts:', error)
      return NextResponse.json(
        { error: 'Failed to fetch contacts from Firebase' },
        { status: 500 }
      )
    }

    // Calculate stats
    const stats = {
      totalContacts: contacts.length,
      patientContacts: contacts.filter(c => c.userType === 'patient').length,
      caregiverContacts: contacts.filter(c => c.userType === 'caregiver').length,
      clinicianContacts: contacts.filter(c => c.userType === 'clinician').length,
      otherContacts: contacts.filter(c => c.userType === 'other').length
    }

    return NextResponse.json({
      contacts,
      stats
    })
  } catch (error) {
    console.error('❌ Error in contacts API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
