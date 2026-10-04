import { company, contactCopy } from '../data/site'

export default function Contact() {
  return (
    <section className="contact" id="contact" data-theme="dark" aria-labelledby="contact-title">
      <div className="container contact__inner">
        <p className="label reveal">{contactCopy.label}</p>
        <h2 className="contact__headline reveal" id="contact-title">
          {contactCopy.headline}
        </h2>
        <div className="contact__cta reveal">
          <a className="btn btn--primary" href={contactCopy.cta.href}>
            {contactCopy.cta.label}
            <span aria-hidden="true" className="btn__arrow">
              →
            </span>
          </a>
        </div>
        <p className="meta-row contact__meta reveal">
          <span>{company.phones[0].label}</span>
          <span>{company.phones[1].label}</span>
          <span>{company.city}</span>
        </p>
      </div>
    </section>
  )
}
