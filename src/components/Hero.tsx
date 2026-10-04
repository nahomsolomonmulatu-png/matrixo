import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import Arrow from './Arrow'
import { revealStyle } from '../lib/reveal'
import { useTilt } from '../lib/tilt'

const HERO_WORDS = ['Software', 'built', 'for', 'the', 'real', 'world.']

const NODES = [
  { x: 18.5, y: 22 },
  { x: 46.5, y: 50 },
  { x: 78, y: 22 },
  { x: 30, y: 78 },
  { x: 81.5, y: 78 },
]

function wrap(v: number) {
  return ((v % 360) + 360) % 360
}

function format(v: number) {
  return v.toFixed(2).padStart(6, '0')
}

function SystemPanel() {
  const [coords, setCoords] = useState({ x: 42.18, y: 91.03 })
  const sceneRef = useRef<HTMLDivElement>(null)
  useTilt(sceneRef, { max: 7 })

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
        <div className="sys__scene" ref={sceneRef}>
          <div className="sys__stage">
            <div className="sys__spin">
              <div className="sys__floor sys__floor--far" />
              <div className="sys__floor sys__floor--near" />

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

                <path
                  className="sys__edge sys__edge--live dash-travel"
                  d="M74 66 186 150 326 234"
                />

                <g className="sys__cross" transform="translate(186 150)">
                  <path d="M-16 0h32M0 -16v32" />
                  <circle r="11" />
                </g>

                <g className="sys__tick">
                  <path d="M14 26h18M14 26v18" />
                  <path d="M386 274h-18M386 274v-18" />
                </g>
              </svg>

              {NODES.map((n, i) => (
                <span
                  key={`${n.x}-${n.y}`}
                  className="sys__dot"
                  style={
                    {
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                      '--i': i,
                    } as CSSProperties
                  }
                />
              ))}
              <span className="sys__halo" style={{ left: '46.5%', top: '50%' }} />
            </div>
          </div>
        </div>

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

          <h1 id="hero-title" className="hero__title reveal-3d" style={revealStyle(40)}>
            {HERO_WORDS.map((word, i) => (
              <Fragment key={word}>
                <span className="w">
                  <i style={{ '--wd': `${140 + i * 70}ms` } as CSSProperties}>{word}</i>
                </span>
                {i < HERO_WORDS.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
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
