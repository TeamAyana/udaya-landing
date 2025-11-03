/**
 * Test email template rendering
 */

require('dotenv').config({ path: '.env.local' })
const { Resend } = require('resend')
const { createElement } = require('react')
const { renderToStaticMarkup } = require('react-dom/server')

// Import email templates
const { ContactConfirmationEmail } = require('../src/lib/emails/contact-confirmation')

async function testTemplate() {
  console.log('\n🎨 Testing Contact Confirmation Email Template...\n')

  const resend = new Resend(process.env.RESEND_API_KEY)
  const testEmailAddress = process.argv[2] || 'ayanabrand@gmail.com'

  try {
    // Render the template
    console.log('📝 Rendering template...')
    const emailHtml = renderToStaticMarkup(
      createElement(ContactConfirmationEmail, {
        name: 'Test User',
        subject: 'Test Subject - Website Integration',
        userType: 'patient'
      })
    )

    console.log('✅ Template rendered successfully')
    console.log(`   HTML length: ${emailHtml.length} characters\n`)

    // Send the email
    console.log('📧 Sending email to:', testEmailAddress)
    const result = await resend.emails.send({
      from: 'Udaya <team@udaya.one>',
      to: testEmailAddress,
      subject: 'Test: Contact Form Confirmation Email',
      html: emailHtml,
      replyTo: 'team@udaya.one'
    })

    if (result.error) {
      console.error('❌ Error:', result.error)
      process.exit(1)
    }

    console.log('✅ Email sent successfully!')
    console.log('   Email ID:', result.data?.id)
    console.log('\n📬 Check your inbox at:', testEmailAddress, '\n')

  } catch (error) {
    console.error('❌ Error:', error)
    console.error('   Stack:', error.stack)
    process.exit(1)
  }
}

testTemplate()
