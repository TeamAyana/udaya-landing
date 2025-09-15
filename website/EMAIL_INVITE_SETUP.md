# Email Invite System Setup

## Overview

The current user management system creates users directly with passwords. To add email invites, you'll need to set up an email service and implement an invite flow.

## Recommended Email Services

### 1. Resend (Recommended for simplicity)
- Easy setup
- Great developer experience
- Free tier: 100 emails/day

### 2. SendGrid
- More features
- Free tier: 100 emails/day
- More complex setup

### 3. AWS SES
- Very cheap at scale
- Complex setup
- Requires domain verification

## Implementation Steps

### Step 1: Install Resend

```bash
npm install resend
```

### Step 2: Add Environment Variable

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### Step 3: Create Email Template

```typescript
// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInviteEmail(
  email: string,
  inviteToken: string,
  inviterName: string
) {
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/accept-invite?token=${inviteToken}`
  
  await resend.emails.send({
    from: 'Udaya Admin <admin@udaya.one>',
    to: email,
    subject: 'You\'ve been invited to Udaya Admin',
    html: `
      <h2>Welcome to Udaya Admin</h2>
      <p>${inviterName} has invited you to join the Udaya admin panel.</p>
      <p>Click the link below to set up your account:</p>
      <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background: #5C7B65; color: white; text-decoration: none; border-radius: 6px;">
        Accept Invite
      </a>
      <p>This link will expire in 7 days.</p>
    `
  })
}
```

### Step 4: Update User Creation Flow

Instead of creating users with passwords directly:

1. Create user with `inviteToken` and `inviteExpiry`
2. Send invite email
3. User clicks link and sets their password

### Step 5: Create Accept Invite Page

```typescript
// src/app/admin/accept-invite/page.tsx
'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function AcceptInvitePage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const handleAcceptInvite = async () => {
    if (password !== confirmPassword) {
      alert('Passwords don\'t match')
      return
    }
    
    const response = await fetch('/api/auth/accept-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    })
    
    if (response.ok) {
      window.location.href = '/admin/login'
    }
  }
  
  return (
    // Invite acceptance form
  )
}
```

## Alternative: Simple Temporary Password

If you don't want to set up emails immediately, you can:

1. Generate a temporary password when creating users
2. Display it once to the admin
3. Require users to change it on first login

## Security Considerations

1. **Invite tokens** should be random and unguessable
2. **Expire invites** after 7 days
3. **Mark invites as used** after acceptance
4. **Rate limit** invite sending
5. **Log all invites** for audit trail

## Quick Implementation Without Email

For a quick solution without email setup:

```typescript
// When creating a user:
const tempPassword = generateTempPassword() // e.g., "Temp-2024-AbCd"
const user = {
  ...userData,
  requirePasswordChange: true,
  tempPasswordShown: false
}

// Show to admin once:
"User created with temporary password: Temp-2024-AbCd"
"Please share this securely with the user"
```

This gives you a working system while you set up proper email invites later.