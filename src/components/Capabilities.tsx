import { capabilities } from '../data/site'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function Capabilities() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader
          label="03 / Services"
          title="What we build."
          lede="Six disciplines, one team. The work is scoped around the system that has to exist, not around a deliverable list."
          id="services-title"
        />

        <ul className="cap-grid">
          {capabilities.map((item, i) => (
            <li className="cap reveal" key={item.index} style={revealStyle(i * 60)}>
              <p className="cap__index label">{item.index}</p>
              <h3 className="cap__title">{item.title}</h3>
              <p className="cap__body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
