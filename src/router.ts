import { useEffect, useState } from 'react'

/**
 * Minimal hash router.
 * - `#/contact` and `#/` are routes
 * - any other hash (`#work`) is an in-page anchor and keeps the home route
 */
function parseHash(hash: string): string | null {
  if (!hash.startsWith('#/')) return null
  const path = hash.slice(2).split('?')[0]
  return path === '' || path === '/' ? '/' : `/${path.replace(/^\//, '')}`
}

export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(() => parseHash(window.location.hash) ?? '/')

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash) ?? '/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

export function navigate(href: string) {
  window.location.hash = href
}
