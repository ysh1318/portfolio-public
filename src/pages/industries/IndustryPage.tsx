import { useParams, Navigate } from 'react-router-dom'
import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'
import { getIndustry } from './data'
import { useMeta } from '../../hooks/useMeta'

// One shared template renders all seven industry sub-pages (spec §2.3),
// driven by data.ts, instead of duplicating this layout seven times.
// Routed as /industries/:slug.
export default function IndustryPage() {
  const { slug } = useParams()
  const industry = getIndustry(slug)

  useMeta(
    industry ? industry.title : 'Industries',
    industry ? industry.problem : undefined,
  )

  if (!industry) return <Navigate to="/industries" replace />

  return (
    <>
      <PageHero eyebrow={`Industries / ${industry.navLabel}`} title={industry.title} subtitle={industry.tagline} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>The problem</Eyebrow>
          <p className="text-sm text-slate-600 leading-relaxed">{industry.problem}</p>
        </GlassCard>

        <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>What I build</Eyebrow>
          <ul className="space-y-3">
            {industry.build.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-600">
                <span className="text-pink-400 flex-shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {industry.proof && (
        <GlassCard className="p-8 space-y-3 shadow-lg shadow-slate-200/40">
          <Eyebrow>Proof</Eyebrow>
          <h3 className="text-lg font-bold text-slate-900">{industry.proof.name}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{industry.proof.description}</p>
          <a
            href={industry.proof.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition"
          >
            View live ↗
          </a>
        </GlassCard>
      )}

      <div className="text-center">
        <PrimaryButton to={`/connect?sector=${industry.slug}`}>
          Get a quote for your {industry.navLabel.toLowerCase()}
        </PrimaryButton>
      </div>
    </>
  )
}
