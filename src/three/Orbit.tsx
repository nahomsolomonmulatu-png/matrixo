import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import { MeshStandardMaterial } from 'three'
import { store } from './store'

const COUNT = 6
const RADIUS = 2.15

export default function Orbit() {
  const group = useRef<Group>(null)
  const meshes = useRef<(Mesh | null)[]>([])
  const cap = useRef(0)

  const mats = useMemo(
    () =>
      Array.from(
        { length: COUNT },
        () =>
          new MeshStandardMaterial({
            color: '#0f7b35',
            roughness: 0.5,
            metalness: 0.1,
            transparent: true,
            opacity: 0,
          }),
      ),
    [],
  )

  useFrame((state, dt) => {
    const w = store.w.services
    if (group.current) {
      group.current.visible = w > 0.02
      if (!store.reduced) group.current.rotation.y += dt * 0.22
    }
    cap.current += (store.cap - cap.current) * Math.min(1, dt * 6)
    const t = state.clock.elapsedTime
    meshes.current.forEach((m, i) => {
      if (!m) return
      const angle = (i / COUNT) * Math.PI * 2 + (store.reduced ? 0 : t * 0.1)
      m.position.set(
        Math.cos(angle) * RADIUS,
        1.35 + Math.sin(t * 0.7 + i) * (store.reduced ? 0 : 0.14),
        Math.sin(angle) * RADIUS * 0.85,
      )
      const active = 1 - Math.min(1, Math.abs(cap.current - i))
      m.scale.setScalar(1 + active * 0.55)
      mats[i].opacity = w * (0.35 + active * 0.65)
    })
  })

  return (
    <group ref={group}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            meshes.current[i] = m
          }}
          material={mats[i]}
        >
          <boxGeometry args={[0.14, 0.14, 0.14]} />
        </mesh>
      ))}
    </group>
  )
}
