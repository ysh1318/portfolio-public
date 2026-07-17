import { useEffect, useState } from 'react'

interface CursorState {
  x: number
  y: number
  visible: boolean
  isClicking: boolean
  label: string
}

// Single-step executor: given one action, move/scroll/click the real DOM
// element and show a caption next to the cursor. The Chatbot is responsible
// for firing a SEQUENCE of these (a tour) with pacing between them — this
// component only ever handles "do this one thing right now."
export default function VirtualCursor() {
  const [state, setState] = useState<CursorState>({
    x: 0,
    y: 0,
    visible: false,
    isClicking: false,
    label: 'Frosty ✦',
  })

  useEffect(() => {
    let hideTimeout: any

    const handleCursorEvent = async (e: Event) => {
      const customEvent = e as CustomEvent<{
        action: 'move' | 'click' | 'scroll' | 'hide'
        selector?: string
        label?: string
        holdMs?: number
      }>

      const { action, selector, label, holdMs } = customEvent.detail

      // Clear any existing auto-hide timeout — a new step is taking over.
      if (hideTimeout) clearTimeout(hideTimeout)

      if (action === 'hide') {
        setState((prev) => ({ ...prev, visible: false }))
        return
      }

      if (!selector || selector === '#' || selector.trim() === '#') return

      // Elements can still be mounting right after a route change even
      // though Chatbot already waited — give it one retry instead of
      // silently doing nothing if the query misses on the first try.
      let el = document.querySelector(selector) as HTMLElement | null
      if (!el) {
        await new Promise((resolve) => setTimeout(resolve, 400))
        el = document.querySelector(selector) as HTMLElement | null
      }
      if (!el) {
        console.warn(`[Frosty Cursor] Element not found: ${selector}`)
        return
      }

      const nextLabel = label ?? 'Frosty ✦'

      // Get document-relative coordinates
      const rect = el.getBoundingClientRect()
      const scrollX = window.scrollX || window.pageXOffset
      const scrollY = window.scrollY || window.pageYOffset

      const targetX = rect.left + scrollX + rect.width / 2
      const targetY = rect.top + scrollY + rect.height / 2

      if (action === 'scroll' || action === 'click') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      // Move and show cursor
      setState((prev) => ({
        ...prev,
        x: targetX,
        y: targetY,
        visible: true,
        label: nextLabel,
      }))

      let delayBeforeHide = holdMs ?? 4000

      if (action === 'click') {
        // Wait for scroll + movement transition to settle before clicking.
        await new Promise((resolve) => setTimeout(resolve, 750))

        setState((prev) => ({ ...prev, isClicking: true }))
        el.click()

        await new Promise((resolve) => setTimeout(resolve, 500))
        setState((prev) => ({ ...prev, isClicking: false }))

        delayBeforeHide = holdMs ?? 2500
      }

      hideTimeout = setTimeout(() => {
        setState((prev) => ({ ...prev, visible: false }))
      }, delayBeforeHide)
    }

    window.addEventListener('frosty-cursor', handleCursorEvent)
    return () => {
      window.removeEventListener('frosty-cursor', handleCursorEvent)
      if (hideTimeout) clearTimeout(hideTimeout)
    }
  }, [])

  return (
    <div
      className={`absolute pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 select-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        state.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
      }`}
      style={{
        left: `${state.x}px`,
        top: `${state.y}px`,
      }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-indigo-500/30 rounded-full blur-md animate-pulse" />

      {/* Main Cursor Core */}
      <div className="relative w-5 h-5 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-full border border-white/80 shadow-lg flex items-center justify-center mx-auto">
        <div className="w-1.5 h-1.5 bg-white rounded-full" />

        {/* Click Ripple Ring */}
        {state.isClicking && (
          <div className="absolute inset-0 w-12 h-12 -left-3.5 -top-3.5 border-2 border-indigo-400 rounded-full animate-ping opacity-75" />
        )}
      </div>

      {/* Frosty's speech caption — sits above the cursor, wraps instead of
          clipping, so a full "this is where I..." sentence stays readable
          rather than being forced into a one-line pill. */}
      <div
        key={state.label}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 w-max max-w-[220px] bg-slate-900/95 text-white text-[11px] font-semibold leading-snug text-center px-3 py-1.5 rounded-xl border border-white/20 shadow-lg backdrop-blur-sm animate-fade-in"
      >
        {state.label}
        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900/95 border-r border-b border-white/20 rotate-45" />
      </div>
    </div>
  )
}
