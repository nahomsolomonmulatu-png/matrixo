import { useEffect, useState } from 'react'
import Arrow from './Arrow'
import { revealStyle } from '../lib/reveal'

function wrap(v: number) {
  return ((v % 360) + 360) % 360
}

function format(v: number) {
  return v.toFixed(2).padStart(6, '0')
}

function SystemPanel() {
  const [coords, setCoords] = useState({ x: 42.18, y: 91.03 })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setCoords((c) => ({
        x: wrap(c.x + (Math.random() - 0.5) * 6),
        y: wrap(c.y + (Math.random() - 0.5) * 6),
      }))
    }, 620)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="sys" aria-hidden="true">
      <div className="sys__head">
        <span className="label">SYS.01 — Reference architecture</span>
        <span className="sys__status label">
          <i className="status-dot" />
          Model
        </span>
      </div>

      <div className="sys__field">
        <svg className="sys__svg" viewBox="0 0 400 300" role="presentation" focusable="false">
          <g className="sys__lane">
            <path d="M0 66h400M0 150h400M0 234h400" />
          </g>

          <g className="sys__node-ring">
            <circle cx="74" cy="66" r="7" />
            <circle cx="186" cy="150" r="7" />
            <circle cx="312" cy="66" r="7" />
            <circle cx="120" cy="234" r="7" />
            <circle cx="326" cy="234" r="7" />
          </g>

          <g className="sys__node">
            <circle cx="74" cy="66" r="3" />
            <circle cx="186" cy="150" r="3" />
            <circle cx="312" cy="66" r="3" />
            <circle cx="120" cy="234" r="3" />
            <circle cx="326" cy="234" r="3" />
          </g>

          <g className="sys__edge">
            <path d="M74 66 186 150 326 234" />
            <path d="M312 66 186 150 120 234" />
            <path d="M74 66h238" />
            <path d="M120 234h206" />
          </g>

          <path className="sys__edge sys__edge--live dash-travel" d="M74 66 186 150 326 234" />

          <g className="sys__cross" transform="translate(186 150)">
            <path d="M-16 0h32M0 -16v32" />
            <circle r="11" />
          </g>

          <g className="sys__tick">
            <path d="M14 26h18M14 26v18" />
            <path d="M386 274h-18M386 274v-18" />
          </g>
        </svg>

        <div className="sys__scan" aria-hidden="true" />

        <div className="sys__coords">
          <span>X {format(coords.x)}</span>
          <span>Y {format(coords.y)}</span>
        </div>
      </div>

      <div className="sys__foot">
        <span>Lat 9.03° N</span>
        <span>Lon 38.74° E</span>
        <span>UTC +3</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="label hero__eyebrow reveal" style={revealStyle(0)}>
            Matrixo — Software engineering · Addis Ababa
          </p>

          <h1 id="hero-title" className="hero__title reveal-mask" style={revealStyle(60)}>
            <span>Software built for the real world.</span>
          </h1>

          <p className="lead hero__support reveal" style={revealStyle(200)}>
            Matrixo designs and engineers digital products, platforms and infrastructure for
            businesses operating at scale.
          </p>

          <div className="hero__actions reveal" style={revealStyle(300)}>
            <a className="btn btn--primary" href="#work">
              View our work
              <Arrow />
            </a>
            <a className="btn btn--quiet" href="#/contact">
              Talk to Matrixo
              <Arrow />
            </a>
          </div>
        </div>

        <div className="hero__viz reveal-media" style={revealStyle(240)}>
          <SystemPanel />
        </div>
      </div>

      <div className="container hero__foot-wrap">
        <div className="hero__foot meta-row reveal" style={revealStyle(420)}>
          <span>Web platforms</span>
          <span>Mobile applications</span>
          <span>Business systems</span>
          <span>Est. Addis Ababa</span>
        </div>
      </div>
    </section>
  )
}
