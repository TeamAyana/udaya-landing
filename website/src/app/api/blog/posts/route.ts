import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { generateSlug, calculateReadingTime } from '@/lib/blog-storage'
import { getAllPostsAdmin, getPublishedPostsAdmin, createPostAdmin } from '@/lib/blog-storage-admin'


export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    const isAdmin = !!session
    
    // Return all posts for admin, only published for public
    const posts = isAdmin ? await getAllPostsAdmin() : await getPublishedPostsAdmin()
    
    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    const newPost = await createPostAdmin({
      title: data.title,
      slug: data.slug || generateSlug(data.title),
      excerpt: data.excerpt,
      content: data.content,
      author: data.author || 'Udaya Team',
      category: data.category,
      tags: data.tags || [],
      featuredImage: data.featuredImage || '',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: data.status || 'draft',
      readingTime: calculateReadingTime(data.content),
      // SEO fields
      metaTitle: data.metaTitle || '',
      metaDescription: data.metaDescription || '',
      focusKeyword: data.focusKeyword || '',
      ogTitle: data.ogTitle || '',
      ogDescription: data.ogDescription || '',
      ogImage: data.ogImage || ''
    })
    
    return NextResponse.json({ post: newPost })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}