# Firebase Firestore Setup Instructions

## Issue

The `/referrals` form is not working due to Firebase Firestore permission errors. The error message is:

```
7 PERMISSION_DENIED: Missing or insufficient permissions.
```

## Root Cause

The Firebase Firestore security rules do not currently allow unauthenticated users to write to the `referrals` collection. While `waitlist` and `contacts` collections have proper rules set, the `referrals` collection was added later and needs its security rules configured.

## Solution

Deploy the updated Firestore security rules to Firebase.

### Option 1: Deploy via Firebase CLI (Recommended)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (if not already initialized):
   ```bash
   cd website
   firebase init firestore
   ```
   - Select your Firebase project
   - When asked about firestore.rules, use the existing file
   - When asked about firestore.indexes.json, use the default

4. **Deploy the Firestore rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Verify the deployment**:
   - Visit the [Firebase Console](https://console.firebase.google.com/)
   - Navigate to your project
   - Go to Firestore Database → Rules
   - Verify the rules include the `referrals` collection

### Option 2: Manual Configuration via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Copy and paste the contents of `firestore.rules` into the editor
5. Click **Publish**

### Option 3: Quick Fix (Temporary - Not Recommended for Production)

If you need an immediate fix, you can temporarily allow all writes:

1. Go to Firebase Console → Firestore Database → Rules
2. Add this rule temporarily:
   ```
   match /referrals/{document} {
     allow create: if true;
   }
   ```
3. Click Publish

⚠️ **Warning**: This is a temporary solution. Use the proper rules from `firestore.rules` for production.

## Security Rules Explanation

The `firestore.rules` file provides secure access control:

- **waitlist, contacts, referrals**: Allow public writes (form submissions) but no reads
- **notifications**: Server-side only (via Firebase Admin SDK)
- **newsletter**: Allow public subscription writes
- **All other collections**: Denied by default

## Testing After Deployment

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Test the referral form at http://localhost:3000/referrals

3. Submit a test referral and verify:
   - No console errors
   - Success message appears
   - Entry appears in Firestore Database
   - Notification created in admin dashboard

## Verification

After deploying the rules, test the API directly:

```bash
curl -X POST http://localhost:3000/api/referrals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Partner",
    "email": "test@example.com",
    "phone": "+1234567890",
    "country": "USA",
    "organization": "Test Org",
    "role": "physician",
    "message": "This is a test referral inquiry"
  }'
```

Expected response:
```json
{
  "success": true,
  "id": "document-id-here",
  "message": "Successfully submitted referral partner application"
}
```

## Additional Notes

- The waitlist and contact forms work because their Firestore rules were already configured
- This issue only affects the referrals collection
- Once the rules are deployed, the form will work immediately without code changes
