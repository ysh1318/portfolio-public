// ── Deterministic, client-side chatbot computations ─────────────────────────
//
// Everything in this file runs instantly in the browser, costs nothing, and
// cannot "get confused" — it exists specifically to take format-sensitive
// and rule-based work OFF the 8B model, whose only real job should be
// writing natural language. The model used to be asked to (a) recall an
// exact element ID out of a huge map, (b) hand-write valid nested JSON for
// tours, and (c) hand-write valid nested JSON for lead capture — three
// separate "don't get the format wrong" tasks stacked on every single turn,
// which is exactly where an 8B model falls over. All three are replaced
// below with either a small enumerated choice or plain regex extraction.

import { searchSiteMap } from './siteMap'
import { extractClientProfile, tokenize } from './guidanceEngine'

// ── Candidate shortlist (replaces "recall an exact ID") ─────────────────────
//
// Instead of the model typing a target ID from memory (error-prone — it can
// invent IDs that don't exist), we keyword-search the real site map for
// what the visitor's message is actually about and hand the model a short,
// numbered list. The model can only ever point at a number on this list, so
// it is structurally impossible for it to reference something that isn't
// real.
export interface Candidate {
  index: number // 1-based — this is the only thing the model has to output
  id: string
  pagePath: string
  label: string
  description: string
}

export function buildCandidates(userMessage: string, limit = 7): Candidate[] {
  return searchSiteMap(userMessage, limit).map((entry, i) => ({
    index: i + 1,
    id: entry.id,
    pagePath: entry.pagePath,
    label: entry.label,
    description: entry.description,
  }))
}

export function formatCandidatesForPrompt(candidates: Candidate[]): string {
  if (candidates.length === 0) {
    return '(nothing on the site closely matches this message — just reply in words, no pointing needed)'
  }
  return candidates
    .map(c => {
      const desc = c.description.length > 70 ? c.description.slice(0, 67) + '...' : c.description
      return `${c.index}. [${c.pagePath}] ${c.label} — ${desc}`
    })
    .join('\n')
}

// ── Deterministic contact-field extraction (replaces "lead" JSON) ───────────
//
// Email and Indian mobile numbers have a fixed, checkable shape — there's no
// reason to ask a language model to transcribe them into a JSON field when
// a regex gets it right every time.
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
const PHONE_RE = /(?:\+?91[\s-]?)?[6-9]\d{9}\b/
const NAME_RE = /\b(?:my name is|i'?m|i am|this is)\s+([A-Z][a-zA-Z]{1,20})\b/i

export interface ExtractedContact {
  name?: string
  email?: string
  phone?: string
}

export function extractContactFields(text: string): ExtractedContact {
  const email = text.match(EMAIL_RE)?.[0]
  const phone = text.match(PHONE_RE)?.[0]
  const name = text.match(NAME_RE)?.[1]
  return { name, email, phone }
}

// Sector/category inference reuses the existing tiny trained classifier in
// guidanceEngine.ts (already 100% client-side) instead of asking the LLM to
// classify and report this itself.
export function inferProjectType(text: string): string {
  const profile = extractClientProfile(text, {})
  return [profile.category, profile.sector].filter(Boolean).join(' for ').trim()
}

// ── Hard-ban pre-filter (replaces relying on the model to self-police) ──────
//
// Catches the two absolute bans — code requests and math/logic puzzles —
// with plain keyword rules before the model is even called. Instant,
// free, and never inconsistent.
const CODE_TOKENS = ['code', 'script', 'function', 'python', 'javascript', 'typescript', 'html', 'css', 'sql', 'regex', 'algorithm', 'debug', 'syntax', 'program']
const MATH_TOKENS = ['equation', 'solve', 'riddle', 'puzzle', 'derivative', 'integral', 'theorem', 'calculate', 'math']

export function detectHardBan(text: string): 'code' | 'math' | null {
  const tokens = tokenize(text)
  if (tokens.some(t => CODE_TOKENS.includes(t))) return 'code'
  if (tokens.some(t => MATH_TOKENS.includes(t))) return 'math'
  return null
}

// ── Micro-format reply parsing (replaces nested tour/lead JSON) ─────────────
//
// The model may append AT MOST one small tag block at the very end of its
// reply. No braces, no quotes, no nested grammar to get wrong:
//
//   [[SHOW: 2~Here's the live demo | 5~And here's where you'd reach out]]
//   [[LEAD]]
//
// Both are optional and can appear together. If the model mangles one
// segment, that single stop/tag is just dropped — it can no longer take
// down the whole reply the way a failed JSON.parse used to.
export interface ParsedReply {
  text: string
  shows: { index: number; say: string }[]
  leadFlag: boolean
}

export function parseModelReply(raw: string): ParsedReply {
  let text = raw
  const shows: { index: number; say: string }[] = []
  let leadFlag = false

  const showMatch = text.match(/\[\[SHOW:\s*([^\]]+)\]\]/i)
  if (showMatch) {
    text = text.replace(showMatch[0], '').trim()
    for (const part of showMatch[1].split('|')) {
      const [idxRaw, ...sayParts] = part.split('~')
      const idx = parseInt(idxRaw.trim(), 10)
      const say = sayParts.join('~').trim()
      if (!isNaN(idx) && say) shows.push({ index: idx, say: say.slice(0, 140) })
    }
  }

  if (/\[\[LEAD\]\]/i.test(text)) {
    text = text.replace(/\[\[LEAD\]\]/i, '').trim()
    leadFlag = true
  }

  return { text, shows, leadFlag }
}
