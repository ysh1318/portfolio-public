import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'
import LoopMedia from '../../components/LoopMedia'
import Reveal from '../../components/Reveal'
import { MEDIA } from '../../lib/media'

const INCLUDED = [
  'Landing pages for a single offer or launch',
  'Multi-page business sites (home, about, services, contact)',
  'WhatsApp-integrated contact and ordering flows',
  'Basic on-page SEO setup (titles, meta descriptions, sitemap)',
  'Hosting and deployment handled end-to-end',
]

export default function ServicesWebsites() {
  return (
    <>
      <PageHero
        id="services-websites-hero"
        eyebrow="Services / Websites & Digital Presence"
        title="A professional site your customers can actually find"
        mediaSlot={MEDIA.servicesWebsitesHeroBg}
        mediaObjectPosition="object-center"
        mediaObjectFit="cover"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal direction="down">
          <GlassCard id="websites-included-card" className="relative overflow-hidden p-8 space-y-4 shadow-lg shadow-slate-200/40">
            <Eyebrow>What's included</Eyebrow>
            <ul className="space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <span className="text-indigo-500 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
        <Reveal direction="up">
          <GlassCard id="websites-for-card" className="relative overflow-hidden p-8 space-y-4 shadow-lg shadow-slate-200/40">
            <Eyebrow>Who it's for</Eyebrow>
            <p className="text-sm text-slate-700 leading-relaxed">
              Any local business with no online presence, or one that hasn't been touched in
              years. If people are finding you through word of mouth alone right now, this is
              the starting point.
            </p>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal direction="up" className="space-y-6">
        <div id="websites-demos-section" className="space-y-6">
          <div className="text-center space-y-2">
            <Eyebrow>See it in action</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
              Interactive flows built for conversion
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard id="websites-dining-demo-card" className="overflow-hidden p-0 flex flex-col justify-between shadow-lg shadow-slate-200/40 group">
              <div className="space-y-0">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <LoopMedia
                    slot={MEDIA.homeIndustryCard('restaurants')}
                    className="w-full h-full object-cover"
                    rounded="rounded-none"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-950">Local Business & Dining Menus</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Visual, mobile-first catalogs and menus designed for cafes and dining. Customers can browse visual categories and construct orders effortlessly.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard id="websites-ecommerce-demo-card" className="overflow-hidden p-0 flex flex-col justify-between shadow-lg shadow-slate-200/40 group">
              <div className="space-y-0">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <LoopMedia
                    slot={MEDIA.servicesOverviewPillar('websites')}
                    className="w-full h-full object-cover"
                    rounded="rounded-none"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-950">Premium E-Commerce Showcases</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    High-end storefront layouts designed to showcase luxury items, apparel, or boutique products with clean cards and modern visuals.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Reveal>

      <div className="text-center">
        <PrimaryButton id="websites-connect-btn" to="/connect">Get a quote for your site</PrimaryButton>
      </div>
    </>
  )
}
