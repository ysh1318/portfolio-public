import { Link } from 'react-router-dom'
import type { CSSProperties, ReactNode } from 'react'
import LoopMedia from './LoopMedia'
import type { MediaSlot } from '../lib/media'

// Small shared primitives so every page reuses the same design tokens
// (spec §1) instead of re-declaring the same Tailwind class soup.

export function GlassCard({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <div
      id={id}
      className={`glass-card-effect rounded-[2.5rem] shadow-2xl shadow-slate-900/10 ${className}`}
    >
      {children}
    </div>
  )
}



// Small gradient icon badges (spec: .shape-clip), each card/step gets
// its own hue lifted from a shared rotation so the whole site reads as
// one consistent, colourful system rather than one-off accents.
const BADGE_GRADIENTS = [
  'from-pink-400 to-purple-400',
  'from-purple-400 to-sky-400',
  'from-sky-400 to-emerald-400',
  'from-pink-400 to-orange-400',
  'from-pink-400 to-rose-400',
  'from-purple-400 to-violet-400',
  'from-sky-400 to-blue-400',
  'from-emerald-400 to-teal-400',
]

export function IconBadge({
  children,
  index = 0,
  size = 'md',
  gradient: gradientOverride,
}: {
  children: ReactNode
  index?: number
  size?: 'sm' | 'md'
  // Pass an explicit `from-x to-y` gradient when the color needs to mean
  // something (e.g. tied to a specific industry/category) rather than
  // just rotating through the palette by array position.
  gradient?: string
}) {
  const gradient = gradientOverride ?? BADGE_GRADIENTS[index % BADGE_GRADIENTS.length]
  const dims = size === 'sm' ? 'w-12 h-12 text-lg' : 'w-14 h-14 text-xl'
  return (
    <div className={`${dims} shrink-0 shape-clip bg-gradient-to-tr ${gradient} p-[2px]`}>
      <div className="w-full h-full bg-white shape-clip flex items-center justify-center">{children}</div>
    </div>
  )
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
      {children}
    </span>
  )
}

export function PrimaryButton({
  to,
  href,
  children,
  id,
}: {
  to?: string
  href?: string
  children: ReactNode
  id?: string
}) {
  const classes =
    'inline-block px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-indigo-500/25'
  if (to) return <Link id={id} to={to} className={classes}>{children}</Link>
  return (
    <a id={id} href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>
  )
}

export function SecondaryButton({ to, children, id }: { to: string; children: ReactNode; id?: string }) {
  return (
    <Link
      id={id}
      to={to}
      className="inline-block px-7 py-3.5 bg-white border border-slate-200 hover:border-transparent hover:bg-slate-950 hover:text-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm"
    >
      {children}
    </Link>
  )
}

export function AvailabilityBadge({ darkBg = false }: { darkBg?: boolean }) {
  return (
    <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 p-[1px] rounded-full w-fit shadow-md shadow-pink-500/5 select-none animate-fade-in">
      <div className={`px-3.5 py-1.5 rounded-full flex items-center gap-2 ${
        darkBg ? 'bg-slate-950/90 text-white' : 'bg-white/90 text-slate-800'
      }`}>
        <span className="text-emerald-500 animate-pulse text-[11px] font-bold">✦</span>
        <span className={`text-[9px] font-black tracking-widest uppercase font-mono ${
          darkBg ? 'text-slate-100' : 'text-slate-800'
        }`}>
          Available for Projects
        </span>
      </div>
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-600">
      {children}
    </span>
  )
}

export function LegalDocument({ children }: { children: ReactNode }) {
  return (
    <GlassCard className="px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-none space-y-8">{children}</div>
    </GlassCard>
  )
}

export function LegalSection({ n, title, children }: { n: number | string; title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-extrabold text-slate-950">
        {n}. {title}
      </h2>
      <div className="space-y-3 text-sm text-slate-700 leading-relaxed">{children}</div>
    </section>
  )
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 leading-relaxed">{children}</ul>
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  icon,
  iconGradient,
  mediaSlot,
  mediaOpacity = 0.85,
  mediaObjectPosition,
  mediaObjectFit = 'cover',
  showAvailability = false,
  id,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  // Optional visual identity for the page — e.g. an industry's icon —
  // shown as a badge next to the eyebrow instead of text alone.
  icon?: ReactNode
  iconGradient?: string
  // Optional looping decorative background scene, see src/lib/media.ts.
  mediaSlot?: MediaSlot
  mediaOpacity?: number
  // Optional CSS/Tailwind object position class (e.g. 'object-bottom')
  mediaObjectPosition?: string
  mediaObjectFit?: 'cover' | 'contain'
  showAvailability?: boolean
  id?: string
}) {
  const hasMedia = !!mediaSlot
  return (
    <GlassCard id={id} className="relative overflow-hidden px-8 md:px-14 py-10 md:py-12 space-y-4">
      {mediaSlot && (
        <LoopMedia
          slot={mediaSlot}
          aspect="aspect-auto"
          className="absolute inset-0 w-full h-full pointer-events-none"
          rounded="rounded-none"
          opacity={mediaOpacity}
          objectPosition={mediaObjectPosition}
          objectFit={mediaObjectFit}
        />
      )}

      
      <div className="relative z-10 flex items-center justify-between gap-4 w-full flex-wrap">
        <div className="flex items-center gap-4">
          {icon && (
            <IconBadge gradient={iconGradient} size="sm">
              {icon}
            </IconBadge>
          )}
          <div className="flex items-center gap-3">
            <span className="w-8 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        </div>
        {showAvailability && <AvailabilityBadge darkBg={hasMedia} />}
      </div>

      {/* No background screen, just high-contrast white text with premium drop shadows
          matching the Home page hero design system */}
      <div className="relative z-10 space-y-3">
        <h1
          className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.12] max-w-3xl ${
            hasMedia
              ? 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]'
              : 'text-slate-950'
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-sm md:text-base leading-relaxed font-semibold max-w-2xl ${
              hasMedia
                ? 'text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
                : 'text-slate-700'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </GlassCard>
  )
}
