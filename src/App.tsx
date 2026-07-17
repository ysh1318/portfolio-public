import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Work = lazy(() => import('./pages/Work'))
const Process = lazy(() => import('./pages/Process'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Connect = lazy(() => import('./pages/Connect'))
const ServicesOverview = lazy(() => import('./pages/services/ServicesOverview'))
const ServicesWebsites = lazy(() => import('./pages/services/ServicesWebsites'))
const ServicesSoftwareTools = lazy(() => import('./pages/services/ServicesSoftwareTools'))
const IndustriesOverview = lazy(() => import('./pages/industries/IndustriesOverview'))
const IndustryPage = lazy(() => import('./pages/industries/IndustryPage'))
const Privacy = lazy(() => import('./pages/legal/Privacy'))
const Terms = lazy(() => import('./pages/legal/Terms'))
const ComingSoon = lazy(() => import('./components/ComingSoon'))

function RouteFallback() {
  return (
    <div className="min-h-[40vh] grid place-items-center text-sm text-slate-500" aria-live="polite">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/websites" element={<ServicesWebsites />} />
          <Route path="/services/software-tools" element={<ServicesSoftwareTools />} />

          <Route path="/industries" element={<IndustriesOverview />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />

          <Route path="/work" element={<Work />} />
          <Route path="/process" element={<Process />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/legal/privacy" element={<Privacy />} />
          <Route path="/legal/terms" element={<Terms />} />

          <Route path="/connect" element={<Connect />} />

          <Route path="*" element={<ComingSoon title="Page not found" />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
