export const SITE_CONFIG = {
  name: 'Udaya',
  tagline: 'A New Dawn for Your Health',
  description: 'Cannabis-assisted, clinician-guided retreats in Thailand for those navigating cancer, chronic pain, and serious illness.',
  url: 'https://udaya.one',
  ogImage: 'https://udaya.one/og-image.jpg',
  links: {
    whatsapp: '+66XXXXXXXXX',
    email: 'intake@udaya.one',
    cliniciansEmail: 'clinicians@udaya.one',
    pressEmail: 'press@udaya.one',
  },
}

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'The Udaya Method™', href: '/method' },
  {
    label: 'Retreats',
    href: '/retreats',
    children: [
      { label: 'Cancer Retreat 2026', href: '/retreats/cancer-retreat' },
      { label: 'Future Programs', href: '/retreats#future-programs' },
    ],
  },
  { label: 'About', href: '/about' },
  { label: 'For Clinicians', href: '/clinicians' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const RETREAT_DETAILS = {
  cancer: {
    name: 'Cancer Retreat',
    location: 'Hua Hin, Thailand',
    date: 'Q2 2026',
    duration: '10 days',
    price: '$12,000 USD',
    capacity: 20,
  },
}

export const UDAYA_METHOD_PILLARS = [
  {
    title: 'Prescription Cannabinoid Care',
    description: 'Under the guidance of Thai‑licensed physicians, receive a personalized protocol using full‑extract oils such as FECO/RSO and other formulations when appropriate.',
    icon: 'leaf',
  },
  {
    title: 'Mindfulness & Meaning',
    description: 'Daily meditation, breathwork, gentle movement, and meaning‑centered groups help you meet uncertainty and fear.',
    icon: 'brain',
  },
  {
    title: 'Metabolic & Body Nourishment',
    description: 'Organic, anti‑inflammatory cuisine inspired by Thai tradition. Optional, doctor‑supervised gentle fasting/cleansing protocols.',
    icon: 'heart',
  },
  {
    title: 'Community & Sanctuary',
    description: 'Heal in company. Small cohorts and facilitated sharing build bonds that last beyond the retreat.',
    icon: 'users',
  },
]