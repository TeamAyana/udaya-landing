/**
 * Test script to verify Resend setup
 * Run with: node scripts/test-resend.js
 */

require('dotenv').config({ path: '.env.local' })
const { Resend } = require('resend')

async function testResend() {
  console.log('\n🔍 Testing Resend Setup...\n')

  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not found in .env.local')
    process.exit(1)
  }

  console.log('✅ API Key found:', process.env.RESEND_API_KEY.substring(0, 10) + '...')

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    // Test 1: Check API key validity by listing domains
    console.log('\n📋 Checking domains...')
    const domainsResponse = await resend.domains.list()

    if (domainsResponse.error) {
      console.error('❌ Error fetching domains:', domainsResponse.error)
      console.error('   This usually means the API key is invalid')
      process.exit(1)
    }

    const domains = domainsResponse.data?.data || []
    console.log(`✅ Found ${domains.length} domain(s)`)

    if (domains.length === 0) {
      console.log('\n⚠️  No domains found!')
      console.log('   You need to add and verify your domain in Resend dashboard:')
      console.log('   1. Go to https://resend.com/domains')
      console.log('   2. Click "Add Domain"')
      console.log('   3. Enter: udaya.one')
      console.log('   4. Add the DNS records to your domain registrar')
      console.log('   5. Wait for verification (5-15 minutes)')
      console.log('\n   OR for testing, you can use: onboarding@resend.dev')
    } else {
      console.log('\n📧 Domains:')
      domains.forEach(domain => {
        const status = domain.status === 'verified' ? '✅' : '⚠️'
        console.log(`   ${status} ${domain.name} - Status: ${domain.status}`)
        if (domain.status !== 'verified') {
          console.log(`      You need to verify this domain by adding DNS records`)
        }
      })
    }

    // Test 2: Try to send a test email
    console.log('\n📤 Attempting to send test email...')

    const testResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Using Resend's test domain
      to: 'test@example.com', // This won't actually send
      subject: 'Resend Test Email',
      html: '<p>This is a test email from Udaya setup script</p>'
    })

    if (testResult.error) {
      console.error('❌ Error sending test email:', testResult.error)
    } else {
      console.log('✅ Test email queued successfully! ID:', testResult.data?.id)
      console.log('   Note: Email sent to test@example.com (won\'t actually deliver)')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    process.exit(1)
  }

  console.log('\n✨ Resend setup test complete!\n')
}

testResend()
