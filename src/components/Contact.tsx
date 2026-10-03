import { useState } from 'react'

type ContactProps = {
  type: string
  onTypeChange: (value: string) => void
}

const types = [
  'New software product',
  'Business management system',
  'Web platform',
  'Mobile application',
  'Improve existing software',
  'Not sure yet',
]

export default function Contact({ type, onTypeChange }: ContactProps) {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact">
      <div className="wrap contact">
        <div className="reveal">
          <div className="kicker">Start a project</div>
          <h2>Tell us what you want to make possible.</h2>
          <p>
            You do not need a technical specification. Explain the problem, the users and the
            result you want.
          </p>
          <div className="contactDetails">
            <div className="contactLine">
              <small>PHONE</small>
              <b>
                <a href="tel:+251913837642">+251 913 83 76 42</a> &nbsp; / &nbsp;{' '}
                <a href="tel:+251976115602">+251 976 11 56 02</a>
              </b>
            </div>
            <div className="contactLine">
              <small>LOCATION</small>
              <b>Gerji Mebrat, Bole Sub-city, Addis Ababa</b>
            </div>
            <div className="contactLine">
              <small>COMPANY</small>
              <b>Matrixo Software Technology PLC</b>
            </div>
          </div>
        </div>
        <form
          className="form reveal"
          id="projectForm"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="row">
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input required id="name" name="name" placeholder="Name or company" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input required id="phone" name="phone" placeholder="+251 ..." />
            </div>
          </div>
          <div className="field">
            <label htmlFor="type">What do you need?</label>
            <select name="type" id="type" value={type} onChange={(e) => onTypeChange(e.target.value)}>
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Tell us the problem</label>
            <textarea
              required
              id="message"
              name="message"
              placeholder="What are you trying to improve, replace or create?"
            />
          </div>
          <button className="btn primary" type="submit">
            Prepare project inquiry ↗
          </button>
          <div className="notice" id="notice" style={sent ? { display: 'block' } : undefined}>
            Your inquiry is ready. Call Matrixo using the contact details on this page to continue.
          </div>
        </form>
      </div>
    </section>
  )
}
