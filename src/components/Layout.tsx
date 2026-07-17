import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Lenis from 'lenis'
import Header from './Header'
import Footer from './Footer'
import AvailabilityBanner from './AvailabilityBanner'
import ScrollToTop from './ScrollToTop'
import LoopMedia from './LoopMedia'
import VirtualCursor from './VirtualCursor'
import { MEDIA } from '../lib/media'

const Chatbot = lazy(() => import('./Chatbot'))

export default function Layout() {
  const [chatbotRequested, setChatbotRequested] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    let rafId: number
    const raf = (time: number) => {
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
      {chatbotRequested ? (
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      ) : (
        <button
          type="button"
          onClick={() => setChatbotRequested(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
          aria-label="Open assistant"
        >
          <span className="text-xl">✦</span>
        </button>
      )}
      <VirtualCursor />
    </div>
  )
}
