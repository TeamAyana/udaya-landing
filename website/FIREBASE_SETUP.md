# Firebase Setup Guide (Excellent All-in-One Solution)

## Why Firebase?
- ✅ Firestore database + Storage in one
- ✅ NoSQL = works naturally with your JSON data
- ✅ Generous free tier
- ✅ Google's infrastructure
- ✅ Real-time updates included

## Step 1: Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Skip Google Analytics (unless you want it)

## Step 2: Set up Firestore Database

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Start in **production mode**
4. Choose location closest to your users

## Step 3: Set up Firebase Storage

1. In Firebase Console, click "Storage"
2. Click "Get started"
3. Start in production mode
4. Choose same location as Firestore

## Step 4: Get Your Config

1. Go to Project Settings > General
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) 
4. Register your app
5. Copy the config object

## Step 5: Install Dependencies

```bash
npm install firebase
```

## Step 6: Create Firebase Config

Create `src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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
export const storage = getStorage(app)
```

## Step 7: Add Environment Variables

Add to `.env.local` (and Vercel):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Step 8: Update Blog Storage

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
  const postsCol = collection(db, POSTS_COLLECTION)
  const q = query(postsCol, orderBy('publishedAt', 'desc'))
  const snapshot = await getDocs(q)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as BlogPost))
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
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
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const postsCol = collection(db, POSTS_COLLECTION)
  const q = query(postsCol, where('slug', '==', slug))
  const snapshot = await getDocs(q)
  
  if (snapshot.empty) return null
  
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data()
  } as BlogPost
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const postDoc = doc(db, POSTS_COLLECTION, id)
  const snapshot = await getDoc(postDoc)
  
  if (!snapshot.exists()) return null
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as BlogPost
}

export async function createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
  const newPost = {
    ...post,
    views: 0,
    publishedAt: new Date().toISOString(),
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
  const postDoc = doc(db, POSTS_COLLECTION, id)
  
  await updateDoc(postDoc, {
    ...updates,
    updatedAt: new Date().toISOString()
  })
  
  return getPostById(id)
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const postDoc = doc(db, POSTS_COLLECTION, id)
    await deleteDoc(postDoc)
    return true
  } catch {
    return false
  }
}

export async function incrementPostViews(id: string): Promise<void> {
  const postDoc = doc(db, POSTS_COLLECTION, id)
  await updateDoc(postDoc, {
    views: increment(1)
  })
}

// Category operations
export async function getAllCategories(): Promise<BlogCategory[]> {
  const categoriesCol = collection(db, CATEGORIES_COLLECTION)
  const snapshot = await getDocs(categoriesCol)
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as BlogCategory))
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
}
```

## Step 9: Update File Upload

Replace `src/app/api/upload/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

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
    const storageRef = ref(storage, `uploads/${filename}`)
    
    // Convert File to ArrayBuffer then to Uint8Array
    const buffer = await file.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, bytes, {
      contentType: file.type,
    })
    
    // Get download URL
    const url = await getDownloadURL(snapshot.ref)

    return NextResponse.json({ 
      url,
      filename 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

## Step 10: Update Contact Form

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
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
```

## Step 11: Update Waitlist

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
    
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
```

## Step 12: Set Firestore Security Rules

In Firebase Console > Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can read published posts
    match /posts/{postId} {
      allow read: if true;
      allow write: if false; // Only through Admin SDK
    }
    
    // Public can read categories
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Only allow creating contacts/waitlist entries
    match /contacts/{contactId} {
      allow read: if false;
      allow create: if true;
    }
    
    match /waitlist/{entryId} {
      allow read: if false;
      allow create: if true;
    }
  }
}
```

## Step 13: Set Storage Security Rules

In Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{fileName} {
      allow read: if true;
      allow write: if false; // Only through Admin SDK
    }
  }
}
```

## Step 14: Deploy to Vercel

1. Push your changes
2. Add all Firebase environment variables to Vercel
3. Deploy!

## Bonus: Real-time Updates

With Firebase, you can easily add real-time features:

```typescript
// Listen to new blog posts in real-time
import { onSnapshot } from 'firebase/firestore'

const unsubscribe = onSnapshot(
  query(collection(db, 'posts'), where('status', '==', 'published')),
  (snapshot) => {
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    // Update your UI
  }
)
```

## Admin Authentication

For admin authentication, you can use Firebase Auth:

```bash
npm install firebase-admin
```

But for simplicity, you can keep your current JWT-based auth and just use Firebase for data storage.

## Done! 🔥

Your blog is now powered by Firebase with:
- Firestore for data
- Firebase Storage for images
- Real-time capabilities
- Google's infrastructure
- Generous free tier