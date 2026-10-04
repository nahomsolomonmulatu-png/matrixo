import { storySteps } from '../data/site'

const pad = (n: number) => String(n).padStart(2, '0')

const ALIGN = ['left', 'left', 'right', 'left'] as const

export default function Story() {
  return (
    <section id="story" aria-label="How Matrixo builds">
      {storySteps.map((step, i) => (
        <article
          key={step.id}
          id={step.id}
          className={`story__step story__step--${ALIGN[i]}`}
          data-theme={i < 2 ? 'light' : 'dark'}
          data-story-step={i}
        >
          <div className="story__sticky">
            <div className="container story__inner">
              <div className="story__copy">
                <p className="label reveal">{step.label}</p>
                <h2 className="story__title reveal">{step.title}</h2>
                {step.body ? <p className="story__body reveal">{step.body}</p> : null}
              </div>
              {step.items ? (
                <ul className="story__items reveal" aria-label={step.title}>
                  {step.items.map((item, j) => (
                    <li key={item}>
                      <span className="story__item-i" aria-hidden="true">
                        {pad(j + 1)}
                      </span>
                      <span className="story__item-name">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
