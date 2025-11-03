/**
 * Send a real test email to verify everything works
 * Run with: node scripts/send-test-email.js YOUR_EMAIL@example.com
 */

require('dotenv').config({ path: '.env.local' })
const { Resend } = require('resend')

async function sendTestEmail() {
  const testEmailAddress = process.argv[2] || 'ayanabrand@gmail.com'

  console.log('\n📧 Sending test email to:', testEmailAddress)
  console.log('   From: team@udaya.one\n')

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const result = await resend.emails.send({
      from: 'Udaya Test <team@udaya.one>',
      to: testEmailAddress,
      subject: '✅ Resend Integration Test - Udaya Website',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7fa99b 0%, #6b8e7f 100%); padding: 40px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">UDAYA</h1>
          </div>
          <div style="padding: 40px; background: white;">
            <h2 style="color: #2c3e50;">✅ Email Integration Test Successful!</h2>
            <p style="color: #556b2f; font-size: 16px;">
              This test email confirms that your Resend integration is working correctly.
            </p>
            <div style="background: #f8f6f3; border-left: 4px solid #7fa99b; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c3e50;">Configuration Status:</h3>
              <ul style="color: #556b2f;">
                <li>✅ Resend API Key: Valid</li>
                <li>✅ Domain udaya.one: Verified</li>
                <li>✅ From Address: team@udaya.one</li>
                <li>✅ Email Templates: Ready</li>
              </ul>
            </div>
            <p style="color: #2c3e50; font-size: 16px;">
              <strong>Next Steps:</strong><br/>
              Your forms are now ready to send emails automatically:
            </p>
            <ul style="color: #556b2f;">
              <li>Waitlist Form (/waitlist)</li>
              <li>Contact Form (/contact)</li>
              <li>Referral Form (/referrals)</li>
            </ul>
          </div>
          <div style="background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">Udaya - Holistic Medical Cannabis Education</p>
            <p style="margin: 10px 0 0 0; color: #7fa99b;">team@udaya.one</p>
          </div>
        </div>
      `
    })

    if (result.error) {
      console.error('❌ Error:', result.error)
      process.exit(1)
    }

    console.log('✅ Email sent successfully!')
    console.log('   Email ID:', result.data?.id)
    console.log('\n📬 Check your inbox at:', testEmailAddress)
    console.log('   (Check spam folder if you don\'t see it)\n')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    process.exit(1)
  }
}

sendTestEmail()
