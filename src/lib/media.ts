/**
 * Central registry of every decorative anime-style media slot on the
 * site. This is the single source of truth: to bring a slot to life,
 * generate a clip/image matching the label below and drop it into
 * /public/media at the exact path listed — nothing else needs to
 * change, LoopMedia picks it up automatically. Until then, that slot
 * renders a labeled placeholder so it's obvious what's missing.
 *
 * Paths are relative to /public, so '/media/x.mp4' → public/media/x.mp4.
 */

export interface MediaSlot {
  path: string
  aspect: string // Tailwind aspect-ratio utility
  label: string // shown on the placeholder; also the spec for the generated clip
}

const slot = (path: string, aspect: string, label: string): MediaSlot => ({
  path,
  aspect,
  label,
})

export const MEDIA = {
  // ---- Global ----
  globalBackground: slot(
    '/media/global-bg.mp4',
    'aspect-video',
    'Global background · 1920×1080 · 15–20s loop · drifting sky, 8–12% opacity',
  ),

  // ---- Header / Footer ----
  headerAvatar: slot(
    '/media/header-avatar.png',
    'aspect-square',
    'Header avatar · 96×96',
  ),
  mobileDrawerBg: slot(
    '/media/mobile-drawer-bg.mp4',
    'aspect-[9/16]',
    'Mobile drawer background · 1080×1920 · loop · 6% opacity',
  ),
  footerAccent: slot(
    '/media/footer-accent.mp4',
    'aspect-[3/2]',
    'Footer corner accent · 300×200 · 10s loop · starfield/firefly, 10% opacity',
  ),

  // ---- Home ----
  homeHeroBg: slot(
    '/media/home/hero-bg.mp4',
    'aspect-video',
    'Home hero background · 1920×1080 · 8–12s loop · rooftop-at-dusk scene, 15–20% opacity',
  ),
  homeHeroAvatar: slot(
    '/media/home/hero-avatar.png',
    'aspect-[4/5]',
    'Home hero avatar · 512×640',
  ),
  homeHeroLeftStrip: slot(
    '/media/home/hero-strip-left.mp4',
    'aspect-[4/9]',
    'Hero left strip · 400×900 · 10s loop · rain + umbrella scene, 25% opacity',
  ),
  homeHeroRightStrip: slot(
    '/media/home/hero-strip-right.mp4',
    'aspect-[4/9]',
    'Hero right strip · 400×900 · 10s loop · meteor shower scene, 25% opacity',
  ),
  homeDivider1: slot(
    '/media/home/divider-1.mp4',
    'aspect-[8/1]',
    'Divider 1 · 1600×200 · 6–8s loop · fast cloudscape/motion blur',
  ),
  homeDivider2: slot(
    '/media/home/divider-2.mp4',
    'aspect-[8/1]',
    'Divider 2 · 1600×200 · 6–8s loop · slow underwater/glow scene',
  ),
  homeSectionBg: slot(
    '/media/home/section-rain.mp4',
    'aspect-video',
    'Section background · 1920×1080 · loop · low-opacity ambient scene',
  ),
  homeServiceCard: (index: number) =>
    slot(
      index === 1 ? '/media/home/digi-presence-1.mp4' : '/media/home/buisness-tools.mp4',
      'aspect-[4/3]',
      `Service teaser ${index} · 400×300 · 4–6s loop`,
    ),
  homeIndustryCard: (slug: string) =>
    slot(
      slug === 'restaurants'
        ? '/media/home/cafe.mp4'
        : slug === 'coaching'
        ? '/media/home/coaching.mp4'
        : slug === 'agri'
        ? '/media/home/agri1.mp4|/media/home/agri2.mp4'
        : slug === 'real-estate'
        ? '/media/home/estatesreal.mp4'
        : slug === 'fitness'
        ? '/media/home/gym.mp4|/media/home/gym2.mp4'
        : `/media/home/industry-${slug}.mp4`,
      'aspect-[4/3]',
      `Industry teaser (${slug}) · 400×300 · 4–6s loop`,
    ),

  // ---- Work ----
  workHeroBg: slot(
    '/media/work/hero-bg.mp4',
    'aspect-video',
    'Work hero background · 1920×1080 · 8s loop · "building/shipping" scene, 15% opacity',
  ),
  workHeaderAccent: slot(
    '/media/work/header-accent.mp4',
    'aspect-square',
    'Work header accent · 80×80 · loop',
  ),
  workProjectCover: (index: number) =>
    slot(
      `/media/work/cover-${(index % 4) + 1}.mp4`,
      'aspect-[5/4]',
      `Project cover loop ${(index % 4) + 1} · 400×320 · 5s loop · hover-play`,
    ),

  // ---- Process ----
  processHeroBg: slot(
    '/media/process/hero-bg.mp4',
    'aspect-video',
    'Process hero background · 1920×1080 · loop',
  ),
  processStep: (index: number) =>
    slot(
      `/media/process/step-${index}.mp4`,
      'aspect-square',
      `Process step ${index} icon · 200×200 · 3–4s loop`,
    ),
  processLine: slot(
    '/media/process/connecting-line.mp4',
    'aspect-[10/1]',
    'Process connecting line · thin strip · 3s loop · moving spark',
  ),
  processClosingAccent: slot(
    '/media/process/closing-accent.mp4',
    'aspect-square',
    'Process closing-card corner accent · 160×160 · loop',
  ),

  // ---- Pricing ----
  pricingHeroBg: slot(
    '/media/pricing/hero-bg.mp4',
    'aspect-video',
    'Pricing hero background · 1920×1080 · 8s loop · 10% opacity',
  ),
  pricingTierAccent: (index: number) =>
    slot(
      `/media/pricing/tier-${index}.mp4`,
      'aspect-square',
      `Pricing tier ${index} accent · 150×150 · 3s loop · glowing gem`,
    ),

  // ---- FAQ ----
  faqHeroBg: slot(
    '/media/faq/hero-bg.mp4',
    'aspect-[16/5]',
    'FAQ hero · 1920×600 · 8–10s loop',
  ),
  faqPageBg: slot(
    '/media/faq/page-bg.mp4',
    'aspect-video',
    'FAQ full-page background · 1920×1080 · loop · 8% opacity',
  ),

  // ---- Connect ----
  connectAvatar: slot(
    '/media/connect/avatar.png',
    'aspect-square',
    'Connect avatar',
  ),
  connectBg: slot(
    '/media/connect/bg.mp4',
    'aspect-video',
    'Connect form background · 1920×1080 · 10s loop · 10% opacity',
  ),
  connectAccent: (key: string) =>
    slot(
      `/media/connect/accent-${key}.mp4`,
      'aspect-square',
      `Connect accent (${key}) · 150×150 · 3s loop`,
    ),

  // ---- Services ----
  servicesOverviewHeroBg: slot(
    // Reuses homeSectionBg's file — was previously a byte-identical
    // duplicate at its own path ('/media/services/overview-hero-bg.mp4'),
    // now removed from /public/media to cut redundant storage.
    '/media/home/section-rain.mp4',
    'aspect-video',
    'Services overview hero · 1920×1080 · 8s loop · two glowing doorways, 15% opacity',
  ),
  servicesOverviewPillar: (key: 'websites' | 'software') =>
    slot(
      key === 'websites' ? '/media/home/digi-presence-2.mp4' : '/media/home/buisness-tools.mp4',
      'aspect-[5/4]',
      `Services pillar (${key}) · 500×400 · 5s loop`,
    ),
  servicesWebsitesHeroBg: slot(
    '/media/home/digi-presence-2.mp4',
    'aspect-video',
    'Websites hero · 1920×1080 · 8s loop · 15% opacity',
  ),
  servicesWebsitesAccent: (key: string) =>
    slot(
      `/media/services/websites-accent-${key}.mp4`,
      'aspect-square',
      `Websites accent (${key}) · 150×150 · 3s loop`,
    ),
  servicesSoftwareHeroBg: slot(
    '/media/home/buisness-tools.mp4',
    'aspect-video',
    'Software/tools hero · 1920×1080 · 8s loop · 15% opacity',
  ),
  servicesSoftwareAccent: (key: string) =>
    slot(
      `/media/services/software-accent-${key}.mp4`,
      'aspect-square',
      `Software/tools accent (${key}) · 150×150 · 3–4s loop`,
    ),

  // ---- Industries ----
  industriesOverviewHeroBg: slot(
    '/media/industries/overview-hero-bg.mp4',
    'aspect-video',
    'Industries overview hero · 1920×1080 · loop',
  ),
  industryCard: (slug: string) =>
    slot(
      slug === 'restaurants'
        ? '/media/home/cafe.mp4'
        : slug === 'coaching'
        ? '/media/home/coaching.mp4'
        : slug === 'agri'
        ? '/media/home/agri1.mp4|/media/home/agri2.mp4'
        : slug === 'real-estate'
        ? '/media/home/estatesreal.mp4'
        : slug === 'fitness'
        ? '/media/home/gym.mp4|/media/home/gym2.mp4'
        : `/media/industries/${slug}-card.mp4`,
      'aspect-[4/3]',
      `Industry card (${slug}) · 400×300 · 4–5s loop`,
    ),
  industryHeroBg: (slug: string) =>
    slot(
      slug === 'restaurants'
        ? '/media/home/cafe.mp4'
        : slug === 'coaching'
        ? '/media/home/coaching.mp4'
        : slug === 'agri'
        ? '/media/home/agri1.mp4|/media/home/agri2.mp4'
        : slug === 'real-estate'
        ? '/media/home/estatesreal.mp4'
        : slug === 'fitness'
        ? '/media/home/gym.mp4|/media/home/gym2.mp4'
        : `/media/industries/${slug}-hero.mp4`,
      'aspect-video',
      `Industry page hero (${slug}) · 1920×1080 · 8–10s loop · 15–20% opacity, tinted to sector accent`,
    ),
  industryAccent: (slug: string, key: string) =>
    slot(
      `/media/industries/${slug}-accent-${key}.mp4`,
      'aspect-square',
      `Industry accent (${slug}/${key}) · 150×150 · loop`,
    ),

  // ---- Testimonials (cycles through a small fixed pool since
  //      testimonial content itself is dynamic/backend-driven) ----
  testimonialAvatar: (index: number) =>
    slot(
      `/media/testimonials/avatar-${(index % 4) + 1}.mp4`,
      'aspect-square',
      `Testimonial avatar ${(index % 4) + 1} · 120×120 · 3s loop · idle blink`,
    ),
} as const
