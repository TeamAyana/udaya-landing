import { adminDb } from './firebase-admin'
import { BlogPost, BlogCategory } from '@/types/blog'
import { FieldValue } from 'firebase-admin/firestore'

// Collections
const POSTS_COLLECTION = 'posts'
const CATEGORIES_COLLECTION = 'categories'
const AUTHORS_COLLECTION = 'authors'

// Blog post operations using Admin SDK
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return []
    }
    const postsRef = adminDb.collection(POSTS_COLLECTION)
    const snapshot = await postsRef.orderBy('publishedAt', 'desc').get()
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPublishedPostsAdmin(): Promise<BlogPost[]> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return []
    }
    const postsRef = adminDb.collection(POSTS_COLLECTION)
    const snapshot = await postsRef
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc')
      .get()
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost))
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return []
  }
}

export async function getPostByIdAdmin(id: string): Promise<BlogPost | null> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return null
    }
    const docRef = adminDb.collection(POSTS_COLLECTION).doc(id)
    const doc = await docRef.get()
    
    if (!doc.exists) {
      return null
    }
    
    return {
      id: doc.id,
      ...doc.data()
    } as BlogPost
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getPostBySlugAdmin(slug: string): Promise<BlogPost | null> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return null
    }
    const postsRef = adminDb.collection(POSTS_COLLECTION)
    const snapshot = await postsRef.where('slug', '==', slug).limit(1).get()
    
    if (snapshot.empty) {
      return null
    }
    
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

export async function createPostAdmin(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    const docRef = await adminDb.collection(POSTS_COLLECTION).add({
      ...post,
      createdAt: new Date().toISOString(),
      publishedAt: post.status === 'published' ? new Date().toISOString() : null,
      views: 0
    })
    
    const newPost = await getPostByIdAdmin(docRef.id)
    if (!newPost) {
      throw new Error('Failed to create post')
    }
    
    return newPost
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export async function updatePostAdmin(id: string, updates: Partial<BlogPost>): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    const docRef = adminDb.collection(POSTS_COLLECTION).doc(id)
    
    // If changing to published, set publishedAt
    if (updates.status === 'published') {
      const doc = await docRef.get()
      if (doc.exists && !doc.data()?.publishedAt) {
        updates.publishedAt = new Date().toISOString()
      }
    }
    
    await docRef.update({
      ...updates,
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export async function deletePostAdmin(id: string): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    await adminDb.collection(POSTS_COLLECTION).doc(id).delete()
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

export async function incrementPostViewsAdmin(id: string): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return
    }
    const docRef = adminDb.collection(POSTS_COLLECTION).doc(id)
    await docRef.update({
      views: FieldValue.increment(1)
    })
  } catch (error) {
    console.error('Error incrementing post views:', error)
  }
}

// Category operations
export async function getAllCategoriesAdmin(): Promise<BlogCategory[]> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return []
    }
    const categoriesRef = adminDb.collection(CATEGORIES_COLLECTION)
    const snapshot = await categoriesRef.orderBy('name').get()
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogCategory))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategoryByIdAdmin(id: string): Promise<BlogCategory | null> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return null
    }
    const docRef = adminDb.collection(CATEGORIES_COLLECTION).doc(id)
    const doc = await docRef.get()
    
    if (!doc.exists) {
      return null
    }
    
    return {
      id: doc.id,
      ...doc.data()
    } as BlogCategory
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function createCategoryAdmin(category: Omit<BlogCategory, 'id'>): Promise<BlogCategory> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    const docRef = await adminDb.collection(CATEGORIES_COLLECTION).add(category)
    
    const newCategory = await getCategoryByIdAdmin(docRef.id)
    if (!newCategory) {
      throw new Error('Failed to create category')
    }
    
    return newCategory
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

export async function updateCategoryAdmin(id: string, updates: Partial<BlogCategory>): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    await adminDb.collection(CATEGORIES_COLLECTION).doc(id).update(updates)
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}

export async function deleteCategoryAdmin(id: string): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    await adminDb.collection(CATEGORIES_COLLECTION).doc(id).delete()
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}

// Author operations
export async function getAllAuthorsAdmin(): Promise<any[]> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return []
    }
    const authorsRef = adminDb.collection(AUTHORS_COLLECTION)
    const snapshot = await authorsRef.orderBy('name').get()
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching authors:', error)
    return []
  }
}

export async function getAuthorByIdAdmin(id: string): Promise<any | null> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      return null
    }
    const docRef = adminDb.collection(AUTHORS_COLLECTION).doc(id)
    const doc = await docRef.get()
    
    if (!doc.exists) {
      return null
    }
    
    return {
      id: doc.id,
      ...doc.data()
    }
  } catch (error) {
    console.error('Error fetching author:', error)
    return null
  }
}

export async function createAuthorAdmin(author: any): Promise<any> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    const docRef = await adminDb.collection(AUTHORS_COLLECTION).add(author)
    
    const newAuthor = await getAuthorByIdAdmin(docRef.id)
    if (!newAuthor) {
      throw new Error('Failed to create author')
    }
    
    return newAuthor
  } catch (error) {
    console.error('Error creating author:', error)
    throw error
  }
}

export async function updateAuthorAdmin(id: string, updates: any): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    await adminDb.collection(AUTHORS_COLLECTION).doc(id).update(updates)
  } catch (error) {
    console.error('Error updating author:', error)
    throw error
  }
}

export async function deleteAuthorAdmin(id: string): Promise<void> {
  try {
    if (!adminDb) {
      console.error('Firebase Admin not initialized')
      throw new Error('Firebase Admin not initialized')
    }
    await adminDb.collection(AUTHORS_COLLECTION).doc(id).delete()
  } catch (error) {
    console.error('Error deleting author:', error)
    throw error
  }
}