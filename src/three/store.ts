export const store = {
  reduced: false,
  mobile: false,

  px: 0,
  py: 0,
  pxT: 0,
  pyT: 0,

  w: {
    hero: 1,
    s1: 0,
    s2: 0,
    s3: 0,
    s4: 0,
    brand: 0,
    services: 0,
    about: 0,
    contact: 0,
  },

  explode: 0,
  network: 0,
  rebuild: 0,
  cap: 0,
}

export type StoreKey = keyof typeof store.w

export const smooth01 = (x: number) => {
  const t = Math.min(1, Math.max(0, x))
  return t * t * (3 - 2 * t)
}
