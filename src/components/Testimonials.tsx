import { useTestimonials } from '../hooks/useTestimonials'
import { GlassCard, Eyebrow } from './ui'

// Renders nothing if there are no visible testimonials yet — the empty
// state should just not appear on the page, not show a placeholder card.
// This is intentional: the section "reserves its slot" in the sense that
// dropping it in on Home/Work costs nothing today and lights up the
// moment the first testimonial is added from the dashboard.
export default function Testimonials() {
  const { testimonials, loading } = useTestimonials()

  if (loading || testimonials.length === 0) return null

  return (
    <section className="space-y-6">
      <Eyebrow>What clients say</Eyebrow>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <GlassCard key={t.id} className="p-7 space-y-4 shadow-lg shadow-slate-200/40">
            <div className="text-amber-400 text-sm tracking-wider">
              {'★'.repeat(Math.max(0, Math.min(5, t.rating)))}
              {'☆'.repeat(5 - Math.max(0, Math.min(5, t.rating)))}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">"{t.quote}"</p>
            <div className="text-xs font-bold text-slate-900">
              {t.clientName}
              {t.business && <span className="text-slate-400 font-medium"> — {t.business}</span>}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
