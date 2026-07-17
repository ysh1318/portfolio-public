export interface SiteElement {
  id: string; // DOM element ID
  type: 'section' | 'button' | 'input' | 'link' | 'form' | 'banner' | 'textarea' | 'anchor';
  label: string; // Visual text, icon or field name
  description: string; // Detail of what it shows or represents
  action?: string; // Action it performs (e.g. Navigates, opens WhatsApp, submits form)
}

export interface PageMap {
  path: string;
  name: string;
  description: string;
  elements: SiteElement[];
}

export const SITE_MAP: PageMap[] = [
  {
    path: '/',
    name: 'Home',
    description: 'Yash\'s homepage introducing him as a developer, showcasing his tech stack marquee, summarizing his services/industries, and showing client testimonials.',
    elements: [
      {
        id: 'home-hero',
        type: 'section',
        label: 'Hero Pitch Section',
        description: 'Main greeting containing Yash\'s name, role description, and fallback content.'
      },
      {
        id: 'home-hero-connect-btn',
        type: 'link',
        label: 'Get in Touch',
        description: 'Primary Call to Action button in the hero section.',
        action: 'Navigates to /connect'
      },
      {
        id: 'home-tech-belt',
        type: 'section',
        label: 'Technology Marquee Belt',
        description: 'Infinite horizontally scrolling banner showing core technologies (React, Vite, TypeScript, etc.).'
      },
      {
        id: 'home-services-section',
        type: 'section',
        label: 'What I Build Section',
        description: 'Presents the two main service pillars Yash offers.'
      },
      {
        id: 'home-websites-card',
        type: 'link',
        label: 'Websites & Brand Presence Card',
        description: 'Services grid card for landing pages and business sites.',
        action: 'Navigates to /services/websites'
      },
      {
        id: 'home-software-card',
        type: 'link',
        label: 'Full-Stack Custom Software Card',
        description: 'Services grid card for custom software, databases, and mock exam platforms.',
        action: 'Navigates to /services/software-tools'
      },
      {
        id: 'home-industries-section',
        type: 'section',
        label: 'Who I Build For Section',
        description: 'Highlighting top industry verticals built for real businesses.'
      },
      {
        id: 'home-coaching-card',
        type: 'link',
        label: 'Coaching Institutes Card',
        description: 'Card leading to JEE/NEET/CET coaching specialized details.',
        action: 'Navigates to /industries/coaching'
      },
      {
        id: 'home-restaurants-card',
        type: 'link',
        label: 'Restaurants & Cafes Card',
        description: 'Card leading to café/dining WhatsApp order catalog details.',
        action: 'Navigates to /industries/restaurants'
      },
      {
        id: 'home-agri-card',
        type: 'link',
        label: 'Agri Input Dealers Card',
        description: 'Card leading to Krishi Seva Kendra crop catalog details.',
        action: 'Navigates to /industries/agri'
      },
      {
        id: 'home-see-all-industries-link',
        type: 'link',
        label: 'See all industries →',
        description: 'Link at the bottom of the industries teaser section.',
        action: 'Navigates to /industries'
      },
      {
        id: 'home-testimonials-section',
        type: 'section',
        label: 'Client Reviews Section',
        description: 'Renders sliding testimonials card carousel from real clients.'
      }
    ]
  },
  {
    path: '/services',
    name: 'Services Overview',
    description: 'Summarizes Yash\'s service capabilities (Websites vs Custom Software Tools).',
    elements: [
      {
        id: 'services-hero',
        type: 'section',
        label: 'Services Hero Section',
        description: 'Main heading outlining the two key pillars of Yash\'s freelance services.'
      },
      {
        id: 'services-pillars-grid',
        type: 'section',
        label: 'Services Pillars Grid',
        description: 'Container for the service cards.'
      },
      {
        id: 'services-websites-pillar',
        type: 'link',
        label: 'Websites & Brand Presence card',
        description: 'Pillar card describing website solutions.',
        action: 'Navigates to /services/websites'
      },
      {
        id: 'services-software-pillar',
        type: 'link',
        label: 'Full-Stack Custom Software card',
        description: 'Pillar card describing advanced backend database solutions.',
        action: 'Navigates to /services/software-tools'
      }
    ]
  },
  {
    path: '/services/websites',
    name: 'Websites & Digital Presence',
    description: 'Detailed information on website design, WhatsApp ordering, SEO, and hosting packages.',
    elements: [
      {
        id: 'services-websites-hero',
        type: 'section',
        label: 'Websites Page Hero',
        description: 'Headline and introduction text for Yash\'s website development services.'
      },
      {
        id: 'websites-included-card',
        type: 'section',
        label: 'What\'s Included Card',
        description: 'List of features included in every site: landing pages, SEO, hosting, WhatsApp flows.'
      },
      {
        id: 'websites-for-card',
        type: 'section',
        label: 'Who It\'s For Card',
        description: 'Brief description of ideal local businesses needing digital identity.'
      },
      {
        id: 'websites-demos-section',
        type: 'section',
        label: 'See It In Action Section',
        description: 'Grid of clickable demo scenarios for websites.'
      },
      {
        id: 'websites-dining-demo-card',
        type: 'section',
        label: 'Local Business & Dining Menu Card',
        description: 'Exemplifies interactive digital menus for cafe businesses.'
      },
      {
        id: 'websites-ecommerce-demo-card',
        type: 'section',
        label: 'Premium E-Commerce Showcase Card',
        description: 'Exemplifies online storefront listings.'
      },
      {
        id: 'websites-connect-btn',
        type: 'link',
        label: 'Get a quote for your site',
        description: 'Primary Call to Action button linking to the contact page.',
        action: 'Navigates to /connect'
      }
    ]
  },
  {
    path: '/services/software-tools',
    name: 'Custom Software & Management Tools',
    description: 'Details custom workflow management software, spreadsheets replacement, database setups, and mock exam engines.',
    elements: [
      {
        id: 'services-software-hero',
        type: 'section',
        label: 'Software Page Hero',
        description: 'Title and subtitle explaining Yash\'s database software and test engine services.'
      },
      {
        id: 'software-assessment-card',
        type: 'section',
        label: 'Assessment Portals & Timer Card',
        description: 'Describes conversion of static sheets into interactive mock tests.'
      },
      {
        id: 'software-jeemocklab-demo-link',
        type: 'anchor',
        label: 'JEEMockLab View demo ↗',
        description: 'External link to inspect the live flagship mock-test engine product.',
        action: 'Opens jeemocklab-566080205337.asia-south1.run.app in a new tab'
      },
      {
        id: 'software-management-card',
        type: 'section',
        label: 'Day-to-day Management Card',
        description: 'Summarizes membership logs, reminders, calendars, and customer tracking.'
      },
      {
        id: 'software-demos-section',
        type: 'section',
        label: 'See It In Action Grid',
        description: 'Grid showing gym tracker and agri stock examples.'
      },
      {
        id: 'software-gym-demo-card',
        type: 'section',
        label: 'Fitness & Membership Portal Card',
        description: 'Visual description of member status checking.'
      },
      {
        id: 'software-agri-demo-card',
        type: 'section',
        label: 'Agri & Retail Operations Card',
        description: 'Visual description of crop stock and shipping database.'
      },
      {
        id: 'software-connect-btn',
        type: 'link',
        label: 'Describe what you\'re testing or tracking today',
        description: 'Primary Call to Action button leading to contact form.',
        action: 'Navigates to /connect'
      }
    ]
  },
  {
    path: '/industries',
    name: 'Industries Overview',
    description: 'Grid of specialized industry verticals Yash builds software and sites for.',
    elements: [
      {
        id: 'industries-hero',
        type: 'section',
        label: 'Industries Hero',
        description: 'Heading showing Yash builds for the business you actually run.'
      },
      {
        id: 'industries-grid',
        type: 'section',
        label: 'Industries Grid',
        description: 'List container containing links to coaching, restaurants, agri, real estate, and fitness.'
      },
      {
        id: 'industries-coaching-link',
        type: 'link',
        label: 'Coaching Card Link',
        description: 'Navigates to coaching details page.',
        action: 'Navigates to /industries/coaching'
      },
      {
        id: 'industries-restaurants-link',
        type: 'link',
        label: 'Restaurants Card Link',
        description: 'Navigates to cafe/restaurant details page.',
        action: 'Navigates to /industries/restaurants'
      },
      {
        id: 'industries-agri-link',
        type: 'link',
        label: 'Agri Dealers Card Link',
        description: 'Navigates to Krishi Seva Kendra details page.',
        action: 'Navigates to /industries/agri'
      },
      {
        id: 'industries-real-estate-link',
        type: 'link',
        label: 'Real Estate Card Link',
        description: 'Navigates to real estate agent details page.',
        action: 'Navigates to /industries/real-estate'
      },
      {
        id: 'industries-fitness-link',
        type: 'link',
        label: 'Gyms & Fitness Card Link',
        description: 'Navigates to gym membership details page.',
        action: 'Navigates to /industries/fitness'
      }
    ]
  },
  {
    path: '/industries/:slug',
    name: 'Industry Details',
    description: 'Dynamically populated details page for coaching, restaurants, agri, real-estate, or fitness.',
    elements: [
      {
        id: 'industry-hero',
        type: 'section',
        label: 'Industry Page Hero',
        description: 'Dynamic banner displaying the logo, title, and tagline of the industry.'
      },
      {
        id: 'industry-problem-card',
        type: 'section',
        label: 'What\'s Actually Going On Card',
        description: 'Exposes workflow bottlenecks, revenue leaks, and business pain points.'
      },
      {
        id: 'industry-build-card',
        type: 'section',
        label: 'What Gets Built Card',
        description: 'Outlines the custom features designed specifically for this industry.'
      },
      {
        id: 'industry-process-card',
        type: 'section',
        label: 'How This Happens Card',
        description: 'Numbered steps of engagement from intake to live demo.'
      },
      {
        id: 'industry-proof-card',
        type: 'section',
        label: 'Proof Showcase Card',
        description: 'If available, highlights a live deployed product (e.g. JEEMockLab).'
      },
      {
        id: 'industry-proof-link',
        type: 'anchor',
        label: 'View live ↗',
        description: 'Opens the live demo of the industry product.',
        action: 'Opens external link in a new tab'
      },
      {
        id: 'industry-faq-list',
        type: 'section',
        label: 'Industry Specific FAQs',
        description: 'Lists tailored questions and answers for this sector.'
      },
      {
        id: 'industry-connect-btn',
        type: 'link',
        label: 'Get a quote for your business',
        description: 'Bottom page CTA prefilled with the current sector tag.',
        action: 'Navigates to /connect?sector=[slug]'
      }
    ]
  },
  {
    path: '/process',
    name: 'Process Timeline',
    description: 'Displays vertical timeline step tracker detailing the discussion, design, review, and deployment stages.',
    elements: [
      {
        id: 'process-hero',
        type: 'section',
        label: 'Process Page Hero',
        description: 'Title introducing how a client engagement goes.'
      },
      {
        id: 'process-timeline',
        type: 'section',
        label: 'Vertical Timeline',
        description: 'Adjusts glow height on scroll to show steps 1 to 4.'
      },
      {
        id: 'process-step-1',
        type: 'section',
        label: '01 — Discuss & Scope Card',
        description: 'Details WhatsApp requirements discussion.'
      },
      {
        id: 'process-step-2',
        type: 'section',
        label: '02 — Design & Build Card',
        description: 'Details AI workflows and check-ins.'
      },
      {
        id: 'process-step-3',
        type: 'section',
        label: '03 — Review & Refine Card',
        description: 'Details live demo tests and iteration.'
      },
      {
        id: 'process-step-4',
        type: 'section',
        label: '04 — Deploy & Support Card',
        description: 'Details launch setup on Netlify/Cloud Run.'
      },
      {
        id: 'process-contracts-card',
        type: 'section',
        label: 'No long contracts card',
        description: 'Reassures clients on transparency and flexible pricing.'
      },
      {
        id: 'process-connect-btn',
        type: 'link',
        label: 'Start a project',
        description: 'Bottom call to action button.',
        action: 'Navigates to /connect'
      }
    ]
  },
  {
    path: '/faq',
    name: 'FAQ',
    description: 'Frequently Asked Questions about pricing, trials, safety, updates, timelines, and revisions.',
    elements: [
      {
        id: 'faq-hero',
        type: 'section',
        label: 'FAQ Page Hero',
        description: 'Heading offering answers to common questions.'
      },
      {
        id: 'faq-list',
        type: 'section',
        label: 'FAQ List Container',
        description: 'Scrollable stack of 7 standard question and answer cards.'
      },
      {
        id: 'faq-connect-btn',
        type: 'link',
        label: 'Still have a question? Ask here',
        description: 'CTA leading to connection page.',
        action: 'Navigates to /connect'
      }
    ]
  },
  {
    path: '/connect',
    name: 'Connect',
    description: 'Intake form capturing name, email, project targets, subject, and message, with direct WhatsApp links.',
    elements: [
      {
        id: 'connect-page-section',
        type: 'section',
        label: 'Main Page Section',
        description: 'Container encompassing the social links block and the inquiry form.'
      },
      {
        id: 'connect-availability-badge',
        type: 'banner',
        label: 'Availability status badge',
        description: 'Real-time indicators fetched from settings/status.'
      },
      {
        id: 'connect-socials-card',
        type: 'section',
        label: 'Social Channels Box',
        description: 'Houses buttons linking to GitHub and Instagram.'
      },
      {
        id: 'connect-github-link',
        type: 'anchor',
        label: 'GitHub',
        description: 'Button launching Yash\'s code repository page.',
        action: 'Opens github.com/ysh1318 in a new tab'
      },
      {
        id: 'connect-instagram-link',
        type: 'anchor',
        label: 'Instagram',
        description: 'Button launching Yash\'s social profile.',
        action: 'Opens instagram.com/yash_d.awachar in a new tab'
      },
      {
        id: 'connect-whatsapp-direct-card',
        type: 'section',
        label: 'Chat Directly Box',
        description: 'Outlines direct mobile contact.'
      },
      {
        id: 'connect-whatsapp-direct-link',
        type: 'anchor',
        label: 'Open WhatsApp',
        description: 'WhatsApp direct API button.',
        action: 'Opens WhatsApp chat screen with 919890215963'
      },
      {
        id: 'connect-inquiry-form',
        type: 'form',
        label: 'Let\'s Build Something Form',
        description: 'Inputs for user details and requirement specs.'
      },
      {
        id: 'connect-name-input',
        type: 'input',
        label: 'Your Name',
        description: 'Text input capturing user\'s name.'
      },
      {
        id: 'connect-email-input',
        type: 'input',
        label: 'Email Address',
        description: 'Text input capturing user\'s email address.'
      },
      {
        id: 'connect-project-input',
        type: 'input',
        label: 'Project Target',
        description: 'Text input prefilled with sector or empty (SaaS, website, etc.).'
      },
      {
        id: 'connect-subject-input',
        type: 'input',
        label: 'Subject',
        description: 'Text input capturing brief subject line.'
      },
      {
        id: 'connect-message-input',
        type: 'textarea',
        label: 'Detailed Message',
        description: 'Textarea capturing project details and questions.'
      },
      {
        id: 'connect-whatsapp-submit-btn',
        type: 'button',
        label: 'Send via WhatsApp',
        description: 'Form submission button.',
        action: 'Saves lead details to database and opens WhatsApp text composer'
      },
      {
        id: 'connect-email-submit-btn',
        type: 'button',
        label: 'Email Instead',
        description: 'Form submission button.',
        action: 'Saves lead details and opens mailto link'
      },
      {
        id: 'connect-instagram-submit-link',
        type: 'anchor',
        label: 'DM on Instagram',
        description: 'Secondary contact shortcut.',
        action: 'Opens Instagram in a new tab'
      }
    ]
  },
  {
    path: 'global',
    name: 'Global Layout & Overlays',
    description: 'Header, Footer, ScrollToTop, and Chatbot elements rendered on every page.',
    elements: [
      {
        id: 'global-header',
        type: 'section',
        label: 'Sticky Nav Header',
        description: 'Navigation header containing logo, back button, links, and talk button.'
      },
      {
        id: 'global-header-back-btn',
        type: 'button',
        label: 'Back',
        description: 'In-app back navigation button.',
        action: 'Navigates back in history or goes to parent directory fallback'
      },
      {
        id: 'global-header-logo-link',
        type: 'link',
        label: 'Yash Awachar Logo Link',
        description: 'Header left branding card.',
        action: 'Navigates to /'
      },
      {
        id: 'global-nav-home',
        type: 'link',
        label: 'Nav Link: Home',
        description: 'Desktop header link.',
        action: 'Navigates to /'
      },
      {
        id: 'global-nav-services',
        type: 'link',
        label: 'Nav Link: Services',
        description: 'Desktop header link.',
        action: 'Navigates to /services'
      },
      {
        id: 'global-nav-industries',
        type: 'link',
        label: 'Nav Link: Industries',
        description: 'Desktop header link.',
        action: 'Navigates to /industries'
      },
      {
        id: 'global-nav-process',
        type: 'link',
        label: 'Nav Link: Process',
        description: 'Desktop header link.',
        action: 'Navigates to /process'
      },
      {
        id: 'global-nav-connect',
        type: 'link',
        label: 'Nav Link: Connect',
        description: 'Desktop header link.',
        action: 'Navigates to /connect'
      },
      {
        id: 'global-header-talk-btn',
        type: 'link',
        label: 'Let\'s Talk button',
        description: 'Desktop header right CTA button.',
        action: 'Navigates to /connect'
      },
      {
        id: 'global-header-menu-trigger',
        type: 'button',
        label: 'Toggle menu',
        description: 'Hamburger/Close trigger button on mobile/tablet viewports.'
      },
      {
        id: 'global-footer',
        type: 'section',
        label: 'Footer Section',
        description: 'Contains page directory links, copyright, social icons, Privacy Policy link, and Terms link.'
      },
      {
        id: 'global-footer-github-link',
        type: 'anchor',
        label: 'Footer GitHub Icon',
        description: 'Footer social button.',
        action: 'Opens github.com/ysh1318'
      },
      {
        id: 'global-footer-instagram-link',
        type: 'anchor',
        label: 'Footer Instagram Icon',
        description: 'Footer social button.',
        action: 'Opens instagram.com/yash_d.awachar'
      },
      {
        id: 'global-footer-whatsapp-link',
        type: 'anchor',
        label: 'Footer WhatsApp Icon',
        description: 'Footer social button.',
        action: 'Opens WhatsApp chat screen'
      },
      {
        id: 'global-availability-banner',
        type: 'banner',
        label: 'Sticky Availability status block',
        description: 'Exposes real-time availability status.'
      },
      {
        id: 'global-scroll-to-top',
        type: 'button',
        label: 'Scroll to top',
        description: 'Fixed icon button that scrolls the page to top smoothly when page is scrolled down.'
      },
      {
        id: 'global-chatbot-bubble',
        type: 'button',
        label: 'Chat Bubble Trigger',
        description: 'Floating chatbot bubble showing a glow / pulse particle.',
        action: 'Toggles the chatbot dialog visibility'
      },
      {
        id: 'global-chatbot-window',
        type: 'section',
        label: 'Chat Dialog Window',
        description: 'Includes avatars, title, developer subtitle, messages list, input field, and send button.'
      },
      {
        id: 'global-chatbot-input',
        type: 'input',
        label: 'Ask anything...',
        description: 'Text input inside chatbot form for user queries.'
      },
      {
        id: 'global-chatbot-send',
        type: 'button',
        label: 'Send message icon',
        description: 'Launches chatbot query request.',
        action: 'Sends input text to the Llama LLM chat system'
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────
// Everything below this line is what makes SITE_MAP actually load-bearing.
// The assistant's knowledge of "what exists on the site" is generated from
// this data at request time — there is no second, hand-written copy of the
// page/element list living inside the LLM system prompt anymore. Add or
// edit an entry above and the assistant's knowledge updates automatically,
// with zero risk of the prompt and the real DOM drifting apart.
// ─────────────────────────────────────────────────────────────────────────

// Compact, token-efficient text block describing every page and every
// actionable element on it, for injection into the assistant's system
// prompt. Keeping this terse (one line per element) matters because it's
// sent on every single chat turn.
export function buildSiteMapContext(): string {
  return SITE_MAP.map(page => {
    const filteredElements = page.elements.filter(el => {
      // Exclude inputs, textareas
      if (el.type === 'input' || el.type === 'textarea') return false;
      // Exclude header nav links (since we navigate via URL, not header clicks)
      if (el.id.startsWith('global-nav-')) return false;
      // Exclude footer links
      if (el.id.startsWith('global-footer-')) return false;
      // Exclude minor chatbot UI elements
      if (el.id.startsWith('global-chatbot-')) return false;
      // Exclude other minor elements
      if ([
        'global-scroll-to-top',
        'global-availability-banner',
        'connect-socials-card',
        'connect-whatsapp-direct-card',
      ].includes(el.id)) return false;
      
      return true;
    });

    if (filteredElements.length === 0) {
      return `PAGE ${page.path} (${page.name})`;
    }

    const elementLines = filteredElements
      .map(el => {
        const desc = el.description.length > 50 ? el.description.slice(0, 47) + '...' : el.description;
        return `  #${el.id} [${el.type}]: ${el.label} (${desc})`;
      })
      .join('\n');

    return `PAGE ${page.path} (${page.name})\n${elementLines}`;
  }).join('\n\n');
}

// Flat index of every element across every page — used to validate that a
// selector the assistant wants to act on actually exists before we ever
// bother the virtual cursor with it, and to power a real keyword search
// ("find anything on the site") instead of relying on the LLM to recall
// an exact ID from memory.
interface FlatSiteEntry extends SiteElement {
  pagePath: string;
  pageName: string;
}

function flattenSiteMap(): FlatSiteEntry[] {
  return SITE_MAP.flatMap(page =>
    page.elements.map(el => ({ ...el, pagePath: page.path, pageName: page.name }))
  );
}

const FLAT_SITE_MAP = flattenSiteMap();

// Very small keyword scorer — no need for embeddings on a site this size.
// Scores each element by how many query tokens appear in its id/label/
// description/page-name, and returns the best matches.
export function searchSiteMap(query: string, limit = 5): FlatSiteEntry[] {
  const tokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) return [];

  const scored = FLAT_SITE_MAP.map(entry => {
    const haystack = `${entry.id} ${entry.label} ${entry.description} ${entry.pageName} ${entry.action ?? ''}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (haystack.includes(t)) score += 1;
      if (entry.id.toLowerCase().includes(t) || entry.label.toLowerCase().includes(t)) score += 1;
    }
    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.entry);
}

// Confirms a selector the assistant wants to navigate/scroll/click to is
// real, and returns which page it lives on (so we know whether we need to
// navigate first). Returns null if the ID doesn't exist anywhere.
export function resolveSiteMapTarget(elementId: string): FlatSiteEntry | null {
  const cleanId = elementId.replace(/^#/, '');
  
  // 1. Try exact match in the flat site map
  const exact = FLAT_SITE_MAP.find(e => e.id === cleanId);
  if (exact) return exact;

  // 2. Fallback: Check if they passed a page route name as target, e.g. "services" or "/services"
  const cleanPath = cleanId.startsWith('/') ? cleanId : '/' + cleanId;
  const page = SITE_MAP.find(p => p.path === cleanPath || p.path === cleanId);
  if (page) {
    const firstEl = page.elements[0];
    if (firstEl) {
      return {
        ...firstEl,
        pagePath: page.path,
        pageName: page.name
      };
    }
  }

  return null;
}

export function isValidPath(path: string): boolean {
  return SITE_MAP.some(p => p.path === path);
}
