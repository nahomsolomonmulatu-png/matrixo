import Arrow from './Arrow'
import { revealStyle } from '../lib/reveal'

export default function ContactCTA() {
  return (
    <section className="section section--dark on-dark" id="contact" aria-labelledby="cta-title">
      <div className="container cta">
        <p className="label cta__label reveal" style={revealStyle(0)}>
          09 / Contact
        </p>
        <h2 className="cta__title reveal-mask" id="cta-title" style={revealStyle(80)}>
          <span>Have something worth building?</span>
        </h2>
        <p className="cta__sub reveal" style={revealStyle(200)}>
          Tell us what you&apos;re working on.
        </p>
        <div className="cta__actions reveal" style={revealStyle(300)}>
          <a className="btn btn--on-dark" href="#/contact">
            Contact Matrixo
            <Arrow />
          </a>
          <span className="cta__phone">
            <a href="tel:+251913837642">+251 913 83 76 42</a>
            <a href="tel:+251976115602">+251 976 11 56 02</a>
          </span>
        </div>
      </div>
    </section>
  )
}
