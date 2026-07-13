# Yash Awachar — Public Portfolio Site

Multi-page public marketing/portfolio site. Reads live content from
Firestore (no login required to view). See `spec.md` for build progress
and what's left, and `portfolio-complete-build-spec.md` (if present
alongside this project) for the full original requirements doc.

## Setup

```bash
npm install
cp .env.example .env   # then fill in real Firebase config values
npm run dev
```

## Deploy

```bash
npm run build
firebase deploy --only hosting,firestore:rules,firestore:indexes
```

Make sure `.firebaserc` points at the real Firebase project ID first.
