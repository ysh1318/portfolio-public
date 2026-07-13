// One-time seed script for the two singleton docs the app reads on first
// load (spec §4.2): `siteContent/main` and `settings/status`. Both the
// public site and dashboard tolerate these docs not existing yet
// (fallback copy / FALLBACK constants), but seeding them means the
// dashboard's Content Editor and Availability screens open with real
// starting values instead of blank forms, and the public site immediately
// reflects intentional copy rather than hardcoded fallbacks.
//
// Run once, after `firebase deploy --only firestore:rules,firestore:indexes`
// and before pointing the dashboard at production data:
//
//   npm install firebase-admin --no-save
//   node scripts/seed-firestore.mjs
//
// Requires a service account key. In Firebase Console:
//   Project Settings > Service Accounts > Generate new private key
// Save it locally (NOT in git) and point to it:
//   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json node scripts/seed-firestore.mjs
//
// Safe to re-run: uses { merge: true } and only fills fields, never wipes
// existing content.

import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { readFileSync } from 'node:fs'

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
initializeApp({
  credential: keyPath ? cert(JSON.parse(readFileSync(keyPath, 'utf8'))) : applicationDefault(),
})

const db = getFirestore()

const siteContent = {
  heroHeadline: "Hello, I'm Yash Awachar, a Web Builder based in India.",
  heroSubtext:
    "I'm a self-taught, independent builder who ships fast — designing, building, and deploying production-ready applications end-to-end, solo.",
  servicesIntro:
    'From business websites to exam-ready CBT engines to the tools that run your day-to-day — built and deployed end-to-end.',
  industriesIntro:
    'A look at the kinds of businesses I build for, and the specific problems I solve for each.',
  processIntro: 'How an engagement goes from first message to a live, working product.',
  pricingNote:
    'Final pricing depends on scope — reach out for a quote tailored to your business size.',
  connectIntro: "Tell me a bit about your business and what you're looking to build.",
}

const settingsStatus = {
  isAvailable: true,
  availableFromDate: null,
  bannerMessage: '',
}

async function main() {
  await db.doc('siteContent/main').set(siteContent, { merge: true })
  console.log('✅ siteContent/main seeded')

  await db.doc('settings/status').set(settingsStatus, { merge: true })
  console.log('✅ settings/status seeded')

  console.log('\nDone. No sample docs were created under `projects` or `leads` —')
  console.log('add real projects via the dashboard Projects manager; `leads` fills')
  console.log('itself in from the public Connect form.')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
