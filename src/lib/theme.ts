export type ThemeMode = 'light' | 'dark'
export type RGB = [number, number, number]

const LIGHT = {
  bg: [244, 241, 234] as RGB,
  bg2: [239, 235, 226] as RGB,
  fg: [20, 21, 15] as RGB,
  fg2: [93, 95, 87] as RGB,
  hair: [220, 215, 203] as RGB,
}

const DARK = {
  bg: [14, 15, 14] as RGB,
  bg2: [21, 23, 21] as RGB,
  fg: [240, 238, 231] as RGB,
  fg2: [155, 157, 148] as RGB,
  hair: [42, 45, 42] as RGB,
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const mixRGB = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
]

/** Live theme state — mutated by the controller, read by the 3D scene each frame. */
export const theme = {
  t: 0,
  mode: 'light' as ThemeMode,
  bg: [...LIGHT.bg] as RGB,
  fg: [...LIGHT.fg] as RGB,
  hair: [...LIGHT.hair] as RGB,
}

const css = (c: RGB) => `${c[0]} ${c[1]} ${c[2]}`

export function startThemeController() {
  const root = document.documentElement
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const zones = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'))

  let target = 0
  let last = performance.now()
  let painted = -1
  let raf = 0

  const computeTarget = () => {
    const mid = window.innerHeight * 0.5
    let mode: ThemeMode = 'light'
    for (const el of zones) {
      const r = el.getBoundingClientRect()
      if (r.top <= mid && r.bottom > mid) {
        mode = (el.dataset.theme as ThemeMode) || 'light'
        break
      }
    }
    target = mode === 'dark' ? 1 : 0
    theme.mode = mode
  }

  const apply = () => {
    const t = theme.t
    const bg = mixRGB(LIGHT.bg, DARK.bg, t)
    const bg2 = mixRGB(LIGHT.bg2, DARK.bg2, t)
    const fg = mixRGB(LIGHT.fg, DARK.fg, t)
    const fg2 = mixRGB(LIGHT.fg2, DARK.fg2, t)
    const hair = mixRGB(LIGHT.hair, DARK.hair, t)
    theme.bg = bg
    theme.fg = fg
    theme.hair = hair
    const s = root.style
    s.setProperty('--bg', `rgb(${css(bg)})`)
    s.setProperty('--bg-2', `rgb(${css(bg2)})`)
    s.setProperty('--fg', `rgb(${css(fg)})`)
    s.setProperty('--fg-2', `rgb(${css(fg2)})`)
    s.setProperty('--hair', `rgb(${css(hair)})`)
    s.setProperty('--scrim', css(bg))
    root.style.colorScheme = t > 0.5 ? 'dark' : 'light'
    painted = Math.round(t * 512)
  }

  const tick = (now: number) => {
    const dt = Math.min(now - last, 64)
    last = now
    computeTarget()
    const d = target - theme.t
    if (Math.abs(d) > 0.0004) {
      const k = reduced ? 1 : 1 - Math.exp(-dt / 90)
      theme.t += d * k
      apply()
    } else if (Math.abs(d) > 0) {
      theme.t = target
      apply()
    } else if (painted !== Math.round(theme.t * 512)) {
      apply()
    }
    raf = requestAnimationFrame(tick)
  }

  apply()
  raf = requestAnimationFrame(tick)

  return () => cancelAnimationFrame(raf)
}
