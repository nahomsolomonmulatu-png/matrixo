import { principles } from '../data/site'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function Principles() {
  return (
    <section className="section" id="principles" aria-labelledby="principles-title">
      <div className="container">
        <SectionHeader
          label="05 / Principles"
          title="Matrixo principles."
          lede="The working rules behind how we scope, build and maintain software."
          id="principles-title"
        />

        <ol className="principles">
          {principles.map((principle, i) => (
            <li className="principle reveal" key={principle.index} style={revealStyle(i * 70)}>
              <span className="principle__index" aria-hidden="true">
                {principle.index}
              </span>
              <div className="principle__body">
                <h3 className="principle__title">{principle.title}</h3>
                <p className="principle__text">{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
