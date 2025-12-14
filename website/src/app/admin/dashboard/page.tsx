'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Eye, TrendingUp, Users, Mail, UserCheck, MessageSquare, Handshake } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  waitlistCount: number
  newsletterCount: number
  contactsCount: number
  referralsCount: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    waitlistCount: 0,
    newsletterCount: 0,
    contactsCount: 0,
    referralsCount: 0
  })
  const [recentPosts, setRecentPosts] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch posts data
      const postsResponse = await fetch('/api/blog/posts')
      const postsData = await postsResponse.json()

      // Fetch subscriber data
      const subscribersResponse = await fetch('/api/admin/subscribers')
      const subscribersData = await subscribersResponse.json()

      // Fetch contacts data
      const contactsResponse = await fetch('/api/admin/contacts')
      const contactsData = await contactsResponse.json()

      // Fetch referrals data
      const referralsResponse = await fetch('/api/admin/referrals')
      const referralsData = await referralsResponse.json()

      if (postsData.posts) {
        const posts = postsData.posts
        const published = posts.filter((p: any) => p.status === 'published')
        const drafts = posts.filter((p: any) => p.status === 'draft')
        const totalViews = posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0)

        setStats({
          totalPosts: posts.length,
          publishedPosts: published.length,
          draftPosts: drafts.length,
          totalViews,
          waitlistCount: subscribersData.stats?.waitlistCount || 0,
          newsletterCount: subscribersData.stats?.newsletterCount || 0,
          contactsCount: contactsData.stats?.totalContacts || 0,
          referralsCount: referralsData.stats?.totalReferrals || 0
        })

        setRecentPosts(posts.slice(0, 5))
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Welcome to Udaya Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Posts
            </CardTitle>
            <FileText className="h-5 w-5 text-udaya-sage" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Published
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Drafts
            </CardTitle>
            <FileText className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Views
            </CardTitle>
            <Eye className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Waitlist
            </CardTitle>
            <UserCheck className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.waitlistCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Newsletter
            </CardTitle>
            <Mail className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsletterCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Contacts
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contactsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Partnerships
            </CardTitle>
            <Handshake className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.referralsCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Posts</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/dashboard/posts">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts yet. Create your first post!</p>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-gray-600">
                      {post.status === 'published' ? 'Published' : 'Draft'} • {post.views || 0} views
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/dashboard/posts/${post.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4 flex-wrap">
        <Button asChild>
          <Link href="/admin/dashboard/posts/new">Create New Post</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard/subscribers">View Waitlist</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard/contacts">View Contact Forms</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard/referrals">View Partnerships</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog" target="_blank">View Blog</Link>
        </Button>
      </div>
    </div>
  )
}