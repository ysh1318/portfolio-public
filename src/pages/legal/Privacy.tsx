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

// DPDP Act (India) aligned, per spec §2.7.
export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated July 2026. This policy is aligned with India's Digital Personal Data Protection Act, 2023 (DPDP Act)."
      />

      <Section title="What I collect">
        <p>When you get in touch or use a product I've built for a client, I may collect:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Your name, phone number, and business details, submitted through the Connect form or WhatsApp</li>
          <li>Project details you share in an inquiry (subject, message, project type)</li>
          <li>
            Where I build and operate a system on behalf of a client, that system may process student or customer
            data belonging to that client's business (for example, test scores, membership records, or booking
            details) — this data is controlled by the client, and I process it as a service provider on their
            behalf
          </li>
        </ul>
      </Section>

      <Section title="Why I collect it">
        <p>
          Personal data submitted through this site is used only to respond to your inquiry, scope a project, and
          deliver the work you've asked for. Data processed within client systems is used solely to run the
          features that system was built for (e.g. showing a student their own test results).
        </p>
      </Section>

      <Section title="Where it's stored">
        <p>
          Data is stored on Firebase and Google Cloud infrastructure. These are Google-operated servers with their
          own security and compliance standards; I do not run separate physical servers of my own.
        </p>
      </Section>

      <Section title="Retention">
        <p>
          Inquiry data is kept for as long as needed to respond to you and, if we work together, for the duration
          of the engagement plus a reasonable period after for support purposes. You can ask for it to be deleted
          sooner — see "Your rights" below.
        </p>
      </Section>

      <Section title="Your rights">
        <p>Under the DPDP Act, you have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Ask what personal data of yours is held</li>
          <li>Request correction of inaccurate or incomplete data</li>
          <li>Request deletion of your data, where it's no longer needed for the purpose it was collected for</li>
          <li>Withdraw consent for further processing at any time</li>
        </ul>
        <p>To exercise any of these, reach out via the contact details below.</p>
      </Section>

      <Section title="Grievance contact">
        <p>
          For any privacy concern or data request, contact Yash Awachar at{' '}
          <a href="mailto:yashawachar101@gmail.com" className="text-pink-500 font-semibold hover:text-pink-600">
            yashawachar101@gmail.com
          </a>{' '}
          or via{' '}
          <a
            href="https://wa.me/919890215963"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 font-semibold hover:text-pink-600"
          >
            WhatsApp
          </a>
          .
        </p>
      </Section>
    </>
  )
}
