# Firebase Admin SDK Setup for Vercel

## Required Environment Variables

After downloading your service account JSON file from Firebase Console, you need to extract these values and add them to Vercel:

### 1. From your service account JSON file, extract:

```json
{
  "project_id": "udaya-landing",
  "client_email": "firebase-adminsdk-xxxxx@udaya-landing.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
}
```

### 2. Add to Vercel Environment Variables:

Go to your Vercel project settings → Environment Variables and add:

```
FIREBASE_PROJECT_ID=udaya-landing
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@udaya-landing.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n
```

⚠️ **IMPORTANT**: When adding `FIREBASE_PRIVATE_KEY`:
- Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- The key should include the `\n` characters as they appear in the JSON
- Vercel will handle the newline characters correctly

### 3. Local Development (.env.local)

For local development, create a `.env.local` file:

```
FIREBASE_PROJECT_ID=udaya-landing
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@udaya-landing.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

Note: In `.env.local`, wrap the private key in quotes.

### 4. Keep Your Existing Environment Variables

Make sure you still have these from your original setup:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

These are still needed for client-side Firebase operations.

## Security Best Practices

1. **Never commit** the service account JSON file to git
2. **Never expose** these admin credentials to the client
3. **Add to .gitignore**:
   ```
   serviceAccountKey.json
   firebase-admin-*.json
   ```
4. **Use environment variables** in production (Vercel)
5. **Restrict service account permissions** in Google Cloud Console if needed

## Testing the Setup

After deployment, test that your blog admin panel still works:
1. Go to `/admin/login`
2. Log in with your credentials
3. Try creating, editing, and deleting a blog post
4. Check that published posts appear on the public blog page