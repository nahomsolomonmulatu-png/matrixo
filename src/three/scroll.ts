import { store } from './store'

export function initScrollDrive() {
  let cancelled = false
  let revert: (() => void) | null = null

  ;(async () => {
    try {
      const [gsapMod, stMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      const gsap = gsapMod.gsap
      const ScrollTrigger = stMod.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const scrub = (
          sel: string,
          key: 'explode' | 'network' | 'rebuild',
          end: string,
        ) => {
          const el = document.querySelector(sel)
          if (!el) return
          ScrollTrigger.create({
            trigger: el,
            start: 'top 65%',
            end,
            scrub: true,
            onUpdate: (self) => {
              store[key] = self.progress
            },
          })
        }
        scrub('#story-02', 'explode', 'bottom 40%')
        scrub('#story-03', 'network', 'bottom 45%')
        scrub('#brand', 'rebuild', 'center 45%')

        document.querySelectorAll('.services__row').forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: 'top 55%',
            end: 'bottom 45%',
            onToggle: (self) => {
              if (self.isActive) store.cap = i
            },
          })
        })
      })

      if (cancelled) {
        ctx.revert()
        return
      }
      revert = () => ctx.revert()
    } catch {
      // GSAP unavailable — scene rests at base state; page still works.
    }
  })()

  return () => {
    cancelled = true
    revert?.()
  }
}
