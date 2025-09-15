'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Globe, 
  Smartphone,
  Monitor,
  BarChart3,
  Calendar,
  RefreshCw,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyticsData {
  overview: {
    totalUsers: number
    newUsers: number
    sessions: number
    pageViews: number
    avgSessionDuration: number
    bounceRate: number
  }
  topPages: Array<{
    pagePath: string
    pageViews: number
    avgTimeOnPage: number
    bounceRate: number
  }>
  trafficSources: Array<{
    source: string
    users: number
    sessions: number
  }>
  devices: {
    desktop: number
    mobile: number
    tablet: number
  }
  countries: Array<{
    country: string
    users: number
    sessions: number
  }>
  realtime: {
    activeUsers: number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7days')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])
  
  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`)
      const data = await response.json()
      
      if (data.analytics) {
        setAnalytics(data.analytics)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }
  
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }
  
  if (!analytics && !loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Google Analytics data for your website</p>
        </div>
        
        <Card>
          <CardContent className="py-16 text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Not Configured</h3>
            <p className="text-gray-600 mb-4">
              Google Analytics is not configured. Please set up the following environment variables:
            </p>
            <div className="text-left max-w-md mx-auto mb-4">
              <code className="block bg-gray-100 p-3 rounded text-sm">
                GA_PROPERTY_ID<br/>
                GA_CLIENT_EMAIL<br/>
                GA_PRIVATE_KEY
              </code>
            </div>
            <p className="text-sm text-gray-500">
              Contact your administrator to configure Google Analytics integration.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            Website performance and visitor insights
            {lastUpdated && (
              <span className="text-sm ml-2">
                (Updated {lastUpdated.toLocaleTimeString()})
              </span>
            )}
          </p>
        </div>
        
        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
          </select>
          <Button onClick={fetchAnalytics} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : analytics && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Users
                </CardTitle>
                <Users className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalUsers)}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {analytics.overview.newUsers} new
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Page Views
                </CardTitle>
                <Eye className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.overview.pageViews)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Sessions
                </CardTitle>
                <Activity className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.overview.sessions)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Avg. Duration
                </CardTitle>
                <Clock className="h-5 w-5 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatDuration(analytics.overview.avgSessionDuration)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Bounce Rate
                </CardTitle>
                <TrendingUp className="h-5 w-5 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(analytics.overview.bounceRate * 100).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Now
                </CardTitle>
                <Activity className="h-5 w-5 text-green-600 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.realtime.activeUsers}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topPages.slice(0, 5).map((page, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{page.pagePath}</p>
                        <p className="text-xs text-gray-500">
                          {formatDuration(page.avgTimeOnPage)} avg time • {(page.bounceRate * 100).toFixed(1)}% bounce
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatNumber(page.pageViews)}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.trafficSources.slice(0, 5).map((source, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-sm capitalize">{source.source}</p>
                        <p className="text-xs text-gray-500">{source.sessions} sessions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatNumber(source.users)}</p>
                        <p className="text-xs text-gray-500">users</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <span className="font-semibold">{analytics.devices.desktop}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <span className="font-semibold">{analytics.devices.mobile}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <span className="font-semibold">{analytics.devices.tablet}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Top Countries */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {analytics.countries.slice(0, 6).map((country, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{country.country}</span>
                      </div>
                      <span className="font-semibold text-sm">{formatNumber(country.users)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}