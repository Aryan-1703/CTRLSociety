import { HERO_IMG } from '../data/products'

export default function Hero({ onHover }) {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* Left — image */}
      <div className="hero-l">
        {HERO_IMG
          ? <img src={HERO_IMG} alt="CTRL Society FW25 — Take The CTRL" priority="true" />
          : <div className="hero-l-placeholder" aria-hidden="true" />
        }
        <span className="hero-badge">FW25 — Now Available</span>
      </div>

      {/* Right — editorial */}
      <div className="hero-r">
        <p className="hero-eyebrow">Control · Discipline · Identity</p>

        <div className="hero-mid">
          <h1 className="hero-h1">
            TAKE<br />THE<br /><em>CTRL.</em>
          </h1>
          <p className="hero-p">
            It&#39;s not just clothing. It&#39;s a mindset worn by those who move with
            intention and define culture — not consume it.
          </p>
          <div className="hero-btns">
            <button
              className="btn btn-d"
              onClick={() => scrollTo('collection')}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              Shop the Drop →
            </button>
            <button
              className="btn btn-o"
              onClick={() => scrollTo('lookbook')}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              Lookbook
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {[['FW25', 'Season'], ['100%', 'Independent'], ['Limited', 'Each Drop']].map(([n, l]) => (
            <div key={l} className="hero-stat">
              <div className="stat-n">{n}</div>
              <div className="stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
