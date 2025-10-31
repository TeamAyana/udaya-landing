/* eslint-disable @next/next/no-head-element */
/**
 * Waitlist Confirmation Email Template
 * Beautiful, consistent design with logo and Udaya branding
 */

interface WaitlistConfirmationEmailProps {
  firstName: string
  waitlistNumber: number
  diagnosis: string
  retreatInterest: string
}

export function WaitlistConfirmationEmail({
  firstName,
  waitlistNumber,
  diagnosis,
  retreatInterest
}: WaitlistConfirmationEmailProps) {
  const programName = retreatInterest === 'cancer-q2-2026'
    ? 'Cancer Program (Q2 2026)'
    : 'Future Programs'

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Udaya Waitlist</title>
      </head>
      <body style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.6',
        color: '#2B2B2B',
        backgroundColor: '#F6F2E6',
        margin: 0,
        padding: 0
      }}>
        {/* Wrapper for email clients */}
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#F6F2E6', padding: '40px 20px' }}>
          <tr>
            <td align="center">
              {/* Main Container */}
              <table width="600" cellPadding="0" cellSpacing="0" style={{
                maxWidth: '600px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
              }}>
                {/* Header with Logo */}
                <tr>
                  <td style={{
                    background: 'linear-gradient(135deg, #7fa99b 0%, #6b8e7f 100%)',
                    padding: '48px 40px',
                    textAlign: 'center'
                  }}>
                    {/* Logo */}
                    <img
                      src="https://udaya.one/uploads/logo_mid.png"
                      alt="Udaya"
                      width="100"
                      height="100"
                      style={{
                        display: 'block',
                        margin: '0 auto 24px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '8px'
                      }}
                    />
                    <h1 style={{
                      color: '#ffffff',
                      fontSize: '32px',
                      margin: '0 0 12px 0',
                      fontWeight: '700',
                      letterSpacing: '-0.5px'
                    }}>
                      Welcome to Udaya
                    </h1>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '18px',
                      margin: 0,
                      fontWeight: '400'
                    }}>
                      Your journey begins here
                    </p>
                  </td>
                </tr>

                {/* Waitlist Number Badge */}
                <tr>
                  <td style={{ padding: '40px 40px 0' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #7fa99b 0%, #6b8e7f 100%)',
                      borderRadius: '16px',
                      padding: '32px',
                      textAlign: 'center',
                      marginBottom: '32px'
                    }}>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontWeight: '600',
                        margin: '0 0 12px 0'
                      }}>
                        Your Waitlist Number
                      </p>
                      <div style={{
                        fontSize: '56px',
                        fontWeight: '700',
                        color: '#ffffff',
                        lineHeight: '1',
                        margin: '0'
                      }}>
                        #{waitlistNumber}
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td style={{ padding: '0 40px 40px' }}>
                    <h2 style={{
                      fontSize: '24px',
                      color: '#2B2B2B',
                      margin: '0 0 20px 0',
                      fontWeight: '600'
                    }}>
                      Thank you, {firstName}
                    </h2>

                    <p style={{
                      fontSize: '16px',
                      color: '#4A5568',
                      margin: '0 0 24px 0',
                      lineHeight: '1.7'
                    }}>
                      We've received your application and are honored that you're considering Udaya as part of your healing journey. Your story matters, and we see you.
                    </p>

                    {/* Program Details Card */}
                    <div style={{
                      backgroundColor: '#F8F6F3',
                      borderLeft: '4px solid #7fa99b',
                      borderRadius: '8px',
                      padding: '24px',
                      margin: '32px 0'
                    }}>
                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td style={{ paddingBottom: '12px' }}>
                            <p style={{
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              color: '#7fa99b',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              Program Interest
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style={{
                              fontSize: '18px',
                              color: '#2B2B2B',
                              fontWeight: '600',
                              margin: 0
                            }}>
                              {programName}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* What's Next Section */}
                    <div style={{
                      backgroundColor: '#FEF8F4',
                      borderRadius: '12px',
                      padding: '28px',
                      margin: '32px 0'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        color: '#2B2B2B',
                        margin: '0 0 20px 0',
                        fontWeight: '600'
                      }}>
                        What Happens Next
                      </h3>
                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td style={{ paddingBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{
                                display: 'inline-block',
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#7fa99b',
                                borderRadius: '50%',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: '600',
                                textAlign: 'center',
                                lineHeight: '24px',
                                marginRight: '12px',
                                flexShrink: 0
                              }}>
                                1
                              </span>
                              <p style={{ margin: 0, color: '#4A5568', fontSize: '15px', lineHeight: '1.6' }}>
                                Our team will review your application within 48-72 hours
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{
                                display: 'inline-block',
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#7fa99b',
                                borderRadius: '50%',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: '600',
                                textAlign: 'center',
                                lineHeight: '24px',
                                marginRight: '12px',
                                flexShrink: 0
                              }}>
                                2
                              </span>
                              <p style={{ margin: 0, color: '#4A5568', fontSize: '15px', lineHeight: '1.6' }}>
                                We'll reach out with next steps and answer any questions you may have
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                              <span style={{
                                display: 'inline-block',
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#7fa99b',
                                borderRadius: '50%',
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: '600',
                                textAlign: 'center',
                                lineHeight: '24px',
                                marginRight: '12px',
                                flexShrink: 0
                              }}>
                                3
                              </span>
                              <p style={{ margin: 0, color: '#4A5568', fontSize: '15px', lineHeight: '1.6' }}>
                                You'll receive updates about program dates, pricing, and preparation
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* Divider */}
                    <div style={{
                      height: '1px',
                      background: 'linear-gradient(to right, transparent, #E5E7EB, transparent)',
                      margin: '32px 0'
                    }} />

                    {/* Explore Section */}
                    <p style={{
                      fontSize: '15px',
                      color: '#4A5568',
                      margin: '0 0 16px 0'
                    }}>
                      In the meantime, feel free to explore:
                    </p>
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '24px' }}>
                      <tr>
                        <td style={{ paddingRight: '8px', paddingBottom: '8px' }}>
                          <a href="https://udaya.one/method" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#F8F6F3',
                            color: '#7fa99b',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: '1px solid #E5E7EB'
                          }}>
                            Our Method
                          </a>
                        </td>
                        <td style={{ paddingRight: '8px', paddingBottom: '8px' }}>
                          <a href="https://udaya.one/faq" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#F8F6F3',
                            color: '#7fa99b',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: '1px solid #E5E7EB'
                          }}>
                            FAQ
                          </a>
                        </td>
                        <td style={{ paddingBottom: '8px' }}>
                          <a href="https://udaya.one/about" style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#F8F6F3',
                            color: '#7fa99b',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: '1px solid #E5E7EB'
                          }}>
                            About Us
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style={{
                      fontSize: '16px',
                      color: '#2B2B2B',
                      margin: '32px 0 0 0',
                      lineHeight: '1.6'
                    }}>
                      With compassion and care,<br />
                      <strong style={{ fontWeight: '600' }}>The Udaya Team</strong>
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{
                    backgroundColor: '#2B2B2B',
                    padding: '40px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: '#ffffff',
                      fontSize: '16px',
                      margin: '0 0 16px 0',
                      fontWeight: '500'
                    }}>
                      Udaya
                    </p>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '14px',
                      margin: '0 0 20px 0'
                    }}>
                      Holistic Medical Cannabis Education
                    </p>
                    <table width="100%" cellPadding="0" cellSpacing="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:team@udaya.one" style={{
                            color: '#7fa99b',
                            textDecoration: 'none',
                            fontSize: '14px',
                            margin: '0 12px'
                          }}>
                            team@udaya.one
                          </a>
                          <span style={{ color: 'rgba(255, 255, 255, 0.3)', margin: '0 8px' }}>|</span>
                          <a href="https://wa.me/16477730296" style={{
                            color: '#7fa99b',
                            textDecoration: 'none',
                            fontSize: '14px',
                            margin: '0 12px'
                          }}>
                            WhatsApp
                          </a>
                          <span style={{ color: 'rgba(255, 255, 255, 0.3)', margin: '0 8px' }}>|</span>
                          <a href="https://udaya.one" style={{
                            color: '#7fa99b',
                            textDecoration: 'none',
                            fontSize: '14px',
                            margin: '0 12px'
                          }}>
                            Visit Website
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '12px',
                      margin: '24px 0 0 0'
                    }}>
                      © 2025 Udaya. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
