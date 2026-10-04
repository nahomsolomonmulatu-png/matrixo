const PLATES = [
  { y: 520, s: 1 },
  { y: 424, s: 0.94 },
  { y: 328, s: 0.88 },
  { y: 232, s: 0.82 },
  { y: 136, s: 0.76 },
]

const platePoints = (y: number, s: number) => {
  const w = 200 * s
  const h = 58 * s
  const cx = 260
  return `${cx - w},${y} ${cx},${y - h} ${cx + w},${y} ${cx},${y + h}`
}

export default function StaticArt() {
  return (
    <div className="stage-fallback" aria-hidden="true">
      <svg viewBox="0 0 520 620" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--hair)" strokeWidth="1.25">
          {PLATES.map((p, i) => (
            <polygon key={i} points={platePoints(p.y, p.s)} />
          ))}
        </g>
        <g stroke="var(--hair)" strokeWidth="1" strokeDasharray="3 7">
          <line x1="60" y1="520" x2="108" y2="136" />
          <line x1="460" y1="520" x2="412" y2="136" />
          <line x1="260" y1="578" x2="260" y2="78" />
        </g>
        <g stroke="var(--fg-2)" strokeWidth="1.25">
          <line x1="60" y1="520" x2="60" y2="136" opacity="0.35" />
          <line x1="460" y1="520" x2="460" y2="136" opacity="0.35" />
        </g>
        <g fill="var(--fg-2)">
          <circle cx="60" cy="520" r="4" />
          <circle cx="460" cy="520" r="4" />
          <circle cx="108" cy="136" r="4" />
          <circle cx="412" cy="136" r="4" />
          <circle cx="260" cy="424" r="3.5" />
          <circle cx="160" cy="328" r="3.5" />
          <circle cx="360" cy="328" r="3.5" />
        </g>
        <g fill="#0f7b35">
          <circle cx="260" cy="520" r="5" />
          <circle cx="260" cy="136" r="5" />
        </g>
        <path
          d="M245 268 L245 226 L260 246 L275 226 L275 268"
          stroke="var(--fg)"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  )
}
