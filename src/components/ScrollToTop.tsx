import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Two small mobile-UX fixes bundled together:
//
// 1. SPA navigations don't reset scroll position by default, so tapping
//    a nav/footer link deep on a long page (e.g. Work → Connect) lands
//    the user mid-page on the new route instead of at its top.
// 2. Long pages on a phone have no quick way back up besides a lot of
//    thumb-swiping — a small floating action button fixes that without
//    competing with the in-header "Back" (previous page) control.
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-400/30 hover:bg-slate-800 active:scale-95 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l7-7 7 7M12 5v15" />
      </svg>
    </button>
  )
}
