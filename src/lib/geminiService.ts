import { GoogleGenerativeAI } from '@google/generative-ai'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { buildSiteMapContext } from './siteMap'

// ── Gemini client ──────────────────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '')

// ── System Prompt ──────────────────────────────────────────────────────────────
// Tightly scoped to this portfolio. Gemini will handle language naturally
// but stay locked to what's relevant. Every response is logged to Firestore
// so we can train our own model later from real visitor conversations.
const SYSTEM_PROMPT = `You are the AI assistant embedded inside Yash's developer portfolio website.

About Yash:
- Full-stack developer based in India (Nagpur, Maharashtra)
- Builds websites and custom software for local Indian businesses
- Key services: 
  1. Websites & Brand Presence (landing pages, multi-page sites for cafes, real estate agents, shops, coaching institutes)
  2. Custom Software & Tools (mock test portals, attendance systems, billing dashboards, inventory trackers, membership managers)
- Industries served: Gyms/Fitness, Cafes/Restaurants, Coaching Institutes (JEE/NEET), Agri Dealers, Real Estate Agents
- Tech stack: React, TypeScript, Firebase Firestore, Tailwind CSS, Vite, React Router
- Contact: WhatsApp +91 9890215963, Email yashawachar101@gmail.com
- He is a student developer — NOT hiring interns or employees right now

Portfolio pages:
- / → Homepage
- /work → Deployed projects
- /services → All services overview
- /services/websites → Website service details
- /services/software-tools → Custom software details
- /industries → Industries overview
- /industries/fitness → Gym & fitness sector
- /industries/restaurants → Cafes & dining sector
- /industries/coaching → Coaching institutes sector
- /industries/agri → Agri dealers sector
- /industries/real-estate → Real estate sector
- /process → How the build process works
- /faq → Frequently asked questions
- /connect → Contact & inquiry form

Personality & tone:
- Friendly, casual, like a smart friend — not robotic
- Can respond in Hinglish naturally if the visitor writes in Hindi/Hinglish
- Keep responses SHORT — 2-3 sentences max unless listing things
- Don't be salesy. Be honest and helpful.
- If someone is asking about building something, ask ONE clarifying question to understand their need better (what type of business, what features they need)

Navigation commands — if the visitor clearly wants to go to a page, reply with a short message AND include a JSON block at the very end of your response like this:
{"navigate": "/work"}

Lead collection — if a visitor wants to get a quote, hire Yash, or discuss a project, ask for their name and WhatsApp number to pass to Yash. Don't push this — only do it when they clearly want to proceed.

Out of scope — if someone asks something completely unrelated to the portfolio or Yash's work (jokes, general knowledge, coding tutorials, etc.), politely say you're only here to help with Yash's portfolio and projects.

IMPORTANT: Keep responses concise. Never write paragraphs. Think fast, reply short.`

// ── Conversation session ───────────────────────────────────────────────────────
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-lite',
  systemInstruction: SYSTEM_PROMPT,
})

// ── Types ──────────────────────────────────────────────────────────────────────
export interface GeminiTurn {
  role: 'user' | 'model'
  parts: [{ text: string }]
}

// A minimal shape matching groqService's ChatMessage, kept local to avoid a
// circular import between groqService.ts <-> geminiService.ts (they already
// import from each other for the tour hand-off).
interface HistoryTurn {
  role: 'user' | 'assistant'
  content: string
}

// ── Log conversation to Firestore for future training data ────────────────────
async function logConversationTurn(
  sessionId: string,
  userMessage: string,
  botReply: string
) {
  try {
    await addDoc(collection(db, 'conversation_logs'), {
      sessionId,
      userMessage,
      botReply,
      timestamp: serverTimestamp(),
      source: 'gemini-chatbot-v1',
    })
  } catch {
    // Silently fail — logging is secondary, never block the chat
  }
}

// ── Main send function ─────────────────────────────────────────────────────────
export async function sendToGemini(
  userMessage: string,
  history: GeminiTurn[],
  sessionId: string
): Promise<{ text: string; navigateTo?: string }> {
  const chat = model.startChat({ history })

  const result = await chat.sendMessage(userMessage)
  const rawText = result.response.text()

  // Extract navigation command if present
  let navigateTo: string | undefined
  let cleanText = rawText

  const navMatch = rawText.match(/\{"navigate":\s*"([^"]+)"\}/)
  if (navMatch) {
    navigateTo = navMatch[1]
    cleanText = rawText.replace(navMatch[0], '').trim()
  }

  // Log to Firestore (async, non-blocking)
  logConversationTurn(sessionId, userMessage, cleanText)

  return { text: cleanText, navigateTo }
}

// NOTE: this used to be a single stateless model.generateContent(userMessage)
// call — meaning every tour decision was made with ZERO memory of the
// conversation. That's why a concrete first message like "show me the
// services section" worked, but vague follow-ups like "tell me more" or
// "what next" returned an empty/wrong tour: the model had no idea what
// "more" referred to. Fix: seed a real chat session with the same rolling
// `history` the Groq call already receives, so the nav model has the same
// context as the conversational model.
export async function getGeminiTour(
  userMessage: string,
  currentPath: string,
  history: HistoryTurn[] = []
): Promise<any[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) return []

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-lite',
      systemInstruction: `You are the navigation assistant for Yash's developer portfolio. Your ONLY job is to analyze the user's message — in light of the conversation so far — and the current page path, and decide if the website needs to navigate, scroll, or click to show them a section.
You must output a raw JSON object containing a "tour" array representing the guided tour.
Current path: ${currentPath}

━━━ SITE MAP ━━━
${buildSiteMapContext()}

━━━ TOUR FORMAT ━━━
Output a JSON object with a "tour" array containing steps:
{"tour": [
  {"navigate": "/page-path", "target": "element-id", "say": "narration caption"},
  {"target": "another-id", "say": "narration caption"}
]}

Rules:
- "target" is REQUIRED and must be an exact ID from the map (without #).
- "navigate" is OPTIONAL — only include if transitioning pages.
- "say" is REQUIRED — a short pointer narration (under 12 words) for the bubble.
- "click" is optional boolean.
- Keep the tour short (1-3 steps).
- Use the conversation history to resolve vague follow-ups like "tell me more", "what next", "show me that", or "go on" — pick up from whatever was just being discussed/shown, don't treat them as messages with no context.
- If no navigation or action is needed, output: {"tour": []}
- Your output MUST be ONLY the raw JSON object. Do not include markdown code fences, conversational preambles, or text outside the JSON.`,
    })

    // Seeded with the same rolling history the conversational (Groq) model
    // sees, mapped to Gemini's role vocabulary ('assistant' -> 'model').
    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
    })

    const result = await chat.sendMessage(userMessage)
    const text = result.response.text().trim()

    // Parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0])
      if (Array.isArray(data.tour)) {
        return data.tour
      }
    }
  } catch (e) {
    console.error('[Gemini Navigation Error]', e)
  }
  return []
}
