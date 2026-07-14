// Data for the Industries overview + sub-pages. Each sub-page shares one
// template (IndustryPage.tsx) driven by this data. Deliberately written
// so the "build" list here describes the SPECIFIC application to this
// sector's exact workflow, not a restatement of the generic capability
// described on the matching /services page — e.g. the coaching entry
// talks about batch structure, exam boards, and parent communication
// habits, not "PDF-to-CBT conversion" as a bare feature (that belongs on
// /services/test-engines, where the underlying capability is explained
// once, for any sector that needs it).

export interface IndustryProof {
  name: string
  description: string
  url: string
}

export interface IndustryFAQ {
  q: string
  a: string
}

export interface IndustryData {
  slug: string
  navLabel: string
  title: string
  tagline: string
  problem: string[]
  build: string[]
  process: string[]
  faq: IndustryFAQ[]
  proof?: IndustryProof
}

export const INDUSTRIES: IndustryData[] = [
  {
    slug: 'coaching',
    navLabel: 'Coaching Institutes',
    title: 'JEE / NEET / MHT-CET Coaching Institutes',
    tagline: 'Run tests like the real exam, and keep parents in the loop without lifting a finger.',
    problem: [
      'Most coaching institutes outside the big cities are still running weekly tests on paper or borrowed question PDFs. A teacher sets the test, students write it by hand, and then someone — usually the same teacher — spends hours tallying scores by pen before anyone finds out how the batch did. By the time results reach parents, the test is nearly a week old.',
      'The bigger cost is invisible: a student who\'s quietly falling behind in Physics doesn\'t get noticed until the monthly report, because nobody has time to cross-reference five weeks of paper scores by hand. And for a newly launched institute specifically, parents are comparing you — consciously or not — against big-city coaching brands that already run computer-based tests. If your tests still look like a school exam, that comparison works against you before a single class has happened.',
    ],
    build: [
      'A weekly test cycle built around your actual batch structure — separate test sets for JEE, NEET, and MHT-CET batches, since the syllabus overlap isn\'t exact',
      'A results view where a faculty member can see, at a glance, which specific students are trending down across consecutive tests — not just a single score in isolation',
      'A WhatsApp-first result flow that matches how you already communicate with parents, instead of asking them to install a separate app',
      'Batch-wide rank lists that update the moment the last student submits, so you can announce results in class the same day',
      'Room to add MHT-CET-specific sections separately from JEE/NEET, since the two exams don\'t test identically even on overlapping topics',
    ],
    process: [
      'You send over your existing test papers (PDF or even photographed pages) for the first batch',
      'The test engine is set up around your specific batch names, subjects, and test schedule',
      'Students take the first test on whatever devices you have available — phones work fine',
      'You see results and rank instantly, and I walk you through sharing that with parents on WhatsApp the same day',
    ],
    faq: [
      {
        q: 'Do students need their own laptop or a computer lab?',
        a: 'No — the test engine works on any phone or shared computer. Most institutes run it on students\' own phones during class, the same way an app works.',
      },
      {
        q: 'Can I still print a paper version for students who prefer it?',
        a: 'Yes, since you already have the PDF question papers, nothing about your existing test-writing process changes — the CBT version is generated from the same paper you\'d have printed anyway.',
      },
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
    problem: [
      'A restaurant without a searchable online presence loses orders to whoever shows up first on Google, even if the food is better next door. Someone searching "family restaurant near me" at 8pm isn\'t going to call five numbers to compare menus — they\'ll pick whichever place answers the question fastest, and that\'s usually whoever has a real listing with a visible menu.',
      'Phone-only table bookings compound the problem during rush hours: every ringing phone is a staff member pulled away from the floor, and every missed call during the dinner rush is very likely a customer who just booked somewhere else instead of calling back.',
    ],
    build: [
      'An online menu organized the way your kitchen actually runs — starters, mains, family combos, whatever categories match your real menu, not a generic template',
      'One-tap WhatsApp ordering that lands directly in your existing WhatsApp, no separate order-management app to check',
      'A table booking form that captures party size and preferred time, so you can confirm or suggest an alternative slot without a phone call',
      'Photos and pricing that stay current — updated by you directly, without needing to call a developer every time a dish or price changes',
    ],
    process: [
      'You share your current menu (even a photo of the printed one works) and preferred categories',
      'The online menu and WhatsApp ordering flow is built and matched to how your kitchen actually organizes dishes',
      'You test it yourself for a few days before it goes live to customers',
      'Once live, updating a price or adding a new dish takes you a couple of minutes, no developer needed',
    ],
    faq: [
      {
        q: 'Do I need to change how I take orders in person?',
        a: 'No — this runs alongside your existing walk-in and phone process. It just adds an online option for customers who\'d rather order ahead or book a table without calling.',
      },
      {
        q: 'What if my menu changes seasonally?',
        a: 'You can update items, prices, and availability yourself once it\'s set up — no need to wait on a developer for routine menu changes.',
      },
    ],
  },
  {
    slug: 'agri',
    navLabel: 'Krishi Seva Kendra',
    title: 'Krishi Seva Kendra & Agri Input Dealers',
    tagline: 'A catalog your farmers can browse and order from, in the language they already use to reach you.',
    problem: [
      'Most Krishi Seva Kendras run entirely on walk-ins and word of mouth. Stock, prices, and new arrivals live only in the shopkeeper\'s head — a farmer has no way to check whether a specific fertilizer or seed variety is in stock before making the trip, which sometimes means a wasted visit during the exact window when timing matters most for sowing or spraying.',
      'This gap is invisible to city-facing software because most farm-tech and agri-marketplace apps are built around large-scale distribution, not a single local shop\'s day-to-day stock. A Krishi Kendra owner ends up with nothing built for their actual size and workflow.',
    ],
    build: [
      'A product catalog organized by season and crop — seeds, fertilizers, pesticides, tools — so a farmer can check availability for what they need right now, not browse an entire generic inventory',
      'WhatsApp ordering built for how farmers actually communicate: short messages, voice notes, no long forms to fill out',
      'Simple enough for you to update stock and prices yourself between busy seasons, without needing a developer for routine changes',
      'Pricing shown clearly upfront, reducing the back-and-forth of farmers calling just to ask "what\'s the rate today"',
    ],
    process: [
      'You share your current stock list and rough pricing, in whatever format is easiest — even a handwritten list works',
      'The catalog is built around your actual product categories and how you already describe them to customers',
      'You test ordering it yourself before farmers start using it',
      'Updating stock between seasons takes a few minutes on your own, no developer needed',
    ],
    faq: [
      {
        q: 'Will farmers who don\'t use smartphones much be able to use this?',
        a: 'The ordering flow is built around WhatsApp specifically because it\'s already what most farmers use daily — no new app to learn, no account to create.',
      },
      {
        q: 'Can I keep some stock off the catalog if I don\'t want it publicly listed?',
        a: 'Yes — you control exactly what\'s shown, and can hide or show items whenever you want.',
      },
    ],
  },
  {
    slug: 'real-estate',
    navLabel: 'Real Estate',
    title: 'Real Estate Agents & Developers',
    tagline: 'A listing site that looks credible, and inquiries that don\'t fall through the cracks.',
    problem: [
      'Serious buyers increasingly judge a listing by whether there\'s a real website behind it — a plot or flat with only a WhatsApp forward and a blurry photo reads as less trustworthy than the exact same property with a proper listing page, even when the underlying deal is identical.',
      'Without a central place to track inquiries, every lead comes in through a scattered mix of calls, Instagram DMs, and referrals from other agents, with no record of who asked about which specific property. A promising buyer for a 2BHK in one layout can quietly get lost in the same inbox as someone asking about an entirely different plot three villages over.',
    ],
    build: [
      'A property listing site with photos, specs, pricing, and location for each property, built to feel credible to a buyer comparing options',
      'Inquiry tracking that logs which property each lead asked about, so nothing gets mixed up between multiple active listings',
      'A WhatsApp-first contact flow for buyers who want a fast answer instead of waiting for a callback',
      'The ability to mark a property as sold/unavailable yourself the moment a deal closes, so you\'re not fielding calls about something no longer on the market',
    ],
    process: [
      'You share photos, pricing, and details for your current active listings',
      'A listing page is built for each property, plus an inquiry form tied to that specific listing',
      'You test the inquiry flow yourself to confirm leads land where you actually check them',
      'Adding a new listing or marking one sold takes a couple of minutes once it\'s set up',
    ],
    faq: [
      {
        q: 'Can I add new properties myself as I get them?',
        a: 'Yes — once set up, adding a new listing with photos and pricing is something you do yourself, no developer needed for routine updates.',
      },
      {
        q: 'What happens to inquiries for a property I\'ve already sold?',
        a: 'You can mark a listing as sold, which stops new inquiries for it while keeping the page as a reference if needed.',
      },
    ],
  },
  {
    slug: 'fitness',
    navLabel: 'Fitness',
    title: 'Gyms & Fitness Studios',
    tagline: 'Know exactly who\'s due for renewal before they walk out the door for good.',
    problem: [
      'Membership expiries tracked in a notebook or a loose spreadsheet mean renewals get missed quietly — a member\'s plan lapses, nobody notices for two or three weeks, and by the time someone follows up, that member has already mentally moved on and stopped coming altogether.',
      'The actual revenue leak here isn\'t obvious month to month, since a gym rarely loses ten members at once — it loses one or two every month to a system that simply doesn\'t flag renewals early enough to act on them.',
    ],
    build: [
      'A membership tracker recording plan type, start date, and renewal date per member, so nothing depends on someone remembering to check a notebook',
      'Automatic renewal reminders that go out before a membership lapses, not after — timed early enough to actually catch someone before they\'ve mentally checked out',
      'Simple attendance logging so you can see who\'s actually showing up regularly versus who\'s quietly drifted away, which is often the earliest sign of an upcoming non-renewal',
      'A quick lookup by member name or phone number at the front desk, instead of flipping through a physical register',
    ],
    process: [
      'You share your current member list and plan types (monthly, quarterly, annual, whatever you offer)',
      'The tracker is set up around your actual plan structure and renewal cycle',
      'You run it alongside your existing system for a short overlap period to confirm it matches reality',
      'From there, adding new members and marking renewals is a couple of taps at the front desk',
    ],
    faq: [
      {
        q: 'Do I need a separate device at the front desk?',
        a: 'No — it works on any phone, tablet, or computer you already have at the front desk.',
      },
      {
        q: 'Can it handle different membership tiers (basic, premium, personal training)?',
        a: 'Yes — the tracker is set up around whatever plan structure you actually offer, not a generic one-size-fits-all tier.',
      },
    ],
  },
  {
    slug: 'events',
    navLabel: 'Events',
    title: 'Decorators, Caterers & Event Vendors',
    tagline: 'A booking calendar that makes double-bookings physically impossible.',
    problem: [
      'Wedding season chaos usually comes down to one thing: bookings tracked across a phone diary, a paper notebook, and memory, with no single place showing every confirmed and tentative date at once. One missed clash between the diary and a verbal confirmation, and you\'ve accidentally committed the same date to two different clients — a mistake that\'s hard to recover from gracefully mid-season.',
      'Inquiry volume during peak months adds to this: dozens of "are you free on this date" messages come in across calls, WhatsApp, and Instagram, and tracking which ones turned into confirmed bookings versus which went quiet becomes genuinely difficult to hold in your head past a certain volume.',
    ],
    build: [
      'A booking calendar showing every confirmed and tentative date at a glance, so a new inquiry can be checked against your real availability in seconds',
      'Built-in clash detection — the calendar itself stops you from confirming two bookings on the same date, rather than relying on you remembering to check',
      'Inquiry tracking so every new lead is logged from first message through to confirmed booking, instead of scattered across WhatsApp and Instagram DMs',
      'A simple way to mark a tentative hold as confirmed or released, so pending dates don\'t sit blocking your calendar indefinitely',
    ],
    process: [
      'You share your current bookings for the upcoming season, however they\'re tracked right now',
      'The calendar is set up with your real dates already loaded in, confirmed and tentative both',
      'You test checking availability and adding a new booking yourself before peak season starts',
      'From there, every new inquiry gets checked against the calendar in seconds instead of flipping through a diary',
    ],
    faq: [
      {
        q: 'Can multiple people on my team check the calendar at once?',
        a: 'Yes — anyone on your team can check availability from their own phone, so you\'re not the only bottleneck for confirming a date.',
      },
      {
        q: 'What about tentative holds that never get confirmed?',
        a: 'You can set a hold with an expiry, so a tentative date automatically frees up if the client doesn\'t confirm within the window you set.',
      },
    ],
  },
  {
    slug: 'repair-services',
    navLabel: 'Repair Services',
    title: 'Bike & Car Garages',
    tagline: 'A full service history for every vehicle, and reminders that bring customers back.',
    problem: [
      'Without a service history on file, every repeat customer effectively starts from zero each visit — no record of what was done last time, what parts were replaced, or when the next service is actually due. That means either re-diagnosing from scratch or relying entirely on what the customer remembers, which isn\'t always accurate.',
      'The bigger missed opportunity is repeat business: without a system tracking when a vehicle is due for its next service, that reminder simply never gets sent, and a customer who would have come back on schedule instead only returns once something breaks — often to whichever garage happens to be closest at that moment, not necessarily yours.',
    ],
    build: [
      'A service-history tracker per vehicle — what was done, which parts were used, and by whom — searchable instantly by vehicle number',
      'Automatic reminder notifications sent to the customer when their vehicle is due for its next scheduled service',
      'Quick lookup at the counter so any technician, not just the one who remembers a particular customer, can pull up the full history in seconds',
      'A simple record of parts and costs per job, useful for your own tracking as much as for the customer',
    ],
    process: [
      'You share how you currently track service records, even if it\'s just memory and paper receipts right now',
      'The tracker is set up around your actual service types and how you log a job today',
      'You log a few real services through it to get comfortable with the flow',
      'From there, reminders go out automatically and any staff member can pull up a vehicle\'s history in seconds',
    ],
    faq: [
      {
        q: 'What if a customer doesn\'t have WhatsApp?',
        a: 'Reminders can also go out over SMS as a fallback, so it\'s not dependent on every customer using WhatsApp.',
      },
      {
        q: 'Can I look up a vehicle\'s history even if it was serviced somewhere else last time?',
        a: 'The history is only as complete as what\'s logged through this system — but from the point you start using it, every future visit builds a complete record, regardless of which technician handles it.',
      },
    ],
  },
]

export function getIndustry(slug: string | undefined) {
  return INDUSTRIES.find((i) => i.slug === slug)
}
