type SectionTopProps = {
  kicker: string
  title: string
  intro: string
}

export function SectionTop({ kicker, title, intro }: SectionTopProps) {
  return (
    <div className="sectionTop reveal">
      <div>
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
      </div>
      <p>{intro}</p>
    </div>
  )
}

type Service = {
  num: string
  title: string
  body: string
  tags: string[]
}

const services: Service[] = [
  {
    num: '01 / WEB PRODUCTS',
    title: 'Modern web platforms',
    body: 'Customer portals, dashboards, learning platforms, booking experiences and operational web systems designed to feel simple from the first click.',
    tags: ['React', 'Responsive UX', 'Admin systems'],
  },
  {
    num: '02 / MOBILE',
    title: 'Mobile applications',
    body: 'Focused mobile experiences for customers, staff and field teams, connected to the same business data and workflows as the web.',
    tags: ['Flutter', 'Android / iOS', 'Realtime'],
  },
  {
    num: '03 / BUSINESS SYSTEMS',
    title: 'Operations made digital',
    body: 'Replace fragmented spreadsheets, paper processes and disconnected tools with one system built around how the organization actually operates.',
    tags: ['Workflow', 'Roles & permissions', 'Reporting'],
  },
  {
    num: '04 / PRODUCT ENGINEERING',
    title: 'From concept to launch',
    body: 'Architecture, interface design, backend engineering, database design, testing and deployment—kept connected so the final product behaves as one system.',
    tags: ['Node.js', 'MySQL', 'Deployment'],
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <SectionTop
          kicker="What we build"
          title="Software should remove friction, not add another screen."
          intro="We start with the work that needs to become easier, then choose the right product shape around it."
        />
        <div className="services">
          {services.map((s) => (
            <article className="service reveal" key={s.num}>
              <div className="num">{s.num}</div>
              <div className="arrow" aria-hidden="true">
                ↗
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
