import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'

const EXAMPLES = [
  {
    title: 'Student / customer trackers',
    body: "Know who's active, who's lapsed, and who needs a follow-up — without a spreadsheet.",
  },
  {
    title: 'Booking calendars',
    body: 'Let people book a slot without a back-and-forth phone call.',
  },
  {
    title: 'Membership & attendance systems',
    body: "Track who showed up, who's due for renewal, and who needs a nudge.",
  },
  {
    title: 'Service-history & reminder tools',
    body: 'A record of what was done and when, with automatic reminders for the next visit.',
  },
]

export default function ServicesManagementTools() {
  return (
    <>
      <PageHero
        eyebrow="Services / Business Management Tools"
        title="The tools that run your day-to-day"
        subtitle="Framed generically because the same underlying system works across coaching, gyms, garages, salons, and more — the specifics change, the shape doesn't."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXAMPLES.map((e) => (
          <GlassCard key={e.title} className="p-8 space-y-3 shadow-lg shadow-slate-200/40">
            <Eyebrow>Example</Eyebrow>
            <h2 className="font-bold text-slate-900">{e.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{e.body}</p>
          </GlassCard>
        ))}
      </div>
      <div className="text-center">
        <PrimaryButton to="/connect">Describe what you're tracking today</PrimaryButton>
      </div>
    </>
  )
}
