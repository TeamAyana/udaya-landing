'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { generateSlug } from '@/lib/utils/slug'
import { Save, ArrowLeft, Search, Plus } from 'lucide-react'
import Link from 'next/link'

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [authors, setAuthors] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [addingCategory, setAddingCategory] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published',
    author: 'Udaya Team',
    // SEO fields
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  })

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/blog/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }, [])

  const fetchAuthors = useCallback(async () => {
    try {
      const response = await fetch('/api/blog/authors')
      const data = await response.json()
      setAuthors(data.authors || [])
      // Set default author if available
      if (data.authors && data.authors.length > 0 && !formData.author) {
        setFormData(prev => ({ ...prev, author: data.authors[0].name }))
      }
    } catch (error) {
      console.error('Failed to fetch authors:', error)
    }
  }, [formData.author])

  useEffect(() => {
    setMounted(true)
    fetchCategories()
    fetchAuthors()
  }, [fetchCategories, fetchAuthors])

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
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
        setFormData(prev => ({ ...prev, featuredImage: data.url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined,
          // Include all SEO fields
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          focusKeyword: formData.focusKeyword,
          ogTitle: formData.ogTitle,
          ogDescription: formData.ogDescription,
          ogImage: formData.ogImage
        })
      })

      if (response.ok) {
        router.push('/admin/dashboard/posts')
      }
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
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

      <h1 className="text-3xl font-serif font-bold">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="flex gap-2">
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setShowNewCategory(true)
                      } else {
                        setFormData({ ...formData, category: e.target.value })
                      }
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                    required={!showNewCategory}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="__new__" className="font-medium text-udaya-sage">
                      + Add New Category
                    </option>
                  </select>
                </div>
                {showNewCategory && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter new category name"
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
                      autoFocus
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={async () => {
                        if (newCategoryName.trim()) {
                          setAddingCategory(true)
                          try {
                            const response = await fetch('/api/blog/categories', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ name: newCategoryName.trim() })
                            })
                            
                            if (response.ok) {
                              const data = await response.json()
                              setCategories([...categories, data.category])
                              setFormData({ ...formData, category: data.category.slug })
                              setNewCategoryName('')
                              setShowNewCategory(false)
                            }
                          } catch (error) {
                            console.error('Failed to create category:', error)
                          } finally {
                            setAddingCategory(false)
                          }
                        }
                      }}
                      disabled={!newCategoryName.trim() || addingCategory}
                    >
                      {addingCategory ? 'Adding...' : 'Add'}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowNewCategory(false)
                        setNewCategoryName('')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <select
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                  required
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.name}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="wellness, cannabis, health"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
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
                  ({formData.metaTitle.length}/60 characters)
                </span>
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder={formData.title || 'Enter meta title for search engines'}
                maxLength={60}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
              />
              <p className="text-xs text-gray-500 mt-1">
                Appears in search engine results. Leave empty to use post title.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Description
                <span className="text-gray-500 text-xs ml-2">
                  ({formData.metaDescription.length}/160 characters)
                </span>
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder={formData.excerpt || 'Enter meta description for search engines'}
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
              />
              <p className="text-xs text-gray-500 mt-1">
                Brief summary for search results. Leave empty to use excerpt.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Focus Keyword</label>
              <input
                type="text"
                value={formData.focusKeyword}
                onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                placeholder="e.g., medical cannabis retreat Thailand"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
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
                  value={formData.ogTitle}
                  onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                  placeholder={formData.metaTitle || formData.title || 'Title for social media sharing'}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">OG Description</label>
                <textarea
                  value={formData.ogDescription}
                  onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                  placeholder={formData.metaDescription || formData.excerpt || 'Description for social media sharing'}
                  rows={2}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">OG Image</label>
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder={formData.featuredImage || 'Image URL for social media sharing'}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use featured image.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              onClick={() => setFormData({ ...formData, status: 'published' })}
            >
              {loading ? 'Publishing...' : 'Publish'}
            </Button>
            <Button
              type="submit"
              variant="outline"
              disabled={loading}
              onClick={() => setFormData({ ...formData, status: 'draft' })}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}