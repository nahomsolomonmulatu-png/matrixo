import type { ReactNode } from 'react'

type SectionHeaderProps = {
  label: string
  title: ReactNode
  lede?: ReactNode
  id?: string
  accentLabel?: boolean
}

export default function SectionHeader({
  label,
  title,
  lede,
  id,
  accentLabel = false,
}: SectionHeaderProps) {
  return (
    <header className="section-head">
      <p className={`section-head__label label${accentLabel ? ' label--accent' : ''}`}>{label}</p>
      <h2 className="section-head__title" id={id}>
        {title}
      </h2>
      {lede ? <p className="section-head__lede">{lede}</p> : null}
    </header>
  )
}
