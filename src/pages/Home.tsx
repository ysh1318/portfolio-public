import { Link } from 'react-router-dom'
import { useSiteContent } from '../hooks/useSiteContent'
import { GlassCard, GradientText, PrimaryButton, SecondaryButton, Eyebrow } from '../components/ui'
import Testimonials from '../components/Testimonials'
import { useMeta } from '../hooks/useMeta'

const TRUST = ['Netlify Deploys', 'Google Cloud Run', 'AI Workflow', 'MVP Specialist']

const SERVICE_TEASERS = [
  {
    title: 'Websites & Digital Presence',
    body: 'Landing pages and multi-page business sites with WhatsApp-integrated contact, built and hosted end-to-end.',
    to: '/services/websites',
  },
  {
    title: 'CBT / Test Engines',
    body: 'Exam-accurate test platforms, built around JEEMockLab — PDF-to-CBT conversion, instant scoring, rank comparison.',
    to: '/services/test-engines',
  },
  {
    title: 'Business Management Tools',
    body: 'Trackers, booking calendars, and membership systems tailored to how your business actually runs.',
    to: '/services/management-tools',
  },
]

const INDUSTRY_TEASERS = [
  { title: 'Coaching Institutes', body: 'CBT tests, WhatsApp results, student tracking.' },
  { title: 'Restaurants', body: 'Online menus, WhatsApp ordering, table booking.' },
  { title: 'Krishi Seva Kendra', body: 'Farmer-relatable catalog + WhatsApp ordering.' },
]

export default function Home() {
  const { content } = useSiteContent()
  useMeta('Home', content.heroSubtext)

  return (
    <>
      <GlassCard className="px-8 md:px-14 flex flex-col md:flex-row items-center justify-between gap-10 pt-14 pb-16 relative overflow-hidden">
        <div className="flex-1 space-y-6 text-left order-2 md:order-1">
          <h1 className="text-4xl md:text-[3.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            <GradientText>{content.heroHeadline}</GradientText>
          </h1>
          <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed font-medium max-w-xl">
            {content.heroSubtext}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <PrimaryButton to="/connect">Get in Touch</PrimaryButton>
            <SecondaryButton to="/work">View My Work</SecondaryButton>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-pink-400">✦</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 relative flex-shrink-0 w-40 h-56 md:w-48 md:h-64">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 via-purple-300 to-sky-300 opacity-40 blur-xl rounded-full" />
          <img
            src="/img/avatar-hex.png"
            alt="Yash Awachar"
            className="relative w-full h-full object-contain drop-shadow-xl"
          />
        </div>
      </GlassCard>

      <section className="space-y-8">
        <div className="text-center space-y-3">
          <Eyebrow>What I Build</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Three ways I can help
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">{content.servicesIntro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_TEASERS.map((s) => (
            <GlassCard key={s.to} className="p-6 flex flex-col justify-between shadow-lg shadow-slate-200/40">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
              </div>
              <Link
                to={s.to}
                className="mt-4 inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition"
              >
                Explore →
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-3">
          <Eyebrow>Who I Build For</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Built for real businesses
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">{content.industriesIntro}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {INDUSTRY_TEASERS.map((s) => (
            <GlassCard key={s.title} className="p-6 shadow-lg shadow-slate-200/40">
              <h3 className="font-bold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{s.body}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/industries"
            className="inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition"
          >
            See all industries →
          </Link>
        </div>
      </section>

      <Testimonials />
    </>
  )
}
