export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  featuredImage: string
  publishedAt: string
  updatedAt: string
  status: 'draft' | 'published'
  readingTime: number
  views: number
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface AdminUser {
  id: string
  username: string
  email: string
  passwordHash?: string
  createdAt: string
}