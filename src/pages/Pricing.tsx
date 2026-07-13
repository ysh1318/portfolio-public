import { useSiteContent } from '../hooks/useSiteContent'
import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../components/ui'

const TIERS = [
  {
    name: 'Websites & Digital Presence',
    range: 'Starting from ₹8,000',
    model: 'One-time build',
    detail:
      'Covers landing pages and multi-page business sites with WhatsApp-integrated contact/ordering and basic SEO. Final price depends on page count and features.',
  },
  {
    name: 'Test Engines',
    range: '₹40–60 / student / month',
    model: 'Per-student, ~4 tests/month',
    detail:
      'Covers the CBT engine, instant scoring, and rank comparison. A minimum monthly floor applies so small batches stay viable — ask for the exact number for your batch size.',
    highlight: true,
  },
  {
    name: 'Management Tools',
    range: 'One-time setup + optional maintenance',
    model: 'Setup fee, then monthly upkeep',
    detail:
      'Trackers, booking calendars, and membership/attendance systems. Setup is a one-time cost; ongoing maintenance is optional and billed monthly if you want it.',
  },
]

export default function Pricing() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero eyebrow="Pricing" title="Ranges, not guesswork" subtitle="Straightforward pricing by service — the exact number depends on scope." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <GlassCard
            key={tier.name}
            className={`p-8 flex flex-col justify-between shadow-lg shadow-slate-200/40 ${
              tier.highlight ? 'ring-2 ring-pink-300' : ''
            }`}
          >
            <div className="space-y-3">
              <Eyebrow>{tier.model}</Eyebrow>
              <h2 className="text-lg font-bold text-slate-900">{tier.name}</h2>
              <p className="text-2xl font-extrabold text-slate-900">{tier.range}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{tier.detail}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8 text-center space-y-4 shadow-lg shadow-slate-200/40">
        <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">{content.pricingNote}</p>
        <PrimaryButton to="/connect">Get a quote for your business</PrimaryButton>
      </GlassCard>
    </>
  )
}
