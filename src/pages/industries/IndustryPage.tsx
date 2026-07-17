import { useParams, Navigate } from 'react-router-dom'
import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'
import { getIndustry } from './data'
import { useMeta } from '../../hooks/useMeta'
import LoopMedia from '../../components/LoopMedia'
import Reveal from '../../components/Reveal'
import { MEDIA } from '../../lib/media'

// One shared template renders all seven industry sub-pages, driven by
// data.ts, instead of duplicating this layout seven times. Routed as
// /industries/:slug. Expanded to carry real depth per sector — context,
// a multi-paragraph problem statement, a sector-specific build list, a
// short "how this gets built" process, and a couple of sector FAQs —
// instead of a bare 3-bullet features list.
export default function IndustryPage() {
  const { slug } = useParams()
  const industry = getIndustry(slug)

  useMeta(
    industry ? industry.title : 'Industries',
    industry ? industry.problem[0] : undefined,
  )

  if (!industry) return <Navigate to="/industries" replace />

  return (
    <>
      <PageHero
        id="industry-hero"
        eyebrow={`Industries / ${industry.navLabel}`}
        title={industry.title}
        subtitle={industry.tagline}
        icon={industry.icon}
        iconGradient={industry.accentGradient}
        mediaSlot={MEDIA.industryHeroBg(industry.slug)}
        mediaOpacity={0.85}
        mediaObjectPosition={
          industry.slug === 'restaurants' ||
          industry.slug === 'coaching' ||
          industry.slug === 'real-estate' ||
          industry.slug === 'fitness'
            ? 'object-center'
            : 'object-bottom'
        }
      />

      <Reveal direction="left">
        <GlassCard id="industry-problem-card" className="relative overflow-hidden p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>What's actually going on</Eyebrow>
          {industry.problem.map((para, i) => (
            <p key={i} className="text-sm text-slate-700 leading-relaxed">
              {para}
            </p>
          ))}
        </GlassCard>
      </Reveal>

      <Reveal direction="right">
        <GlassCard id="industry-build-card" className="relative overflow-hidden p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>What gets built for you</Eyebrow>
          <ul className="space-y-3">
            {industry.build.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-700">
                <span className="text-pink-400 flex-shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>

      <GlassCard id="industry-process-card" className="p-8 md:p-10 space-y-5 shadow-lg shadow-slate-200/40">
        <Eyebrow>How this actually happens</Eyebrow>
        <ol className="space-y-4">
          {industry.process.map((step, i) => (
            <Reveal key={i} as="li" direction="up" delay={i * 120} className="flex gap-4 text-sm text-slate-700">
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-tr ${industry.accentGradient} text-white text-xs font-extrabold flex items-center justify-center`}
              >
                {i + 1}
              </span>
              <span className="leading-relaxed pt-0.5">{step}</span>
            </Reveal>
          ))}
        </ol>
      </GlassCard>

      {industry.proof && (
        <Reveal direction="up">
          <GlassCard id="industry-proof-card" className="relative overflow-hidden p-8 md:p-10 space-y-3 shadow-lg shadow-slate-200/40">
            <Eyebrow>Proof, not just a promise</Eyebrow>
            <h3 className="text-lg font-bold text-slate-950">{industry.proof.name}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{industry.proof.description}</p>
            <a
              id="industry-proof-link"
              href={industry.proof.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition"
            >
              View live ↗
            </a>
          </GlassCard>
        </Reveal>
      )}

      <div id="industry-faq-list" className="space-y-4">
        <Eyebrow>Questions specific to {industry.navLabel.toLowerCase()}</Eyebrow>
        {industry.faq.map((item) => (
          <GlassCard key={item.q} className="p-7 space-y-2 shadow-lg shadow-slate-200/40">
            <p className="font-bold text-slate-950 text-sm">{item.q}</p>
            <p className="text-sm text-slate-700 leading-relaxed">{item.a}</p>
          </GlassCard>
        ))}
      </div>

      <div className="text-center">
        <PrimaryButton id="industry-connect-btn" to={`/connect?sector=${industry.slug}`}>
          Get a quote for your {industry.navLabel.toLowerCase()}
        </PrimaryButton>
      </div>
    </>
  )
}
