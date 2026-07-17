import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import type { Lead } from './types'

// Single write path for the `leads` collection, used by both the manual
// Connect form and the chatbot. Keeping this in one place means both
// sources always produce documents the dashboard can read identically.
export async function saveLead(partial: Omit<Lead, 'createdAt' | 'status'> & { status?: string }) {
  return addDoc(collection(db, 'leads'), {
    name: partial.name.trim(),
    email: partial.email?.trim() || '',
    business: partial.business?.trim() || '',
    projectType: partial.projectType?.trim() || '',
    subject: partial.subject?.trim() || '',
    message: partial.message.trim(),
    sourcePage: partial.sourcePage,
    status: partial.status || 'new',
    notes: partial.notes || '',
    source: partial.source || 'form',
    createdAt: serverTimestamp(),
  })
}
