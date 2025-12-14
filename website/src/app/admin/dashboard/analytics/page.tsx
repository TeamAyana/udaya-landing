'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  BarChart3,
  RefreshCw,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

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
  timeSeries?: Array<{
    name: string
    date: string
    dayName: string
    users: number
    pageViews: number
    sessions: number
  }>
  realtime: {
    activeUsers: number
  }
}

const COLORS = {
  primary: '#5C7B65',
  secondary: '#D9A441',
  tertiary: '#C98A6D',
  blue: '#3B82F6',
  green: '#10B981',
  purple: '#8B5CF6',
  orange: '#F59E0B',
  red: '#EF4444',
  gray: '#6B7280'
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7days')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setError(null)
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`)
      const data = await response.json()

      if (data.analytics) {
        setAnalytics(data.analytics)
        setLastUpdated(new Date())
      } else if (data.error) {
        setError(data.error)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      setError('Failed to connect to analytics service')
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

  // Calculate actual percentages if the API returns raw counts instead of percentages
  const totalDeviceCount = analytics
    ? (analytics.devices.desktop || 0) + (analytics.devices.mobile || 0) + (analytics.devices.tablet || 0)
    : 0

  // Check if values are already percentages (sum close to 100) or raw counts (sum much larger)
  const valuesArePercentages = totalDeviceCount > 0 && totalDeviceCount <= 120 // Allow some rounding margin

  const deviceData = analytics ? [
    {
      name: 'Desktop',
      value: valuesArePercentages
        ? analytics.devices.desktop
        : totalDeviceCount > 0
          ? Math.round((analytics.devices.desktop / totalDeviceCount) * 100)
          : 0,
      rawCount: analytics.devices.desktop,
      color: '#5C7B65',
      icon: Monitor
    },
    {
      name: 'Mobile',
      value: valuesArePercentages
        ? analytics.devices.mobile
        : totalDeviceCount > 0
          ? Math.round((analytics.devices.mobile / totalDeviceCount) * 100)
          : 0,
      rawCount: analytics.devices.mobile,
      color: '#3B82F6',
      icon: Smartphone
    },
    {
      name: 'Tablet',
      value: valuesArePercentages
        ? analytics.devices.tablet
        : totalDeviceCount > 0
          ? Math.round((analytics.devices.tablet / totalDeviceCount) * 100)
          : 0,
      rawCount: analytics.devices.tablet,
      color: '#8B5CF6',
      icon: Monitor
    },
  ] : []

  if (!analytics && !loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Google Analytics data for your website</p>
        </div>

        <Card>
          <CardContent className="py-12 sm:py-16 text-center px-4">
            <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Analytics Not Configured</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {error || 'Google Analytics is not configured. Please set up the following environment variables:'}
            </p>
            {!error && (
              <>
                <div className="text-left max-w-md mx-auto mb-4">
                  <code className="block bg-gray-100 p-3 rounded text-xs sm:text-sm">
                    GA_PROPERTY_ID<br/>
                    GA_CLIENT_EMAIL<br/>
                    GA_PRIVATE_KEY
                  </code>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Contact your administrator to configure Google Analytics integration.
                </p>
              </>
            )}
            {error && (
              <Button onClick={fetchAnalytics} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Analytics</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Website performance and visitor insights
            {lastUpdated && (
              <span className="text-xs sm:text-sm ml-2 block sm:inline mt-1 sm:mt-0">
                (Updated {lastUpdated.toLocaleTimeString()})
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-udaya-sage focus:border-transparent"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
          {/* Overview Stats - Modern Cards with Trends */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-8 -mt-8" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Users
                </CardTitle>
                <Users className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalUsers)}</div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <p className="text-xs text-green-600 font-medium">
                    {analytics.overview.newUsers} new
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-8 -mt-8" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Page Views
                </CardTitle>
                <Eye className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.overview.pageViews)}</div>
                <p className="text-xs text-gray-500 mt-1">Total impressions</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-8 -mt-8" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Sessions
                </CardTitle>
                <Activity className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(analytics.overview.sessions)}</div>
                <p className="text-xs text-gray-500 mt-1">User visits</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full -mr-8 -mt-8" />
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
                <p className="text-xs text-gray-500 mt-1">Per session</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-8 -mt-8" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Bounce Rate
                </CardTitle>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(analytics.overview.bounceRate * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-gray-500 mt-1">Single page visits</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -mr-8 -mt-8" />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-green-900">
                  Active Now
                </CardTitle>
                <div className="relative">
                  <Activity className="h-5 w-5 text-green-600 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{analytics.realtime.activeUsers}</div>
                <p className="text-xs text-green-700 mt-1">Live visitors</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Traffic Trend Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Traffic Overview</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Daily visitors and page views</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-udaya-sage" />
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.timeSeries || []}>
                    <defs>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke={COLORS.primary}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUsers)"
                      name="Users"
                    />
                    <Area
                      type="monotone"
                      dataKey="pageViews"
                      stroke={COLORS.blue}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                      name="Page Views"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Device Distribution Donut Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Traffic by device type</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '8px 12px'
                      }}
                      formatter={(value: number) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {deviceData.map((device) => {
                    const DeviceIcon = device.icon
                    return (
                      <div key={device.name} className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: `${device.color}15` }}>
                          <DeviceIcon className="w-5 h-5" style={{ color: device.color }} />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{device.name}</span>
                        <span className="text-lg font-bold mt-1" style={{ color: device.color }}>{device.value}%</span>
                        {device.rawCount > 0 && (
                          <span className="text-xs text-gray-500 mt-0.5">{formatNumber(device.rawCount)} users</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Where visitors come from</p>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={analytics.trafficSources.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="source" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                    />
                    <Bar dataKey="users" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Most visited pages</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.topPages.slice(0, 5).map((page, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-udaya-sage/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-udaya-sage">#{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{page.pagePath}</p>
                        <p className="text-xs text-gray-500">
                          {formatDuration(page.avgTimeOnPage)} avg • {(page.bounceRate * 100).toFixed(1)}% bounce
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatNumber(page.pageViews)}</p>
                        <p className="text-xs text-gray-500">views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Geographic distribution</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.countries.slice(0, 5).map((country, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <Globe className="w-5 h-5 text-udaya-sage flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{country.country}</p>
                        <p className="text-xs text-gray-500">{country.sessions} sessions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatNumber(country.users)}</p>
                        <p className="text-xs text-gray-500">users</p>
                      </div>
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
