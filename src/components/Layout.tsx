import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Lenis from 'lenis'
import Header from './Header'
import Footer from './Footer'
import AvailabilityBanner from './AvailabilityBanner'
import ScrollToTop from './ScrollToTop'
import LoopMedia from './LoopMedia'
import Chatbot from './Chatbot'
import VirtualCursor from './VirtualCursor'
import { MEDIA } from '../lib/media'

// Wraps every route (spec §3: Global Elements). Individual pages render
// into <Outlet /> and are responsible for their own <section> wrappers.
export default function Layout() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-x-hidden text-slate-900 p-3 sm:p-4 md:p-8 space-y-6 sm:space-y-10 selection:bg-pink-500 selection:text-white">
      <LoopMedia
        slot={MEDIA.globalBackground}
        aspect="aspect-auto"
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        rounded="rounded-none"
        opacity={0.80}
        crossfadeDuration={1}
      />
      <Header />
      <AvailabilityBanner />
      <main className="w-full max-w-6xl mx-auto relative z-10 space-y-16 sm:space-y-24">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
      <VirtualCursor />
    </div>
  )
}
