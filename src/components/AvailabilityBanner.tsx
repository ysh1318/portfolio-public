import { useSiteStatus } from '../hooks/useSiteStatus'

// Lives on every page (spec §3), not just Home. Reads settings/status live
// so the dashboard's Availability control (§5.4) updates this everywhere
// without a redeploy.
export default function AvailabilityBanner() {
  const { status, loading } = useSiteStatus()

  if (loading) return null

  const dot = status.isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
  const ping = status.isAvailable ? 'bg-emerald-400' : 'bg-amber-400'
  const bg = status.isAvailable
    ? 'bg-emerald-50/90 border-emerald-200/70 shadow-emerald-100/50 text-emerald-800'
    : 'bg-amber-50/90 border-amber-200/70 shadow-amber-100/50 text-amber-800'

  const defaultMessage = status.isAvailable
    ? 'Currently available for new projects — reach out to get started.'
    : 'Currently booked with active clients — feel free to reach out to get on the list.'

  return (
    <div className="w-full max-w-6xl mx-auto mt-4 px-4">
      <div
        className={`flex items-center justify-center gap-2.5 backdrop-blur-xl border rounded-full px-5 py-2.5 shadow-md text-[11px] md:text-xs font-bold text-center ${bg}`}
      >
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${ping} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} />
        </span>
        <span>{status.bannerMessage || defaultMessage}</span>
      </div>
    </div>
  )
}
