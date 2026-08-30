// All site copy lives here. Edit contact info in one place.

export const contact = {
  whatsapp: 'https://wa.me/96178879278',
  whatsappLabel: 'Chat on WhatsApp',
  email: 'amjadorfali3@gmail.com',
  emailLabel: 'Email us instead',
}

export const hero = {
  eyebrow: 'OrfaLabs — Independent Software Studio',
  heading: 'Custom software systems, built from scratch or wired into what you already run.',
  sub: 'OrfaLabs designs, builds, and ships production-grade systems — internal tools, integrations, the data pipelines that keep them connected, and the apps on top. Working code and clear outcomes, not slide decks.',
}

export type Package = {
  title: string
  description: string
  bullets: string[]
  price: string
}

export const packages: Package[] = [
  {
    title: 'Internal Ops Tools',
    description: 'Replace the spreadsheet maze with a system built around how the team actually works.',
    bullets: [
      'Order & operations tracking',
      'Role-based access for staff',
      'Reports & live dashboards',
      'Training + handover docs',
    ],
    price: 'Pricing on request',
  },
  {
    title: 'Integrations & Data Sync',
    description: 'Make existing systems talk to each other. ERP, warehouse, accounting — no more manual exports or copy-paste.',
    bullets: [
      'Automated data pipelines',
      'Scheduled or real-time sync',
      'Error monitoring & alerts',
      'Runbook & documentation',
    ],
    price: 'Pricing on request',
  },
  {
    title: 'Web & Mobile Apps',
    description: 'Customer-facing or staff-facing apps, from first release to long-term maintenance.',
    bullets: [
      'Web app or cross-platform mobile',
      'Auth, payments, notifications',
      'Hosting & deployment setup',
      'Optional maintenance retainer',
    ],
    price: 'Pricing on request',
  },
]

export type Metric = {
  value: string
  label: string
}

export type CaseStudy = {
  title: string
  body: string
  tags: string[]
}

export const proof: { intro: string; metrics: Metric[]; caseStudies: CaseStudy[] } = {
  intro: 'Years of shipping software that businesses run on every day: the internal tools, customer-facing products, integrations, and infrastructure underneath them.',
  metrics: [
    { value: '5x', label: 'operations performance after platform revamp' },
    { value: '3x', label: 'faster delivery across 20+ cross-team contributors' },
    { value: '1,630', label: 'process errors eliminated per month' },
    { value: '6s → <1s', label: 'API response time after optimization' },
  ],
  caseStudies: [
    {
      title: 'Systems that agree with each other',
      body: 'The tools your business runs on kept in sync automatically, so the same fact lives in one place — no more exporting, re-typing, or reconciling by hand. Monitored and logged, with documentation your team can actually run from.',
      tags: ['automated', 'monitored', 'documented'],
    },
    {
      title: 'AI where it actually pays off',
      body: 'Language models built into the tools your team already uses — reading, sorting, drafting, and flagging the work that used to need a person. Triggered by real events, run only when needed, with a human able to check the source in one click.',
      tags: ['event-driven', 'llm', 'human-in-the-loop'],
    },
  ],
}

export const about = {
  heading: 'A small studio for serious systems',
  body: [
    'OrfaLabs is a lean software studio that designs, builds, and ships production-grade systems — internal tools, customer-facing products, data integrations, and the infrastructure underneath — for businesses that run on their operations.',
    'Clients work directly with the people writing the code. No account managers, no handoffs, no bloat.',
  ],
}

export const cta = {
  heading: 'Tell us what\'s slowing your team down.',
  sub: 'A short WhatsApp message is enough to start. Replies within 24 hours.',
}
