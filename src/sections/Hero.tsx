import { heroCopy } from '../data/site'

export default function Hero() {
  return (
    <section className="hero" id="top" data-theme="light" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="label hero__index reveal">{heroCopy.index}</p>
          <h1 className="hero__title reveal" id="hero-title">
            {heroCopy.headline[0]}
            <br />
            {heroCopy.headline[1]}
          </h1>
          <p className="lead hero__lead reveal">{heroCopy.lead}</p>
          <div className="hero__cta reveal">
            <a className="btn btn--primary" href={heroCopy.cta.href}>
              {heroCopy.cta.label}
              <span aria-hidden="true" className="btn__arrow">
                →
              </span>
            </a>
          </div>
        </div>
        <div className="hero__stage" aria-hidden="true" />
      </div>
      <div className="container hero__foot">
        <p className="meta-row">
          <span>Engineering</span>
          <span>Addis Ababa</span>
          <span>2026</span>
        </p>
      </div>
    </section>
  )
}
