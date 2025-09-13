'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RichTextEditor } from '@/components/admin/rich-text-editor-simple'
import { Save, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [formData, setFormData] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetchPost()
    fetchCategories()
  }, [])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${params.id}`)
      const data = await response.json()
      if (data.post) {
        setFormData({
          ...data.post,
          tags: data.post.tags?.join(', ') || ''
        })
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => prev ? { ...prev, featuredImage: data.url } : null)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    
    setLoading(true)

    try {
      const response = await fetch(`/api/blog/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        })
      })

      if (response.ok) {
        router.push('/admin/dashboard/posts')
      }
    } catch (error) {
      console.error('Failed to update post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!formData) {
    return (
      <div className="text-center py-12">
        <div className="loader mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/dashboard/posts">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-serif font-bold">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="wellness, cannabis, health"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1"
                />
                {formData.featuredImage && (
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured" 
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Write your post content here..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              SEO Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Title
                <span className="text-gray-500 text-xs ml-2">
                  ({formData.metaTitle?.length || 0}/60 characters)
                </span>
              </label>
              <input
                type="text"
                value={formData.metaTitle || ''}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder={formData.title || 'Enter meta title for search engines'}
                maxLength={60}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Appears in search engine results. Leave empty to use post title.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Description
                <span className="text-gray-500 text-xs ml-2">
                  ({formData.metaDescription?.length || 0}/160 characters)
                </span>
              </label>
              <textarea
                value={formData.metaDescription || ''}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder={formData.excerpt || 'Enter meta description for search engines'}
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Brief summary for search results. Leave empty to use excerpt.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Focus Keyword</label>
              <input
                type="text"
                value={formData.focusKeyword || ''}
                onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                placeholder="e.g., medical cannabis retreat Thailand"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Main keyword you want this post to rank for.
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-4">Social Media Preview</h4>
              
              <div>
                <label className="block text-sm font-medium mb-2">OG Title</label>
                <input
                  type="text"
                  value={formData.ogTitle || ''}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                  placeholder={formData.metaTitle || formData.title || 'Title for social media sharing'}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">OG Description</label>
                <textarea
                  value={formData.ogDescription || ''}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  placeholder={formData.metaDescription || formData.excerpt || 'Description for social media sharing'}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">OG Image</label>
                <input
                  type="text"
                  value={formData.ogImage || ''}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder={formData.featuredImage || 'Image URL for social media sharing'}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use featured image.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}