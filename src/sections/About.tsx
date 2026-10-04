import { aboutCopy } from '../data/site'

export default function About() {
  return (
    <section className="about" id="about" data-theme="light" aria-labelledby="about-title">
      <div className="container about__inner">
        <p className="label reveal">{aboutCopy.label}</p>
        <h2 className="about__statement reveal" id="about-title">
          {aboutCopy.statement}
        </h2>
        <p className="about__body reveal">{aboutCopy.body}</p>
      </div>
    </section>
  )
}
