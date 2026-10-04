import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import { store, smooth01 } from './store'
import { shellMat, jointMat, discMat, mMat } from './materials'

type PartId = 'torso' | 'head' | 'armL' | 'armR' | 'legL' | 'legR'

type PartSpec = {
  id: PartId
  size: [number, number, number]
  pos: [number, number, number]
  dir: [number, number, number]
  tumble: [number, number, number]
  radius: number
  breath: number
}

const PARTS: PartSpec[] = [
  { id: 'torso', size: [0.98, 1.12, 0.48], pos: [0, 1.38, 0], dir: [0, 0.1, -0.75], tumble: [0.35, 0.5, 0], radius: 0.07, breath: 0 },
  { id: 'head', size: [0.5, 0.44, 0.44], pos: [0, 2.22, 0], dir: [0.05, 1.05, 0.45], tumble: [0.5, 0.75, 0.3], radius: 0.06, breath: 0.006 },
  { id: 'armL', size: [0.24, 0.92, 0.28], pos: [-0.66, 1.42, 0], dir: [-1.15, 0.3, 0.4], tumble: [0.7, 0.25, 1.0], radius: 0.05, breath: 0.004 },
  { id: 'armR', size: [0.24, 0.92, 0.28], pos: [0.66, 1.42, 0], dir: [1.15, 0.3, 0.4], tumble: [-0.7, 0.25, -1.0], radius: 0.05, breath: 0.004 },
  { id: 'legL', size: [0.3, 0.8, 0.32], pos: [-0.24, 0.4, 0], dir: [-0.6, -1.0, 0.35], tumble: [0.5, 0.3, 0.45], radius: 0.05, breath: 0 },
  { id: 'legR', size: [0.3, 0.8, 0.32], pos: [0.24, 0.4, 0], dir: [0.6, -1.0, 0.35], tumble: [-0.5, 0.3, -0.45], radius: 0.05, breath: 0 },
]

const M_T = 0.052
const M_BOXES: { s: [number, number, number]; p: [number, number, number]; r: number }[] = [
  { s: [M_T, 0.29, 0.03], p: [-0.12, 0, 0], r: 0 },
  { s: [M_T, 0.29, 0.03], p: [0.12, 0, 0], r: 0 },
  { s: [M_T, 0.215, 0.03], p: [-0.06, 0.054, 0], r: 0.666 },
  { s: [M_T, 0.215, 0.03], p: [0.06, 0.054, 0], r: -0.666 },
]

export default function Avatar() {
  const root = useRef<Group>(null)
  const groups = useRef<Record<PartId, Group | null>>({
    torso: null,
    head: null,
    armL: null,
    armR: null,
    legL: null,
    legR: null,
  })

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const w = store.w
    const storyW = Math.min(1, w.s1 + w.s2 + w.s3 + w.s4)
    const e1 =
      Math.pow(store.explode, 1.15) *
      (1 - Math.min(1, w.s4 * 1.6)) *
      storyW
    const e2 = 0.38 * (1 - smooth01(store.rebuild)) * w.brand
    const e = Math.max(e1, e2)

    const breathAmp = store.reduced ? 0 : 1
    const breathe = Math.sin(t * 0.85) * 0.012 * breathAmp

    for (const p of PARTS) {
      const g = groups.current[p.id]
      if (!g) continue
      const by = p.breath ? breathe * (p.breath / 0.006) : 0
      g.position.set(
        p.pos[0] + p.dir[0] * e * 1.55,
        p.pos[1] + p.dir[1] * e * 1.55 + by,
        p.pos[2] + p.dir[2] * e * 1.55,
      )
      g.rotation.set(p.tumble[0] * e, p.tumble[1] * e, p.tumble[2] * e)
    }

    const head = groups.current.head
    if (head) {
      const track = store.reduced
        ? 0
        : (1 - Math.min(1, e * 2)) *
          Math.min(1, w.hero + w.s1 + w.brand * 0.6)
      head.rotation.set(
        PARTS[1].tumble[0] * e - store.py * 0.26 * track,
        PARTS[1].tumble[1] * e + store.px * 0.5 * track,
        PARTS[1].tumble[2] * e,
      )
    }

    if (root.current) {
      const spin =
        (store.reduced ? 0 : 1) *
        (w.s1 * 0.22 + w.s4 * 0.16 + w.contact * 0.1 + w.brand * 0.04)
      root.current.rotation.y = t * spin + store.px * 0.1 * w.hero
    }
  })

  return (
    <group ref={root}>
      {PARTS.map((p) => (
        <group
          key={p.id}
          ref={(g) => {
            groups.current[p.id] = g
          }}
          position={p.pos}
        >
          <RoundedBox
            args={p.size}
            radius={p.radius}
            smoothness={3}
            material={shellMat}
          />
          {p.id === 'head' ? (
            <RoundedBox
              args={[0.38, 0.13, 0.04]}
              radius={0.02}
              smoothness={2}
              position={[0, 0.02, 0.225]}
              material={jointMat}
            />
          ) : null}
          {p.id === 'torso' ? (
            <group position={[0, 0.12, 0]}>
              <mesh position={[0, 0, 0.255]} rotation={[Math.PI / 2, 0, 0]} material={discMat}>
                <cylinderGeometry args={[0.19, 0.19, 0.03, 48]} />
              </mesh>
              {M_BOXES.map((b, i) => (
                <mesh key={i} position={[b.p[0], b.p[1], 0.278]} rotation={[0, 0, b.r]} material={mMat}>
                  <boxGeometry args={b.s} />
                </mesh>
              ))}
            </group>
          ) : null}
        </group>
      ))}
    </group>
  )
}
