import { useProjects } from '../hooks/useProjects'
import { GlassCard, PageHero, IconBadge } from '../components/ui'
import LoopMedia from '../components/LoopMedia'
import Reveal from '../components/Reveal'
import { MEDIA } from '../lib/media'

export default function Work() {
  const { projects, loading } = useProjects()

  return (
    <>
      <PageHero
        id="work-hero"
        eyebrow="Work"
        title="Completed projects"
        subtitle="A collection of web applications and sites built for various clients."
        mediaSlot={MEDIA.workHeroBg}
        mediaObjectPosition="object-bottom"
        showAvailability={true}
      />

      {loading && <p className="text-center text-sm text-slate-400">Loading projects…</p>}

      {!loading && projects.length === 0 && (
        <GlassCard className="p-10 text-center text-sm text-slate-500">
          New work is on the way — check back soon, or get in touch to start yours.
        </GlassCard>
      )}

      {!loading && projects.length > 0 && (
        <section id="work-projects-list" className="relative overflow-hidden glass-card-effect rounded-[2.5rem] shadow-2xl shadow-slate-900/10 p-6 md:p-10">


          <header className="relative z-10 flex items-center justify-between border-b border-slate-200/60 pb-6 mb-8">
            <div className="flex items-center gap-4">
              <LoopMedia slot={MEDIA.workHeaderAccent} className="w-10 h-10 hidden sm:block" rounded="rounded-xl" />
              <div>
                <span className="text-[11px] font-black tracking-widest uppercase text-indigo-600 font-mono">
                  Portfolio
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight mt-1">
                  Completed Projects
                </h2>
              </div>
            </div>
            <div className="text-right font-mono text-xs font-bold text-slate-400">
              {String(projects.length).padStart(2, '0')} / Completed
            </div>
          </header>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={(i % 4) * 120}>
                <div id={`work-project-${p.id}`} className="glass-card-effect rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 shadow-sm shadow-slate-900/10 hover:shadow-xl hover:bg-white/35 transition-all duration-300">
                <div className="flex-1 flex flex-col justify-between space-y-4 min-w-0">
                  <div className="space-y-3">
                    <IconBadge index={i} size="sm">
                      <span className="text-sm font-black text-slate-800">{String(i + 1).padStart(2, '0')}</span>
                    </IconBadge>
                    <h3 className="text-xl font-black tracking-tight text-slate-950 leading-none">{p.title}</h3>
                    <p className="text-slate-700 text-[12px] leading-relaxed font-medium">{p.description}</p>
                  </div>

                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-white/5 border border-white/5 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-500 hover:text-white transition rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {p.liveUrl && (
                    <a
                      id={`work-project-live-link-${p.id}`}
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition pt-1"
                    >
                      View live <span>↗</span>
                    </a>
                  )}
                </div>

                {p.imageUrl && (
                  <div className="w-full sm:w-48 h-40 sm:h-auto bg-slate-950 rounded-2xl flex-shrink-0 border border-slate-900 shadow-xl relative overflow-hidden group">
                    <img src={p.imageUrl} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                    <LoopMedia
                      slot={MEDIA.workProjectCover(i)}
                      hoverPlay
                      aspect="aspect-auto"
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                      rounded="rounded-none"
                    />
                  </div>
                )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
