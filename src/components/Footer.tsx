import { Link } from 'react-router-dom'
import LoopMedia from './LoopMedia'
import { MEDIA } from '../lib/media'

// Simple inline icon glyphs (no icon-library dependency needed) —
// restores the distinct GitHub / Instagram / WhatsApp buttons the old
// single-page site had, instead of plain text links.
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.29c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.81c0 4.53-3.69 8.14-8.23 8.14Zm4.51-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.42-.14 0-.31-.01-.47-.01a.9.9 0 0 0-.66.31c-.23.24-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="global-footer" className="w-full max-w-6xl mx-auto px-8 py-8 glass-card-effect rounded-[2.5rem] shadow-2xl shadow-slate-900/10 text-sm text-slate-700 relative z-10 overflow-hidden my-8">
      <LoopMedia
        slot={MEDIA.footerAccent}
        className="absolute bottom-0 right-0 w-40 pointer-events-none"
        rounded="rounded-none"
        opacity={0.1}
      />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider">
          <Link to="/" className="hover:text-slate-950 transition">Home</Link>
          <Link to="/services" className="hover:text-slate-950 transition">Services</Link>
          <Link to="/industries" className="hover:text-slate-950 transition">Industries</Link>
          <Link to="/work" className="hover:text-slate-950 transition">Work</Link>
          <Link to="/faq" className="hover:text-slate-950 transition">FAQ</Link>
          <Link to="/connect" className="hover:text-slate-950 transition">Connect</Link>
        </div>
        <div className="flex items-center gap-2.5">
          <a
            id="global-footer-github-link"
            href="https://github.com/ysh1318"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-9 h-9 bg-white border border-slate-200 rounded-full hover:bg-slate-950 hover:text-white hover:border-transparent transition shadow-sm text-slate-700"
          >
            <GitHubIcon />
          </a>
          <a
            id="global-footer-instagram-link"
            href="https://instagram.com/yash_d.awachar"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex items-center justify-center w-9 h-9 bg-white border border-slate-200 rounded-full hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition shadow-sm text-slate-700"
          >
            <InstagramIcon />
          </a>
          <a
            id="global-footer-whatsapp-link"
            href="https://wa.me/919890215963"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center w-9 h-9 bg-[#25D366] rounded-full hover:bg-[#20ba59] transition shadow-sm text-white"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-6 pt-6 border-t border-slate-200/40 text-xs text-slate-600">
        <span>&copy; {new Date().getFullYear()} Yash Awachar. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link to="/legal/privacy" className="hover:text-slate-950 transition">Privacy Policy</Link>
          <Link to="/legal/terms" className="hover:text-slate-950 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
