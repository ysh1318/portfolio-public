// Shared Firebase config for the PUBLIC site.
// Same Firebase project as the dashboard app (see spec §4.1) — only the
// deployment/app is different, the backend (Firestore + Auth) is shared.
//
// Fill in real values via a .env file (copy .env.example to .env) or your
// host's environment variable settings.

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy-auth-domain.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project-id",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-storage-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:dummy",
}

export const app = initializeApp(firebaseConfig)
const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app)
export const auth = getAuth(app)
