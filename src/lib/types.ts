// Shared Firestore document shapes — see spec §4.2.
// Keep this file in sync with the dashboard app's types (they read/write
// the same collections).

export interface SiteContent {
  heroHeadline: string
  heroSubtext: string
  servicesIntro: string
  industriesIntro: string
  processIntro: string
  pricingNote: string
  connectIntro: string
}

export interface SiteStatus {
  isAvailable: boolean
  availableFromDate: { seconds: number; nanoseconds: number } | null
  bannerMessage: string
}

export interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  liveUrl: string
  tags: string[]
  order: number
  visible: boolean
}

export interface Lead {
  name: string
  business: string
  projectType: string
  subject: string
  message: string
  sourcePage: string
  status: string
  notes: string
  createdAt: unknown
}

export interface Testimonial {
  id: string
  clientName: string
  business: string
  quote: string
  rating: number
  order: number
  visible: boolean
}
