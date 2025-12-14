import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { adminDb } from '@/lib/firebase-admin'

export interface Notification {
  id: string
  type: 'waitlist' | 'contact' | 'referral'
  title: string
  message: string
  link: string
  read: boolean
  createdAt: string
  data?: any
}

/**
 * GET /api/admin/notifications
 * Fetch all notifications (or only unread ones)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    if (!adminDb) {
      return NextResponse.json({
        notifications: [],
        unreadCount: 0
      })
    }

    // Fetch notifications
    let query = adminDb.collection('notifications').orderBy('createdAt', 'desc')

    if (unreadOnly) {
      query = query.where('read', '==', false) as any
    }

    const snapshot = await query.limit(50).get()

    const notifications: Notification[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Notification))

    const unreadCount = notifications.filter(n => !n.read).length

    return NextResponse.json({
      notifications,
      unreadCount
    })
  } catch (error) {
    console.error('❌ Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/notifications
 * Mark notification(s) as read
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, ids, markAllAsRead } = await request.json()

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 503 }
      )
    }

    if (markAllAsRead) {
      // Mark all notifications as read
      const snapshot = await adminDb
        .collection('notifications')
        .where('read', '==', false)
        .get()

      const batch = adminDb.batch()
      snapshot.docs.forEach(doc => {
        batch.update(doc.ref, { read: true, readAt: new Date().toISOString() })
      })
      await batch.commit()

      console.log(`✅ Marked ${snapshot.size} notifications as read`)
      return NextResponse.json({
        success: true,
        message: `Marked ${snapshot.size} notifications as read`
      })
    }

    if (ids && Array.isArray(ids)) {
      // Mark multiple notifications as read
      const batch = adminDb.batch()
      ids.forEach((notificationId: string) => {
        const ref = adminDb!.collection('notifications').doc(notificationId)
        batch.update(ref, { read: true, readAt: new Date().toISOString() })
      })
      await batch.commit()

      console.log(`✅ Marked ${ids.length} notifications as read`)
      return NextResponse.json({
        success: true,
        message: `Marked ${ids.length} notifications as read`
      })
    }

    if (id) {
      // Mark single notification as read
      await adminDb
        .collection('notifications')
        .doc(id)
        .update({ read: true, readAt: new Date().toISOString() })

      console.log(`✅ Marked notification ${id} as read`)
      return NextResponse.json({
        success: true,
        message: 'Notification marked as read'
      })
    }

    return NextResponse.json(
      { error: 'Must provide id, ids, or markAllAsRead' },
      { status: 400 }
    )
  } catch (error) {
    console.error('❌ Error updating notification:', error)
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/notifications
 * Delete notification(s)
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, deleteAll, clearAll } = await request.json()

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 503 }
      )
    }

    if (clearAll) {
      // Delete ALL notifications
      const snapshot = await adminDb
        .collection('notifications')
        .get()

      const batch = adminDb.batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()

      console.log(`✅ Cleared all ${snapshot.size} notifications`)
      return NextResponse.json({
        success: true,
        message: `Cleared all ${snapshot.size} notifications`
      })
    }

    if (deleteAll) {
      // Delete all read notifications older than 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const snapshot = await adminDb
        .collection('notifications')
        .where('read', '==', true)
        .where('createdAt', '<', thirtyDaysAgo.toISOString())
        .get()

      const batch = adminDb.batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })
      await batch.commit()

      console.log(`✅ Deleted ${snapshot.size} old notifications`)
      return NextResponse.json({
        success: true,
        message: `Deleted ${snapshot.size} old notifications`
      })
    }

    if (id) {
      // Delete single notification
      await adminDb.collection('notifications').doc(id).delete()

      console.log(`✅ Deleted notification ${id}`)
      return NextResponse.json({
        success: true,
        message: 'Notification deleted'
      })
    }

    return NextResponse.json(
      { error: 'Must provide id, deleteAll, or clearAll' },
      { status: 400 }
    )
  } catch (error) {
    console.error('❌ Error deleting notification:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    )
  }
}
