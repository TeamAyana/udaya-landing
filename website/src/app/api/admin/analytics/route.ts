import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-firebase'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

// Initialize the Google Analytics Data API client
function getAnalyticsClient() {
  if (!process.env.GA_PROPERTY_ID || !process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY) {
    return null
  }

  try {
    return new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        private_key: process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
    })
  } catch (error) {
    console.error('Failed to initialize Analytics client:', error)
    return null
  }
}

// Get the start date based on the range
function getStartDate(range: string): string {
  const today = new Date()
  
  switch (range) {
    case 'today':
      return 'today'
    case 'yesterday':
      return 'yesterday'
    case '7days':
      return '7daysAgo'
    case '30days':
      return '30daysAgo'
    case '90days':
      return '90daysAgo'
    default:
      return '7daysAgo'
  }
}

// Process the analytics response into our format
async function processAnalyticsData(propertyId: string, dateRange: string, client: BetaAnalyticsDataClient) {
  try {
    // Get overview metrics
    const [overviewResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: getStartDate(dateRange), endDate: 'today' }],
      metrics: [
        { name: 'totalUsers' },
        { name: 'newUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' }
      ],
    })

    const overviewRow = overviewResponse.rows?.[0]
    const overview = {
      totalUsers: parseInt(overviewRow?.metricValues?.[0]?.value || '0'),
      newUsers: parseInt(overviewRow?.metricValues?.[1]?.value || '0'),
      sessions: parseInt(overviewRow?.metricValues?.[2]?.value || '0'),
      pageViews: parseInt(overviewRow?.metricValues?.[3]?.value || '0'),
      avgSessionDuration: parseFloat(overviewRow?.metricValues?.[4]?.value || '0'),
      bounceRate: parseFloat(overviewRow?.metricValues?.[5]?.value || '0')
    }

    // Get top pages
    const [pagesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: getStartDate(dateRange), endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' }
      ],
      limit: 10,
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }]
    })

    const topPages = (pagesResponse.rows || []).map(row => ({
      pagePath: row.dimensionValues?.[0]?.value || '',
      pageViews: parseInt(row.metricValues?.[0]?.value || '0'),
      avgTimeOnPage: parseFloat(row.metricValues?.[1]?.value || '0'),
      bounceRate: parseFloat(row.metricValues?.[2]?.value || '0')
    }))

    // Get traffic sources
    const [sourcesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: getStartDate(dateRange), endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [
        { name: 'totalUsers' },
        { name: 'sessions' }
      ],
      limit: 10,
      orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }]
    })

    const trafficSources = (sourcesResponse.rows || []).map(row => ({
      source: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0')
    }))

    // Get device breakdown
    const [devicesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: getStartDate(dateRange), endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'totalUsers' }]
    })

    const deviceData = (devicesResponse.rows || []).reduce((acc, row) => {
      const device = row.dimensionValues?.[0]?.value?.toLowerCase() || ''
      const users = parseInt(row.metricValues?.[0]?.value || '0')
      acc[device] = users
      return acc
    }, {} as Record<string, number>)

    const totalDeviceUsers = deviceData.desktop + deviceData.mobile + deviceData.tablet || 1
    const devices = {
      desktop: Math.round((deviceData.desktop || 0) / totalDeviceUsers * 100),
      mobile: Math.round((deviceData.mobile || 0) / totalDeviceUsers * 100),
      tablet: Math.round((deviceData.tablet || 0) / totalDeviceUsers * 100)
    }

    // Get top countries
    const [countriesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: getStartDate(dateRange), endDate: 'today' }],
      dimensions: [{ name: 'country' }],
      metrics: [
        { name: 'totalUsers' },
        { name: 'sessions' }
      ],
      limit: 10,
      orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }]
    })

    const countries = (countriesResponse.rows || []).map(row => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
      sessions: parseInt(row.metricValues?.[1]?.value || '0')
    }))

    // Get realtime data (if available)
    let realtimeUsers = 0
    try {
      const [realtimeResponse] = await client.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: 'activeUsers' }]
      })
      realtimeUsers = parseInt(realtimeResponse.rows?.[0]?.metricValues?.[0]?.value || '0')
    } catch (error) {
      console.log('Realtime data not available:', error)
    }

    return {
      overview,
      topPages,
      trafficSources,
      devices,
      countries,
      realtime: {
        activeUsers: realtimeUsers
      }
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Check if Google Analytics is configured
    const client = getAnalyticsClient()
    if (!client || !process.env.GA_PROPERTY_ID) {
      // Return null analytics to show setup message
      return NextResponse.json({ analytics: null })
    }
    
    const searchParams = request.nextUrl.searchParams
    const range = searchParams.get('range') || '7days'
    
    try {
      // Fetch real analytics data
      const analyticsData = await processAnalyticsData(
        process.env.GA_PROPERTY_ID,
        range,
        client
      )
      
      return NextResponse.json({ analytics: analyticsData })
    } catch (error: any) {
      console.error('Analytics API error:', error)
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        propertyId: process.env.GA_PROPERTY_ID,
        clientEmail: process.env.GA_CLIENT_EMAIL
      })
      
      // If it's a permission error, return a specific message
      if (error.message?.includes('permission') || error.code === 7 || error.code === 403) {
        return NextResponse.json({ 
          analytics: null,
          error: `Service account needs access to Google Analytics property. Please add ${process.env.GA_CLIENT_EMAIL} to your GA property with Viewer permissions. Property ID: ${process.env.GA_PROPERTY_ID}`
        })
      }
      
      // If property not found
      if (error.message?.includes('property') || error.code === 404) {
        return NextResponse.json({ 
          analytics: null,
          error: `Google Analytics property not found. Please verify your GA_PROPERTY_ID (${process.env.GA_PROPERTY_ID}) is correct. For GA4, use just the numeric ID (e.g., 123456789), not the measurement ID (G-XXXXXX).`
        })
      }
      
      // For other errors, return more detailed error
      return NextResponse.json({ 
        analytics: null,
        error: `Failed to fetch analytics data: ${error.message || 'Unknown error'}. Please check your configuration.`
      })
    }
  } catch (error) {
    console.error('Error in analytics route:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}