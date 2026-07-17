import { Link } from 'react-router-dom'
import { useSiteContent } from '../hooks/useSiteContent'
import { GlassCard, GradientText, PrimaryButton, SecondaryButton, Eyebrow, AvailabilityBadge } from '../components/ui'
import Testimonials from '../components/Testimonials'
import { useMeta } from '../hooks/useMeta'
import { INDUSTRIES } from './industries/data'
import LoopMedia from '../components/LoopMedia'
import Reveal from '../components/Reveal'
import { MEDIA } from '../lib/media'

const TRUST = ['Netlify Deploys', 'Google Cloud Run', 'AI Workflow', 'MVP Specialist']

const TECH_1 = [
  'React', 'Vite', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3', 'Next.js', 'Vercel',
  'React', 'Vite', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3', 'Next.js', 'Vercel',
  'React', 'Vite', 'Tailwind CSS', 'Redux', 'HTML5', 'CSS3', 'Next.js', 'Vercel'
]
const TECH_2 = [
  'TypeScript', 'Firebase', 'Firestore', 'Cloud Run', 'Node.js', 'NoSQL', 'Git', 'Google Cloud',
  'TypeScript', 'Firebase', 'Firestore', 'Cloud Run', 'Node.js', 'NoSQL', 'Git', 'Google Cloud',
  'TypeScript', 'Firebase', 'Firestore', 'Cloud Run', 'Node.js', 'NoSQL', 'Git', 'Google Cloud'
]

const SERVICE_TEASERS = [
  {
    icon: '🌐',
    title: 'Websites & Brand Presence',
    body: 'High-performance landing pages and business sites built to establish credibility, showcase services, and capture leads directly via WhatsApp.',
    to: '/services/websites',
  },
  {
    icon: '⚙️',
    title: 'Full-Stack Custom Software',
    body: 'Tailored database systems—such as client tracking dashboards, membership systems, automated portals, and interactive assessment tools.',
    to: '/services/software-tools',
  },
]

// Pulled from the same INDUSTRIES source of truth as the /industries pages,
// so labels, icons, and accent colors can never drift out of sync here.
const INDUSTRY_TEASERS = INDUSTRIES.slice(0, 3).map((ind) => ({
  slug: ind.slug,
  icon: ind.icon,
  title: ind.navLabel,
  body: ind.tagline,
  accentGradient: ind.accentGradient,
}))

