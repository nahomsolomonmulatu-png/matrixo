import { technologies } from '../data/site'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function TechnologyIndex() {
  return (
    <section className="section" id="technology" aria-labelledby="technology-title">
      <div className="container">
        <SectionHeader
          label="07 / Technology"
          title="Technology index."
          lede="Chosen per project, not by fashion. The list below covers what we currently run in production."
          id="technology-title"
        />

        <ul className="tech-list">
          {technologies.map((tech, i) => (
            <li className="tech reveal" key={tech.index} style={revealStyle(i * 40)}>
              <span className="tech__index">{tech.index}</span>
              <span className="tech__name">{tech.name}</span>
              <span className="tech__domain">{tech.domain}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
