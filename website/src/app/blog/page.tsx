import { Metadata } from 'next'
import { getPublishedPosts, getCategories } from '@/lib/blog-storage'
import { BlogPageClient } from '@/components/blog/blog-page-client'

export const metadata: Metadata = {
  title: 'Blog - Wellness Insights & Medical Cannabis Education',
  description: 'Explore articles on medical cannabis, wellness practices, and healing journeys from the Udaya community.',
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const categories = await getCategories()

  return <BlogPageClient posts={posts} categories={categories} />
}