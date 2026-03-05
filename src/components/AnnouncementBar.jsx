import { useState, useEffect } from 'react'
import { ANNOUNCEMENTS } from '../data/products'

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="ann">
      <span key={idx} className="ann-txt">
        {ANNOUNCEMENTS[idx]}
      </span>
    </div>
  )
}
