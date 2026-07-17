import { PageHero, LegalDocument, LegalSection, LegalList } from '../../components/ui'
import { useMeta } from '../../hooks/useMeta'

const EMAIL = 'yashawachar101@gmail.com'
const WHATSAPP = 'https://wa.me/919890215963'

export default function Terms() {
  useMeta('Terms of Service', 'The terms governing website, software, and tool engagements.')

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated: July 2026. These terms govern any website, software, or tool built by Yash Awachar."
      />

      <LegalDocument>
        <LegalSection n={1} title="Acceptance of Terms">
          <p>
            By engaging Yash Awachar ("I", "me") to build, deliver, or maintain a website, application, or
            tool ("Product"), or by using this Site, you ("Client") agree to these Terms of Service. Where a
            separate signed Service Agreement exists for a specific engagement, that document takes precedence
            over these Terms for anything it specifically addresses; these Terms fill in everything else.
          </p>
        </LegalSection>

        <LegalSection n={2} title="Description of Services">
          <p>Services offered generally fall into three categories, each scoped individually per engagement:</p>
          <LegalList>
            <li>Websites and digital presence (landing pages, multi-page business sites, WhatsApp-integrated contact/ordering)</li>
            <li>Computer-based test (CBT) engines, built around exam-accurate interfaces and automated scoring</li>
            <li>Business management tools (trackers, booking calendars, membership and attendance systems)</li>
          </LegalList>
          <p>
            The exact features, timeline, and deliverables for any engagement are agreed upon separately,
            typically over WhatsApp or email, before work begins.
          </p>
        </LegalSection>

        <LegalSection n={3} title="Engagement Process">
          <p>
            A typical engagement proceeds as: initial inquiry → scope discussion → quote → agreement on price
            and timeline → build → demo → revisions (where included) → handoff and, where applicable, ongoing
            support. Free trial periods, where offered, are agreed to explicitly at the time of the quote and
            are not implied for every engagement.
          </p>
        </LegalSection>

        <LegalSection n={4} title="Fees & Payment Terms">
          <LegalList>
            <li>Pricing is quoted per engagement based on scope; any discussed or published ranges are indicative, not binding quotes</li>
            <li>Recurring/subscription-style services (such as a per-student monthly test-engine fee) are billed on the schedule agreed at the start of the engagement</li>
            <li>Payment is due as specified in the individual quote or Service Agreement; continued access to a Product may be paused if payment is significantly overdue, with reasonable notice given first</li>
          </LegalList>
        </LegalSection>

        <LegalSection n={5} title="Client Responsibilities">
          <p>To deliver a Product on time and correctly, the Client agrees to:</p>
          <LegalList>
            <li>Provide accurate content, data, and business information needed for the build</li>
            <li>Give timely feedback during demo/revision stages</li>
            <li>Ensure they have the right to use any content, images, or data they provide for the Product</li>
          </LegalList>
        </LegalSection>

        <LegalSection n={6} title="Intellectual Property & Ownership">
          <LegalList>
            <li>Upon full payment for a Product, ownership of the delivered code and assets specific to that Client transfers to the Client, unless otherwise agreed in writing</li>
            <li>Reusable underlying tools, frameworks, or components built independently (not specific to one Client's business) remain the property of Yash Awachar and may be reused or adapted for other clients</li>
            <li>Yash Awachar retains the right to showcase completed work (screenshots, descriptions, live links) in a portfolio, unless the Client has requested confidentiality in writing</li>
          </LegalList>
        </LegalSection>

        <LegalSection n={7} title="Revisions & Change Requests">
          <p>
            The number of included revision rounds, if any, is specified per engagement. Requests beyond what
            was originally scoped (new features, significant redesigns) are treated as a new, separately quoted
            piece of work rather than a free revision.
          </p>
        </LegalSection>

        <LegalSection n={8} title="Data Handling">
          <p>
            Any personal data collected or processed as part of a Product is handled according to the{' '}
            <a href="/legal/privacy" className="text-pink-500 font-semibold hover:text-pink-600">Privacy Policy</a>.
            The Client remains responsible, as Data Fiduciary, for the personal data of their own end users
            (students, customers, members) unless otherwise agreed.
          </p>
        </LegalSection>

        <LegalSection n={9} title="Warranties & Disclaimers">
          <p>
            Products are built with reasonable skill and care, and tested before handoff. However, Products are
            provided "as is" beyond any specific warranty period agreed in writing; no guarantee is made that a
            Product will be completely free of bugs, uninterrupted, or fit for every unstated purpose. Bug fixes
            within a reasonable period after handoff are addressed as part of standard support where included in
            the engagement.
          </p>
        </LegalSection>

        <LegalSection n={10} title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, liability for any claim arising from a Product or these
            Terms is limited to the amount actually paid by the Client for that specific engagement. Neither
            party is liable for indirect, incidental, or consequential damages, including lost profits or lost
            data, arising from use of a Product.
          </p>
        </LegalSection>

        <LegalSection n={11} title="Termination">
          <p>
            Either party may terminate an ongoing engagement with reasonable written notice (a WhatsApp or email
            message is sufficient). Fees for work already completed remain payable. For recurring services, the
            Client may cancel future billing at any time; access to the Product may end at the close of the
            current billing period.
          </p>
        </LegalSection>

        <LegalSection n={12} title="Confidentiality">
          <p>
            Non-public business information shared during an engagement (pricing, internal data, unreleased
            features) is treated as confidential and not disclosed to third parties, except as necessary to
            deliver the Product (e.g. cloud infrastructure providers) or as required by law.
          </p>
        </LegalSection>

        <LegalSection n={13} title="Dispute Resolution & Governing Law">
          <p>
            These Terms are governed by the laws of India. Any dispute arising from an engagement will first be
            addressed through direct discussion in good faith before either party pursues formal proceedings,
            which would fall under the jurisdiction of the courts of Maharashtra.
          </p>
        </LegalSection>

        <LegalSection n={14} title="Changes to These Terms">
          <p>
            These Terms may be updated from time to time. The "Last updated" date above reflects the most
            recent revision. Changes do not apply retroactively to alter the terms of an engagement already
            agreed upon in writing.
          </p>
        </LegalSection>

        <LegalSection n={15} title="Contact">
          <p>Questions about these Terms can be sent to:</p>
          <LegalList>
            <li>Email: <a className="text-pink-500 font-semibold hover:text-pink-600" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>WhatsApp: <a className="text-pink-500 font-semibold hover:text-pink-600" href={WHATSAPP} target="_blank" rel="noreferrer">Message directly</a></li>
          </LegalList>
        </LegalSection>
      </LegalDocument>
    </>
  )
}
