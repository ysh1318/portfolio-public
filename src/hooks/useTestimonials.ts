import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Testimonial } from '../lib/types'

// Same pattern as useProjects: public read is restricted to visible:true,
// ordered by the dashboard's manual `order` field.
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'testimonials'),
      where('visible', '==', true),
      orderBy('order', 'asc'),
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        setTestimonials(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Testimonial, 'id'>) })))
        setLoading(false)
      },
      () => setLoading(false),
    )
    return () => unsub()
  }, [])

  return { testimonials, loading }
}
