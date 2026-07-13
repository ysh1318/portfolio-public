import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'

const FEATURES = [
  'PDF-to-CBT conversion — turn an existing paper test into a working computer-based test',
  'Exam-accurate interface (JEE / NEET / MHT-CET style)',
  'Instant scoring the moment a student submits',
  'Batch-wide rank comparison across a whole class',
  'WhatsApp-shareable result links for parents',
]

export default function ServicesTestEngines() {
  return (
    <>
      <PageHero
        eyebrow="Services / CBT & Test Engines"
        title="Computer-based tests, built around JEEMockLab"
      />
      <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
        <Eyebrow>What's included</Eyebrow>
        <ul className="space-y-3">
          {FEATURES.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-slate-600">
              <span className="text-pink-400 flex-shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-8 space-y-3 shadow-lg shadow-slate-200/40">
        <Eyebrow>Case study</Eyebrow>
        <h2 className="text-lg font-bold text-slate-900">JEEMockLab</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          This is the core offering behind this service line — a live, working CBT engine
          used for JEE-style mock testing. See it referenced in the Work section for a
          direct link.
        </p>
      </GlassCard>

      <div className="text-center">
        <PrimaryButton to="/connect">Talk about a test engine for your batch</PrimaryButton>
      </div>
    </>
  )
}
