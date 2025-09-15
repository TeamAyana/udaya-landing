import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getAllAuthorsAdmin, createAuthorAdmin } from '@/lib/blog-storage-admin'

export async function GET(request: NextRequest) {
  try {
    const authors = await getAllAuthorsAdmin()
    return NextResponse.json({ authors })
  } catch (error) {
    console.error('Error fetching authors:', error)
    return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    if (!data.name || !data.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }
    
    const newAuthor = await createAuthorAdmin({
      name: data.name,
      email: data.email,
      bio: data.bio || '',
      avatar: data.avatar || '',
      createdAt: new Date().toISOString()
    })
    
    return NextResponse.json({ author: newAuthor })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
  }
}