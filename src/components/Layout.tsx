import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import AvailabilityBanner from './AvailabilityBanner'
import Particles from './Particles'

// Wraps every route (spec §3: Global Elements). Individual pages render
// into <Outlet /> and are responsible for their own <section> wrappers.
export default function Layout() {
  return (
    <div className="min-h-screen relative overflow-x-hidden text-slate-900 p-4 md:p-8 space-y-10 selection:bg-pink-500 selection:text-white">
      <Particles />
      <Header />
      <AvailabilityBanner />
      <main className="w-full max-w-6xl mx-auto relative z-10 space-y-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
