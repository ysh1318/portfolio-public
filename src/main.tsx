import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// ── DEV MODE ──────────────────────────────────────────────────────────────────
// Set to true during development to kill all GPU-heavy effects (videos,
// gradients, animations, backdrop-blur). Flip to false before production build.
const DEV_MODE = false
if (DEV_MODE) {
  document.body.classList.add('dev-mode')
} else {
  document.body.classList.remove('dev-mode')
}
// ─────────────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
