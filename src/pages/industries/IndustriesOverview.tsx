import { Link } from 'react-router-dom'
import { useSiteContent } from '../../hooks/useSiteContent'
import { GlassCard, PageHero } from '../../components/ui'
import { INDUSTRIES } from './data'

// This is the page linked directly to cold-pitch leads (spec §2.3) —
// each card routes to a dedicated sub-page built from IndustryPage.tsx.
export default function IndustriesOverview() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for the business you actually run"
        subtitle={content.industriesIntro}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind) => (
          <Link key={ind.slug} to={`/industries/${ind.slug}`}>
            <GlassCard className="p-7 h-full flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:shadow-xl transition">
              <div className="space-y-2.5">
                <h2 className="text-base font-bold text-slate-900">{ind.navLabel}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{ind.tagline}</p>
              </div>
              <span className="mt-5 inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500">
                See what I build →
              </span>
            </GlassCard>
          </Link>
        ))}
      </div>
    </>
  )
}
