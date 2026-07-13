import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

// Small shared primitives so every page reuses the same design tokens
// (spec §1) instead of re-declaring the same Tailwind class soup.

export function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-3xl border border-white/80 rounded-[2.5rem] shadow-2xl shadow-slate-300/60 ${className}`}
    >
      {children}
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
}: {
  to?: string
  href?: string
  children: ReactNode
}) {
  const classes =
    'inline-block px-7 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-pink-400/20'
  if (to) return <Link to={to} className={classes}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
    </a>
  )
}

export function SecondaryButton({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-block px-7 py-3.5 bg-white border border-slate-200 hover:border-transparent hover:bg-slate-950 hover:text-white text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm"
    >
      {children}
    </Link>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-extrabold uppercase tracking-widest text-pink-500">
      {children}
    </span>
  )
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
}) {
  return (
    <GlassCard className="px-8 md:px-14 py-16 text-center space-y-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </GlassCard>
  )
}
