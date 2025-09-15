import { Metadata } from 'next'
import { getPublishedPostsAdmin, getAllCategoriesAdmin } from '@/lib/blog-storage-admin'
import { BlogPageClient } from '@/components/blog/blog-page-client'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog - Wellness Insights & Medical Cannabis Education',
  description: 'Explore articles on medical cannabis, wellness practices, and healing journeys from the Udaya community.',
}

export default async function BlogPage() {
  const posts = await getPublishedPostsAdmin()
  const categories = await getAllCategoriesAdmin()

  return <BlogPageClient posts={posts} categories={categories} />
}