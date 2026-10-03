import { SectionTop } from './Services'

export default function Work() {
  return (
    <section id="work">
      <div className="wrap">
        <SectionTop
          kicker="Live work"
          title="One public product. Built to be used."
          intro="We would rather show a real deployment than fill a portfolio with unfinished claims."
        />
        <div className="case reveal">
          <div>
            <div className="live">
              <i className="pulse" aria-hidden="true" /> Live project
            </div>
            <h3>
              Penta
              <br />
              Learning Hub
            </h3>
            <p>
              A digital learning platform built to connect students, teachers, courses and
              administration through a unified web experience.
            </p>
            <div className="heroBtns">
              <a
                className="btn primary"
                href="https://pentalearninghub.com.et"
                target="_blank"
                rel="noopener"
              >
                Visit live platform ↗
              </a>
              <a className="btn ghost" href="#contact">
                Build something with us
              </a>
            </div>
          </div>
          <div className="caseMock" aria-label="Stylized Penta Learning Hub product preview">
            <div className="browserbar">
              <div className="dots">
                <i />
                <i />
                <i />
              </div>
              <div className="url">pentalearninghub.com.et</div>
            </div>
            <div className="learning">
              <div className="minihead">PENTA LEARNING HUB</div>
              <h4>Learning, organized.</h4>
              <div className="learnGrid">
                <div className="learnCard tall">
                  <small>STUDENT LEARNING</small>
                  <div className="bars">
                    <i style={{ height: '35%' }} />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <div>
                  <div className="learnCard">
                    <small>COURSES</small>
                    <h4 style={{ fontSize: 28, marginTop: 22 }}>Focused</h4>
                  </div>
                  <div className="learnCard" style={{ marginTop: 12 }}>
                    <small>ACCESS</small>
                    <h4 style={{ fontSize: 28, marginTop: 22 }}>Anywhere</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
