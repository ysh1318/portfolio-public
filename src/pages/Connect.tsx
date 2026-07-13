import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useSiteContent } from '../hooks/useSiteContent'
import { useSiteStatus } from '../hooks/useSiteStatus'
import { getIndustry } from './industries/data'
import { GlassCard, PageHero, Eyebrow } from '../components/ui'

const WHATSAPP_NUMBER = '919890215963'
const EMAIL = 'yashawachar101@gmail.com'

// The one piece of new *behavior* in this pass (spec §2.8): on submit,
// write a lead doc to Firestore first (fire-and-forget, non-blocking),
// then redirect to WhatsApp with the message pre-filled — porting the
// logic from the original portfolio-1.html (~line 984) rather than
// rewriting it from scratch.
export default function Connect() {
  const { content } = useSiteContent()
  const { status } = useSiteStatus()
  const [searchParams] = useSearchParams()

  const sector = searchParams.get('sector')
  const industry = getIndustry(sector ?? undefined)

  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [projectType, setProjectType] = useState(industry ? industry.navLabel : '')
  const [subject, setSubject] = useState(industry ? `Inquiry — ${industry.navLabel}` : '')
  const [message, setMessage] = useState(
    industry ? `Hi, I run a ${industry.navLabel.toLowerCase()} business and I'm interested in what you build for that space.` : '',
  )
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function buildWhatsAppText() {
    let text = `Hi Yash, I'd like to get in touch.\n\n`
    text += `*Name:* ${name}\n`
    if (business) text += `*Business:* ${business}\n`
    if (projectType) text += `*Project Type:* ${projectType}\n`
    if (subject) text += `*Subject:* ${subject}\n`
    text += `\n*Message:*\n${message}`
    return text
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message before sending.')
      return
    }
    setError('')
    setSubmitting(true)

    // Fire-and-forget write — don't block the WhatsApp redirect on it,
    // and don't fail the whole flow if Firestore is briefly unavailable.
    addDoc(collection(db, 'leads'), {
      name: name.trim(),
      business: business.trim(),
      projectType: projectType.trim(),
      subject: subject.trim(),
      message: message.trim(),
      sourcePage: window.location.pathname + window.location.search,
      status: 'new',
      notes: '',
      createdAt: serverTimestamp(),
    }).catch(() => {
      // Non-blocking by design — WhatsApp is the source of truth for the
      // conversation either way, so a failed write here isn't fatal.
    })

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppText())}`
    window.open(url, '_blank')
    setSubmitting(false)
  }

  return (
    <>
      <PageHero
        eyebrow="Connect"
        title="Tell me about your business"
        subtitle={industry ? `Starting a conversation about your ${industry.navLabel.toLowerCase()} business.` : content.connectIntro}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2 p-8 shadow-lg shadow-slate-200/40">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Business name</label>
                <input
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Project type</label>
                <input
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="e.g. Website, CBT engine, tracker"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                placeholder="What are you looking to build?"
              />
            </div>

            {error && <p className="text-xs font-bold text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-7 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-pink-400/20"
            >
              {submitting ? 'Sending…' : 'Send via WhatsApp'}
            </button>
          </form>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
            <Eyebrow>Availability</Eyebrow>
            <p className="text-sm text-slate-600 leading-relaxed">
              {status.bannerMessage || (status.isAvailable ? 'Currently taking on new projects.' : 'Fully booked right now.')}
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
            <Eyebrow>Direct contact</Eyebrow>
            <div className="space-y-3 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="block font-semibold text-pink-500 hover:text-pink-600 transition"
              >
                WhatsApp →
              </a>
              <a href={`mailto:${EMAIL}`} className="block font-semibold text-slate-600 hover:text-slate-900 transition">
                {EMAIL}
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  )
}
