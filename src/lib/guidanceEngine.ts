import weightsData from './model_weights.json'

interface ModelWeights {
  vocab: string[]
  classes: string[]
  W1: number[][]
  b1: number[]
  W2: number[][]
  b2: number[]
  navTargets: Record<string, string>
}

const weights = weightsData as ModelWeights

// Standard tokenization
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, '')
    .split(/\s+/)
    .filter(token => token.length > 0)
}

// Sigmoid activation
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

// Softmax activation
function softmax(arr: number[]): number[] {
  const max = Math.max(...arr)
  const exps = arr.map(x => Math.exp(x - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map(x => x / sum)
}

// Predict intent class
export function predictIntent(text: string): { intent: string; confidence: number; navTarget?: string } {
  const tokens = tokenize(text)
  const V = weights.vocab.length
  const H = weights.b1.length
  const O = weights.b2.length

  // Vectorize
  const x = Array(V).fill(0)
  tokens.forEach(t => {
    const idx = weights.vocab.indexOf(t)
    if (idx !== -1) {
      x[idx] = 1
    }
  })

  // Forward hidden layer
  const h = Array(H).fill(0)
  for (let j = 0; j < H; j++) {
    let sum = weights.b1[j]
    for (let i = 0; i < V; i++) {
      sum += x[i] * weights.W1[i][j]
    }
    h[j] = sigmoid(sum)
  }

  // Forward output layer
  const o_scores = Array(O).fill(0)
  for (let k = 0; k < O; k++) {
    let sum = weights.b2[k]
    for (let j = 0; j < H; j++) {
      sum += h[j] * weights.W2[j][k]
    }
    o_scores[k] = sum
  }

  const probabilities = softmax(o_scores)
  const maxIdx = probabilities.indexOf(Math.max(...probabilities))
  const intent = weights.classes[maxIdx]
  const confidence = probabilities[maxIdx]

  // If intent is navigation, check if we have a mapped target in the input string
  let navTarget: string | undefined = undefined
  if (intent === 'NAVIGATE') {
    // Check direct mapped phrase
    const normalizedText = text.toLowerCase().trim()
    for (const phrase in weights.navTargets) {
      if (normalizedText.includes(phrase)) {
        navTarget = weights.navTargets[phrase]
        break
      }
    }

    // Keyword fallback if phrase didn't match directly
    if (!navTarget) {
      if (hasAny(tokens, ['work', 'project', 'shipped', 'portfolio'])) navTarget = '/work'
      else if (hasAny(tokens, ['connect', 'contact', 'hire', 'whatsapp', 'number'])) navTarget = '/connect'
      else if (hasAny(tokens, ['gym', 'fitness', 'workout'])) navTarget = '/industries/fitness'
      else if (hasAny(tokens, ['cafe', 'restaurant', 'dining'])) navTarget = '/industries/restaurants'
      else if (hasAny(tokens, ['coaching', 'jee', 'neet', 'mock'])) navTarget = '/industries/coaching'
      else if (hasAny(tokens, ['agri', 'farm', 'retail'])) navTarget = '/industries/agri'
      else if (hasAny(tokens, ['estate', 'property', 'realestate'])) navTarget = '/industries/real-estate'
      else if (hasAny(tokens, ['website', 'websites', 'landing'])) navTarget = '/services/websites'
      else if (hasAny(tokens, ['software', 'dashboard', 'database', 'tracker'])) navTarget = '/services/software-tools'
    }
  }

  return { intent, confidence, navTarget }
}

function hasAny(tokens: string[], keywords: string[]): boolean {
  return tokens.some(t => keywords.includes(t))
}

// Extractor rules for client-side state mapping
export function extractClientProfile(text: string, currentProfile: any) {
  const tokens = tokenize(text)
  const profile = { ...currentProfile }

  // Extract sector
  if (hasAny(tokens, ['gym', 'fitness', 'workout', 'trainer', 'renewal'])) profile.sector = 'fitness'
  else if (hasAny(tokens, ['cafe', 'restaurant', 'dining', 'menu', 'food'])) profile.sector = 'restaurants'
  else if (hasAny(tokens, ['coaching', 'jee', 'neet', 'mock', 'student', 'test'])) profile.sector = 'coaching'
  else if (hasAny(tokens, ['agri', 'farm', 'fertilizer', 'retail', 'crop'])) profile.sector = 'agri'
  else if (hasAny(tokens, ['estate', 'property', 'realestate', 'flat', 'house'])) profile.sector = 'real-estate'

  // Extract category
  if (hasAny(tokens, ['website', 'websites', 'landing', 'site', 'brand'])) profile.category = 'website'
  else if (hasAny(tokens, ['software', 'dashboard', 'database', 'tracker', 'cbt', 'portal', 'tool'])) profile.category = 'software'

  // Extract complexity cues
  let complexCount = 0
  if (hasAny(tokens, ['login', 'auth', 'member', 'members'])) complexCount += 2
  if (hasAny(tokens, ['database', 'firebase', 'sync', 'realtime'])) complexCount += 3
  if (hasAny(tokens, ['payment', 'upi', 'checkout', 'pay'])) complexCount += 2
  if (hasAny(tokens, ['search', 'filter', 'inventory'])) complexCount += 1
  if (complexCount > 0) {
    profile.complexityScore = Math.min(10, (profile.complexityScore || 0) + complexCount)
  }

  return profile
}
