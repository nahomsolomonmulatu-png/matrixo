import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { PointLight } from 'three'
import * as THREE from 'three'
import { store, type StoreKey } from './store'
import { theme } from '../lib/theme'
import {
  shellMat,
  jointMat,
  discMat,
  mMat,
  netLineMat,
  netPointMat,
  pulseMat,
  layerMat,
  STONE,
  GRAPHITE,
  GREEN_LIGHT,
  GREEN_DARK,
} from './materials'

type Pose = { p: [number, number, number]; l: [number, number, number] }

const POSES: Record<StoreKey, Pose> = {
  hero: { p: [1.6, 1.3, 6.6], l: [-1.3, 1.1, 0] },
  s1: { p: [1.15, 1.2, 4.9], l: [-0.85, 1.05, 0] },
  s2: { p: [0, 1.1, 6.4], l: [0, 1.05, 0] },
  s3: { p: [0, 1.05, 2.5], l: [0, 1.0, -6] },
  s4: { p: [0.3, 2.2, 6.4], l: [0, 1.15, 0] },
  brand: { p: [0, 1.15, 5.8], l: [0, 1.1, 0] },
  services: { p: [3.1, 1.5, 8.8], l: [-2.7, 1.05, 0] },
  about: { p: [2.8, 1.6, 8.0], l: [-2.3, 1.0, 0] },
  contact: { p: [2.3, 1.35, 7.2], l: [-1.7, 1.05, 0] },
}

const M_POSES: Record<StoreKey, Pose> = {
  hero: { p: [0, 1.5, 7.6], l: [0, 0.2, 0] },
  s1: { p: [0, 1.6, 7.9], l: [0, 0.3, 0] },
  s2: { p: [0, 1.6, 7.9], l: [0, 0.3, 0] },
  s3: { p: [0, 1.5, 6.8], l: [0, 1.0, -4] },
  s4: { p: [0, 1.6, 7.9], l: [0, 0.3, 0] },
  brand: { p: [0, 1.2, 6.2], l: [0, 1.15, 0] },
  services: { p: [0, 1.6, 7.9], l: [0, 0.3, 0] },
  about: { p: [0, 1.6, 7.9], l: [0, 0.3, 0] },
  contact: { p: [0, 1.4, 7.4], l: [0, 0.7, 0] },
}

const BG_LIGHT = new THREE.Color('#f4f1ea')
const BG_DARK = new THREE.Color('#0e0f0e')
const KEYS: StoreKey[] = [
  'hero',
  's1',
  's2',
  's3',
  's4',
  'brand',
  'services',
  'about',
  'contact',
]
const IDS: Record<StoreKey, string> = {
  hero: 'top',
  s1: 'story-01',
  s2: 'story-02',
  s3: 'story-03',
  s4: 'story-04',
  brand: 'brand',
  services: 'capabilities',
  about: 'about',
  contact: 'contact',
}

const damp = (current: number, target: number, lambda: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-lambda * dt))

export default function Rig() {
  const { camera, scene } = useThree()
  const rim = useRef<PointLight>(null)
  const els = useRef<Partial<Record<StoreKey, HTMLElement>>>({})
  const weights = useRef<Record<StoreKey, number>>({ ...store.w })
  const look = useRef(new THREE.Vector3(-1.3, 1.1, 0))
  const targetP = useRef(new THREE.Vector3(1.6, 1.3, 6.6))
  const targetL = useRef(new THREE.Vector3(-1.3, 1.1, 0))

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      store.pxT = (e.clientX / window.innerWidth) * 2 - 1
      store.pyT = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => window.removeEventListener('pointermove', onPointer)
  }, [])

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.06)

    if (!els.current.hero) {
      for (const k of KEYS) {
        const el = document.getElementById(IDS[k])
        if (el) els.current[k] = el
      }
    }

    store.px = damp(store.px, store.pxT, 4, dt)
    store.py = damp(store.py, store.pyT, 4, dt)

    const vh = window.innerHeight
    const vc = vh * 0.5
    let sum = 0
    for (const k of KEYS) {
      const el = els.current[k]
      let w = 0
      if (el) {
        const r = el.getBoundingClientRect()
        const c = r.top + r.height * 0.5
        const half = r.height * 0.5 + vh * 0.5
        if (half > 0) w = Math.max(0, 1 - Math.abs(c - vc) / half)
      }
      weights.current[k] = w
      sum += w
    }
    if (sum < 0.001) {
      weights.current.contact = 1
      sum = 1
    }

    const poses = store.mobile ? M_POSES : POSES
    let px = 0
    let py = 0
    let pz = 0
    let lx = 0
    let ly = 0
    let lz = 0
    for (const k of KEYS) {
      const w = weights.current[k] / sum
      px += poses[k].p[0] * w
      py += poses[k].p[1] * w
      pz += poses[k].p[2] * w
      lx += poses[k].l[0] * w
      ly += poses[k].l[1] * w
      lz += poses[k].l[2] * w
    }
    targetP.current.set(px, py, pz)
    targetL.current.set(lx, ly, lz)

    const lambda = store.reduced ? 60 : 5.5
    camera.position.set(
      damp(camera.position.x, targetP.current.x, lambda, dt),
      damp(camera.position.y, targetP.current.y, lambda, dt),
      damp(camera.position.z, targetP.current.z, lambda, dt),
    )
    look.current.set(
      damp(look.current.x, targetL.current.x, lambda, dt),
      damp(look.current.y, targetL.current.y, lambda, dt),
      damp(look.current.z, targetL.current.z, lambda, dt),
    )
    camera.lookAt(look.current)

    for (const k of KEYS) store.w[k] = weights.current[k]

    const t = theme.t
    shellMat.color.lerpColors(GRAPHITE, STONE, t)
    layerMat.color.lerpColors(GRAPHITE, STONE, t)
    discMat.color.lerpColors(GREEN_LIGHT, GREEN_DARK, t)
    const netOp =
      store.network * (1 - Math.min(1, store.w.s4 * 1.5)) * (1 - Math.min(1, store.w.brand * 1.2))
    const mobileFade = store.mobile
      ? Math.min(1, store.w.hero + store.w.brand + store.w.contact)
      : 1
    const shellOp =
      mobileFade * (1 - netOp * 0.93) * (1 - store.w.s2 * 0.8)

    shellMat.opacity = shellOp
    jointMat.opacity = shellOp
    discMat.opacity = shellOp
    mMat.opacity = shellOp
    shellMat.depthWrite = shellOp > 0.98
    jointMat.depthWrite = shellOp > 0.98
    layerMat.depthWrite = layerMat.opacity > 0.98

    netLineMat.opacity = netOp * 0.7
    netPointMat.opacity = netOp * 0.85
    pulseMat.opacity = netOp * 0.9

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerpColors(BG_LIGHT, BG_DARK, t)
    }
    if (rim.current) rim.current.intensity = 2.6 * t * (store.mobile ? 0.6 : 1)
  })

  return <pointLight ref={rim} position={[-3.2, 2.6, -3.4]} color="#5ed489" intensity={0} distance={22} />
}
