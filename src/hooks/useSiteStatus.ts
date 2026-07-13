import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { SiteStatus } from '../lib/types'

const FALLBACK: SiteStatus = {
  isAvailable: true,
  availableFromDate: null,
  bannerMessage: '',
}

export function useSiteStatus() {
  const [status, setStatus] = useState<SiteStatus>(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = doc(db, 'settings', 'status')
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setStatus({ ...FALLBACK, ...(snap.data() as Partial<SiteStatus>) })
        }
        setLoading(false)
      },
      () => setLoading(false),
    )
    return () => unsub()
  }, [])

  return { status, loading }
}
