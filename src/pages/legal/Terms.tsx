import type { ReactNode } from 'react'
import { GlassCard, PageHero, Eyebrow } from '../../components/ui'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <GlassCard className="p-8 space-y-3 shadow-lg shadow-slate-200/40">
      <Eyebrow>{title}</Eyebrow>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
    </GlassCard>
  )
}

export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated July 2026. These terms apply to freelance work engaged through this site."
      />

      <Section title="Scope of service">
        <p>
          Work is scoped per project after an initial discussion (see the Process page). Deliverables, timeline,
          and price are confirmed before paid work begins — for paid engagements, a separate signed Service
          Agreement covering these specifics is sent to the client before starting.
        </p>
      </Section>

      <Section title="Payment terms">
        <p>
          Payment structure (upfront, milestone-based, or on delivery) is agreed per project in the Service
          Agreement. Ongoing or subscription-based work (such as per-student test engine access) is billed on the
          agreed recurring cycle.
        </p>
      </Section>

      <Section title="Revisions">
        <p>
          A reasonable number of revision rounds are included as part of the Review & Refine step of the build
          process. Requests that go beyond the originally agreed scope are treated as new work and quoted
          separately.
        </p>
      </Section>

      <Section title="Ownership of delivered work">
        <p>
          Once a project is paid in full, ownership of the delivered code and assets transfers to the client,
          except for any pre-existing tools, libraries, or frameworks I reuse across projects, which remain mine to
          reuse elsewhere. Source code and access credentials are handed over at project completion.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          Work is delivered on a best-effort basis and tested before handoff. I am not liable for indirect,
          incidental, or consequential losses arising from the use of delivered software. Total liability for any
          claim is limited to the amount paid for the specific project in question.
        </p>
      </Section>

      <Section title="Termination">
        <p>
          Either party may terminate an engagement with written notice (email or WhatsApp message). Work completed
          up to the termination date is payable; any prepaid amount for work not yet delivered is refunded minus
          work already completed.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:yashawachar101@gmail.com" className="text-pink-500 font-semibold hover:text-pink-600">
            yashawachar101@gmail.com
          </a>
          .
        </p>
      </Section>
    </>
  )
}
