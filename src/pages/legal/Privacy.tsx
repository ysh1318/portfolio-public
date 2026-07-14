import { PageHero, LegalDocument, LegalSection, LegalList } from '../../components/ui'
import { useMeta } from '../../hooks/useMeta'

const EMAIL = 'yashawachar101@gmail.com'
const WHATSAPP = 'https://wa.me/919890215963'

export default function Privacy() {
  useMeta('Privacy Policy', 'How personal data is collected, used, and protected.')

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: July 2026. This policy is drafted to align with India's Digital Personal Data Protection Act, 2023 (DPDP Act)."
      />

      <LegalDocument>
        <LegalSection n={1} title="Introduction & Scope">
          <p>
            This Privacy Policy applies to <strong>yashawachar.in</strong> (the "Site") and to the software,
            websites, and tools ("Products") built and operated by Yash Awachar ("I", "me", "my") for clients.
            It explains what personal data is collected, why, how it is stored, and what rights you have over
            it. By using this Site or a Product built for you or by you, you agree to the practices described
            here.
          </p>
          <p>
            This policy is written in two capacities, since they involve different responsibilities under the
            DPDP Act:
          </p>
          <LegalList>
            <li>
              <strong>As a Data Fiduciary</strong> — for personal data collected directly through this Site
              (e.g. the Connect form), I decide the purpose and means of processing, and am responsible for it.
            </li>
            <li>
              <strong>As a Data Processor</strong> — for Products built and operated for a client (e.g. a
              coaching institute's test-result system), the client is the Data Fiduciary and decides what data
              is collected from their own students or customers. I process that data only as instructed by the
              client, to run the features they've commissioned.
            </li>
          </LegalList>
        </LegalSection>

        <LegalSection n={2} title="Definitions">
          <LegalList>
            <li><strong>Personal Data</strong> — any data about an individual that identifies or can identify them.</li>
            <li><strong>Data Principal</strong> — the individual to whom the personal data relates (you).</li>
            <li><strong>Data Fiduciary</strong> — the person or entity that determines the purpose and means of processing personal data.</li>
            <li><strong>Data Processor</strong> — a person who processes personal data on behalf of a Data Fiduciary.</li>
            <li><strong>Processing</strong> — any operation performed on personal data, including collection, storage, use, and deletion.</li>
          </LegalList>
        </LegalSection>

        <LegalSection n={3} title="What Personal Data Is Collected">
          <p><strong>3.1 Data collected directly through this Site:</strong></p>
          <LegalList>
            <li>Name, business name, phone number/WhatsApp number, and email address, where you provide them via the Connect form</li>
            <li>The content of any inquiry, project description, or message you submit</li>
            <li>Which page of the Site you were on when you submitted an inquiry (used only to understand which service you're asking about)</li>
          </LegalList>
          <p><strong>3.2 Data processed within client Products, as a Data Processor:</strong></p>
          <p>
            Where I build and operate a system for a client (for example, a CBT test engine for a coaching
            institute, or a booking tracker for a business), that system may process personal data belonging to
            the client's own students, customers, or members — such as names, phone numbers, test scores,
            attendance records, or booking details. This data belongs to and is controlled by the client. I
            process it strictly to provide the functionality the client has commissioned, and do not use it for
            any other purpose, including my own marketing.
          </p>
        </LegalSection>

        <LegalSection n={4} title="How Personal Data Is Used">
          <LegalList>
            <li>To respond to inquiries submitted through the Connect form</li>
            <li>To scope, quote, and deliver a project you've asked about</li>
            <li>To operate the specific features of a Product built for a client (e.g. showing a student their own result, or sending a booking confirmation)</li>
            <li>To maintain records of leads and client communication for my own business operations</li>
          </LegalList>
          <p>Personal data is never sold, rented, or used for unrelated advertising.</p>
        </LegalSection>

        <LegalSection n={5} title="Legal Basis for Processing">
          <p>
            Where this Site processes your personal data, it does so on the basis of your consent (by
            voluntarily submitting the Connect form) or where necessary to respond to a request you've made.
            You may withdraw consent at any time by contacting me using the details in Section 13, though this
            may affect my ability to respond to an ongoing inquiry.
          </p>
        </LegalSection>

        <LegalSection n={6} title="Where Data Is Stored">
          <p>
            Personal data is stored using Google Firebase and Google Cloud Platform infrastructure. These are
            third-party cloud services operated by Google, with their own independent security and compliance
            standards; no personal data is stored on any separate private server that I operate myself.
          </p>
          <p>
            Depending on the Google Cloud region configured for a given Product, data may be stored on servers
            located outside India. Where this applies, Google's standard cross-border data transfer safeguards
            apply. If you'd like to know the specific storage region for a Product you use, you're welcome to
            ask.
          </p>
        </LegalSection>

        <LegalSection n={7} title="Data Sharing with Third Parties">
          <p>
            Beyond the infrastructure providers named in Section 6, personal data is not shared with third
            parties, except:
          </p>
          <LegalList>
            <li>Where required by law, regulation, or a valid legal request from a government authority</li>
            <li>Where you've explicitly asked for information to be shared (e.g. a result forwarded to a parent over WhatsApp, at the client institute's direction)</li>
          </LegalList>
        </LegalSection>

        <LegalSection n={8} title="Cookies & Tracking">
          <p>
            This Site does not use third-party advertising cookies or behavioral tracking. It uses the
            standard Firebase SDK to read and write the data described in this policy; no data is collected
            for advertising or cross-site tracking purposes.
          </p>
        </LegalSection>

        <LegalSection n={9} title="Children's Data">
          <p>
            This Site itself is not directed at children and does not knowingly collect personal data from
            anyone under 18 through the Connect form. Where a client Product (such as a coaching institute's
            test system) processes data belonging to students who are minors, that data is collected and
            controlled by the client institute in its capacity as Data Fiduciary, under its own responsibility
            to obtain appropriate parental/guardian consent as required by law. I process such data only as
            instructed by the client, solely to deliver the commissioned functionality.
          </p>
        </LegalSection>

        <LegalSection n={10} title="Data Retention">
          <p>
            Inquiry data submitted through the Connect form is retained for as long as needed to respond to
            you and, where an engagement follows, for the duration of that engagement plus a reasonable period
            afterward for support purposes. Data processed within a client Product is retained according to
            that client's instructions, or deleted upon termination of the engagement unless the client
            requests otherwise.
          </p>
        </LegalSection>

        <LegalSection n={11} title="Your Rights as a Data Principal">
          <p>Under the DPDP Act, 2023, you have the right to:</p>
          <LegalList>
            <li>Obtain a summary of the personal data held about you and the processing being carried out</li>
            <li>Request correction, completion, or updating of your personal data</li>
            <li>Request erasure of your personal data, where it is no longer necessary for the purpose it was collected for</li>
            <li>Withdraw consent for further processing at any time</li>
            <li>Nominate another individual to exercise these rights on your behalf, in the event of your death or incapacity</li>
            <li>Register a grievance regarding the handling of your personal data</li>
          </LegalList>
          <p>To exercise any of these rights, use the contact details in Section 13.</p>
        </LegalSection>

        <LegalSection n={12} title="Security Measures">
          <p>
            Personal data is protected using Firebase's built-in authentication and access-control rules,
            which restrict who can read or write data based on identity and role. Access to client data is
            limited to what's necessary to build, operate, and support the Product in question.
          </p>
        </LegalSection>

        <LegalSection n={13} title="Grievance Officer & Contact">
          <p>
            For any question, concern, or request relating to this Privacy Policy or your personal data,
            contact Yash Awachar, who also serves as the Grievance Officer for this Site:
          </p>
          <LegalList>
            <li>Email: <a className="text-pink-500 font-semibold hover:text-pink-600" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li>WhatsApp: <a className="text-pink-500 font-semibold hover:text-pink-600" href={WHATSAPP} target="_blank" rel="noreferrer">Message directly</a></li>
          </LegalList>
          <p>Requests will be acknowledged and addressed within a reasonable timeframe, ordinarily within 15 days.</p>
        </LegalSection>

        <LegalSection n={14} title="Changes to This Policy">
          <p>
            This policy may be updated from time to time to reflect changes in practices, technology, or legal
            requirements. The "Last updated" date at the top of this page will always reflect the most recent
            revision. Material changes will be reflected here without retroactively reducing your rights over
            data already collected.
          </p>
        </LegalSection>

        <LegalSection n={15} title="Governing Law">
          <p>
            This policy is governed by the laws of India, including the Digital Personal Data Protection Act,
            2023, and related rules issued thereunder.
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  )
}
