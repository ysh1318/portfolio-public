import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { saveLead } from '../lib/leads'
import { useSiteStatus } from '../hooks/useSiteStatus'
import { getIndustry } from './industries/data'
import { AvailabilityBadge } from '../components/ui'
import LoopMedia from '../components/LoopMedia'
import Reveal from '../components/Reveal'
import { MEDIA } from '../lib/media'

const WHATSAPP_NUMBER = '919890215963'
const EMAIL = 'yashawachar101@gmail.com'

// Layout ported verbatim from the original single-page site (~line 845
// onward of portfolio-1.html) — same grid, same "Connect With Me" heading
// treatment, same avatar-polygon frame, same Social Channels / Chat
// Directly boxes, same form field set and button hierarchy (WhatsApp
// primary, Email + Instagram DM secondary), same "Endpoint Encrypted"
// footer line. Decorative blobs now come from the shared, seeded
// SectionBlobs so this page's scatter is unique but still part of the
// same site-wide system. The only other additions vs the original are
// *behavioral*: a live Firestore-backed availability status instead of a
// hardcoded line, a lead write on submit, and sector-based prefill when
// arriving from an Industries page.
export default function Connect() {
  const { status } = useSiteStatus()
  const [searchParams] = useSearchParams()

  const sector = searchParams.get('sector')
  const industry = getIndustry(sector ?? undefined)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState(industry ? industry.navLabel : '')
  const [subject, setSubject] = useState(industry ? `Inquiry — ${industry.navLabel}` : '')
  const [message, setMessage] = useState(
    industry
      ? `Hi, I run a business in the ${industry.navLabel.toLowerCase()} space and I'm interested in what you build for it.`
      : '',
  )
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function buildWhatsAppText() {
    let text = `Hi Yash, I'd like to get in touch.\n\n`
    text += `*Name:* ${name}\n`
    if (email) text += `*Email:* ${email}\n`
    if (projectType) text += `*Project Target:* ${projectType}\n`
    if (subject) text += `*Subject:* ${subject}\n`
    text += `\n*Message:*\n${message}`
    return text
  }

  function logLead() {
    // Fire-and-forget — never blocks WhatsApp/email/Instagram redirects,
    // and a failed write here isn't fatal since those channels are the
    // real source of truth for the conversation either way.
    saveLead({
      name,
      email,
      business: '',
      projectType,
      subject,
      message,
      sourcePage: window.location.pathname + window.location.search,
      notes: '',
      source: 'form',
    }).catch(() => {})
  }

  function validate() {
    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message before sending.')
      return false
    }
    setError('')
    return true
  }

  async function handleWhatsApp(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    logLead()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppText())}`
    window.open(url, '_blank')
    setSubmitting(false)
  }

  function handleEmail() {
    if (!validate()) return
    logLead()
    const subjectLine = subject || `Freelance Inquiry from ${name}`
    let body = `Hi Yash,\n\n`
    body += `Name: ${name}\n`
    if (email) body += `Email: ${email}\n`
    if (projectType) body += `Project Target: ${projectType}\n`
    body += `\nMessage:\n${message}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`
  }


  return (
    <section id="connect-page-section" className="w-full glass-card-effect rounded-[2.5rem] shadow-2xl shadow-slate-900/10 p-6 md:p-10 relative overflow-hidden">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        <Reveal direction="left" className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div id="connect-availability-badge">
              <AvailabilityBadge />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-none">
              Connect <br className="hidden lg:inline" />
              With Me
            </h2>
            <div className="w-52 h-52 relative flex items-center justify-center">
              <div className="avatar-polygon p-[3px] w-full h-full">
                <div className="w-full h-full avatar-polygon flex items-center justify-center overflow-hidden" style={{ background: 'none' }}>
                  <LoopMedia slot={MEDIA.connectAvatar} aspect="aspect-auto" className="w-full h-full object-contain" rounded="rounded-none" />
                </div>
              </div>
            </div>
          </div>

          <div id="connect-socials-card" className="space-y-3 bg-slate-50 border border-slate-100 p-5 rounded-2xl shadow-inner relative overflow-hidden">
            <LoopMedia
              slot={MEDIA.connectAccent('social')}
              className="absolute -bottom-2 -right-2 w-14 h-14 pointer-events-none"
              opacity={0.4}
            />
            <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 font-mono block relative z-10">Social Channels</span>
            <div className="grid grid-cols-2 gap-3 relative z-10">
              <a
                id="connect-github-link"
                href="https://github.com/ysh1318"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-950 hover:text-white transition font-bold text-sm text-slate-700 shadow-sm"
              >
                GitHub
              </a>
              <a
                id="connect-instagram-link"
                href="https://instagram.com/yash_d.awachar"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition font-bold text-sm text-slate-700 shadow-sm"
              >
                Instagram
              </a>
            </div>
          </div>

          <div id="connect-whatsapp-direct-card" className="glass-card-effect border border-[#25D366]/20 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm relative overflow-hidden">
            <LoopMedia
              slot={MEDIA.connectAccent('chat')}
              className="absolute -bottom-2 -right-2 w-14 h-14 pointer-events-none"
              opacity={0.4}
            />
            <div className="flex items-center gap-3 relative z-10">
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase text-slate-950 tracking-wider">Chat Directly</span>
                <p className="text-[10px] font-mono font-bold text-slate-700">9890215963</p>
              </div>
            </div>
            <a
              id="connect-whatsapp-direct-link"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-[#20ba59] transition relative z-10"
            >
              Open ↗
            </a>
          </div>

        </Reveal>

        <div className="lg:col-span-7 glass-card-effect rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <LoopMedia
            slot={MEDIA.connectBg}
            aspect="aspect-auto"
            className="absolute inset-0 w-full h-full pointer-events-none"
            rounded="rounded-none"
            opacity={0.80}
          />
          <form id="connect-inquiry-form" className="space-y-5 w-full relative z-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] tracking-tight">Let's Build Something</h3>
              <p className="text-sm text-white font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] leading-relaxed">
                I am an independent MVP builder. Reach out for freelance gigs, custom products, or production code adjustments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] uppercase tracking-widest block font-mono pl-1">Your Name</span>
                <input
                  id="connect-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] uppercase tracking-widest block font-mono pl-1">Email Address</span>
                <input
                  id="connect-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] uppercase tracking-widest block font-mono pl-1">Project Target</span>
                <input
                  id="connect-project-input"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  placeholder="MVP, Web Utility, SaaS"
                  className="form-input"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] uppercase tracking-widest block font-mono pl-1">Subject</span>
                <input
                  id="connect-subject-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Freelance Requirement"
                  className="form-input"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)] uppercase tracking-widest block font-mono pl-1">Detailed Message</span>
              <textarea
                id="connect-message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your product requirements..."
                rows={4}
                className="form-input resize-none"
              />
            </div>

            {error && <p className="text-xs font-bold text-rose-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">{error}</p>}

            <button
              id="connect-whatsapp-submit-btn"
              type="submit"
              onClick={handleWhatsApp}
              disabled={submitting}
              className="w-full gradient-btn text-white text-xs font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send via WhatsApp'} <span>↗</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                id="connect-email-submit-btn"
                type="button"
                onClick={handleEmail}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                Email Instead <span>✉</span>
              </button>
              <a
                id="connect-instagram-submit-link"
                href="https://instagram.com/yash_d.awachar"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white border border-slate-200 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent text-slate-700 text-[11px] font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center gap-2 transition"
              >
                DM on Instagram <span>↗</span>
              </a>
            </div>
          </form>

          <div className="pt-5 mt-5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
            <a href={`mailto:${EMAIL}`} className="font-mono text-[10px] text-white hover:text-indigo-300 transition">
              {EMAIL}
            </a>
            <span className="text-emerald-400 flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider">
              🔒 Endpoint Encrypted
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
