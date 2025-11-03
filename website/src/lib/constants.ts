export const SITE_CONFIG = {
  name: 'Udaya',
  tagline: 'A New Dawn for Your Health',
  description: 'Medical cannabis retreats in Thailand for those navigating cancer, chronic pain, and serious illness.',
  url: 'https://udaya.one',
  ogImage: 'https://udaya.one/og-image.jpg',
  links: {
    whatsapp: '+1 (647) 773-0296',
    email: 'team@udaya.one',
    cliniciansEmail: 'team@udaya.one',
    pressEmail: 'team@udaya.one',
    blogEmail: 'team@udaya.one',
  },
  hero: {
    h1: 'Natural therapy. Professional oversight.',
    subhead: 'Medical cannabis retreats in Thailand for people navigating cancer, chronic pain, and serious illness.',
    cta_primary_label: 'Get More Information',
    cta_primary_link: '/waitlist',
    cta_secondary_label: 'Contact Us',
    cta_secondary_link: '/contact',
  },
}

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Cancer (Waitlist)', href: '/programs/cancer' },
      { label: 'Future Programs', href: '/programs#future' },
    ],
  },
  { label: 'The Udaya Method', href: '/method' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Referral Program', href: '/referrals' },
]

export const RETREAT_DETAILS = {
  cancer: {
    name: 'Cancer Treatment Program',
    location_display: 'Greater Pattaya Area, Thailand',
    proximity_note: '', // Hidden for now
    start_window: 'Opening 2026 (Q2 target)', // Hidden for now
    duration: '10 days',
    price: '$12,000 USD',
    capacity: 20,
    nurse_on_staff: true,
    licensed_practitioner: true,
    post_retreat_support: 'Weekly check-ins for 8 weeks and assistance sourcing medicine legally at home',
    daily_structure: 'Morning 1:1 consultations, afternoon group sessions, evening education workshops',
  },
}

export const UDAYA_METHOD_PILLARS = [
  {
    title: 'Prescription Cannabinoid Care',
    description: 'Thai-licensed physicians craft your Medical Cannabis protocol using full-spectrum extracts, (FECO/RSO) - the concentrated oils that actually work. Daily 1:1 consultations fine-tune your treatment in real-time, teaching you how your endocannabinoid system orchestrates healing.',
    icon: 'leaf',
  },
  {
    title: 'Mind-Body Integration',
    description: 'Physical healing accelerates when mental and emotional needs are met. Structured practices including meditation, yoga nidra, and meaning-centered therapy. Tools for transforming anxiety into acceptance, fear into fuel for healing.',
    icon: 'brain',
  },
  {
    title: 'Community Sanctuary (Udaya Circle)',
    description: 'Small enough to know everyone\'s name, large enough to hold all your emotions. Maximum 20 participants ensures everyone matters. Sharing circles weave your stories together into something stronger. Post-retreat: weekly check-ins, medicine sourcing support, and a global network of people who\'ve walked this path.',
    icon: 'users',
  },
]