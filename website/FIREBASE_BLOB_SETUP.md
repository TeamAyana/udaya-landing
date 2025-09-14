# Complete Firebase + Vercel Blob Setup Guide

## Overview
- **Firebase Firestore**: Database for posts, contacts, waitlist
- **Vercel Blob**: File storage for images
- **Total Setup Time**: ~30 minutes

## Prerequisites
- Firebase project created with Firestore enabled
- Vercel Blob added from marketplace

## Step-by-Step Implementation

### Step 1: Install Dependencies

```bash
npm install firebase @vercel/blob
```

### Step 2: Environment Variables

Add to `.env.local` and Vercel Dashboard:

```env
# Firebase (Public - these are safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Vercel Blob (Added automatically by Vercel)
BLOB_READ_WRITE_TOKEN=xxx
```

### Step 3: Firebase Configuration

Create `src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

### Step 4: Blog Storage Implementation

Replace `src/lib/blog-storage.ts`:

```typescript
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  increment
} from 'firebase/firestore'
import { db } from './firebase'
import { BlogPost, BlogCategory } from '@/types/blog'

// Collections
const POSTS_COLLECTION = 'posts'
const CATEGORIES_COLLECTION = 'categories'

// Blog post operations
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const postsCol = collection(db, POSTS_COLLECTION)
    const q = query(postsCol, orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const postsCol = collection(db, POSTS_COLLECTION)
    const q = query(
      postsCol, 
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost))
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const postsCol = collection(db, POSTS_COLLECTION)
    const q = query(postsCol, where('slug', '==', slug))
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data()
    } as BlogPost
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const postDoc = doc(db, POSTS_COLLECTION, id)
    const snapshot = await getDoc(postDoc)
    
    if (!snapshot.exists()) return null
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as BlogPost
  } catch (error) {
    console.error('Error fetching post by id:', error)
    return null
  }
}

export async function createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
  const newPost = {
    ...post,
    views: 0,
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  const docRef = doc(collection(db, POSTS_COLLECTION))
  await setDoc(docRef, newPost)
  
  return {
    id: docRef.id,
    ...newPost
  }
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const postDoc = doc(db, POSTS_COLLECTION, id)
    
    await updateDoc(postDoc, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
    
    return getPostById(id)
  } catch (error) {
    console.error('Error updating post:', error)
    return null
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const postDoc = doc(db, POSTS_COLLECTION, id)
    await deleteDoc(postDoc)
    return true
  } catch (error) {
    console.error('Error deleting post:', error)
    return false
  }
}

export async function incrementPostViews(id: string): Promise<void> {
  try {
    const postDoc = doc(db, POSTS_COLLECTION, id)
    await updateDoc(postDoc, {
      views: increment(1)
    })
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

// Category operations
export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const categoriesCol = collection(db, CATEGORIES_COLLECTION)
    const snapshot = await getDocs(categoriesCol)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogCategory))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
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
  try {
    const categories = await getAllCategories()
    
    if (categories.length === 0) {
      const defaultCategories = [
        { id: '1', name: 'Health & Wellness', slug: 'health-wellness' },
        { id: '2', name: 'Medical Cannabis', slug: 'medical-cannabis' },
        { id: '3', name: 'Retreat Life', slug: 'retreat-life' },
        { id: '4', name: 'Patient Stories', slug: 'patient-stories' },
        { id: '5', name: 'Research & Science', slug: 'research-science' },
      ]
      
      for (const category of defaultCategories) {
        const docRef = doc(db, CATEGORIES_COLLECTION, category.id)
        await setDoc(docRef, category)
      }
    }
  } catch (error) {
    console.error('Error initializing storage:', error)
  }
}
```

### Step 5: Contact Form API

Create `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: new Date().toISOString()
    })
    
    // Optional: Send email notification using Resend or similar
    // await sendEmail({
    //   to: 'admin@udaya.one',
    //   subject: 'New Contact Form Submission',
    //   text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
    // })
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
```

### Step 6: Waitlist API

Create `src/app/api/waitlist/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const docRef = await addDoc(collection(db, 'waitlist'), {
      ...data,
      createdAt: new Date().toISOString()
    })
    
    // Optional: Send confirmation email
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
```

### Step 7: Firestore Security Rules

In Firebase Console → Firestore → Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read posts and categories
    match /posts/{postId} {
      allow read: if true;
      allow write: if false; // Admin only via server
    }
    
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false; // Admin only via server
    }
    
    // Contact form submissions - write only
    match /contacts/{contactId} {
      allow read: if false;
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message']);
      allow update, delete: if false;
    }
    
    // Waitlist submissions - write only
    match /waitlist/{entryId} {
      allow read: if false;
      allow create: if request.resource.data.keys().hasAll(['firstName', 'lastName', 'email']);
      allow update, delete: if false;
    }
  }
}
```

### Step 8: Create Firestore Indexes

In Firebase Console → Firestore → Indexes, create:

1. **Posts by status and date**:
   - Collection: `posts`
   - Fields: `status (Ascending)`, `publishedAt (Descending)`

### Step 9: Update Contact Form Component

Update `src/app/contact/page.tsx` to call the API:

```typescript
const handleSubmit = async (data: ContactFormData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) throw new Error('Failed to submit')
    
    // Show success message
    alert('Thank you for contacting us!')
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to submit. Please try again.')
  }
}
```

### Step 10: Update Waitlist Form

Update the waitlist form submission to call the API endpoint.

### Step 11: File Upload Route (Already Updated)

The `src/app/api/upload/route.ts` is already configured to use Vercel Blob.

### Step 12: Testing Checklist

- [ ] Create a test blog post
- [ ] Upload an image
- [ ] Submit contact form
- [ ] Submit waitlist form
- [ ] View blog posts on frontend

## Deployment Steps

1. Push all changes to Git
2. In Vercel Dashboard:
   - Add all Firebase environment variables
   - Ensure Blob storage is connected
3. Deploy!

## Monitoring

- **Firebase Console**: View Firestore data and usage
- **Vercel Dashboard**: Monitor Blob storage usage
- Both services have generous free tiers

## Done! 🎉

Your website now has:
- ✅ Blog functionality with Firebase
- ✅ Image uploads with Vercel Blob
- ✅ Contact form submissions
- ✅ Waitlist management
- ✅ All working on Vercel!