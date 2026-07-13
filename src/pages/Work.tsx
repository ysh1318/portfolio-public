import { useProjects } from '../hooks/useProjects'
import { GlassCard, PageHero } from '../components/ui'

export default function Work() {
  const { projects, loading } = useProjects()

  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Verified pieces of work"
        subtitle="Projects pulled live from the projects manager — add, edit, reorder, or hide any of these from the dashboard without a redeploy."
      />

      {loading && <p className="text-center text-sm text-slate-400">Loading projects…</p>}

      {!loading && projects.length === 0 && (
        <GlassCard className="p-10 text-center text-sm text-slate-500">
          No projects published yet. Add some from the dashboard's Projects manager (§5.5).
        </GlassCard>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <GlassCard key={p.id} className="overflow-hidden flex flex-col shadow-lg shadow-slate-200/40">
            <div className="relative h-40 bg-slate-100">
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
            <div className="p-6 flex flex-col flex-1 space-y-3">
              <h2 className="font-bold text-slate-900">{p.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{p.description}</p>
              {p.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-extrabold uppercase tracking-wider text-pink-500 hover:text-pink-600 transition pt-1"
                >
                  View live ↗
                </a>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  )
}
