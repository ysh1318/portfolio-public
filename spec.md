# Build Progress — Public Site + Firebase + Dashboard

Handoff notes for whoever continues this build. Full requirements are in
`portfolio-complete-build-spec.md` (the original spec) — this file only
tracks what's done vs. what's left, and why certain calls were made.

Scope this pass, per instruction: pick up roughly half of what remained
after the last pass, in full, without cutting corners — the Dashboard
(spec §5, previously entirely unstarted) plus a Firebase setup/rules
verification pass. Both are done below. The rest of the previously-known
gaps (og-image, actual Firebase project creation, npm install/build
verification, legal review, pricing sanity, process page shape) are
listed under "Left for the next pass," carried over or narrowed where
this pass touched them.

---

## Done this pass

### Dashboard app (spec §5) — built in full, as its own project
New sibling project, `dashboard-site/`, structured to match the public
site (Vite + React 18 + TS + Tailwind + react-router-dom + firebase),
same design system (glassmorphism cards, gradient pills) toned down for
a utility tool rather than a marketing surface.

- **`/login`** — Firebase Auth email/password (§5.1). No sign-up screen
  by design — single user, account created once via Firebase Console
  (documented in `dashboard-site/README.md`).
- **Route guard** — `DashboardLayout.tsx` wraps every authenticated route,
  checks `onAuthStateChanged` via a `useAuth` hook, redirects to `/login`
  if null. `Login.tsx` redirects the other way if already signed in.
- **`/` Leads view** (§5.2) — table of `leads`, sortable by `createdAt`
  (toggle asc/desc), filterable by `status` and `sourcePage` (source list
  built dynamically from what's actually in the data). Click a row opens
  a detail panel: full message, editable `status` dropdown, editable
  `notes` textarea, save button disabled until something's actually
  changed.
- **`/content` Content editor** (§5.3) — form mapped 1:1 to the 7
  `siteContent/main` fields (see `SITE_CONTENT_FIELDS` in `lib/types.ts`
  — shared shape with the public site's `types.ts`, keep both in sync if
  the schema changes). Writes with `setDoc(..., {merge: true})`; the
  public site's `useSiteContent` hook picks up the change live, no
  redeploy.
- **`/availability` Availability control** (§5.4) — Available/Unavailable
  toggle, a date input for `availableFromDate` (only shown when
  Unavailable — no point setting a return date while available), and a
  banner message field with a placeholder that changes based on the
  toggle state. Writes to `settings/status`.
- **`/projects` Projects manager** (§5.5) — list with add/edit/delete,
  numeric `order` input for manual reordering (spec explicitly offers
  this as an alternative to drag-reorder — went with numeric since it's
  less code and equally functional for a single-user tool), `visible`
  toggle to hide without deleting, delete requires a confirm dialog.

### Firebase setup & rules — verified + finalized
- `firestore.rules` (owned by the public site's project, shared by both
  apps) re-checked line by line against spec §4.3 — matches exactly, no
  changes needed. Confirmed the rule shape is sufficient for every
  dashboard write path added this pass (all dashboard writes require
  `request.auth != null`, which is exactly what the rules already gate
  on for `siteContent`, `settings`, `projects` writes, and `leads`
  read/update/delete).
- **New: `scripts/seed-firestore.mjs`** (public site repo) — one-time
  Firebase Admin script to seed `siteContent/main` and `settings/status`
  with the same real starting copy the public site's fallback constants
  already use, so the dashboard's Content Editor and Availability screens
  open with real values instead of blank forms on first use. Idempotent
  (`merge: true`), documented inline with exact run steps and where to
  get a service account key. Does **not** seed `projects` or `leads` —
  those fill in from real usage (dashboard adds, Connect form submits).
- `dashboard-site/.env.example`, `.firebaserc`, `firebase.json` set up
  mirroring the public site's, with dashboard-specific notes on Firebase
  Hosting multi-site setup (since it's a second Hosting target in the
  *same* project, not a second Firebase project) and an explicit note
  that this repo does not own `firestore.rules`/`firestore.indexes.json`
  — don't deploy those from here.

### Bug found and fixed on both projects
- Neither project had a `vite-env.d.ts`
  (`/// <reference types="vite/client" />`). Without it,
  `import.meta.env.VITE_FIREBASE_*` in `lib/firebase.ts` isn't properly
  typed under a standalone `tsc` check (though `vite build` itself would
  still run fine, since the build script doesn't invoke `tsc`
  separately). Added to both `portfolio-site/src/` and
  `dashboard-site/src/` — cheap fix, real gap.

### Verification actually possible in this environment
No network access here (same constraint as the last pass — still can't
`npm install`, `firebase deploy`, or fetch the live `og-image.jpg`). What
*was* possible and done: an offline TypeScript structural/syntax check of
every new dashboard file using the globally-installed `tsc` + `react`
package already present in this container, with `react-router-dom` and
`firebase/*` stubbed as ambient `any` modules (since those aren't
installed here) to isolate genuine mistakes from expected
"module not found" noise. That surfaced zero real logic/syntax bugs in
the dashboard code — every error in that run traced to either the
stubbed modules or the missing `vite-env.d.ts` (now fixed). This is not a
substitute for a real `npm install && npm run build` on both projects,
which is still the first thing to do on a machine with internet — treat
it as a second opinion, not a green light.

---

## Left for the next pass

1. **Real `npm install` + `npm run build` on both projects.** Still the
   top item — no network access here across three passes now. Do this
   before anything else; the offline `tsc` pass above is a decent signal
   but not proof the app compiles and renders.
2. **Firebase project itself.** Still nothing created/deployed. Once it
   exists: enable Firestore (Native) + Auth (Email/Password), add the one
   dashboard user, run
   `firebase deploy --only firestore:rules,firestore:indexes` from the
   public site repo, then `node scripts/seed-firestore.mjs` (new this
   pass) with a service account key to seed the two singleton docs.
3. **`og-image.jpg`** — still missing, still can't be pulled from here
   (it's a real file on the live Netlify deploy, not embeddable from
   source; a search for the live site didn't surface it either). Grab it
   from `yash1318.netlify.app/img/og-image.jpg` directly and drop it in
   both projects' `public/img/` (the dashboard doesn't strictly need it
   since it's `noindex`, but the public site does).
4. **Dashboard Hosting target** — needs the actual
   `firebase hosting:sites:create` + `firebase target:apply` steps run
   against a real project (documented in `dashboard-site/README.md`, not
   executable without Firebase CLI + auth).
5. **Pricing numbers** — unchanged from spec's discussion
   (₹40–60/student/month, ₹8,000 starting for websites); still worth a
   final gut-check against real client quotes before launch, but nothing
   this pass found reason to change.
6. **Legal copy review** — Privacy Policy / ToS still first-draft, not
   lawyer-reviewed. Untouched this pass; still flagged.
7. **Process page shape language** — cosmetic only (`rounded-2xl` vs. the
   original's hexagon clip-path). Lowest priority of everything listed.
