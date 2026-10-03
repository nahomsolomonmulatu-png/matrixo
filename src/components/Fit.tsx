import { choices, type Choice } from '../choices'

type FitProps = {
  active: number
  onChoose: (index: number) => void
}

export default function Fit({ active, onChoose }: FitProps) {
  return (
    <section>
      <div className="wrap fit reveal">
        <div>
          <div className="kicker">Is Matrixo a fit?</div>
          <h2>Start with what you need to change.</h2>
          <p>
            Select the closest situation. The goal is not to sell you a technology—it is to
            identify the right kind of software work.
          </p>
        </div>
        <div className="chooser" id="chooser">
          {choices.map((c: Choice, i: number) => (
            <div
              className={i === active ? 'choice active' : 'choice'}
              key={c.type}
              role="button"
              tabIndex={0}
              onClick={() => onChoose(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChoose(i)
                }
              }}
            >
              <div>
                <b>{c.label}</b>
                <br />
                <span>{c.desc}</span>
              </div>
              <i aria-hidden="true">→</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
