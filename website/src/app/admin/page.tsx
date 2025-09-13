'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Settings, LogOut, PlusCircle, Eye } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    recentPosts: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/posts')
      if (res.ok) {
        const posts = await res.json()
        const totalViews = posts.reduce((sum: number, post: any) => sum + (post.views || 0), 0)
        setStats({
          totalPosts: posts.length,
          totalViews,
          recentPosts: posts.slice(0, 5)
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-udaya-primary">Udaya Admin</h2>
          </div>
          <nav className="mt-6">
            <Link 
              href="/admin" 
              className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 border-r-4 border-udaya-primary"
            >
              <BarChart3 className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link 
              href="/admin/posts" 
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <FileText className="w-5 h-5 mr-3" />
              Blog Posts
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPosts}</div>
                <p className="text-xs text-muted-foreground">Published blog posts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews}</div>
                <p className="text-xs text-muted-foreground">All time views</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Link href="/admin/posts/new">
                  <Button className="w-full bg-udaya-primary hover:bg-udaya-primary/90">
                    Create New Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : stats.recentPosts.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentPosts.map((post: any) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()} • {post.views} views
                        </p>
                      </div>
                      <Link href={`/admin/posts/${post.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No posts yet. Create your first post!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}