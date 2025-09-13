import fs from 'fs/promises'
import path from 'path'
import { BlogPost, BlogCategory } from '@/types/blog'

const DATA_DIR = path.join(process.cwd(), 'data')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads')

// Initialize data directory and files
export async function initializeStorage() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.mkdir(UPLOADS_DIR, { recursive: true })
    
    try {
      await fs.access(POSTS_FILE)
    } catch {
      await fs.writeFile(POSTS_FILE, JSON.stringify([]))
    }
    
    try {
      await fs.access(CATEGORIES_FILE)
    } catch {
      const defaultCategories: BlogCategory[] = [
        { id: '1', name: 'Health & Wellness', slug: 'health-wellness' },
        { id: '2', name: 'Medical Cannabis', slug: 'medical-cannabis' },
        { id: '3', name: 'Retreat Life', slug: 'retreat-life' },
        { id: '4', name: 'Patient Stories', slug: 'patient-stories' },
        { id: '5', name: 'Research & Science', slug: 'research-science' },
      ]
      await fs.writeFile(CATEGORIES_FILE, JSON.stringify(defaultCategories))
    }
  } catch (error) {
    console.error('Error initializing storage:', error)
  }
}

// Blog post operations
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const data = await fs.readFile(POSTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.id === id) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'views'>): Promise<BlogPost> {
  const posts = await getAllPosts()
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    views: 0
  }
  posts.push(newPost)
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2))
  return newPost
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  const index = posts.findIndex(post => post.id === id)
  
  if (index === -1) return null
  
  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2))
  return posts[index]
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts()
  const filteredPosts = posts.filter(post => post.id !== id)
  
  if (filteredPosts.length === posts.length) return false
  
  await fs.writeFile(POSTS_FILE, JSON.stringify(filteredPosts, null, 2))
  return true
}

export async function incrementPostViews(id: string): Promise<void> {
  const posts = await getAllPosts()
  const post = posts.find(p => p.id === id)
  if (post) {
    post.views += 1
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2))
  }
}

// Category operations
export async function getAllCategories(): Promise<BlogCategory[]> {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
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