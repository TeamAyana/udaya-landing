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
    cta_primary_label: 'Join the Waitlist',
    cta_primary_link: '/waitlist',
    cta_secondary_label: 'Schedule a Call',
    cta_secondary_link: '/schedule',
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
    name: 'Cancer Program',
    location_display: 'Thailand (final venue to be announced)',
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
    description: 'Under the guidance of Thai-licensed physicians, receive a personalized protocol using full-extract oils such as FECO/RSO and other formulations. Daily 1:1 check-ins help optimize dosing and support your understanding of the endocannabinoid system.',
    icon: 'leaf',
  },
  {
    title: 'Mindfulness & Meaning-Centered Support',
    description: 'Meditations 2–3 times daily, evening Yoga Nidra, and group sharing circles help you meet uncertainty, embrace existential concerns, and discover new meaning.',
    icon: 'brain',
  },
  {
    title: 'Community Sanctuary (Udaya Circle)',
    description: 'Heal in company. Small cohorts (20 or fewer) and facilitated circles during the retreat build lasting bonds. Post-retreat weekly check-ins and help sourcing medicine at home keep you supported.',
    icon: 'users',
  },
]