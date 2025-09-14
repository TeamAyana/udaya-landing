# Migration Guide: From JSON to Vercel Postgres

## Step 1: Set up Vercel Postgres

1. Go to your Vercel dashboard
2. Navigate to the "Storage" tab
3. Click "Create Database" → Select "Postgres"
4. Choose your region and create the database
5. Vercel will automatically add the connection environment variables

## Step 2: Install Dependencies

```bash
npm install @vercel/postgres drizzle-orm drizzle-kit
```

## Step 3: Create Database Schema

Create `src/lib/db/schema.ts`:

```typescript
import { pgTable, text, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core'

export const posts = pgTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  tags: json('tags').$type<string[]>().notNull(),
  featuredImage: text('featured_image'),
  publishedAt: timestamp('published_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  status: text('status', { enum: ['draft', 'published'] }).notNull(),
  readingTime: integer('reading_time').notNull(),
  views: integer('views').notNull().default(0),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  focusKeyword: text('focus_keyword'),
  ogTitle: text('og_title'),
  ogDescription: text('og_description'),
  ogImage: text('og_image'),
})

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
})

export const contacts = pgTable('contacts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const waitlist = pgTable('waitlist', {
  id: text('id').primaryKey(),
  // Personal Information
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
  country: text('country').notNull(),
  
  // Medical Information
  diagnosis: text('diagnosis').notNull(),
  diagnosisDate: text('diagnosis_date').notNull(),
  currentTreatments: text('current_treatments').notNull(),
  medications: text('medications').notNull(),
  hasUsedCannabis: boolean('has_used_cannabis').notNull(),
  cannabisExperience: text('cannabis_experience'),
  
  // Additional Information
  mobility: text('mobility').notNull(),
  dietaryRestrictions: text('dietary_restrictions'),
  emergencyContact: text('emergency_contact').notNull(),
  emergencyPhone: text('emergency_phone').notNull(),
  howHeard: text('how_heard').notNull(),
  expectations: text('expectations').notNull(),
  
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```

## Step 4: Create Database Connection

Create `src/lib/db/index.ts`:

```typescript
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema })
```

## Step 5: Create Migration Script

Create `src/lib/db/migrate.ts`:

```typescript
import { sql } from '@vercel/postgres'
import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { db } from './index'

async function runMigration() {
  console.log('Running migrations...')
  
  // Create tables
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT NOT NULL,
      tags JSON NOT NULL,
      featured_image TEXT,
      published_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
      reading_time INTEGER NOT NULL,
      views INTEGER NOT NULL DEFAULT 0,
      meta_title TEXT,
      meta_description TEXT,
      focus_keyword TEXT,
      og_title TEXT,
      og_description TEXT,
      og_image TEXT
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      country TEXT NOT NULL,
      diagnosis TEXT NOT NULL,
      diagnosis_date TEXT NOT NULL,
      current_treatments TEXT NOT NULL,
      medications TEXT NOT NULL,
      has_used_cannabis BOOLEAN NOT NULL,
      cannabis_experience TEXT,
      mobility TEXT NOT NULL,
      dietary_restrictions TEXT,
      emergency_contact TEXT NOT NULL,
      emergency_phone TEXT NOT NULL,
      how_heard TEXT NOT NULL,
      expectations TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `

  console.log('Migrations completed!')
}

runMigration().catch(console.error)
```

## Step 6: Update Blog Storage

Replace `src/lib/blog-storage.ts` with the new database version:

```typescript
import { db } from './db'
import { posts, categories } from './db/schema'
import { eq, desc } from 'drizzle-orm'
import { BlogPost, BlogCategory } from '@/types/blog'

// Blog post operations
export async function getAllPosts(): Promise<BlogPost[]> {
  const result = await db.select().from(posts).orderBy(desc(posts.publishedAt))
  return result
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.status, 'published'))
    .orderBy(desc(posts.publishedAt))
  return result
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)
  return result[0] || null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1)
  return result[0] || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
  const newPost = {
    ...post,
    id: Date.now().toString(),
    views: 0
  }
  
  await db.insert(posts).values(newPost)
  return newPost
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const updatedPost = {
    ...updates,
    updatedAt: new Date()
  }
  
  await db.update(posts).set(updatedPost).where(eq(posts.id, id))
  return getPostById(id)
}

export async function deletePost(id: string): Promise<boolean> {
  const result = await db.delete(posts).where(eq(posts.id, id))
  return result.rowCount > 0
}

export async function incrementPostViews(id: string): Promise<void> {
  await db.update(posts).set({ views: posts.views + 1 }).where(eq(posts.id, id))
}

// Category operations
export async function getAllCategories(): Promise<BlogCategory[]> {
  const result = await db.select().from(categories)
  return result
}

// Helper functions remain the same
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
    const defaultCategories = [
      { id: '1', name: 'Health & Wellness', slug: 'health-wellness' },
      { id: '2', name: 'Medical Cannabis', slug: 'medical-cannabis' },
      { id: '3', name: 'Retreat Life', slug: 'retreat-life' },
      { id: '4', name: 'Patient Stories', slug: 'patient-stories' },
      { id: '5', name: 'Research & Science', slug: 'research-science' },
    ]
    
    await db.insert(categories).values(defaultCategories)
  }
}
```

## Step 7: Update Contact Form Handler

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contacts } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newContact = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    }
    
    await db.insert(contacts).values(newContact)
    
    // You can also send email notification here using Resend or similar service
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
```

## Step 8: Update Waitlist Handler

Update `src/app/api/waitlist/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { waitlist } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newEntry = {
      id: Date.now().toString(),
      ...data,
    }
    
    await db.insert(waitlist).values(newEntry)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
```

## Step 9: Run Migration

1. Deploy to Vercel first to get database credentials
2. Run the migration:
   ```bash
   npx tsx src/lib/db/migrate.ts
   ```

## Step 10: Update Environment Variables

Vercel automatically adds these, but for local development, add to `.env.local`:

```
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NO_SSL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

## Alternative: File Upload Storage

For image uploads, use Vercel Blob Storage or Cloudinary:

### Vercel Blob Storage

```bash
npm install @vercel/blob
```

Update `src/app/api/upload/route.ts`:

```typescript
import { put } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const file = form.get('file') as File
  
  if (!file) {
    return NextResponse.json({ error: 'No file found' }, { status: 400 })
  }
  
  const blob = await put(file.name, file, {
    access: 'public',
  })
  
  return NextResponse.json({ url: blob.url })
}
```

## Done!

Your blog, contact forms, and waitlist will now work on Vercel with persistent storage.