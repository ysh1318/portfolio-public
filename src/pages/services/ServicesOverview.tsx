import { Link } from 'react-router-dom'
import { useSiteContent } from '../../hooks/useSiteContent'
import { GlassCard, PageHero } from '../../components/ui'

const PILLARS = [
  {
    title: 'Websites & Digital Presence',
    body: 'Landing pages, multi-page business sites, WhatsApp-integrated contact/ordering, basic SEO, and end-to-end hosting.',
    to: '/services/websites',
  },
  {
    title: 'CBT / Test Engines',
    body: 'Exam-accurate CBT platforms built around JEEMockLab — PDF-to-CBT conversion, instant scoring, and batch-wide rank comparison.',
    to: '/services/test-engines',
  },
  {
    title: 'Business Management Tools',
    body: 'Trackers, booking calendars, membership systems, and service-history tools for coaching, gyms, garages, salons and more.',
    to: '/services/management-tools',
  },
]

export default function ServicesOverview() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Three ways I can help your business"
        subtitle={content.servicesIntro}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((p) => (
          <GlassCard key={p.to} className="p-8 flex flex-col justify-between shadow-lg shadow-slate-200/40">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">{p.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{p.body}</p>
            </div>
            <Link
              to={p.to}
              className="mt-6 inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition"
            >
              Learn more →
            </Link>
          </GlassCard>
        ))}
      </div>
    </>
  )
}
