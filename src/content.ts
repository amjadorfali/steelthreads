// All site copy lives here. Edit contact info in one place.

export const contact = {
  whatsapp: 'https://wa.me/96178879278',
  whatsappLabel: 'Chat on WhatsApp',
  email: 'amjadorfali3@gmail.com',
  emailLabel: 'Email us instead',
}

export const hero = {
  eyebrow: 'OrfaLab — Independent Software Studio',
  heading: 'Custom software systems, built from scratch or wired into what you already run.',
  sub: 'OrfaLab designs, builds, and ships production-grade systems — new products, internal tools, integrations, and the data pipelines that keep them connected. Working code and clear outcomes, not slide decks.',
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

export const proof: { intro: string; metrics: Metric[]; caseStudy: { title: string; body: string } } = {
  intro: '10+ years building software from scratch: internal tools, customer-facing websites, RMM software, data integrations, and infrastructure for high-volume operators.',
  metrics: [
    { value: '5x', label: 'operations performance after platform revamp' },
    { value: '3x', label: 'faster delivery across 20+ cross-team contributors' },
    { value: '1,630', label: 'process errors eliminated per month' },
    { value: '6s → <1s', label: 'API response time after optimization' },
  ],
  caseStudy: {
    title: 'ERP ↔ warehouse sync, fully automated',
    body: 'A Go pipeline that syncs ERP and warehouse systems on a schedule — replacing a manual export/import process and cutting reconciliation work to near zero. Monitored, logged, and documented for handover.',
  },
}

export const about = {
  heading: 'A small studio for serious systems',
  body: [
    'OrfaLab is a lean software studio with 10+ years of experience designing, building, and shipping production-grade systems from scratch — internal tools, customer-facing websites, RMM software, data integrations, and infrastructure.',
    'Clients work directly with the team writing the code. No account managers, no handoffs, no bloat.',
  ],
}

export const cta = {
  heading: 'Tell us what\'s slowing your team down.',
  sub: 'A short WhatsApp message is enough to start. Replies within 24 hours.',
}
