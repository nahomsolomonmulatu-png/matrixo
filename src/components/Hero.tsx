import { logo } from '../assets'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap heroGrid">
        <div>
          <div className="eyebrow">
            <i className="pulse" aria-hidden="true" /> Software Technology • Addis Ababa
          </div>
          <h1>
            Turn the idea into <span>something people use.</span>
          </h1>
          <p className="lead">
            Matrixo designs and builds focused digital products for businesses that need software to
            simplify work, serve customers better, and move forward with confidence.
          </p>
          <div className="heroBtns">
            <a className="btn primary" href="#contact">
              Build with Matrixo <span>↗</span>
            </a>
            <a className="btn ghost" href="#work">
              See our live work <span>↓</span>
            </a>
          </div>
          <div className="micro">
            <span>Web platforms</span>
            <span>Mobile apps</span>
            <span>Business systems</span>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="core">
            <div className="coreTop">
              <div className="dots">
                <i />
                <i />
                <i />
              </div>
              <span>MATRIXO / BUILD SYSTEM</span>
            </div>
            <div className="coreBody">
              <img className="coreLogo" src={logo} alt="" />
              <div className="codeword">01 / FROM PROBLEM TO PRODUCT</div>
              <div className="statement">Clear thinking. Useful software. Built to move.</div>
              <div className="signal">
                <div className="sig">
                  <b>Web</b>
                  <small>fast &amp; responsive</small>
                </div>
                <div className="sig">
                  <b>Mobile</b>
                  <small>native-feeling</small>
                </div>
                <div className="sig">
                  <b>Systems</b>
                  <small>built around work</small>
                </div>
              </div>
            </div>
          </div>
          <div className="floatcard fc1">
            <b>Live product</b>
            <span>Penta Learning Hub ↗</span>
          </div>
          <div className="floatcard fc2">
            <b>New project?</b>
            <span>Start with the problem, not the technology.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
