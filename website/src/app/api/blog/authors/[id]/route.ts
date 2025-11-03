import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { deleteAuthorAdmin } from '@/lib/blog-storage-admin'

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
    
    await deleteAuthorAdmin(id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting author:', error)
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 })
  }
}