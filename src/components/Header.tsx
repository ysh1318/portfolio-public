import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'Process', to: '/process' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Connect', to: '/connect' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-3xl border border-white/80 rounded-full shadow-lg shadow-slate-200/40 relative z-20">
      <Link to="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-slate-900">
        <img src="/img/avatar-hex.png" alt="" className="w-8 h-8 object-contain" aria-hidden="true" />
        Yash Awachar
      </Link>

      <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-slate-500">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'text-slate-900 transition' : 'hover:text-slate-900 transition'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/connect"
          className="hidden sm:inline-block px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-extrabold tracking-widest uppercase rounded-full transition shadow-md"
        >
          Let's Talk
        </Link>
        <button
          className="md:hidden p-2 rounded-full hover:bg-slate-100 transition"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-3xl border border-white/80 rounded-3xl shadow-xl p-4 flex flex-col gap-1 md:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
