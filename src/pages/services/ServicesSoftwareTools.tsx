import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../../components/ui'
import { Link } from 'react-router-dom'
import LoopMedia from '../../components/LoopMedia'
import Reveal from '../../components/Reveal'
import { MEDIA } from '../../lib/media'

const TOOL_EXAMPLES = [
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

// This page merges what used to be two separate, unevenly-scoped "peer"
// pillars (a specific product — CBT test engines — sitting next to a
// broad category — management tools) into one properly-scoped pillar:
// "custom software," with test engines called out as the flagship
// example. Two broad pillars (this + Websites) is a more honest shape
// than three uneven ones.
export default function ServicesSoftwareTools() {
  return (
    <>
      <PageHero
        id="services-software-hero"
        eyebrow="Services / Full-Stack Custom Software"
        title="The software that runs your day-to-day"
        subtitle="Advanced, database-driven applications engineered to replace manual spreadsheets or run complex business logic—like exam-accurate testing engines, membership portals, and automated trackers."
        mediaSlot={MEDIA.servicesSoftwareHeroBg}
        mediaObjectPosition="object-center"
        mediaObjectFit="cover"
      />

      <Reveal direction="left">
        <GlassCard id="software-assessment-card" className="relative overflow-hidden p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
        <Eyebrow>Interactive assessment portals</Eyebrow>
        <p className="text-sm text-slate-700 leading-relaxed">
          An interactive assessment tool converts static question sheets (like PDFs or documents)
          into a digital mock-test interface featuring a standard timer, a question palette,
          and automatic response tracking. Under the hood, this involves parsing content into
          structured datasets and rendering a responsive, clean testing interface.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          This is built for schools, tutoring programs, or training centers looking to digitize
          their mock tests without manual grading overhead. See{' '}
          <Link to="/industries/coaching" className="text-indigo-600 font-semibold hover:text-indigo-700">
            Coaching Institutes
          </Link>{' '}
          for a scenario demonstrating how this mock assessment workflow is set up.
        </p>
        <div className="pt-2 relative">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Interactive Demo</p>
          <h3 className="text-base font-bold text-slate-950 mb-1">JEEMockLab</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-2">
            A functional demo demonstrating a mock-test interface, question palette navigation,
            and real-time grading logic.
          </p>
          <a
            id="software-jeemocklab-demo-link"
            href="https://jeemocklab-566080205337.asia-south1.run.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs font-extrabold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition"
          >
            View demo ↗
          </a>
        </div>
        </GlassCard>
      </Reveal>

      <Reveal direction="right">
        <GlassCard id="software-management-card" className="relative overflow-hidden p-8 md:p-10 space-y-4 shadow-lg shadow-slate-200/40">
          <Eyebrow>Day-to-day management tools</Eyebrow>
          <p className="text-sm text-slate-700 leading-relaxed">
            The other common need: replacing a notebook, a scattered set of WhatsApp chats, or a
            spreadsheet nobody keeps updated with something that actually reflects reality — who's
            active, who's due for a follow-up, what's booked when.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {TOOL_EXAMPLES.map((e) => (
              <div key={e.title}>
                <h3 className="font-bold text-sm text-slate-950 mb-1">{e.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </Reveal>

      <Reveal direction="up" className="space-y-6">
        <div id="software-demos-section" className="space-y-6">
          <div className="text-center space-y-2">
            <Eyebrow>See it in action</Eyebrow>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
              Automating manual operations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassCard id="software-gym-demo-card" className="overflow-hidden p-0 flex flex-col justify-between shadow-lg shadow-slate-200/40 group">
              <div className="space-y-0">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <LoopMedia
                    slot={MEDIA.homeIndustryCard('fitness')}
                    className="w-full h-full object-cover"
                    rounded="rounded-none"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-950">Fitness & Membership Portals</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Visual tools for gyms and studios to track client status, subscription renewals, and active attendance logs.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard id="software-agri-demo-card" className="overflow-hidden p-0 flex flex-col justify-between shadow-lg shadow-slate-200/40 group">
              <div className="space-y-0">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <LoopMedia
                    slot={MEDIA.homeIndustryCard('agri')}
                    className="w-full h-full object-cover"
                    rounded="rounded-none"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-950">Agri & Retail Operations</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Custom operational databases built to manage retail stock, track logs, and record shipments securely.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Reveal>

      <div className="text-center">
        <PrimaryButton id="software-connect-btn" to="/connect">Describe what you're testing or tracking today</PrimaryButton>
      </div>
    </>
  )
}
