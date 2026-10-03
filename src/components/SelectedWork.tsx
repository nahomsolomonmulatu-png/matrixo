import type { Project } from '../data/site'
import { projects } from '../data/site'
import Arrow from './Arrow'
import SectionHeader from './SectionHeader'
import { revealStyle } from '../lib/reveal'

function MobilityVisual() {
  return (
    <svg className="pvis" viewBox="0 0 640 420" aria-hidden="true" focusable="false">
      <g className="pvis__streets">
        <path d="M0 96h640M0 212h640M0 330h640" />
        <path d="M120 0v420M268 0v420M416 0v420M548 0v420" />
      </g>

      <g className="pvis__zones">
        <rect x="132" y="108" width="124" height="92" />
        <rect x="428" y="224" width="108" height="94" />
        <rect x="280" y="8" width="124" height="76" />
      </g>

      <path
        className="pvis__route dash-travel"
        d="M120 330h148V212h148V96h132"
      />

      <g className="pvis__marker">
        <circle cx="120" cy="330" r="7" />
        <circle cx="548" cy="96" r="7" />
        <circle cx="268" cy="212" r="4" />
        <circle cx="416" cy="212" r="4" />
      </g>

      <g className="pvis__ticks">
        <path d="M16 24h20M16 24v20" />
        <path d="M624 396h-20M624 396v-20" />
      </g>
    </svg>
  )
}

function LearningVisual() {
  const rows = [78, 158, 238, 318]
  const cols = [92, 236, 380]
  return (
    <svg className="pvis" viewBox="0 0 640 420" aria-hidden="true" focusable="false">
      <g className="pvis__spine">
        <path d="M56 54v336" />
        {rows.map((y) => (
          <path key={y} d={`M56 ${y}h36`} />
        ))}
      </g>

      <g className="pvis__modules">
        {rows.map((y) =>
          cols.map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y - 24} width="120" height="48" />
          )),
        )}
      </g>

      <rect className="pvis__module--active" x="236" y="134" width="120" height="48" />

      <path
        className="pvis__route dash-travel"
        d="M92 78h144v80h144v80h144"
      />

      <g className="pvis__ticks">
        <path d="M16 24h20M16 24v20" />
        <path d="M624 396h-20M624 396v-20" />
      </g>
    </svg>
  )
}

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
  return (
    <article className="project reveal" style={revealStyle(delay)}>
      <div className="project__body">
        <p className="label project__category">{project.category}</p>
        <h3 className="project__name">
          <span className="project__index">{project.index}</span>
          <span className="project__dash" aria-hidden="true">
            —
          </span>
          {project.name}
        </h3>
        <p className="project__desc">{project.description}</p>
        <ul className="project__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a
          className="arrow-link project__action"
          href={project.action.href}
          {...(project.action.external ? { target: '_blank', rel: 'noopener' } : {})}
        >
          {project.action.label}
          <Arrow className="arrow-link__icon" />
          {project.action.external ? (
            <span className="sr-only">(opens in a new tab)</span>
          ) : null}
        </a>
      </div>

      <div className="project__visual reveal-media" style={revealStyle(delay + 120)}>
        <div className="project__frame">
          {project.visual === 'mobility' ? <MobilityVisual /> : <LearningVisual />}
        </div>
      </div>
    </article>
  )
}

export default function SelectedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          label="01 / Work"
          title="Selected work."
          lede="Most of our work is confidential by agreement. These are the systems we can show publicly."
          id="work-title"
        />

        <div className="projects">
          {projects.map((project, i) => (
            <ProjectRow key={project.name} project={project} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
