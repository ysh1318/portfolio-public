import { useEffect } from 'react'

// Lightweight per-page <title>/meta setter — no extra dependency needed.
// Note (SPA limitation, worth knowing): this updates the DOM after React
// renders, which works fine for browser tabs/social-share previews grabbed
// client-side, but classic crawlers that don't execute JS may still only
// see index.html's static defaults. If organic search ranking on these
// specific page titles matters a lot, the real fix later is prerendering
// or SSR (e.g. via a static-site step) — out of scope for this pass.
export function useMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = `${title} | Yash Awachar`
    document.title = fullTitle

    if (description) {
      setMetaByName('description', description)
      setMetaByProperty('og:title', fullTitle)
      setMetaByProperty('og:description', description)
    }
  }, [title, description])
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}
