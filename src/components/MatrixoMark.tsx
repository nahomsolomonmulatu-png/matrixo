type Props = {
  size?: number
  className?: string
  color?: string
  accent?: boolean
  title?: string
}

const M_PATH = 'M3 20.5V4.5l9 9.4 9-9.4v16'

export default function MatrixoMark({
  size = 24,
  className,
  color = 'currentColor',
  accent = false,
  title,
}: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path
        d={M_PATH}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {accent ? <circle cx="12" cy="13.9" r={1.9} fill="#0f7b35" /> : null}
    </svg>
  )
}
