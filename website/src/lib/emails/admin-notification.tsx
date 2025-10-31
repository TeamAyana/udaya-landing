/**
 * Waitlist Admin Notification Email Template
 * Beautiful, consistent design for admin alerts
 */

interface AdminNotificationEmailProps {
  waitlistNumber: number
  fullName: string
  email: string
  phone: string
  country: string
  age: string
  diagnosis: string
  diagnosisDate: string
  currentTreatments: string
  cannabisExperience: string
  retreatInterest: string
  timestamp: string
}

export function AdminNotificationEmail({
  waitlistNumber,
  fullName,
  email,
  phone,
  country,
  age,
  diagnosis,
  diagnosisDate,
  currentTreatments,
  cannabisExperience,
  retreatInterest,
  timestamp
}: AdminNotificationEmailProps) {
  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Waitlist Entry #{waitlistNumber}</title>
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
                {/* Header */}
                <tr>
                  <td style={{
                    background: 'linear-gradient(135deg, #d4a574 0%, #c08552 100%)',
                    padding: '40px',
                    textAlign: 'center'
                  }}>
                    <img
                      src="https://udaya.one/uploads/logo_mid.png"
                      alt="Udaya"
                      width="80"
                      height="80"
                      style={{
                        display: 'block',
                        margin: '0 auto 20px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        padding: '8px'
                      }}
                    />
                    <h1 style={{
                      color: '#ffffff',
                      fontSize: '28px',
                      margin: '0 0 8px 0',
                      fontWeight: '700'
                    }}>
                      🎯 New Waitlist Entry
                    </h1>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '16px',
                      margin: 0
                    }}>
                      Waitlist #{waitlistNumber}
                    </p>
                  </td>
                </tr>

                {/* Priority Badge */}
                <tr>
                  <td style={{ padding: '32px 40px 0' }}>
                    <div style={{
                      backgroundColor: '#FEF8F4',
                      border: '2px solid #d4a574',
                      borderRadius: '12px',
                      padding: '16px 24px',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: '#d4a574',
                        color: '#ffffff',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Action Required
                      </span>
                    </div>
                  </td>
                </tr>

                {/* Applicant Details */}
                <tr>
                  <td style={{ padding: '32px 40px' }}>
                    <h2 style={{
                      fontSize: '22px',
                      color: '#2B2B2B',
                      margin: '0 0 24px 0',
                      fontWeight: '600',
                      borderBottom: '2px solid #d4a574',
                      paddingBottom: '12px'
                    }}>
                      Applicant Information
                    </h2>

                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '24px' }}>
                      <tr>
                        <td style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tr>
                              <td width="40%">
                                <strong style={{ color: '#7fa99b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</strong>
                              </td>
                              <td>
                                <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{fullName}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tr>
                              <td width="40%">
                                <strong style={{ color: '#7fa99b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</strong>
                              </td>
                              <td>
                                <a href={`mailto:${email}`} style={{ fontSize: '15px', color: '#7fa99b', textDecoration: 'none' }}>{email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tr>
                              <td width="40%">
                                <strong style={{ color: '#7fa99b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</strong>
                              </td>
                              <td>
                                <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{phone}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tr>
                              <td width="40%">
                                <strong style={{ color: '#7fa99b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Country</strong>
                              </td>
                              <td>
                                <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{country}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 0' }}>
                          <table width="100%" cellPadding="0" cellSpacing="0">
                            <tr>
                              <td width="40%">
                                <strong style={{ color: '#7fa99b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Age</strong>
                              </td>
                              <td>
                                <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{age}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <h3 style={{
                      fontSize: '18px',
                      color: '#2B2B2B',
                      margin: '32px 0 16px 0',
                      fontWeight: '600',
                      borderBottom: '2px solid #d4a574',
                      paddingBottom: '8px'
                    }}>
                      Medical Information
                    </h3>

                    <div style={{
                      backgroundColor: '#FEF8F4',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px'
                    }}>
                      <table width="100%" cellPadding="0" cellSpacing="0">
                        <tr>
                          <td style={{ paddingBottom: '16px' }}>
                            <strong style={{ color: '#d4a574', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Diagnosis</strong>
                            <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{diagnosis}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '16px' }}>
                            <strong style={{ color: '#d4a574', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Diagnosis Date</strong>
                            <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{diagnosisDate}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '16px' }}>
                            <strong style={{ color: '#d4a574', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Current Treatments</strong>
                            <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{currentTreatments}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ paddingBottom: '16px' }}>
                            <strong style={{ color: '#d4a574', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Cannabis Experience</strong>
                            <span style={{ fontSize: '15px', color: '#2B2B2B' }}>{cannabisExperience}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong style={{ color: '#d4a574', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Program Interest</strong>
                            <span style={{ fontSize: '15px', color: '#2B2B2B', fontWeight: '600' }}>{retreatInterest}</span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    {/* Quick Actions */}
                    <h3 style={{
                      fontSize: '18px',
                      color: '#2B2B2B',
                      margin: '32px 0 16px 0',
                      fontWeight: '600'
                    }}>
                      Quick Actions
                    </h3>

                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '24px' }}>
                      <tr>
                        <td style={{ paddingRight: '12px', paddingBottom: '12px' }}>
                          <a href={`mailto:${email}?subject=Re: Your Udaya Waitlist Application`} style={{
                            display: 'inline-block',
                            padding: '14px 24px',
                            backgroundColor: '#7fa99b',
                            color: '#ffffff',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textAlign: 'center',
                            minWidth: '120px'
                          }}>
                            📧 Reply via Email
                          </a>
                        </td>
                        <td style={{ paddingBottom: '12px' }}>
                          <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} style={{
                            display: 'inline-block',
                            padding: '14px 24px',
                            backgroundColor: '#25D366',
                            color: '#ffffff',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            textAlign: 'center',
                            minWidth: '120px'
                          }}>
                            💬 WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>

                    {/* Timestamp */}
                    <p style={{
                      fontSize: '13px',
                      color: '#9CA3AF',
                      fontStyle: 'italic',
                      margin: '24px 0 0 0',
                      padding: '16px',
                      backgroundColor: '#F9FAFB',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      Submitted on {formattedDate}
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td style={{
                    backgroundColor: '#2B2B2B',
                    padding: '32px 40px',
                    textAlign: 'center'
                  }}>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '13px',
                      margin: '0'
                    }}>
                      This is an automated notification from Udaya's waitlist system.
                    </p>
                    <p style={{
                      margin: '12px 0 0 0'
                    }}>
                      <a href="https://udaya.one/admin" style={{
                        color: '#7fa99b',
                        textDecoration: 'none',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}>
                        View in Admin Dashboard →
                      </a>
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
