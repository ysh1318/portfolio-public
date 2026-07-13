import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Project } from '../lib/types'

// Public read: only visible projects, ordered per the dashboard's manual
// `order` field (§5.5). Rules already restrict unauthenticated reads to
// visible:true (§4.3), this query just avoids fetching hidden docs at all.
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('visible', '==', true),
      orderBy('order', 'asc'),
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        setProjects(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, 'id'>) })))
        setLoading(false)
      },
      () => setLoading(false),
    )
    return () => unsub()
  }, [])

  return { projects, loading }
}
