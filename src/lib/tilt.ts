import { useEffect, type RefObject } from 'react'

type TiltOptions = {
  /** Maximum tilt in degrees at the edges of the element. */
  max?: number
}

/**
 * Pointer-driven 3D tilt. Writes --tilt-x / --tilt-y custom properties on the
 * referenced element (CSS reads them in transform). rAF-lerped for smooth
 * motion; no-ops on touch pointers and under prefers-reduced-motion.
 */
export function useTilt(ref: RefObject<HTMLElement | null>, opts: TiltOptions = {}) {
  const max = opts.max ?? 8

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ease = 0.14
    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = 0

    const frame = () => {
      curX += (targetX - curX) * ease
      curY += (targetY - curY) * ease
      el.style.setProperty('--tilt-x', `${curX.toFixed(3)}deg`)
      el.style.setProperty('--tilt-y', `${curY.toFixed(3)}deg`)
      if (Math.abs(targetX - curX) + Math.abs(targetY - curY) > 0.02) {
        raf = window.requestAnimationFrame(frame)
      } else {
        raf = 0
      }
    }

    const kick = () => {
      if (!raf) raf = window.requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) return
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      targetX = py * max * 2
      targetY = -px * max * 2
      kick()
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      kick()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [ref, max])
}
