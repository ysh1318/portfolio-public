import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { sendMessage, type ChatMessage, type TourStep } from '../lib/groqService'
import LoopMedia from './LoopMedia'
import { MEDIA } from '../lib/media'

interface Message {
  sender: 'bot' | 'user'
  text: string
}

// Unique session ID per browser visit — used for Firestore conversation logging
const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

// How long a cursor caption stays up before the tour advances to its next
// stop — scaled to caption length so a short "This is it" doesn't linger
// as long as a full sentence, but always long enough to actually read.
function holdDurationFor(say: string): number {
  return Math.min(5200, Math.max(1800, 900 + say.length * 45))
}

export default function Chatbot() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hi! I'm Frosty, Yash's living portfolio website. Ask me anything about his work, services, or drop a project idea — I'll show you around! ✦",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading])

  // Walks through every stop in a tour, in order: navigate if the step needs
  // a different page, point/click the cursor at the target with its caption,
  // hold long enough to read, then move on. This is what gives Frosty real
  // "walk the visitor through it" control instead of a single one-shot action.
  async function runTour(steps: TourStep[]) {
    let pathCursor = location.pathname

    for (const step of steps) {
      if (step.navigateTo && step.navigateTo !== pathCursor) {
        navigate(step.navigateTo)
        pathCursor = step.navigateTo
        // Let the route swap and new page's elements mount before we try
        // to find anything on it.
        await new Promise(resolve => setTimeout(resolve, 750))
      }

      const holdMs = holdDurationFor(step.say)
      window.dispatchEvent(new CustomEvent('frosty-cursor', {
        detail: {
          action: step.click ? 'click' : 'scroll',
          selector: `#${step.target}`,
          label: step.say,
          holdMs,
        },
      }))

      await new Promise(resolve => setTimeout(resolve, holdMs))
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages(prev => [...prev, { sender: 'user', text }])
    setLoading(true)

    try {
      const { text: reply, tour } = await sendMessage(text, chatHistory, SESSION_ID, location.pathname)

      // Update history for multi-turn context
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: reply },
      ])

      setMessages(prev => [...prev, { sender: 'bot', text: reply }])

      if (tour.length > 0) {
        runTour(tour).finally(() => {
          setTimeout(() => inputRef.current?.focus(), 50)
        })
      } else {
        setTimeout(() => inputRef.current?.focus(), 50)
      }
    } catch (err: any) {
      const errMsg = err?.message || err?.toString() || 'Unknown error'
      console.error('[Frosty Error]', err)
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `⚠️ Error: ${errMsg}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* ── Chat Widget ──────────────────────────────────────────────────── */}
      {open && (
        <div className="w-80 sm:w-96 h-[500px] bg-white/95 backdrop-blur-3xl border border-slate-200/50 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in">

          {/* Header */}
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                <LoopMedia
                  slot={MEDIA.headerAvatar}
                  aspect="aspect-auto"
                  className="w-full h-full object-contain"
                  rounded="rounded-none"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono tracking-wide">Frosty (Living Site)</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    Powered by Groq &amp; Llama
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-slate-300 hover:text-white text-xs"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/40'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 border border-slate-200/40 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>



          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-200/50 bg-slate-50 flex gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about Yash's work..."
              disabled={loading}
              autoFocus
              className="flex-1 bg-white border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center transition flex-shrink-0 text-sm"
              aria-label="Send"
            >
              ➔
            </button>
          </form>
        </div>
      )}

      {/* ── Floating Bubble ───────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 relative border border-white/20 select-none group"
        aria-label="Toggle assistant"
      >
        <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20 group-hover:opacity-0 transition" />
        {open
          ? <span className="text-lg relative z-10">✕</span>
          : <span className="text-xl relative z-10 transition-transform group-hover:rotate-12 duration-300">✦</span>
        }
      </button>
    </div>
  )
}
