import ArchitectureDiagram from './ArchitectureDiagram'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

export default function Engineering() {
  return (
    <section
      className="section section--dark on-dark"
      id="engineering"
      aria-labelledby="engineering-title"
    >
      <div className="container">
        <SectionHeader
          label="04 / Engineering"
          title={
            <>
            Engineering beyond{' '}
            <br />
              the interface.
            </>
          }
          id="engineering-title"
        />

        <div className="eng">
          <div className="eng__copy reveal" style={revealStyle(0)}>
            <p className="lead">
              Screens are the visible part. The systems underneath them decide whether the product
              survives real traffic, real data and real operations.
            </p>
            <p className="eng__text">
              We build the application layer and the infrastructure layer in the same team:
              authentication, data models, queues, integrations, deployment and telemetry. Architecture
              and interface are designed together, so the product behaves as one system instead of a
              stack of parts.
            </p>
            <ul className="eng__list">
              <li>Authentication &amp; permissions</li>
              <li>Data modelling &amp; storage</li>
              <li>Async work &amp; queues</li>
              <li>Deployment &amp; observability</li>
            </ul>
          </div>

          <div className="eng__diagram" style={revealStyle(140)}>
            <p className="label eng__diagram-label">Reference stack</p>
            <ArchitectureDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
