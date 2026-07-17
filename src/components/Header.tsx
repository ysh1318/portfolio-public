import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoopMedia from './LoopMedia'
import { MEDIA } from '../lib/media'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'Process', to: '/process' },
  { label: 'Connect', to: '/connect' },
]

// Small chevron used by BackButton — kept local so Header stays a
// single-file drop-in like the rest of the components in this folder.
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

// In-app "Back" control. A SPA loses the browser chrome affordance once
// the pill header scrolls with the page, and users landing deep on a
// route (e.g. from a shared /industries/:slug link) have no in-app way
// back up the hierarchy. navigate(-1) is used when there's real history
// on the stack (react-router v6 stamps window.history.state.idx), and
// falls back to a sensible parent route otherwise so the button is
// never a dead end.
function BackButton() {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname === '/') return null

  const hasHistory =
    typeof window !== 'undefined' &&
    window.history.state &&
    typeof window.history.state.idx === 'number' &&
    window.history.state.idx > 0

  const parentFallback = () => {
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length > 1) return `/${segments[0]}`
    return '/'
  }

  const handleClick = () => {
    if (hasHistory) navigate(-1)
    else navigate(parentFallback())
  }

  return (
    <button
      id="global-header-back-btn"
      onClick={handleClick}
      aria-label="Go back"
      className="flex items-center justify-center gap-1 pl-2 pr-2.5 sm:pr-3.5 py-2.5 -ml-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition shrink-0"
    >
      <ChevronLeftIcon />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wide">Back</span>
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Lifted "scrolled" shadow so the pill reads as anchored to the top
  // once content passes underneath it, instead of floating ambiguously.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on route change, and never leave the app on a
  // background-locked <body> if navigation happens via a means other
  // than tapping a nav link (e.g. browser back/forward).
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])


  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* sticky (not fixed): stays in normal flow so it never overlaps
          content, but no longer scrolls off-screen with the page. */}
      <header
        id="global-header"
        className={`sticky top-3 md:top-4 z-40 w-full max-w-6xl mx-auto flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-1 px-3 sm:px-6 py-3 sm:py-4 bg-white/85 backdrop-blur-3xl border border-white/80 rounded-full transition-shadow ${
          scrolled ? 'shadow-xl shadow-slate-300/50' : 'shadow-lg shadow-slate-200/40'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 xl:justify-self-start">
          <BackButton />
          <Link
            id="global-header-logo-link"
            to="/"
            className="flex items-center gap-2 text-base sm:text-xl xl:text-xl font-extrabold tracking-tight text-slate-900 min-w-0"
          >
            <LoopMedia
              slot={MEDIA.headerAvatar}
              className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
              rounded="rounded-full"
            />
            <span className="truncate">Yash Awachar</span>
          </Link>
        </div>

        <nav className="hidden xl:flex items-center justify-center gap-6 xl:gap-8 text-sm font-bold uppercase tracking-wide text-slate-700 xl:justify-self-center">
          {NAV.map((item) => (
            <NavLink
              id={`global-nav-${item.label.toLowerCase()}`}
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'text-slate-955 transition' : 'hover:text-slate-955 transition'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 xl:justify-self-end">
          <Link
            id="global-header-talk-btn"
            to="/connect"
            className="hidden sm:inline-block px-4 xl:px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-extrabold tracking-widest uppercase rounded-full transition shadow-md whitespace-nowrap"
          >
            Let's Talk
          </Link>
          <button
            id="global-header-menu-trigger"
            className="xl:hidden w-12 h-12 md:w-10 md:h-10 rounded-full hover:bg-slate-100 active:bg-slate-200 transition relative flex items-center justify-center border border-slate-200/50"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <div className="w-5 h-5 relative transform scale-125 md:scale-100 transition-transform duration-300">
              <span
                className={`absolute left-[2px] h-[2px] bg-slate-900 rounded-full transition-all duration-300 ${
                  open ? 'top-[9px] w-[18px] rotate-45' : 'top-[4px] w-4'
                }`}
              />
              <span
                className={`absolute left-[2px] h-[2px] bg-slate-900 rounded-full transition-all duration-300 ${
                  open ? 'top-[9px] w-0 opacity-0' : 'top-[9px] w-[18px]'
                }`}
              />
              <span
                className={`absolute left-[2px] h-[2px] bg-slate-900 rounded-full transition-all duration-300 ${
                  open ? 'top-[9px] w-[18px] -rotate-45' : 'top-[14px] w-3'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Premium Glass Grid Menu Overlay */}
      {/* Premium Glass Dropdown Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="fixed inset-0 z-50 pointer-events-none xl:hidden"
      >
        {/* Clickable backdrop that is fully transparent and catches close clicks */}
        {open && (
          <div 
            onClick={() => setOpen(false)} 
            className="absolute inset-0 pointer-events-auto cursor-default bg-transparent"
          />
        )}
        
        {/* Bottom-anchored glass menu stack (Thumb Zone UX optimized) */}
        <div 
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3.5 md:gap-2.5 w-auto transition-all duration-500 ease-out ${
            open ? 'pointer-events-auto opacity-100 translate-y-0 scale-100' : 'pointer-events-none opacity-0 translate-y-12 scale-95'
          }`}
        >
          {/* 6 Centered Individual Glass Cards stacked vertically */}
          {NAV.map((item, index) => (
            <NavLink
              id={`global-mobile-nav-${item.label.toLowerCase()}`}
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `group glass-card-effect rounded-full w-52 md:w-44 px-8 py-3.5 md:px-6 md:py-3 flex items-center justify-center transition-all duration-300 select-none border hover:scale-[1.05] active:scale-[0.95] ${
                  isActive 
                    ? 'border-white/70 bg-white/50 text-slate-900 scale-105 shadow-md shadow-slate-900/5' 
                    : 'border-white/50 bg-white/40 text-slate-800 hover:bg-white/45'
                }`
              }
              style={{
                transitionDelay: open ? `${index * 30}ms` : '0ms',
              }}
            >
              {({ isActive }) => (
                <span className={`text-sm md:text-xs font-black uppercase tracking-wider transition-colors ${isActive ? 'text-slate-900' : 'text-slate-800'}`}>
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}

          {/* Footer Social Icons */}
          <div className="flex items-center justify-center gap-3.5 pt-3 mt-1.5 w-full border-t border-white/10">
            <a
              href="https://github.com/ysh1318"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 md:w-10 md:h-10 rounded-full glass-card-effect flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 border border-white/50 shadow-sm"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/yash_d.awachar"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 md:w-10 md:h-10 rounded-full glass-card-effect flex items-center justify-center text-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90 border border-white/50 shadow-sm"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
