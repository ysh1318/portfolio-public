import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-8 py-10 border-t border-slate-200/60 text-sm text-slate-500 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-slate-900 transition">Home</Link>
          <Link to="/services" className="hover:text-slate-900 transition">Services</Link>
          <Link to="/industries" className="hover:text-slate-900 transition">Industries</Link>
          <Link to="/work" className="hover:text-slate-900 transition">Work</Link>
          <Link to="/pricing" className="hover:text-slate-900 transition">Pricing</Link>
          <Link to="/faq" className="hover:text-slate-900 transition">FAQ</Link>
          <Link to="/connect" className="hover:text-slate-900 transition">Connect</Link>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <a href="https://instagram.com/ysh_1318" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition">
            Instagram
          </a>
          <a href="https://wa.me/919890215963" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t border-slate-200/60 text-xs">
        <span>&copy; {new Date().getFullYear()} Yash Awachar. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link to="/legal/privacy" className="hover:text-slate-900 transition">Privacy Policy</Link>
          <Link to="/legal/terms" className="hover:text-slate-900 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
