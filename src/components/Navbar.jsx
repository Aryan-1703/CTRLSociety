import { useState } from 'react'
import { NAV_LINKS } from '../data/products'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar({ scrolled, cartQty, cartLoading, onCartOpen, onHover }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  const handleNav = id => {
    scrollTo(id)
    setMobileOpen(false)
  }

  return (
    <>
      <header className={`nav${scrolled ? ' up' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <a className="logo" href="#" onClick={e => { e.preventDefault(); scrollTo('hero') }}>
            CTRL<sup>®</sup> SOCIETY
          </a>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, id }) => (
              <a
                key={label}
                href={`#${id}`}
                onClick={e => { e.preventDefault(); handleNav(id) }}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="nav-right">
            {/* Search */}
            <div className={`nav-search${searchOpen ? ' open' : ''}`}>
              {searchOpen ? (
                <input
                  className="nav-search-input"
                  autoFocus
                  placeholder="Search products..."
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                  onBlur={() => { if (!searchVal) setSearchOpen(false) }}
                />
              ) : (
                <button
                  className="nav-act"
                  onClick={() => setSearchOpen(true)}
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  aria-label="Search"
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="8.5" cy="8.5" r="6.5" /><path d="M13.5 13.5L18 18" strokeLinecap="round" />
                  </svg>
                  <span>Search</span>
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              className={`nav-act nav-cart${cartLoading ? ' loading' : ''}`}
              onClick={onCartOpen}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              aria-label={`Shopping bag${cartQty > 0 ? `, ${cartQty} items` : ''}`}
            >
              <svg width="15" height="15" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 10V6a4 4 0 00-8 0v4" strokeLinecap="round" />
                <rect x="1" y="9" width="18" height="12" rx="2" />
              </svg>
              <span>Bag</span>
              {cartQty > 0 && <span className="chip" aria-hidden="true">{cartQty}</span>}
            </button>

            {/* Hamburger */}
            <button
              className={`ham${mobileOpen ? ' x' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      <div className={`mob-bg${mobileOpen ? ' show' : ''}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile drawer */}
      <div className={`mob-drawer${mobileOpen ? ' show' : ''}`} role="dialog" aria-label="Mobile navigation">
        <button className="mob-x" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        <div className="mob-logo">CTRL<sup>®</sup></div>
        {NAV_LINKS.map(({ label, id }) => (
          <a key={label} className="mob-link" onClick={() => handleNav(id)} href={`#${id}`}>
            {label}
          </a>
        ))}
        <div className="mob-footer">
          <button className="btn btn-d" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { onCartOpen(); setMobileOpen(false) }}>
            Bag ({cartQty}) →
          </button>
        </div>
      </div>
    </>
  )
}
