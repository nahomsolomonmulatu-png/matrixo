import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function Insights() {
  return (
    <section className="section" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <SectionHeader
          label="08 / Insights"
          title="Notes from the work."
          lede="Short technical write-ups on systems we have designed and operated."
          id="insights-title"
        />

        <div className="insights-empty reveal" style={revealStyle(0)}>
          <p className="insights-empty__mark label">Draft in progress</p>
          <p className="insights-empty__text">
            Nothing published yet. When we publish, it will be here — notes on architecture decisions,
            delivery and maintenance, written by the engineers who made them.
          </p>
        </div>
      </div>
    </section>
  )
}
