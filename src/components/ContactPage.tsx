import { useState } from 'react'
import { company, projectTypes } from '../data/site'
import Arrow from './Arrow'
import { revealStyle } from '../lib/reveal'

type FormState = {
  name: string
  email: string
  organisation: string
  projectType: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  organisation: '',
  projectType: projectTypes[0],
  message: '',
}

function mailtoHref(state: FormState) {
  const body = [
    `Name: ${state.name}`,
    `Email: ${state.email}`,
    `Organisation: ${state.organisation || '—'}`,
    `Project type: ${state.projectType}`,
    '',
    state.message,
  ].join('\n')

  return `mailto:info@matrixo.et?subject=${encodeURIComponent(
    `Project enquiry — ${state.organisation || state.name || 'Matrixo website'}`,
  )}&body=${encodeURIComponent(body)}`
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState)
  const [sent, setSent] = useState(false)

  const update = (key: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: event.target.value }))

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact-page" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-head">
          <p className="section-head__label label label--accent">Contact</p>
          <h1 className="section-head__title" id="contact-title">
            Tell us what you&apos;re working on.
          </h1>
          <p className="section-head__lede">
            Describe the system you need, or the one you already have. We reply from Addis Ababa,
            usually within one working day.
          </p>
        </header>

        <div className="contact">
          <form className="contact__form reveal" style={revealStyle(0)} onSubmit={onSubmit}>
            <div className="field">
              <label className="field__label" htmlFor="c-name">
                Name
              </label>
              <input
                className="field__input"
                id="c-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={update('name')}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="c-email">
                Email
              </label>
              <input
                className="field__input"
                id="c-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update('email')}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="c-org">
                Organisation <span className="field__optional">(optional)</span>
              </label>
              <input
                className="field__input"
                id="c-org"
                name="organisation"
                type="text"
                autoComplete="organization"
                value={form.organisation}
                onChange={update('organisation')}
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="c-type">
                Project type
              </label>
              <select
                className="field__input field__select"
                id="c-type"
                name="projectType"
                value={form.projectType}
                onChange={update('projectType')}
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="field field--wide">
              <label className="field__label" htmlFor="c-message">
                What are you building?
              </label>
              <textarea
                className="field__input field__textarea"
                id="c-message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={update('message')}
              />
            </div>

            <div className="contact__submit field--wide">
              <button className="btn btn--primary" type="submit">
                Prepare message
                <Arrow />
              </button>
              <p className="contact__hint">
                This site has no server-side form handler. Submitting opens a pre-filled email you
                can review before sending.
              </p>
            </div>
          </form>

          {sent ? (
            <div className="contact__notice" role="status">
              <p className="label">Message prepared</p>
              <p>
                Your details are ready in your mail app. If it did not open, copy the text below or
                call us directly.
              </p>
              <pre className="contact__summary">
                {`Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${
                  form.organisation || '—'
                }\nProject type: ${form.projectType}\n\n${form.message}`}
              </pre>
              <div className="contact__notice-actions">
                <a className="btn btn--primary" href={mailtoHref(form)}>
                  Open in mail app
                  <Arrow />
                </a>
                <button className="btn btn--quiet" type="button" onClick={() => setSent(false)}>
                  Edit details
                </button>
              </div>
            </div>
          ) : null}

          <aside className="contact__side reveal" style={revealStyle(120)} aria-label="Direct contact">
            <p className="label">Direct</p>
            <ul className="contact__phones">
              {company.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href}>{phone.label}</a>
                </li>
              ))}
            </ul>
            <p className="contact__address">{company.location}</p>
            <p className="label contact__side-label">Working hours</p>
            <p className="contact__address">Monday – Friday, 09:00 – 18:00 (UTC +3)</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
