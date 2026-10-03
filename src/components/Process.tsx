import { SectionTop } from './Services'

const steps = [
  {
    n: '01',
    title: 'Understand',
    body: 'You explain the business, the problem and what success should look like. We simplify the scope before touching code.',
  },
  {
    n: '02',
    title: 'Blueprint',
    body: 'We map the product, users, core flows, data and technical direction so the build has a clear foundation.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Interface, backend, database and integrations are developed as one connected product with regular validation.',
  },
  {
    n: '04',
    title: 'Launch',
    body: 'We test the real workflows, prepare deployment and move the product into an environment where people can actually use it.',
  },
]

export default function Process() {
  return (
    <section id="process">
      <div className="wrap">
        <SectionTop
          kicker="How Matrixo works"
          title="Four steps. No mystery."
          intro="A client should always know what is being solved, what is being built and what happens next."
        />
        <div className="process reveal">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <div className="n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
