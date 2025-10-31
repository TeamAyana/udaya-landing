/**
 * Referral Partnership Confirmation Email Template
 * Beautiful, consistent design with logo and Udaya branding
 */

interface ReferralConfirmationEmailProps {
  name: string
  role: string
  organization?: string
}

export function ReferralConfirmationEmail({
  name,
  role,
  organization
}: ReferralConfirmationEmailProps) {
  const roleLabel = {
    physician: 'Physician/Oncologist',
    healthcare: 'Healthcare Provider',
    therapist: 'Therapist/Counselor',
    advocate: 'Patient Advocate',
    organization: 'Support Organization',
    other: 'Professional'
  }[role] || 'Partner'

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to the Udaya Partnership Community</title>
      </head>
      <body style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.6',
        color: '#2B2B2B',
        backgroundColor: '#F6F2E6',
        margin: 0,
        padding: 0
      }}>
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#F6F2E6', padding: '40px 20px' }}>
          <tr>
            <td align="center">
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
                      Welcome to Our Partnership Community
                    </h1>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '18px',
                      margin: 0,
                      fontWeight: '400'
                    }}>
                      Together, we serve with compassion
                    </p>
                  </td>
                </tr>

                {/* Partnership Badge */}
                <tr>
                  <td style={{ padding: '40px 40px 0' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #7fa99b 0%, #6b8e7f 100%)',
                      borderRadius: '16px',
                      padding: '24px',
                      textAlign: 'center',
                      marginBottom: '32px'
                    }}>
                      <p style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        fontWeight: '600',
                        margin: '0 0 8px 0'
                      }}>
                        🤝 Partnership Inquiry Received
                      </p>
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
                      Thank you, {name}
                    </h2>

                    <p style={{
                      fontSize: '16px',
                      color: '#4A5568',
                      margin: '0 0 24px 0',
                      lineHeight: '1.7'
                    }}>
                      Thank you for your interest in partnering with Udaya to support those you serve.
                      We're honored to connect with dedicated professionals like you who are committed
                      to whole-person, compassionate care.
                    </p>

                    {/* Partner Details Card */}
                    <div style={{
                      backgroundColor: '#F8F6F3',
                      borderLeft: '4px solid #7fa99b',
                      borderRadius: '8px',
                      padding: '24px',
                      margin: '32px 0'
                    }}>
                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td style={{ paddingBottom: organization ? '16px' : '0' }}>
                            <p style={{
                              fontSize: '12px',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              color: '#7fa99b',
                              fontWeight: '600',
                              margin: '0 0 6px 0'
                            }}>
                              Your Role
                            </p>
                            <p style={{
                              fontSize: '16px',
                              color: '#2B2B2B',
                              fontWeight: '500',
                              margin: 0
                            }}>
                              {roleLabel}
                            </p>
                          </td>
                        </tr>
                        {organization && (
                          <tr>
                            <td>
                              <p style={{
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                color: '#7fa99b',
                                fontWeight: '600',
                                margin: '0 0 6px 0'
                              }}>
                                Organization
                              </p>
                              <p style={{
                                fontSize: '16px',
                                color: '#2B2B2B',
                                fontWeight: '500',
                                margin: 0
                              }}>
                                {organization}
                              </p>
                            </td>
                          </tr>
                        )}
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
                                Our partnerships team will review your inquiry within 48 hours
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
                                We'll schedule a call to discuss how we can best support your patients or community
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
                                3
                              </span>
                              <p style={{ margin: 0, color: '#4A5568', fontSize: '15px', lineHeight: '1.6' }}>
                                You'll receive detailed information about our programs, approach, and collaboration opportunities
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
                                4
                              </span>
                              <p style={{ margin: 0, color: '#4A5568', fontSize: '15px', lineHeight: '1.6' }}>
                                We'll explore how to create a seamless referral process that serves your needs
                              </p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* Highlight Box */}
                    <div style={{
                      background: 'linear-gradient(135deg, #7fa99b 0%, #6b8e7f 100%)',
                      borderRadius: '12px',
                      padding: '28px',
                      margin: '32px 0'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        color: '#ffffff',
                        margin: '0 0 12px 0',
                        fontWeight: '600'
                      }}>
                        Our Commitment to Collaboration
                      </h3>
                      <p style={{
                        fontSize: '15px',
                        color: 'rgba(255, 255, 255, 0.95)',
                        margin: 0,
                        lineHeight: '1.7'
                      }}>
                        We believe in transparent, ethical partnerships that prioritize patient well-being above all else.
                        Our programs complement conventional care—never replacing it—and we're here to support you
                        in serving those who trust your guidance.
                      </p>
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
                          <a href="https://udaya.one/programs" style={{
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
                            Our Programs
                          </a>
                        </td>
                        <td style={{ paddingBottom: '8px' }}>
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
                      </tr>
                    </table>

                    <p style={{
                      fontSize: '16px',
                      color: '#2B2B2B',
                      margin: '32px 0 0 0',
                      lineHeight: '1.6'
                    }}>
                      With gratitude and respect,<br />
                      <strong style={{ fontWeight: '600' }}>The Udaya Partnerships Team</strong>
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
                          <a href="https://udaya.one/referrals" style={{
                            color: '#7fa99b',
                            textDecoration: 'none',
                            fontSize: '14px',
                            margin: '0 12px'
                          }}>
                            Partnership Info
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
