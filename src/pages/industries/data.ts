// Data for the Industries overview + sub-pages (spec §2.3).
// Each sub-page shares one template (IndustryPage.tsx) driven by this
// data, so the "problem / what I build / proof / CTA" shape stays
// consistent across sectors instead of being re-typed seven times.

export interface IndustryProof {
  name: string
  description: string
  url: string
}

export interface IndustryData {
  slug: string
  navLabel: string
  title: string
  tagline: string
  problem: string
  build: string[]
  proof?: IndustryProof
}

export const INDUSTRIES: IndustryData[] = [
  {
    slug: 'coaching',
    navLabel: 'Coaching Institutes',
    title: 'JEE / NEET / MHT-CET Coaching Institutes',
    tagline: 'Run tests like the real exam, and keep parents in the loop without lifting a finger.',
    problem:
      'Institutes are still running mock tests on paper or borrowed PDFs, hand-tallying scores, and calling parents individually with results — it eats staff hours every single week and results arrive late.',
    build: [
      'CBT test engine that mirrors the real JEE/NEET/MHT-CET interface, built on PDF-to-CBT conversion',
      'Instant scoring the moment a student submits, no manual checking',
      'Batch-wide rank comparison so students see exactly where they stand',
      'Result links sent straight to parents over WhatsApp, no separate app to install',
      'Student tracking dashboard so faculty can spot who is falling behind early',
    ],
    proof: {
      name: 'JEEMockLab',
      description:
        'A live JEE mock test platform used for exactly this — exam-accurate interface, real-time analytics, adaptive test flow.',
      url: 'https://jeemocklab-566080205337.asia-south1.run.app/',
    },
  },
  {
    slug: 'restaurants',
    navLabel: 'Restaurants',
    title: 'Restaurants & Cafes',
    tagline: 'Take orders where your customers already are — WhatsApp.',
    problem:
      'A restaurant without a searchable online menu loses orders to whoever shows up first on Google or Zomato. Table bookings by phone call alone means missed calls during rush hours turn into missed customers.',
    build: [
      'A clean online menu with categories, photos, and prices, always up to date',
      'One-tap WhatsApp ordering — no app download, no account, no friction',
      'Table booking form that lands directly in your WhatsApp or inbox',
      'Basic SEO so the menu actually shows up when someone searches your restaurant',
    ],
  },
  {
    slug: 'agri',
    navLabel: 'Krishi Seva Kendra',
    title: 'Krishi Seva Kendra & Agri Input Dealers',
    tagline: 'A catalog your farmers can browse and order from, in the language they already use to reach you.',
    problem:
      'Most Krishi Seva Kendras run entirely on walk-ins and word of mouth. Stock, prices, and new arrivals live only in the shopkeeper\u2019s head — farmers have no way to check before making the trip.',
    build: [
      'Product catalog: seeds, fertilizers, pesticides, tools — organized by category with clear pricing',
      'WhatsApp ordering built for how farmers actually communicate — short messages, no forms to fight with',
      'Simple enough to update stock yourself between busy seasons, no developer needed for day-to-day changes',
    ],
  },
  {
    slug: 'real-estate',
    navLabel: 'Real Estate',
    title: 'Real Estate Agents & Developers',
    tagline: 'A listing site that looks credible, and inquiries that don\u2019t fall through the cracks.',
    problem:
      'Serious buyers judge a listing by whether it has a real website behind it. Without one, every inquiry comes in through scattered channels — calls, DMs, referrals — with nothing tracking who asked about what.',
    build: [
      'Property listing site with photos, specs, pricing, and location for each property',
      'Inquiry tracking so every lead is logged with which property they asked about',
      'WhatsApp-first contact flow for buyers who want a fast answer',
    ],
  },
  {
    slug: 'fitness',
    navLabel: 'Fitness',
    title: 'Gyms & Fitness Studios',
    tagline: 'Know exactly who\u2019s due for renewal before they walk out the door for good.',
    problem:
      'Membership expiries tracked in a notebook or a spreadsheet mean renewals get missed, and by the time someone notices, the member has already quietly stopped coming.',
    build: [
      'Membership tracker with plan type, start date, and renewal date per member',
      'Automatic renewal reminders before a membership lapses, not after',
      'Simple attendance logging so you know who is actually showing up',
    ],
  },
  {
    slug: 'events',
    navLabel: 'Events',
    title: 'Decorators, Caterers & Event Vendors',
    tagline: 'A booking calendar that makes double-bookings physically impossible.',
    problem:
      'Wedding season chaos usually comes down to one thing: bookings tracked across a phone diary, a notebook, and memory. One missed clash and you\u2019ve committed the same date to two clients.',
    build: [
      'Booking calendar showing every confirmed and tentative date at a glance',
      'Inquiry management so every new lead gets tracked from first message to confirmed booking',
      'Built-in clash detection — the calendar itself stops you from double-booking a date',
    ],
  },
  {
    slug: 'repair-services',
    navLabel: 'Repair Services',
    title: 'Bike & Car Garages',
    tagline: 'A full service history for every vehicle, and reminders that bring customers back.',
    problem:
      'Without a service history on file, every repeat customer starts from zero — no record of what was done last time, and no way to remind them their next service is due.',
    build: [
      'Service-history tracker per vehicle: what was done, when, and by whom',
      'Automatic reminder notifications when a vehicle is due for its next service',
      'Quick lookup by vehicle number so any technician can pull up the full history instantly',
    ],
  },
]

export function getIndustry(slug: string | undefined) {
  return INDUSTRIES.find((i) => i.slug === slug)
}
