import { useState, useEffect } from 'react'
import '../styles/global.css'

import { useCart } from '../hooks/useCart'
import { useReveal } from '../hooks/useReveal'

import AnnouncementBar from './AnnouncementBar'
import Navbar          from './Navbar'
import Hero            from './Hero'
import Collection      from './Collection'
import Campaign        from './Campaign'
import Lookbook        from './Lookbook'
import About           from './About'
import Newsletter      from './Newsletter'
import Footer          from './Footer'
import CartDrawer      from './CartDrawer'
import Toasts          from './Toasts'

export default function CTRLSociety() {
  const [scrolled,    setScrolled]    = useState(false)
  const [cartOpen,    setCartOpen]    = useState(false)
  const [cursor,      setCursor]      = useState({ x: -100, y: -100 })
  const [cursorHover, setCursorHover] = useState(false)

  const { cart, addToCart, removeFromCart, cartQty, cartTotal, toasts } = useCart()

  // Sticky nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Custom cursor
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Initial reveal pass
  useReveal([])

  return (
    <>
      {/* Custom cursor dot */}
      <div
        className={`cur${cursorHover ? ' hov' : ''}`}
        style={{ left: cursor.x, top: cursor.y }}
      />

      <AnnouncementBar />

      <Navbar
        scrolled={scrolled}
        cartQty={cartQty}
        onCartOpen={() => setCartOpen(true)}
        onHover={setCursorHover}
      />

      <main>
        <Hero      onHover={setCursorHover} />
        <Collection onAdd={addToCart} onHover={setCursorHover} />
        <Campaign  onAdd={addToCart} onHover={setCursorHover} />
        <Lookbook  onHover={setCursorHover} />
        <About     onHover={setCursorHover} />
        <Newsletter onHover={setCursorHover} />
      </main>

      <Footer onHover={setCursorHover} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartQty={cartQty}
        cartTotal={cartTotal}
        onRemove={removeFromCart}
      />

      <Toasts toasts={toasts} />
    </>
  )
}
