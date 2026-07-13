import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'

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
        eyebrow="Services / Websites & Digital Presence"
        title="A professional site your customers can actually find"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>What's included</Eyebrow>
          <ul className="space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-600">
                <span className="text-pink-400 flex-shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-8 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>Who it's for</Eyebrow>
          <p className="text-sm text-slate-600 leading-relaxed">
            Any local business with no online presence, or one that hasn't been touched in
            years. If people are finding you through word of mouth alone right now, this is
            the starting point.
          </p>
        </GlassCard>
      </div>
      <div className="text-center">
        <PrimaryButton to="/connect">Get a quote for your site</PrimaryButton>
      </div>
    </>
  )
}
