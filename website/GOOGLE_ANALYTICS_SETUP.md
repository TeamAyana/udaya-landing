# Google Analytics Integration Setup

## Overview

To add Google Analytics to your admin dashboard, you'll need to:
1. Set up Google Analytics 4 (GA4) property
2. Create a service account for API access
3. Add environment variables
4. The dashboard will automatically show analytics

## Step 1: Set up Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for your website
3. Install the GA4 tracking code on your website
4. Note your **Property ID** (looks like: 123456789)

## Step 2: Enable Google Analytics Data API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the **Google Analytics Data API v1**:
   - Go to APIs & Services → Library
   - Search for "Google Analytics Data API"
   - Click Enable

## Step 3: Create Service Account

1. In Google Cloud Console, go to APIs & Services → Credentials
2. Click "Create Credentials" → "Service Account"
3. Fill in:
   - Service account name: `udaya-analytics`
   - Service account ID: (auto-generated)
4. Click Create and Continue
5. Skip the optional steps and click Done

## Step 4: Download Service Account Key

1. Click on the service account you created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose JSON format
5. Download the key file (keep it secure!)

## Step 5: Grant Analytics Access

1. Go to Google Analytics
2. Admin → Property → Property Access Management
3. Click the "+" button to add users
4. Add the service account email (from the JSON file)
5. Grant "Viewer" role

## Step 6: Add Environment Variables

Add these to your `.env.local` and Vercel:

```env
# Google Analytics
GA_PROPERTY_ID=123456789
GA_CLIENT_EMAIL=udaya-analytics@your-project.iam.gserviceaccount.com
GA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Extract these values from your service account JSON:
- `GA_CLIENT_EMAIL`: The "client_email" field
- `GA_PRIVATE_KEY`: The "private_key" field
- `GA_PROPERTY_ID`: Your GA4 property ID

## Step 7: Dashboard Features

Once configured, your admin dashboard will show:

### Overview Stats
- Total visitors
- Page views
- Average session duration
- Bounce rate

### Traffic Sources
- Organic search
- Direct traffic
- Social media
- Referral sites

### Top Pages
- Most visited pages
- Time on page
- Bounce rate per page

### Real-time Data
- Active users right now
- Current page views

### Geographic Data
- Visitors by country
- City-level breakdown

### Device Analytics
- Desktop vs Mobile vs Tablet
- Browser usage
- Operating systems

## Implementation Notes

The analytics data is fetched server-side using the Google Analytics Data API, which:
- Provides real-time and historical data
- Allows custom date ranges
- Supports advanced filtering
- No client-side tracking code needed in admin

## Troubleshooting

### "Permission denied" error
- Make sure the service account email has Viewer access in GA4
- Check that the property ID is correct

### No data showing
- GA4 needs 24-48 hours to start showing data
- Ensure tracking code is installed on your public website
- Check that the property ID matches

### API quota errors
- The free tier allows 10,000 requests per day
- Implement caching to reduce API calls

## Security Best Practices

1. Never commit the service account JSON to git
2. Use environment variables for all credentials
3. Restrict service account to minimal permissions (Viewer only)
4. Rotate keys periodically
5. Monitor API usage in Google Cloud Console