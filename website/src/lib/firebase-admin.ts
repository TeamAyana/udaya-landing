import * as admin from 'firebase-admin'

let isInitialized = false
let initError: Error | null = null

if (!admin.apps.length) {
  try {
    // Check if required environment variables are present
    if (!process.env.FIREBASE_PROJECT_ID || 
        !process.env.FIREBASE_CLIENT_EMAIL || 
        !process.env.FIREBASE_PRIVATE_KEY) {
      console.warn('Firebase Admin SDK environment variables are missing. User management features will use local storage.')
      initError = new Error('Missing Firebase Admin credentials')
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      })
      isInitialized = true
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error)
    initError = error as Error
  }
}

export const adminDb = isInitialized ? admin.firestore() : null
export { admin, isInitialized, initError }