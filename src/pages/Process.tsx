import { useSiteContent } from '../hooks/useSiteContent'
import { GlassCard, PageHero, PrimaryButton } from '../components/ui'

// Content adapted from the original single-page site's "How I Work"
// section (portfolio-1.html, ~line 635), expanded per spec §2.5.
const STEPS = [
  {
    n: '01',
    color: 'from-pink-400 to-rose-400',
    text: 'text-pink-500',
    title: 'Discuss & Scope',
    body: 'We talk over WhatsApp or email about what you actually need — features, timeline, and budget, no jargon.',
  },
  {
    n: '02',
    color: 'from-purple-400 to-violet-400',
    text: 'text-purple-500',
    title: 'Design & Build',
    body: "I build fast using AI-assisted workflows, sharing progress checkpoints so you're never left wondering.",
  },
  {
    n: '03',
    color: 'from-sky-400 to-blue-400',
    text: 'text-sky-500',
    title: 'Review & Refine',
    body: 'You test the live build, flag changes, and I iterate quickly until it matches what you had in mind.',
  },
  {
    n: '04',
    color: 'from-emerald-400 to-teal-400',
    text: 'text-emerald-500',
    title: 'Deploy & Support',
    body: 'I ship it live on Netlify or Cloud Run, hand over access, and stay reachable for fixes after launch.',
  },
]

export default function Process() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero eyebrow="Process" title="How an engagement actually goes" subtitle={content.processIntro} />

      <GlassCard className="p-8 md:p-12">
        <div className="relative">
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-pink-200 via-purple-200 to-sky-200 -z-0" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
            {STEPS.map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center space-y-4">
                <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-tr ${step.color} p-[2px]`}>
                  <div className={`w-full h-full bg-white rounded-2xl flex items-center justify-center text-base font-black ${step.text}`}>
                    {step.n}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8 space-y-3 text-center shadow-lg shadow-slate-200/40">
        <h3 className="text-lg font-bold text-slate-900">No long contracts, no surprises</h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
          Every step happens over the same channel you're already comfortable with — WhatsApp or email — and
          you see the build progress as it happens, not just at the end.
        </p>
      </GlassCard>

      <div className="text-center">
        <PrimaryButton to="/connect">Start a project</PrimaryButton>
      </div>
    </>
  )
}
