# Upstash Redis Setup Guide (Simplest for JSON)

## Why Upstash Redis?
- ✅ Works directly with JSON (minimal changes)
- ✅ Pay-per-request (very cheap)
- ✅ Ultra-fast performance
- ⚠️ Need Vercel Blob for file uploads

## Step 1: Create Upstash Redis Database

1. Click "Upstash" from Vercel Marketplace
2. Create a new Redis database
3. Choose region close to your Vercel deployment
4. It will automatically add environment variables

## Step 2: Install Dependencies

```bash
npm install @upstash/redis @vercel/blob
```

## Step 3: Create Redis Client

Create `src/lib/redis.ts`:

```typescript
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})
```

## Step 4: Update Blog Storage

Replace `src/lib/blog-storage.ts`:

```typescript
import { redis } from './redis'
import { BlogPost, BlogCategory } from '@/types/blog'

// Keys for Redis
const POSTS_KEY = 'posts'
const CATEGORIES_KEY = 'categories'
const POST_VIEWS_PREFIX = 'views:'

// Blog post operations
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await redis.hgetall(POSTS_KEY) || {}
  return Object.values(posts)
    .sort((a: any, b: any) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.status === 'published')
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const post = await redis.hget(POSTS_KEY, id)
  return post as BlogPost || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    views: 0
  }
  
  await redis.hset(POSTS_KEY, {
    [newPost.id]: newPost
  })
  
  return newPost
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const existingPost = await getPostById(id)
  if (!existingPost) return null
  
  const updatedPost = {
    ...existingPost,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  await redis.hset(POSTS_KEY, {
    [id]: updatedPost
  })
  
  return updatedPost
}

export async function deletePost(id: string): Promise<boolean> {
  await redis.hdel(POSTS_KEY, id)
  await redis.del(`${POST_VIEWS_PREFIX}${id}`)
  return true
}

export async function incrementPostViews(id: string): Promise<void> {
  // Increment view counter
  const views = await redis.incr(`${POST_VIEWS_PREFIX}${id}`)
  
  // Update post with new view count
  const post = await getPostById(id)
  if (post) {
    await redis.hset(POSTS_KEY, {
      [id]: { ...post, views }
    })
  }
}

// Category operations
export async function getAllCategories(): Promise<BlogCategory[]> {
  const categories = await redis.get(CATEGORIES_KEY)
  return categories as BlogCategory[] || []
}

// Helper functions
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Initialize categories
export async function initializeStorage() {
  const existingCategories = await getAllCategories()
  
  if (existingCategories.length === 0) {
    const defaultCategories: BlogCategory[] = [
      { id: '1', name: 'Health & Wellness', slug: 'health-wellness' },
      { id: '2', name: 'Medical Cannabis', slug: 'medical-cannabis' },
      { id: '3', name: 'Retreat Life', slug: 'retreat-life' },
      { id: '4', name: 'Patient Stories', slug: 'patient-stories' },
      { id: '5', name: 'Research & Science', slug: 'research-science' },
    ]
    
    await redis.set(CATEGORIES_KEY, defaultCategories)
  }
}
```

## Step 5: Update File Upload with Vercel Blob

Add Vercel Blob Storage from the marketplace, then update `src/app/api/upload/route.ts`:

```typescript
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const form = await request.formData()
    const file = form.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 })
    }
    
    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    })
    
    return NextResponse.json({ 
      url: blob.url,
      filename: file.name
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

## Step 6: Store Contact Form Submissions

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

const CONTACTS_KEY = 'contacts'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const contact = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    }
    
    // Store in Redis hash
    await redis.hset(CONTACTS_KEY, {
      [contact.id]: contact
    })
    
    // Optional: Send email notification here
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}

// Optional: Get all contacts (for admin)
export async function GET(request: NextRequest) {
  try {
    const contacts = await redis.hgetall(CONTACTS_KEY) || {}
    return NextResponse.json({ contacts: Object.values(contacts) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
```

## Step 7: Store Waitlist Submissions

Create `src/app/api/waitlist/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

const WAITLIST_KEY = 'waitlist'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const entry = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString()
    }
    
    // Store in Redis hash
    await redis.hset(WAITLIST_KEY, {
      [entry.id]: entry
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
```

## Step 8: Deploy to Vercel

1. Push changes to Git
2. Upstash environment variables are added automatically
3. Add Vercel Blob Storage from marketplace
4. Deploy!

## Advantages of This Approach

- **Minimal code changes** - Still working with JSON
- **Ultra-fast** - Redis is incredibly fast
- **Cost-effective** - Pay only for what you use
- **Simple** - No SQL, no migrations

## Limitations

- No complex queries (but you don't need them)
- File size limits for Vercel Blob (but sufficient for blog images)

## Done! 🚀

Your blog is now using Upstash Redis with Vercel Blob for file uploads!