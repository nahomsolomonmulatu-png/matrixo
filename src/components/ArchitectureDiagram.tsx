import { architecture } from '../data/site'

export default function ArchitectureDiagram() {
  return (
    <ol className="arch reveal" aria-label="Reference architecture, top to bottom">
      {architecture.map((layer, i) => (
        <li className="arch__row" key={layer.label} style={{ '--i': i } as React.CSSProperties}>
          <span className="arch__rail" aria-hidden="true">
            <span className="arch__node arch__node--pulse" style={{ '--pulse-delay': `${i * 380}ms` } as React.CSSProperties} />
            {i < architecture.length - 1 ? <span className="arch__line" /> : null}
          </span>
          <span className="arch__body">
            <span className="arch__label">{layer.label}</span>
            <span className="arch__detail">{layer.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
