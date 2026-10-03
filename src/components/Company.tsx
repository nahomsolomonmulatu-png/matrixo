import { company } from '../data/site'
import Arrow from './Arrow'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function Company() {
  return (
    <section className="section" id="company" aria-labelledby="company-title">
      <div className="container">
        <SectionHeader
          label="06 / Company"
          title={
            <>
              We build technology{' '}
              <br />
              companies can depend on.
            </>
          }
          id="company-title"
          accentLabel
        />

        <div className="company">
          <div className="company__prose">
            <p className="company__lead reveal" style={revealStyle(0)}>
              Matrixo is a software engineering company in Addis Ababa. We design, build and maintain
              the digital products and internal systems that organisations run their operations on.
            </p>
            <p className="reveal" style={revealStyle(90)}>
              Most of our work sits behind a login: dispatch and operations platforms, learning
              systems, internal tools, APIs and the infrastructure under them. Fifty-plus working
              systems have shipped from this team. Most are private by agreement; the ones we can
              show are listed under selected work.
            </p>
            <p className="reveal" style={revealStyle(180)}>
              We keep the team small and senior. The people who scope the work are the people who
              build it, so decisions about architecture, performance and interface are made together
              instead of in sequence. Engagements are long-lived — we expect to maintain what we
              ship.
            </p>
            <p className="company__meta reveal" style={revealStyle(260)}>
              <span>{company.name}</span>
              <span>{company.location}</span>
            </p>
          </div>

          <aside className="company__side reveal" style={revealStyle(140)} aria-label="Contact details">
            <p className="label company__side-label">Direct</p>
            <ul className="company__phones">
              {company.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href}>{phone.label}</a>
                </li>
              ))}
            </ul>
            <a className="arrow-link" href="#/contact">
              Contact Matrixo
              <Arrow className="arrow-link__icon" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
