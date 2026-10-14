import { Link } from 'react-router-dom'
import { useSiteContent } from '../../hooks/useSiteContent'
import { GlassCard, PageHero } from '../../components/ui'
import LoopMedia from '../../components/LoopMedia'
import Reveal from '../../components/Reveal'
import { MEDIA } from '../../lib/media'

const PILLARS = [
  {
    title: 'Websites & Brand Presence',
    body: 'High-performance landing pages and business sites built to establish credibility, showcase services, and capture leads directly via WhatsApp.',
    to: '/services/websites',
    key: 'websites' as const,
    direction: 'left' as const,
  },
  {
    title: 'Full-Stack Custom Software',
    body: 'Tailored database systems—such as client tracking dashboards, membership portals, booking calendars, and interactive assessment tools.',
    to: '/services/software-tools',
    key: 'software' as const,
    direction: 'right' as const,
  },
]

export default function ServicesOverview() {
  const { content } = useSiteContent()

  return (
    <>
      <PageHero
        id="services-hero"
        eyebrow="Services"
        title="Two ways I can help your business"
        subtitle={content.servicesIntro}
        showAvailability={true}
      />
      {/* Shared SVG clipPath for the smooth glassmorphism corner extension */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="smooth-glass-corner-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 1 C 0.32 1, 0.58 0.12, 0.86 0.12 L 1 0.12 L 1 1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div id="services-pillars-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILLARS.map((p) => (
          <Reveal key={p.to} direction={p.direction} className="h-full">
            <Link to={p.to} className="block h-full group">
              <GlassCard id={p.key === 'websites' ? 'services-websites-pillar' : 'services-software-pillar'} className="overflow-hidden p-0 h-full flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 transform hover:-translate-y-1">
                <div className="space-y-0">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <LoopMedia
                      slot={MEDIA.servicesOverviewPillar(p.key)}
                      aspect="aspect-auto"
                      className="w-full h-full object-cover"
                      rounded="rounded-none"
                    />

                    {/* Smooth Extended Glassmorphism Corner */}
                    <div className="absolute bottom-0 right-0 w-[44%] sm:w-[38%] h-[36%] pointer-events-none z-10 overflow-hidden">
                      {/* Frosted Glass Fill with Clip Path */}
                      <div
                        className="w-full h-full"
                        style={{
                          clipPath: 'url(#smooth-glass-corner-clip)',
                          WebkitClipPath: 'url(#smooth-glass-corner-clip)',
                          backgroundColor: 'rgba(255, 255, 255, 0.38)',
                          backdropFilter: 'blur(24px) saturate(140%)',
                          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                        }}
                      />
                      {/* Subtle Ambient Light Gradient on the Glass */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/15 to-transparent pointer-events-none"
                        style={{
                          clipPath: 'url(#smooth-glass-corner-clip)',
                          WebkitClipPath: 'url(#smooth-glass-corner-clip)',
                        }}
                      />
                      {/* Smooth Glass Edge Highlight & Shadow */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* Soft subtle shadow beneath the glass edge */}
                        <path
                          d="M 0 100 C 32 100, 58 12, 86 12 L 100 12"
                          fill="none"
                          stroke="rgba(0, 0, 0, 0.12)"
                          strokeWidth="2.5"
                          vectorEffect="non-scaling-stroke"
                          className="opacity-60"
                        />
                        {/* Crisp glowing white glass border line */}
                        <path
                          d="M 0 100 C 32 100, 58 12, 86 12 L 100 12"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.85)"
                          strokeWidth="1.5"
                          vectorEffect="non-scaling-stroke"
                          className="group-hover:stroke-white transition-colors duration-300"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="p-8 space-y-3">
                    <h2 className="text-lg font-bold text-slate-950 group-hover:text-indigo-600 transition-colors">{p.title}</h2>
                    <p className="text-sm text-slate-700 leading-relaxed">{p.body}</p>
                  </div>
                </div>
                <div
                  className="px-8 pb-8 inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600 transition-colors"
                >
                  Learn more →
                </div>
              </GlassCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  )
}
