import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { store } from './store'
import { netLineMat, netPointMat, pulseMat } from './materials'

const NODE_COUNT = 46
const PULSE_COUNT = 6

function rand(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

export default function Network() {
  const group = useRef<Group>(null)
  const pulses = useRef<(Mesh | null)[]>([])

  const { nodes, linePositions, pairs } = useMemo(() => {
    const r = rand(20260404)
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const u = r() * 2 - 1
      const th = r() * Math.PI * 2
      const rad = 0.8 + Math.sqrt(1 - u * u) * (0.6 + r() * 1.6)
      nodes.push(
        new THREE.Vector3(
          Math.cos(th) * rad,
          1.15 + u * 1.9 * (0.4 + r() * 0.6),
          Math.sin(th) * rad * 0.8,
        ),
      )
    }
    const seen = new Set<string>()
    const pairs: [number, number][] = []
    for (let i = 0; i < nodes.length; i++) {
      const order = nodes
        .map((n, j) => ({ j, d: i === j ? Infinity : nodes[i].distanceTo(n) }))
        .sort((a, b) => a.d - b.d)
      for (const { j } of order.slice(0, 3)) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (seen.has(key)) continue
        seen.add(key)
        pairs.push([i, j])
      }
    }
    const linePositions = new Float32Array(pairs.length * 6)
    pairs.forEach(([a, b], k) => {
      const na = nodes[a]
      const nb = nodes[b]
      linePositions.set([na.x, na.y, na.z, nb.x, nb.y, nb.z], k * 6)
    })
    return { nodes, linePositions, pairs }
  }, [])

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return g
  }, [linePositions])

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        nodes.flatMap((n) => [n.x, n.y, n.z]),
        3,
      ),
    )
    return g
  }, [nodes])

  useFrame((state, dt) => {
    if (group.current && !store.reduced) {
      group.current.rotation.y += dt * 0.07
    }
    const t = state.clock.elapsedTime
    pulses.current.forEach((m, i) => {
      if (!m) return
      const pair = pairs[(i * 13 + 5) % pairs.length]
      const a = nodes[pair[0]]
      const b = nodes[pair[1]]
      const f = store.reduced ? 0 : (t * 0.28 + i * 0.37) % 1
      m.position.lerpVectors(a, b, f)
    })
  })

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeo} material={netLineMat} />
      <points geometry={pointGeo} material={netPointMat} />
      {Array.from({ length: PULSE_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(m) => {
            pulses.current[i] = m
          }}
          material={pulseMat}
        >
          <sphereGeometry args={[0.035, 10, 10]} />
        </mesh>
      ))}
    </group>
  )
}
