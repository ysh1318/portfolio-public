import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import Process from './pages/Process'
import FAQ from './pages/FAQ'
import Connect from './pages/Connect'
import ServicesOverview from './pages/services/ServicesOverview'
import ServicesWebsites from './pages/services/ServicesWebsites'
import ServicesSoftwareTools from './pages/services/ServicesSoftwareTools'
import IndustriesOverview from './pages/industries/IndustriesOverview'
import IndustryPage from './pages/industries/IndustryPage'
import Privacy from './pages/legal/Privacy'
import Terms from './pages/legal/Terms'
import ComingSoon from './components/ComingSoon'

// Route map mirrors spec §2 (sitemap). Home, Services, Work, Industries,
// Process, Pricing, Legal, and Connect are all fully built. The
// dashboard (spec §5) is a separate deployment and not part of this
// project — see spec.md for what's left.
export default function App() {
  return (
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
  )
}
