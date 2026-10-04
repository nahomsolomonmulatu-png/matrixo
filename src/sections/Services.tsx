import { useEffect } from 'react'
import { services } from '../data/site'

export default function Services() {
  useEffect(() => {
    const rows = [...document.querySelectorAll<HTMLElement>('.services__row')]
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          (e.target as HTMLElement).classList.toggle('is-active', e.isIntersecting),
        ),
      { rootMargin: '-40% 0px -40% 0px' },
    )
    rows.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="services" id="capabilities" data-theme="light" aria-labelledby="services-title">
      <h2 className="sr-only" id="services-title">
        Capabilities
      </h2>
      <div className="services__list">
        {services.map((service, i) => (
          <article className="services__row" key={service.index} data-service={i}>
            <div className="container services__inner">
              <span className="label services__i">{service.index}</span>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__line">{service.line}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
