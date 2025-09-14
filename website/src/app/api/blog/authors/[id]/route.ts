import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const AUTHORS_COLLECTION = 'authors'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id } = await params
    
    const authorDoc = doc(db, AUTHORS_COLLECTION, id)
    await deleteDoc(authorDoc)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
}