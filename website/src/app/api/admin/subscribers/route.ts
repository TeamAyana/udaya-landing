import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Check if Firebase Admin is initialized
    if (!adminDb) {
      console.warn('Firebase Admin SDK not initialized. Returning empty subscribers.')
      return NextResponse.json({
        waitlist: [],
        newsletter: [],
        stats: {
          waitlistCount: 0,
          newsletterCount: 0,
          totalContacts: 0
        }
      })
    }

    // Fetch waitlist entries
    let waitlist: any[] = []
    try {
      const waitlistSnapshot = await adminDb.collection('waitlist').get()
      waitlist = waitlistSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || new Date().toISOString()
      })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error('Error fetching waitlist:', error)
    }
    
    // Fetch newsletter contacts
    let newsletter: any[] = []
    try {
      const contactsSnapshot = await adminDb.collection('contacts').get()
      const allContacts = contactsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        subscribedAt: doc.data().subscribedAt || doc.data().createdAt || new Date().toISOString()
      }))
      
      // Filter for newsletter subscribers (those with newsletter: true or who submitted via newsletter form)
      newsletter = allContacts.filter(contact => 
        contact.newsletter === true || contact.type === 'newsletter' || contact.source === 'blog'
      ).sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
    
    // Get total counts
    let totalContacts = 0
    try {
      const allContactsSnapshot = await adminDb.collection('contacts').get()
      totalContacts = allContactsSnapshot.size
    } catch (error) {
      console.error('Error fetching total contacts:', error)
    }
    
    return NextResponse.json({
      waitlist,
      newsletter,
      stats: {
        waitlistCount: waitlist.length,
        newsletterCount: newsletter.length,
        totalContacts: totalContacts
      }
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}