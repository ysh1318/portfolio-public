import { Link } from 'react-router-dom'
import { useSiteContent } from '../../hooks/useSiteContent'
import { GlassCard, IconBadge, PageHero } from '../../components/ui'
import { INDUSTRIES } from './data'
import LoopMedia from '../../components/LoopMedia'
import Reveal from '../../components/Reveal'
import { MEDIA } from '../../lib/media'

// This is the page linked directly to cold-pitch leads (spec §2.3) —
// each card routes to a dedicated sub-page built from IndustryPage.tsx.
export default function IndustriesOverview() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero
        id="industries-hero"
        eyebrow="Industries"
        title="Built for the business you actually run"
        subtitle={content.industriesIntro}
        mediaSlot={MEDIA.industriesOverviewHeroBg}
        mediaObjectPosition="object-bottom"
      />
      <div id="industries-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.slug} direction="up" delay={(i % 3) * 150}>
            <Link id={`industries-${ind.slug}-link`} to={`/industries/${ind.slug}`}>
              <GlassCard className="overflow-hidden p-7 h-full flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:shadow-xl transition">
                <div className="space-y-3.5">
                  <div className="-mx-7 -mt-7 mb-4 overflow-hidden">
                    <LoopMedia 
                      slot={MEDIA.industryCard(ind.slug)} 
                      className="w-full h-full object-cover" 
                      rounded="rounded-none"
                    />
                  </div>
                  <IconBadge gradient={ind.accentGradient} size="sm">
                    {ind.icon}
                  </IconBadge>
                  <h2 className="text-base font-bold text-slate-950">{ind.navLabel}</h2>
                  <p className="text-sm text-slate-700 leading-relaxed">{ind.tagline}</p>
                </div>
                <span className="mt-5 inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                  See what I build →
                </span>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}
