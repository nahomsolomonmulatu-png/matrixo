const cells = [
  { b: 'Product design', p: 'Reduce complexity before development begins.' },
  {
    b: 'Confidential systems',
    p: 'Private software for internal company operations, workflows and teams.',
  },
  { b: 'Real workflows', p: 'Design around how people actually perform the work.' },
  {
    b: 'Long-term thinking',
    p: 'Build foundations that can evolve instead of being thrown away.',
  },
]

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="lab reveal">
          <div className="labIntro">
            <div className="kicker">Built for real operations</div>
            <h3>50+ working systems. Most stay private.</h3>
            <p>
              Matrixo has built more than 50 working software systems across business and
              operational needs. Much of this work is internal company software created for
              specific organizations, teams and workflows. Because those systems contain private
              business processes, operational data or confidential client requirements, they are
              intentionally not displayed as public portfolio projects. Penta Learning Hub is one
              of the Matrixo products that can be viewed publicly.
            </p>
            <a className="btn ghost" href="#contact" style={{ marginTop: 18 }}>
              Build a private system with us ↗
            </a>
          </div>
          <div className="labGrid">
            {cells.map((c) => (
              <div className="labCell" key={c.b}>
                <b>{c.b}</b>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
