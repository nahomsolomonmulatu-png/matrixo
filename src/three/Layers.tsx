import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Mesh } from 'three'
import { store, smooth01 } from './store'
import { layerMat } from './materials'

const COUNT = 5

export default function Layers() {
  const meshes = useRef<(Mesh | null)[]>([])
  const e = useRef(0)

  const baseY = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => 0.52 + i * 0.3),
    [],
  )

  useFrame((_, dt) => {
    const target = store.explode
    e.current += (target - e.current) * Math.min(1, dt * 7)
    const w = store.w.s2
    const mobileFade = store.mobile
      ? Math.min(1, store.w.hero + store.w.brand + store.w.contact)
      : 1
    layerMat.opacity = mobileFade * w * smooth01(e.current)
    meshes.current.forEach((m, i) => {
      if (!m) return
      const spread = e.current
      m.position.y = baseY[i] + (i - 2) * 0.3 * spread
      m.rotation.x = (i - 2) * 0.07 * spread
      m.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.04 * spread
      m.visible = layerMat.opacity > 0.02
    })
  })

  return (
    <group position={[0.85, 0, 0]}>
      {baseY.map((y, i) => (
        <RoundedBox
          key={i}
          ref={(m) => {
            meshes.current[i] = m
          }}
          args={[1.85, 0.13, 1.25]}
          radius={0.04}
          smoothness={2}
          position={[0, y, 0]}
          material={layerMat}
        />
      ))}
    </group>
  )
}
