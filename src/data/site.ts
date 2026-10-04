export type NavItem = { label: string; href: string }

export const company = {
  name: 'Matrixo Software Technology PLC',
  shortName: 'Matrixo',
  tagline: 'Software Engineering Company',
  location: 'Gerji Mebrat, Bole Sub-city, Addis Ababa, Ethiopia',
  city: 'Addis Ababa, Ethiopia',
  phones: [
    { label: '+251 913 83 76 42', href: 'tel:+251913837642' },
    { label: '+251 976 11 56 02', href: 'tel:+251976115602' },
  ],
  site: 'https://nahomsolomonmulatu-png.github.io/matrixo/',
}

export const siteNav: NavItem[] = [
  { label: 'Work', href: '#story' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Company', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const siteSocial: NavItem[] = [
  { label: 'GitHub', href: 'https://github.com/nahomsolomonmulatu-png' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
]

export const heroCopy = {
  index: 'MATRIXO / 001',
  headline: ['We engineer', 'digital systems.'],
  lead: 'Software, platforms and infrastructure designed for the real world.',
  cta: { label: 'Explore Matrixo', href: '#story' },
}

export type StoryStep = {
  id: string
  label: string
  title: string
  body?: string
  items?: string[]
}

export const storySteps: StoryStep[] = [
  {
    id: 'story-01',
    label: 'SYSTEM / 01',
    title: 'Ideas become systems.',
    body: 'Every product begins as an idea. We give it structure before we give it code.',
  },
  {
    id: 'story-02',
    label: 'SYSTEM / 02',
    title: 'Structure before surface.',
    body: 'We take the product apart into its working layers.',
    items: ['Interface', 'Application', 'Services', 'Data', 'Infrastructure'],
  },
  {
    id: 'story-03',
    label: 'SYSTEM / 03',
    title: 'Then the layers connect.',
    body: 'One architecture running across every surface.',
    items: ['Web', 'Mobile', 'Backend', 'Cloud', 'Security', 'AI'],
  },
  {
    id: 'story-04',
    label: 'SYSTEM / 04',
    title: 'One system.\nMany layers.\nBuilt together.',
    items: [
      'Software Engineering',
      'Web Platforms',
      'Mobile Applications',
      'Backend Systems',
      'Cloud Infrastructure',
      'AI Systems',
      'Security Engineering',
    ],
  },
]

export const brandMoment = {
  wordmark: 'MATRIXO',
  line: 'Engineering technology that lasts.',
}

export type Service = { index: string; title: string; line: string }

export const services: Service[] = [
  { index: '01', title: 'Software Engineering', line: 'The discipline behind everything we ship.' },
  { index: '02', title: 'Web', line: 'Platforms and interfaces for the browser.' },
  { index: '03', title: 'Mobile', line: 'Applications that live in people\u2019s hands.' },
  { index: '04', title: 'Systems', line: 'Backends, data and the machinery between.' },
  { index: '05', title: 'AI', line: 'Models put to work inside real products.' },
  { index: '06', title: 'Security', line: 'Boundaries, identity and defence in depth.' },
]

export const aboutCopy = {
  label: 'COMPANY / MATRIXO',
  statement: 'Technology should feel simple because the engineering behind it isn\u2019t.',
  body: 'Matrixo is a software engineering company in Addis Ababa. We design and build digital products, platforms and the infrastructure beneath them \u2014 systems made to survive real users, real operations and real scale. Small team, deep ownership, long horizon.',
}

export const contactCopy = {
  label: 'CONTACT / 2026',
  headline: 'Let\u2019s build something real.',
  cta: {
    label: 'Start a conversation',
    href: 'mailto:info@matrixo.et?subject=Project%20enquiry%20%E2%80%94%20Matrixo',
  },
}

export const footerCopy = {
  line: 'Engineering digital systems.',
  legal: '\u00a9 Matrixo',
}
