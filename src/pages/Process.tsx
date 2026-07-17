import { useEffect, useState, useRef } from 'react'
import { useSiteContent } from '../hooks/useSiteContent'
import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../components/ui'
import LoopMedia from '../components/LoopMedia'
import Reveal from '../components/Reveal'
import { MEDIA } from '../lib/media'

const STEPS = [
  {
    n: '01',
    color: 'from-pink-400 to-rose-400',
    text: 'text-pink-500',
    glowColor: 'shadow-pink-500/20 border-pink-400/40',
    bg: 'bg-pink-500/5',
    title: 'Discuss & Scope',
    body: 'We talk over WhatsApp or email about what you actually need — features, timeline, and budget, no jargon.',
  },
  {
    n: '02',
    color: 'from-purple-400 to-violet-400',
    text: 'text-purple-500',
    glowColor: 'shadow-purple-500/20 border-purple-400/40',
    bg: 'bg-purple-500/5',
    title: 'Design & Build',
    body: "I build fast using AI-assisted workflows, sharing progress checkpoints so you're never left wondering.",
  },
  {
    n: '03',
    color: 'from-sky-400 to-blue-400',
    text: 'text-sky-500',
    glowColor: 'shadow-sky-500/20 border-sky-400/40',
    bg: 'bg-sky-500/5',
    title: 'Review & Refine',
    body: 'You test the live build, flag changes, and I iterate quickly until it matches what you had in mind.',
  },
  {
    n: '04',
    color: 'from-emerald-400 to-teal-400',
    text: 'text-emerald-500',
    glowColor: 'shadow-emerald-500/20 border-emerald-400/40',
    bg: 'bg-emerald-500/5',
    title: 'Deploy & Support',
    body: 'I ship it live on Netlify or Cloud Run, hand over access, and stay reachable for fixes after launch.',
  },
]

export default function Process() {
  const { content } = useSiteContent()
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeStep, setActiveStep] = useState(-1)
  const [glowHeight, setGlowHeight] = useState(0)

  // IntersectionObserver to observe steps scroll entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setActiveStep((prev) => Math.max(prev, index))
          }
        })
      },
      {
        rootMargin: '-25% 0px -25% 0px', // triggers close to viewport center
        threshold: 0.1,
      }
    )

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Calculate glow height dynamically based on active card positions
  const updateGlowHeight = () => {
    if (activeStep >= 0 && containerRef.current) {
      const activeEl = stepRefs.current[activeStep]
      const containerEl = containerRef.current
      if (activeEl) {
        const containerRect = containerEl.getBoundingClientRect()
        const activeRect = activeEl.getBoundingClientRect()
        const topOfActiveInContainer = activeRect.top - containerRect.top
        
        // Height tracks down to the middle/badge node of the active card
        const middleOfActive = topOfActiveInContainer + activeRect.height / 2
        setGlowHeight(middleOfActive)
      }
    } else {
      setGlowHeight(0)
    }
  }

  useEffect(() => {
    updateGlowHeight()
    window.addEventListener('resize', updateGlowHeight)
    return () => window.removeEventListener('resize', updateGlowHeight)
  }, [activeStep])

  return (
    <>
      <PageHero
        id="process-hero"
        eyebrow="Process"
        title="How an engagement actually goes"
        subtitle={content.processIntro}
        mediaSlot={MEDIA.processHeroBg}
      />

      <div ref={containerRef} id="process-timeline" className="timeline-glow-container max-w-3xl mx-auto my-16 select-none md:select-text relative pl-12 md:pl-20">
        {/* Base line background */}
        <div className="timeline-line-base left-6 md:left-10" />

        {/* Dynamic active glowing line */}
        <div 
          className="timeline-line-glow left-6 md:left-10" 
          style={{ height: `${glowHeight}px` }}
        />

        {/* Timeline steps list */}
        <div className="space-y-12">
          {STEPS.map((step, i) => {
            const isActive = activeStep >= i

            return (
              <div
                key={step.n}
                id={`process-step-${i + 1}`}
                ref={(el) => (stepRefs.current[i] = el)}
                data-index={i}
                className={`relative flex flex-row items-center w-full transition-all duration-700 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-25 scale-95 pointer-events-none'
                }`}
              >
                {/* Timeline node badge */}
                <div 
                  className={`absolute left-6 md:left-10 -translate-x-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-500 ${
                    isActive 
                      ? `bg-gradient-to-tr ${step.color} border-transparent text-white scale-110 shadow-lg` 
                      : 'bg-white border-slate-200 text-slate-400 scale-90'
                  }`}
                >
                  {step.n}
                </div>

                {/* Process Step Card */}
                <div className="w-full pl-6 md:pl-10">
                  <GlassCard className={`p-6 md:p-8 w-full transition-all duration-500 border ${
                    isActive ? `${step.glowColor} bg-white/20 shadow-xl border-white/40` : 'border-white/10 bg-white/10'
                  }`}>
                    <Eyebrow>{step.n} — {step.title}</Eyebrow>
                    <h3 className="text-xl font-black text-slate-900 mt-1 mb-3">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
                  </GlassCard>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Reveal direction="up">
        <GlassCard id="process-contracts-card" className="relative overflow-hidden p-8 space-y-3 text-center shadow-lg shadow-slate-200/40">
          <h3 className="text-lg font-bold text-slate-900">No long contracts, no surprises</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            Every step happens over the same channel you're already comfortable with — WhatsApp or email — and
            you see the build progress as it happens, not just at the end.
          </p>
        </GlassCard>
      </Reveal>

      <div className="text-center">
        <PrimaryButton id="process-connect-btn" to="/connect">Start a project</PrimaryButton>
      </div>
    </>
  )
}
