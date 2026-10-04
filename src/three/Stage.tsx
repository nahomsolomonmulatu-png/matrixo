import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react'
import StaticArt from '../sections/StaticArt'

const Scene = lazy(() => import('./Scene'))

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Scene failed at runtime — StaticArt fallback stays mounted.
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Stage() {
  const [live, setLive] = useState(false)
  const supported = useMemo(() => hasWebGL(), [])
  const forceOff = useMemo(
    () => new URLSearchParams(window.location.search).has('no3d'),
    [],
  )

  useEffect(() => {
    if (!supported || forceOff) return
    let id = 0
    if (typeof window.requestIdleCallback === 'function') {
      id = window.requestIdleCallback(() => setLive(true), { timeout: 600 })
    } else {
      id = window.setTimeout(() => setLive(true), 200)
    }
    return () => {
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [supported, forceOff])

  if (forceOff) return null
  if (!supported) return <StaticArt />
  if (!live) return null
  return (
    <SceneBoundary fallback={<StaticArt />}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </SceneBoundary>
  )
}