export default function Home() {
  const { content } = useSiteContent()
  useMeta('Home', content.heroSubtext)

  return (
    <>
      <GlassCard id="home-hero" className="px-6 md:px-14 flex flex-row items-center justify-between gap-6 md:gap-10 pt-10 pb-12 md:pt-14 md:pb-16 relative overflow-hidden">
        <LoopMedia
          slot={MEDIA.homeHeroBg}
          aspect="aspect-auto"
          className="absolute inset-0 w-full h-full pointer-events-none"
          rounded="rounded-none"
          opacity={0.85}
        />


        <div className="flex-1 space-y-6 text-left relative z-10">
          <AvailabilityBadge darkBg={true} />
          <h1 className="text-4xl md:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] drop-shadow-[0_5px_15px_rgba(0,0,0,0.95)]">
            <GradientText>{content.heroHeadline}</GradientText>
          </h1>
          <p className="text-slate-100 text-sm md:text-[15px] leading-relaxed font-semibold max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {content.heroSubtext}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <PrimaryButton id="home-hero-connect-btn" to="/connect">Get in Touch</PrimaryButton>
            <SecondaryButton id="home-hero-work-btn" to="/work">View My Work</SecondaryButton>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] font-black uppercase tracking-widest text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {TRUST.map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-indigo-500">✦</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <Reveal direction="right" className="relative z-10 flex-shrink-0 w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 flex items-center justify-center">
          <div className="avatar-polygon p-[3px] w-full h-full">
            <div className="w-full h-full avatar-polygon flex items-center justify-center overflow-hidden" style={{ background: 'none' }}>
              <LoopMedia
                slot={MEDIA.homeHeroAvatar}
                aspect="aspect-auto"
                className="w-full h-full object-contain"
                rounded="rounded-none"
              />
            </div>
          </div>
        </Reveal>
      </GlassCard>

      <div id="home-tech-belt" className="relative flex items-center w-full my-4 overflow-hidden h-24">
        <LoopMedia
          slot={MEDIA.homeDivider1}
          aspect="aspect-auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Infinite Moving Belt (Right to Left) with Snaking/Waving Badges */}
        <div className="absolute inset-0 z-10 flex items-center overflow-hidden">
          <div className="animate-marquee-left flex gap-4 pr-4">
            <div className="flex gap-4 flex-shrink-0 items-center h-full">
              {TECH_1.map((t, idx) => (
                <div
                  key={idx}
                  className="animate-snake-wave-1 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2 md:px-6 md:py-2.5 shadow-sm text-[9px] md:text-[10px] font-black tracking-widest uppercase text-slate-800 font-mono"
                  style={{
                    animationDelay: `${-idx * 0.3}s`,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-shrink-0 items-center h-full" aria-hidden="true">
              {TECH_1.map((t, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="animate-snake-wave-1 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2 md:px-6 md:py-2.5 shadow-sm text-[9px] md:text-[10px] font-black tracking-widest uppercase text-slate-800 font-mono"
                  style={{
                    animationDelay: `${-idx * 0.3}s`,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="home-services-section" className="relative overflow-hidden glass-card-effect rounded-[2.5rem] shadow-2xl shadow-slate-900/10 px-2 py-6 md:px-4 md:py-10 space-y-6 md:space-y-8">
        <LoopMedia
          slot={MEDIA.homeSectionBg}
          aspect="aspect-auto"
          className="absolute inset-0 w-full h-full pointer-events-none"
          rounded="rounded-none"
          opacity={0.85}
        />


        <div className="relative z-10 text-center space-y-3">
          <Eyebrow>What I Build</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-950">
            Two ways I can help
          </h2>
          <p className="text-slate-700 text-sm max-w-xl mx-auto">{content.servicesIntro}</p>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {SERVICE_TEASERS.map((s, i) => (
            <Reveal key={s.to} direction="up" delay={i * 150} className="h-full">
              <Link
                id={s.to === '/services/websites' ? 'home-websites-card' : 'home-software-card'}
                to={s.to}
                className="glass-card-effect rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between h-full shadow-sm shadow-slate-900/10 hover:shadow-xl hover:bg-white/35 transition-all duration-300 text-left group"
              >
                <div className="space-y-0">
                  <LoopMedia slot={MEDIA.homeServiceCard(i + 1)} className="w-full aspect-[16/10] object-cover" rounded="rounded-none" />
                  <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-lg font-bold text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug">{s.title}</h3>
                    <p className="text-xs sm:text-sm md:text-sm text-slate-700 leading-relaxed">{s.body}</p>
                  </div>
                </div>
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600 group-hover:text-indigo-700 transition">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="home-industries-section" className="relative overflow-hidden glass-card-effect rounded-[2.5rem] shadow-2xl shadow-slate-900/10 px-2 py-6 md:px-4 md:py-10 space-y-6 md:space-y-8">

        <div className="relative z-10 text-center space-y-3">
          <Eyebrow>Who I Build For</Eyebrow>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-950">
            Built for real businesses
          </h2>
          <p className="text-slate-700 text-sm max-w-xl mx-auto">{content.industriesIntro}</p>
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {INDUSTRY_TEASERS.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={i * 150} className="h-full">
              <Link
                id={`home-${s.slug}-card`}
                to={`/industries/${s.slug}`}
                className="glass-card-effect rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col justify-between h-full shadow-sm shadow-slate-900/10 hover:shadow-xl hover:bg-white/35 transition-all duration-300 text-left group"
              >
                <div className="space-y-0">
                  <LoopMedia slot={MEDIA.homeIndustryCard(s.slug)} className="w-full aspect-[16/10] object-cover" rounded="rounded-none" />
                  <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-lg font-bold text-slate-950 group-hover:text-indigo-600 transition-colors leading-snug">{s.title}</h3>
                    <p className="text-xs sm:text-sm md:text-sm text-slate-700 leading-relaxed">{s.body}</p>
                  </div>
                </div>
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600 group-hover:text-indigo-700 transition">
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="relative z-10 text-center">
          <Link
            id="home-see-all-industries-link"
            to="/industries"
            className="inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition"
          >
            See all industries →
          </Link>
        </div>
      </section>

      <div className="relative flex items-center w-full my-4 overflow-hidden h-24">
        <LoopMedia
          slot={MEDIA.homeDivider2}
          aspect="aspect-auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Infinite Moving Belt (Right to Left) with Snaking/Waving Badges */}
        <div className="absolute inset-0 z-10 flex items-center overflow-hidden">
          <div className="animate-marquee-left flex gap-4 pr-4">
            <div className="flex gap-4 flex-shrink-0 items-center h-full">
              {TECH_2.map((t, idx) => (
                <div
                  key={idx}
                  className="animate-snake-wave-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2 md:px-6 md:py-2.5 shadow-sm text-[9px] md:text-[10px] font-black tracking-widest uppercase text-slate-800 font-mono"
                  style={{
                    animationDelay: `${-idx * 0.3}s`,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-shrink-0 items-center h-full" aria-hidden="true">
              {TECH_2.map((t, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="animate-snake-wave-2 bg-white/70 backdrop-blur-md border border-white/80 rounded-full px-5 py-2 md:px-6 md:py-2.5 shadow-sm text-[9px] md:text-[10px] font-black tracking-widest uppercase text-slate-800 font-mono"
                  style={{
                    animationDelay: `${-idx * 0.3}s`,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Testimonials />
    </>
  )
}
