import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { generateSlug, calculateReadingTime } from '@/lib/blog-storage'
import { getAllPostsAdmin, getPublishedPostsAdmin, createPostAdmin } from '@/lib/blog-storage-admin'
import { sanitizeRichText, sanitizePlainText } from '@/lib/sanitize'


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
    
    const rawData = await request.json()

    // Sanitize content to prevent XSS
    const sanitizedContent = sanitizeRichText(rawData.content || '')
    const sanitizedTitle = sanitizePlainText(rawData.title || '')
    const sanitizedExcerpt = sanitizePlainText(rawData.excerpt || '')

    const newPost = await createPostAdmin({
      title: sanitizedTitle,
      slug: rawData.slug || generateSlug(sanitizedTitle),
      excerpt: sanitizedExcerpt,
      content: sanitizedContent,
      author: sanitizePlainText(rawData.author || 'Udaya Team'),
      category: sanitizePlainText(rawData.category || ''),
      tags: Array.isArray(rawData.tags) ? rawData.tags.map((tag: string) => sanitizePlainText(tag)) : [],
      featuredImage: rawData.featuredImage || '',
      publishedAt: rawData.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: rawData.status || 'draft',
      readingTime: calculateReadingTime(sanitizedContent),
      views: 0,
      // SEO fields - sanitize these too
      metaTitle: sanitizePlainText(rawData.metaTitle || ''),
      metaDescription: sanitizePlainText(rawData.metaDescription || ''),
      focusKeyword: sanitizePlainText(rawData.focusKeyword || ''),
      ogTitle: sanitizePlainText(rawData.ogTitle || ''),
      ogDescription: sanitizePlainText(rawData.ogDescription || ''),
      ogImage: rawData.ogImage || ''
    })
    
    return NextResponse.json({ post: newPost })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}