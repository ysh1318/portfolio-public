import { Link } from 'react-router-dom'
import { useSiteContent } from '../../hooks/useSiteContent'
import { GlassCard, PageHero } from '../../components/ui'
import LoopMedia from '../../components/LoopMedia'
import Reveal from '../../components/Reveal'
import { MEDIA } from '../../lib/media'

const PILLARS = [
  {
    title: 'Websites & Brand Presence',
    body: 'High-performance landing pages and business sites built to establish credibility, showcase services, and capture leads directly via WhatsApp.',
    to: '/services/websites',
    key: 'websites' as const,
    direction: 'left' as const,
  },
  {
    title: 'Full-Stack Custom Software',
    body: 'Tailored database systems—such as client tracking dashboards, membership portals, booking calendars, and interactive assessment tools.',
    to: '/services/software-tools',
    key: 'software' as const,
    direction: 'right' as const,
  },
]

export default function ServicesOverview() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero
        id="services-hero"
        eyebrow="Services"
        title="Two ways I can help your business"
        subtitle={content.servicesIntro}
        mediaSlot={MEDIA.servicesOverviewHeroBg}
        mediaObjectPosition="object-bottom"
        showAvailability={true}
      />
      <div id="services-pillars-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILLARS.map((p) => (
          <Reveal key={p.to} direction={p.direction} className="h-full">
            <Link to={p.to} className="block h-full group">
              <GlassCard id={p.key === 'websites' ? 'services-websites-pillar' : 'services-software-pillar'} className="overflow-hidden p-0 h-full flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 transform hover:-translate-y-1">
                <div className="space-y-0">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <LoopMedia
                      slot={MEDIA.servicesOverviewPillar(p.key)}
                      aspect="aspect-auto"
                      className="w-full h-full object-cover"
                      rounded="rounded-none"
                    />
                  </div>
                  <div className="p-8 space-y-3">
                    <h2 className="text-lg font-bold text-slate-950 group-hover:text-indigo-600 transition-colors">{p.title}</h2>
                    <p className="text-sm text-slate-700 leading-relaxed">{p.body}</p>
                  </div>
                </div>
                <div
                  className="px-8 pb-8 inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600 transition-colors"
                >
                  Learn more →
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}
