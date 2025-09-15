import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { calculateReadingTime } from '@/lib/blog-storage'
import { getPostByIdAdmin, updatePostAdmin, deletePostAdmin, incrementPostViewsAdmin } from '@/lib/blog-storage-admin'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const post = await getPostByIdAdmin(id)
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Increment views for published posts
    if (post.status === 'published') {
      await incrementPostViewsAdmin(id)
    }
    
    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    // Recalculate reading time if content changed
    if (data.content) {
      data.readingTime = calculateReadingTime(data.content)
    }
    
    await updatePostAdmin(id, data)
    const updatedPost = await getPostByIdAdmin(id)
    
    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    await deletePostAdmin(id)
    const success = true
    
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}