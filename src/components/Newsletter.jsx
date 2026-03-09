import { useState } from 'react'

export default function Newsletter({ onHover }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) return
    setLoading(true)
    // TODO: wire to your email platform (Klaviyo, Mailchimp, etc.)
    await new Promise(r => setTimeout(r, 800))
    setDone(true)
    setLoading(false)
  }

  return (
    <section className="news" aria-label="Newsletter signup">
      <div className="reveal">
        <div className="sec-lbl" style={{ justifyContent: 'center', marginBottom: '.75rem' }}>
          Stay Connected
        </div>
        <h2 className="sec-h">JOIN THE CTRL</h2>
        <p className="news-sub-text">First access to drops. No noise. Just CTRL.</p>
      </div>

      {done ? (
        <p className="news-ok reveal">✓ You&apos;re in. Welcome to the CTRL.</p>
      ) : (
        <div className="news-form reveal d1">
          <input
            className="news-in"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            aria-label="Email address"
          />
          <button
            className={`news-sub${loading ? ' loading' : ''}`}
            onClick={handleSubmit}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            disabled={loading}
          >
            {loading ? '…' : 'Subscribe'}
          </button>
        </div>
      )}
    </section>
  )
}
