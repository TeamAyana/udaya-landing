# Firebase Security Rules Fix

## The Problem
You're getting "PERMISSION_DENIED" errors because Firebase Firestore security rules are blocking write access.

## Quick Fix for Development

### Option 1: Update Firestore Security Rules (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Firestore Database** → **Rules**
4. Replace the rules with these development-friendly rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // DEVELOPMENT RULES - DO NOT USE IN PRODUCTION
    // Allow all reads and writes for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

5. Click **Publish**

⚠️ **WARNING**: These rules allow anyone to read/write your database. Only use for development!

### Option 2: Production-Ready Rules

For production, use these more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can read published posts
    match /posts/{postId} {
      allow read: if resource.data.status == 'published' || request.auth != null;
      allow create, update, delete: if request.auth != null;
    }
    
    // Public can read categories
    match /categories/{categoryId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // Only allow creating contacts/waitlist entries
    match /contacts/{contactId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if false;
    }
    
    match /waitlist/{entryId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

Note: These production rules require Firebase Authentication. Since you're using custom JWT auth, you might need to modify them.

## Storage Rules (If Using Firebase Storage)

1. Go to **Storage** → **Rules**
2. Update with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // DEVELOPMENT RULES
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## After Fixing Rules

1. Clear your browser cache
2. Restart your development server
3. Try creating a blog post again

## Alternative: Local Development Mode

If you want to avoid Firebase during development, you can create a local storage adapter that saves to JSON files instead. This would require modifying the `blog-storage.ts` file to check for a development environment variable.