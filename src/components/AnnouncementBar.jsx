import { useState, useEffect } from 'react'
import { ANNOUNCEMENTS } from '../data/products'

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIdx(i => (i + 1) % ANNOUNCEMENTS.length); setVisible(true) }, 350)
    }, 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="ann" role="marquee" aria-live="polite">
      <button className="ann-prev" onClick={() => setIdx(i => (i - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)} aria-label="Previous">‹</button>
      <span className={`ann-txt${visible ? ' in' : ''}`}>{ANNOUNCEMENTS[idx]}</span>
      <button className="ann-next" onClick={() => setIdx(i => (i + 1) % ANNOUNCEMENTS.length)} aria-label="Next">›</button>
    </div>
  )
}
