import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'
import { Link } from 'react-router-dom'

export default function ServicesTestEngines() {
  return (
    <>
      <PageHero
        eyebrow="Services / CBT & Test Engines"
        title="A computer-based testing engine, built once and adapted to whatever you're testing"
        subtitle="This page describes the underlying technology. For how it applies specifically to JEE/NEET/MHT-CET coaching, see the Coaching Institutes industry page."
      />

      <GlassCard className="p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
        <Eyebrow>What a CBT engine actually is</Eyebrow>
        <p className="text-sm text-slate-600 leading-relaxed">
          A computer-based test (CBT) engine takes a question paper — usually a PDF or even a
          scanned image — and turns it into an interactive test a student takes on a screen,
          with the same feel as the real exam interface: timer, question palette, mark-for-review,
          and instant submission. The core technical pieces are the same regardless of what's
          being tested; only the question content and scoring rules change per use case.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Underneath, this means: parsing a source document into structured question data,
          rendering it in an exam-accurate interface, capturing every response with a timestamp,
          and scoring instantly against an answer key — with negative marking, sectional cutoffs,
          or partial credit, whatever the exam's actual rules require.
        </p>
      </GlassCard>

      <GlassCard className="p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
        <Eyebrow>What's included</Eyebrow>
        <ul className="space-y-3">
          {[
            'Document-to-CBT conversion — an existing paper test becomes a working computer-based test, without retyping questions by hand',
            'An exam-accurate interface — timer, question navigation, mark-for-review, matching the visual and functional feel of the real exam being prepared for',
            'Configurable scoring rules — negative marking, sectional weightage, or partial credit, matched to whatever the actual exam requires',
            'Instant results the moment a test is submitted, with rank/percentile comparison across whoever took the same test',
            'Result delivery built around how the group already communicates — WhatsApp links, a results page, or both',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm text-slate-600">
              <span className="text-pink-400 flex-shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
        <Eyebrow>Where this applies beyond coaching institutes</Eyebrow>
        <p className="text-sm text-slate-600 leading-relaxed">
          The same underlying engine works for any scenario that needs a structured test with
          instant scoring — school internal exams, entrance test prep beyond JEE/NEET/MHT-CET,
          internal company assessments, or certification-style quizzes. The interface, scoring
          logic, and question source all adapt to the specific use case; what stays constant is
          the engine underneath.
        </p>
      </GlassCard>

      <GlassCard className="p-8 md:p-10 space-y-3 shadow-lg shadow-slate-200/40">
        <Eyebrow>Case study</Eyebrow>
        <h2 className="text-lg font-bold text-slate-900">JEEMockLab</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          A live, working example of this engine applied to JEE-style mock testing — exam-accurate
          interface, real-time analytics, adaptive test flow. See the{' '}
          <Link to="/industries/coaching" className="text-pink-500 font-semibold hover:text-pink-600">
            Coaching Institutes page
          </Link>{' '}
          for how this specifically applies to running a coaching institute's weekly tests.
        </p>
      </GlassCard>

      <div className="text-center">
        <PrimaryButton to="/connect">Talk about a test engine for what you're testing</PrimaryButton>
      </div>
    </>
  )
}
