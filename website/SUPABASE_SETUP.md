# Supabase Setup Guide (Easiest Solution)

## Why Supabase?
- ✅ Database + File Storage in one
- ✅ Generous free tier
- ✅ Simple to implement
- ✅ Works perfectly with Vercel

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a region close to your Vercel deployment
4. Save your project URL and anon key

## Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 3: Set up Environment Variables

Add to `.env.local` (and Vercel dashboard):

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Create Database Tables

Go to Supabase SQL Editor and run:

```sql
-- Posts table
CREATE TABLE posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  featured_image TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  reading_time INTEGER NOT NULL,
  views INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT
);

-- Categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Contacts table
CREATE TABLE contacts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Waitlist table
CREATE TABLE waitlist (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (id, name, slug) VALUES
  ('1', 'Health & Wellness', 'health-wellness'),
  ('2', 'Medical Cannabis', 'medical-cannabis'),
  ('3', 'Retreat Life', 'retreat-life'),
  ('4', 'Patient Stories', 'patient-stories'),
  ('5', 'Research & Science', 'research-science');
```

## Step 5: Create Supabase Client

Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Step 6: Update Blog Storage

Replace `src/lib/blog-storage.ts`:

```typescript
import { supabase } from './supabase'
import { BlogPost, BlogCategory } from '@/types/blog'

// Blog post operations
export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) return null
  return data
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) return null
  return data
}

export async function createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ ...post, views: 0 }])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
  
  return !error
}

export async function incrementPostViews(id: string): Promise<void> {
  const { data: post } = await supabase
    .from('posts')
    .select('views')
    .eq('id', id)
    .single()
  
  if (post) {
    await supabase
      .from('posts')
      .update({ views: (post.views || 0) + 1 })
      .eq('id', id)
  }
}

// Category operations
export async function getAllCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
  
  if (error) throw error
  return data || []
}

// Helper functions (unchanged)
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

// No need for initializeStorage anymore - handled by SQL insert
export async function initializeStorage() {
  // Categories already inserted via SQL
}
```

## Step 7: Update File Upload API

Replace `src/app/api/upload/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 })
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filename, file)

    if (error) throw error

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filename)

    return NextResponse.json({ 
      url: publicUrl,
      filename 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

## Step 8: Create Storage Bucket

In Supabase dashboard:
1. Go to Storage
2. Create a new bucket called "uploads"
3. Make it public (toggle "Public bucket")

## Step 9: Update Contact Form API

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { error } = await supabase
      .from('contacts')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      }])
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
```

## Step 10: Update Waitlist API

Create `src/app/api/waitlist/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { error } = await supabase
      .from('waitlist')
      .insert([data])
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
```

## Step 11: Deploy to Vercel

1. Push your changes to Git
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy!

## Optional: Email Notifications

To send emails when someone submits a form, you can use Supabase Edge Functions or integrate with Resend:

```bash
npm install resend
```

Then add email sending to your API routes.

## Done! 🎉

Your blog, file uploads, contact forms, and waitlist are now fully functional with Supabase!