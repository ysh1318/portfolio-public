import { GlassCard, PageHero, PrimaryButton, Eyebrow } from '../components/ui'
import { useMeta } from '../hooks/useMeta'

const FAQS = [
  {
    q: 'How much does this cost?',
    a: 'It depends on what you need — a simple website is a one-time cost, while a test engine or tracking tool is usually a small monthly fee tied to how many students/customers you have. See the Pricing page for ranges, or just ask directly and I\'ll quote based on your actual size.',
  },
  {
    q: 'What if I don\'t like the result?',
    a: 'You see a working demo before anything is finalized, and most services start with a free trial period so you can actually use it with real students/customers before paying anything.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes — everything is stored securely on Google\'s servers (Firebase), the same infrastructure used by large companies. I don\'t share or sell any data, and the Privacy Policy explains exactly what\'s collected and why.',
  },
  {
    q: 'Do I need to know anything technical?',
    a: 'No. Everything is built, deployed, and maintained by me. If something needs updating on your end (like adding a new batch or test), it\'s designed to be as simple as a WhatsApp message.',
  },
  {
    q: 'How long does it take to build?',
    a: 'A simple website usually takes a few days. A custom test engine or tracker setup takes a bit longer depending on how much needs to be tailored to your business — I\'ll give you a clear timeline once I understand what you need.',
  },
  {
    q: 'Can I request changes after it\'s built?',
    a: 'Yes. Small content changes (like updating text, adding a project, or changing availability) can often be self-managed. Bigger feature changes are handled as a follow-up request.',
  },
  {
    q: 'Do you only work with businesses in Maharashtra?',
    a: 'No — everything I build is fully remote and works the same regardless of location. Being local matters mostly for trust and understanding the area, not for what gets delivered.',
  },
]

export default function FAQ() {
  useMeta('FAQ', 'Common questions about pricing, timelines, data safety, and how the process works.')

  return (
    <>
      <PageHero eyebrow="FAQ" title="Common questions" subtitle="If something isn't covered here, just ask directly." />

      <div className="space-y-4">
        {FAQS.map((item) => (
          <GlassCard key={item.q} className="p-7 space-y-2 shadow-lg shadow-slate-200/40">
            <Eyebrow>{item.q}</Eyebrow>
            <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
          </GlassCard>
        ))}
      </div>

      <div className="text-center">
        <PrimaryButton to="/connect">Still have a question? Ask here</PrimaryButton>
      </div>
    </>
  )
}
