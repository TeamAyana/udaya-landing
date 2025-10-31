import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { adminDb } from '@/lib/firebase-admin'

/**
 * GET /api/admin/referrals
 * Fetch all referral/partnership inquiries
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
      console.warn('Firebase Admin SDK not initialized. Returning empty referrals.')
      return NextResponse.json({
        referrals: [],
        stats: {
          totalReferrals: 0,
          pendingReferrals: 0,
          approvedReferrals: 0,
          physicianReferrals: 0
        }
      })
    }

    // Fetch all referral/partnership submissions
    let referrals: any[] = []
    try {
      const referralsSnapshot = await adminDb
        .collection('referrals')
        .orderBy('createdAt', 'desc')
        .get()

      referrals = referralsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || new Date().toISOString()
      }))

      console.log(`✅ Fetched ${referrals.length} referral submissions`)
    } catch (error) {
      console.error('❌ Error fetching referrals:', error)
      return NextResponse.json(
        { error: 'Failed to fetch referrals from Firebase' },
        { status: 500 }
      )
    }

    // Calculate stats
    const stats = {
      totalReferrals: referrals.length,
      pendingReferrals: referrals.filter(r => r.status === 'pending').length,
      approvedReferrals: referrals.filter(r => r.status === 'approved').length,
      rejectedReferrals: referrals.filter(r => r.status === 'rejected').length,
      physicianReferrals: referrals.filter(r => r.role === 'physician').length,
      healthcareReferrals: referrals.filter(r => r.role === 'healthcare').length,
      therapistReferrals: referrals.filter(r => r.role === 'therapist').length,
      advocateReferrals: referrals.filter(r => r.role === 'advocate').length,
      organizationReferrals: referrals.filter(r => r.role === 'organization').length
    }

    return NextResponse.json({
      referrals,
      stats
    })
  } catch (error) {
    console.error('❌ Error in referrals API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/referrals
 * Update referral status (approve/reject)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status' },
        { status: 400 }
      )
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: pending, approved, or rejected' },
        { status: 400 }
      )
    }

    // Check if Firebase Admin is initialized
    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 503 }
      )
    }

    // Update referral status
    await adminDb.collection('referrals').doc(id).update({
      status,
      updatedAt: new Date().toISOString(),
      updatedBy: session.user?.email || 'admin'
    })

    console.log(`✅ Updated referral ${id} status to: ${status}`)

    return NextResponse.json({
      success: true,
      message: `Referral status updated to ${status}`
    })
  } catch (error) {
    console.error('❌ Error updating referral:', error)
    return NextResponse.json(
      { error: 'Failed to update referral status' },
      { status: 500 }
    )
  }
}
