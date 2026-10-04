import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import { store } from './store'
import Avatar from './Avatar'
import Network from './Network'
import Layers from './Layers'
import Orbit from './Orbit'
import Rig from './Rig'

export default function Scene() {
  const [running, setRunning] = useState(!document.hidden)
  const [mobile, setMobile] = useState(window.innerWidth < 900)

  useEffect(() => {
    const onVis = () => setRunning(!document.hidden)
    const onResize = () => setMobile(window.innerWidth < 900)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMq = () => {
      store.reduced = mq.matches
    }
    store.reduced = mq.matches
    store.mobile = window.innerWidth < 900
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('resize', onResize)
    mq.addEventListener('change', onMq)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
      mq.removeEventListener('change', onMq)
    }
  }, [])

  useEffect(() => {
    store.mobile = mobile
  }, [mobile])

  return (
    <div className="stage" aria-hidden="true">
      <Canvas
        frameloop={running ? 'always' : 'never'}
        dpr={[1, mobile ? 1.25 : 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ fov: mobile ? 46 : 38, position: [1.6, 1.3, 6.6], near: 0.1, far: 60 }}
      >
        <fog attach="fog" args={['#f4f1ea', 7, 24]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3.2, 5, 2.6]} intensity={1.5} />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.35} />
        <Avatar />
        <Layers />
        <Network />
        <Orbit />
        <ContactShadows
          position={[0, 0.001, 0]}
          scale={9}
          blur={2.4}
          far={3.2}
          opacity={0.55}
          resolution={256}
          color="#0e0f0e"
        />
        <Rig />
      </Canvas>
    </div>
  )
}
