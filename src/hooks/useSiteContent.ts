import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { SiteContent } from '../lib/types'

// Sensible fallback copy so the site still reads fine before the dashboard
// content editor (§5.3) has been used for the first time, or if the doc
// is briefly unavailable.
const FALLBACK: SiteContent = {
  heroHeadline: "Hello, I'm Yash Awachar, a Web Builder based in India.",
  heroSubtext:
    "I'm a self-taught, independent builder who ships fast — designing, building, and deploying production-ready applications end-to-end, solo.",
  servicesIntro:
    'Whether you need a high-performance business website to build credibility and capture leads, or custom, full-stack software (like operational trackers, portals, and interactive assessment tools) to run your business.',
  industriesIntro:
    'A look at the kinds of businesses I build for, and the specific problems I solve for each.',
  processIntro: 'How an engagement goes from first message to a live, working product.',
  pricingNote:
    'Final pricing depends on scope — reach out for a quote tailored to your business size.',
  connectIntro: "Tell me a bit about your business and what you're looking to build.",
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = doc(db, 'siteContent', 'main')
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setContent({ ...FALLBACK, ...(snap.data() as Partial<SiteContent>) })
        }
        setLoading(false)
      },
      () => setLoading(false),
    )
    return () => unsub()
  }, [])

  return { content, loading }
}
