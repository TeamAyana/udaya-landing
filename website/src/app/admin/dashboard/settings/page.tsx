'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Tag, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save,
  X,
  Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Author {
  id: string
  name: string
  email: string
  bio: string
  avatar?: string
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string
}

function SettingsContent() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tab || 'categories')
  const [authors, setAuthors] = useState<Author[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  
  // Author management states
  const [showNewAuthor, setShowNewAuthor] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<string | null>(null)
  const [newAuthor, setNewAuthor] = useState<Partial<Author>>({})
  
  // Category management states
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [categoryEdits, setCategoryEdits] = useState<Record<string, Partial<Category>>>({})
  
  useEffect(() => {
    fetchAuthors()
    fetchCategories()
  }, [])
  
  useEffect(() => {
    if (tab) {
      setActiveTab(tab)
    }
  }, [tab])
  
  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/blog/authors')
      const data = await response.json()
      setAuthors(data.authors || [])
    } catch (error) {
      console.error('Failed to fetch authors:', error)
      // Fallback to default author
      setAuthors([
        { id: '1', name: 'Udaya Team', email: 'team@udaya.one', bio: 'The Udaya wellness team' },
      ])
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
  
  const handleAddAuthor = async () => {
    if (!newAuthor.name || !newAuthor.email) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/blog/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAuthor)
      })
      
      if (response.ok) {
        const data = await response.json()
        setAuthors([...authors, data.author])
        setNewAuthor({})
        setShowNewAuthor(false)
      }
    } catch (error) {
      console.error('Failed to add author:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteAuthor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this author?')) return
    
    try {
      const response = await fetch(`/api/blog/authors/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setAuthors(authors.filter(a => a.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete author:', error)
    }
  }
  
  const handleUpdateCategory = async (id: string) => {
    const updates = categoryEdits[id]
    if (!updates) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/blog/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (response.ok) {
        setCategories(categories.map(cat => 
          cat.id === id ? { ...cat, ...updates } : cat
        ))
        setEditingCategory(null)
        setCategoryEdits({})
      }
    } catch (error) {
      console.error('Failed to update category:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Posts in this category will need to be reassigned.')) {
      return
    }
    
    try {
      const response = await fetch(`/api/blog/categories/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setCategories(categories.filter(c => c.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }
  
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setNewAuthor({ ...newAuthor, avatar: data.url })
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Blog Content Management</h1>
        <p className="text-gray-600 mt-2">Manage categories and authors for your blog</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-gray-50 rounded-lg p-1 mb-8">
          <TabsList className="flex gap-2">
            <TabsTrigger
              value="authors"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                activeTab === 'authors' 
                  ? "bg-white text-udaya-sage shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <User className="w-4 h-4 mr-2 inline" />
              Authors
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className={cn(
                "px-4 py-2 rounded-md font-medium transition-colors",
                activeTab === 'categories' 
                  ? "bg-white text-udaya-sage shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Tag className="w-4 h-4 mr-2 inline" />
              Categories
            </TabsTrigger>
          </TabsList>
        </div>
        {/* Authors Tab */}
        <TabsContent value="authors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Authors</CardTitle>
              <Button onClick={() => setShowNewAuthor(true)} size="sm" className="relative z-10">
                <Plus className="w-4 h-4 mr-2" />
                Add Author
              </Button>
            </CardHeader>
            <CardContent>
              {/* New Author Form */}
              {showNewAuthor && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-medium mb-4">Add New Author</h4>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={newAuthor.name || ''}
                          onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={newAuthor.email || ''}
                          onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={newAuthor.bio || ''}
                        onChange={(e) => setNewAuthor({ ...newAuthor, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                        placeholder="Brief bio about the author..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Avatar</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="flex-1 relative z-10"
                        />
                        {newAuthor.avatar && (
                          <img 
                            src={newAuthor.avatar} 
                            alt="Avatar preview" 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddAuthor} size="sm" className="relative z-10">
                        <Save className="w-4 h-4 mr-2" />
                        Save Author
                      </Button>
                      <Button 
                        onClick={() => {
                          setShowNewAuthor(false)
                          setNewAuthor({})
                        }} 
                        variant="outline" 
                        size="sm"
                        className="relative z-10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Authors List */}
              <div className="space-y-4">
                {authors.map((author) => (
                  <div key={author.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {author.avatar ? (
                        <img 
                          src={author.avatar} 
                          alt={author.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-udaya-sage/20 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-udaya-sage" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{author.name}</p>
                        <p className="text-sm text-gray-600">{author.email}</p>
                        {author.bio && <p className="text-sm text-gray-500 mt-1">{author.bio}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleDeleteAuthor(author.id)} 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 relative z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                    {editingCategory === category.id ? (
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={categoryEdits[category.id]?.name || category.name}
                          onChange={(e) => setCategoryEdits({
                            ...categoryEdits,
                            [category.id]: { ...categoryEdits[category.id], name: e.target.value }
                          })}
                          className="px-3 py-1 border rounded focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                        />
                        <input
                          type="text"
                          value={categoryEdits[category.id]?.slug || category.slug}
                          onChange={(e) => setCategoryEdits({
                            ...categoryEdits,
                            [category.id]: { ...categoryEdits[category.id], slug: e.target.value }
                          })}
                          className="px-3 py-1 border rounded focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                        />
                        <input
                          type="text"
                          value={categoryEdits[category.id]?.description || category.description || ''}
                          onChange={(e) => setCategoryEdits({
                            ...categoryEdits,
                            [category.id]: { ...categoryEdits[category.id], description: e.target.value }
                          })}
                          placeholder="Description (optional)"
                          className="px-3 py-1 border rounded focus:ring-2 focus:ring-udaya-sage focus:border-transparent relative z-10"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-gray-600">Slug: {category.slug}</p>
                        {category.description && (
                          <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {editingCategory === category.id ? (
                        <>
                          <Button 
                            onClick={() => handleUpdateCategory(category.id)} 
                            size="sm"
                            disabled={loading}
                            className="relative z-10"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => {
                              setEditingCategory(null)
                              setCategoryEdits({})
                            }} 
                            variant="outline" 
                            size="sm"
                            className="relative z-10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            onClick={() => {
                              setEditingCategory(category.id)
                              setCategoryEdits({
                                [category.id]: {
                                  name: category.name,
                                  slug: category.slug,
                                  description: category.description
                                }
                              })
                            }} 
                            variant="ghost" 
                            size="sm"
                            className="relative z-10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDeleteCategory(category.id)} 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 relative z-10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Blog Content Management</h1>
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    }>
      <SettingsContent />
    </Suspense>
  )
}