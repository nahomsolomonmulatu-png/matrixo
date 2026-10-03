export type NavItem = { label: string; href: string }

export const primaryNav: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Company', href: '#company' },
  { label: 'Insights', href: '#insights' },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Navigation',
    items: [
      { label: 'Work', href: '#work' },
      { label: 'Products', href: '#products' },
      { label: 'Services', href: '#services' },
      { label: 'Company', href: '#company' },
      { label: 'Contact', href: '#/contact' },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'GitHub', href: 'https://github.com/nahomsolomonmulatu-png' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
    ],
  },
]

export type Project = {
  index: string
  name: string
  category: string
  description: string
  tags: string[]
  action: { label: string; href: string; external?: boolean }
  visual: 'mobility' | 'learning'
}

export const projects: Project[] = [
  {
    index: '01',
    name: 'Oringo',
    category: 'Mobility Infrastructure',
    description:
      'Ride-hailing and transportation infrastructure designed around the realities of emerging markets.',
    tags: ['Mobile', 'Dispatch', 'Payments', 'Operations'],
    action: { label: 'Request case study', href: '#/contact' },
    visual: 'mobility',
  },
  {
    index: '02',
    name: 'Penta Learning Hub',
    category: 'Education Technology',
    description:
      'A digital learning platform connecting students, teachers, courses and educational operations.',
    tags: ['Web', 'Learning', 'Administration'],
    action: { label: 'View project', href: 'https://pentalearninghub.com.et', external: true },
    visual: 'learning',
  },
]

export type Capability = { index: string; title: string; body: string }

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Digital Products',
    body: 'Web platforms, mobile applications and internal business systems.',
  },
  {
    index: '02',
    title: 'Software Infrastructure',
    body: 'APIs, backend systems, databases, authentication and distributed services.',
  },
  {
    index: '03',
    title: 'Mobile Engineering',
    body: 'Production Android and cross-platform applications.',
  },
  {
    index: '04',
    title: 'Platform Engineering',
    body: 'Operational platforms connecting customers, employees and business infrastructure.',
  },
  {
    index: '05',
    title: 'AI Systems',
    body: 'Practical AI integrations and intelligent software systems.',
  },
  {
    index: '06',
    title: 'Security',
    body: 'Security-conscious architecture, authentication and infrastructure engineering.',
  },
]

export type ArchLayer = { label: string; detail: string }

export const architecture: ArchLayer[] = [
  { label: 'Clients', detail: 'Web, mobile, internal tooling' },
  { label: 'Applications', detail: 'Interfaces, business logic, state' },
  { label: 'API Gateway', detail: 'Authentication, routing, limits' },
  { label: 'Services', detail: 'Domain services, queues, workers' },
  { label: 'Data', detail: 'PostgreSQL, MySQL, object storage' },
  { label: 'Infrastructure', detail: 'Docker, cloud, delivery, telemetry' },
]

export type Principle = { index: string; title: string; body: string }

export const principles: Principle[] = [
  {
    index: '01',
    title: 'Build for reality.',
    body: 'Technology has to survive real users, unreliable networks, operational complexity and scale.',
  },
  {
    index: '02',
    title: 'Systems before decoration.',
    body: 'Good interfaces matter, but reliable architecture comes first.',
  },
  {
    index: '03',
    title: 'Own the details.',
    body: 'Performance, accessibility, security and maintainability are part of the product.',
  },
  {
    index: '04',
    title: 'Design for change.',
    body: 'Software should be capable of evolving without being rebuilt every year.',
  },
]

export type ProductRow = { index: string; name: string; status: string; body: string; href?: string }

export const products: ProductRow[] = [
  {
    index: '01',
    name: 'Penta Learning Hub',
    status: 'Live',
    body: 'Digital learning platform for students, teachers, courses and administration.',
    href: 'https://pentalearninghub.com.et',
  },
  {
    index: '02',
    name: 'Business systems',
    status: '50+ built',
    body: 'Internal platforms for operations, workflows and reporting — built for a single organisation and kept private.',
  },
]

export type TechItem = { index: string; name: string; domain: string }

export const technologies: TechItem[] = [
  { index: 'T01', name: 'React', domain: 'Interface' },
  { index: 'T02', name: 'Node.js', domain: 'Services' },
  { index: 'T03', name: 'TypeScript', domain: 'Language' },
  { index: 'T04', name: 'Flutter', domain: 'Mobile' },
  { index: 'T05', name: 'MySQL', domain: 'Data' },
  { index: 'T06', name: 'PostgreSQL', domain: 'Data' },
  { index: 'T07', name: 'Docker', domain: 'Runtime' },
  { index: 'T08', name: 'Cloud Infrastructure', domain: 'Platform' },
  { index: 'T09', name: 'REST APIs', domain: 'Integration' },
  { index: 'T10', name: 'WebSockets', domain: 'Realtime' },
]

export const projectTypes = [
  'New software product',
  'Business management system',
  'Web platform',
  'Mobile application',
  'Improve existing software',
  'Not sure yet',
]

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
