import type { CSSProperties } from 'react'

/** Inline style that staggers a reveal transition via --reveal-delay. */
export function revealStyle(delay = 0): CSSProperties {
  return { '--reveal-delay': `${delay}ms` } as CSSProperties
}
