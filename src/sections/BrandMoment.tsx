import { brandMoment } from '../data/site'

export default function BrandMoment() {
  return (
    <section className="brand" id="brand" data-theme="dark" aria-labelledby="brand-word">
      <div className="brand__sticky">
        <div className="brand__inner">
          <h2 className="brand__word reveal" id="brand-word">
            {brandMoment.wordmark}
          </h2>
          <p className="brand__line reveal">{brandMoment.line}</p>
        </div>
      </div>
    </section>
  )
}
