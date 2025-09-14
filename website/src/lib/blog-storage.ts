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