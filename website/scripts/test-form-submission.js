/**
 * Test form submission by calling the API endpoint
 */

async function testContactForm() {
  console.log('\n📝 Testing Contact Form Submission...\n')

  const testData = {
    name: 'Test User',
    email: 'ayanabrand@gmail.com',
    country: 'Test Country',
    userType: 'patient',
    subject: 'Test Subject - API Integration Test',
    message: 'This is a test message to verify the contact form integration is working correctly with Resend email service.'
  }

  console.log('📤 Submitting to: http://localhost:3000/api/contact')
  console.log('📧 Email will be sent to:', testData.email, '\n')

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('❌ API Error:', result)
      process.exit(1)
    }

    console.log('✅ Form submission successful!')
    console.log('   Response:', result)
    console.log('\n📬 Check your inbox and Resend dashboard!')
    console.log('   User email: ayanabrand@gmail.com')
    console.log('   Admin email: team@udaya.one')
    console.log('   Resend dashboard: https://resend.com/emails\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

testContactForm()
