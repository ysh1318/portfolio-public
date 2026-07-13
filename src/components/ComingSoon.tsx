import { PageHero } from './ui'

// TEMP placeholder — see /PROGRESS.md. This route is scaffolded (in the
// router and nav) but the real page content is part of the remaining
// work for the next agent to build out per the spec.
export default function ComingSoon({ title }: { title: string }) {
  return (
    <PageHero
      eyebrow="Under construction"
      title={title}
      subtitle="This page is scaffolded and routed, but the content build-out is still in progress. Check back soon."
    />
  )
}
