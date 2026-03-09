// ─── Local image imports ─────────────────────────────────────────
// Place 1.jpeg through 11.jpeg in src/assets/
// These are used as FALLBACK when Shopify has no images

let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11

try {
  img1 = (await import('../assets/1.jpeg')).default
  img2 = (await import('../assets/2.jpeg')).default
  img3 = (await import('../assets/3.jpeg')).default
  img4 = (await import('../assets/4.jpeg')).default
  img5 = (await import('../assets/5.jpeg')).default
  img6 = (await import('../assets/6.jpeg')).default
  img7 = (await import('../assets/7.jpeg')).default
  img8 = (await import('../assets/8.jpeg')).default
  img9 = (await import('../assets/9.jpeg')).default
  img10 = (await import('../assets/10.jpeg')).default
  img11 = (await import('../assets/11.jpeg')).default
} catch {}

export { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11 }

export const HERO_IMG = img4
export const CAMPAIGN_IMG = img5
export const ABOUT_IMG = img11
export const LOOKBOOK = [img1, img2, img3, img5, img9, img11].filter(Boolean)

export const ANNOUNCEMENTS = [
  'FREE SHIPPING ON ORDERS OVER $100  •  USE CODE: CTRL25',
  'NEW DROP: WARRIOR EDITION — LIMITED UNITS REMAINING',
  'FW25 COLLECTION NOW LIVE — SHOP THE FULL DROP',
]

export const NAV_LINKS = [
  { label: 'New In', id: 'collection' },
  { label: 'Hoodies', id: 'collection' },
  { label: 'Tracksuits', id: 'collection' },
  { label: 'Lookbook', id: 'lookbook' },
  { label: 'About', id: 'about' },
]

export const FILTERS = ['ALL', 'NEW', 'LIMITED', 'SET', 'SALE']
