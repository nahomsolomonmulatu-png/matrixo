const items = [
  {
    strong: 'Matrixo Software Technology PLC',
    span: 'Product thinking, design and software engineering under one roof.',
  },
  { strong: 'Live', span: 'Penta Learning Hub is publicly deployed.' },
  {
    strong: '50+ working systems',
    span: 'Built across real business needs. Most are confidential internal company systems and are not shown publicly.',
  },
  { strong: 'Ethiopia', span: 'Built from Addis Ababa for real operating environments.' },
]

export default function Proof() {
  return (
    <section className="proof">
      <div className="wrap proofbar reveal">
        {items.map((it) => (
          <div className="proofitem" key={it.strong}>
            <strong>{it.strong}</strong>
            <span>{it.span}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
