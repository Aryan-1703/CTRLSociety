import { useState, useEffect } from 'react'
import '../styles/global.css'

import { useShopify } from '../hooks/useShopify'
import { useReveal } from '../hooks/useReveal'

import AnnouncementBar from './AnnouncementBar'
import Navbar from './Navbar'
import Hero from './Hero'
import Collection from './Collection'
import Campaign from './Campaign'
import Lookbook from './Lookbook'
import About from './About'
import Newsletter from './Newsletter'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import QuickView from './QuickView'
import Toasts from './Toasts'

export default function CTRLSociety() {
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: -200, y: -200 })
  const [cursorHover, setCursorHover] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [prevCartQty, setPrevCartQty] = useState(0)

  const {
    products, loading, error,
    cartQty, cartTotal, cartSubtotal, cartItems, cartCurrency, cartLoading,
    addToCart, updateQty, removeFromCart, checkout, toasts,
  } = useShopify()

  // Sticky nav shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Custom cursor
  useEffect(() => {
    const move = e => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Auto-open cart when item added
  useEffect(() => {
    if (cartQty > prevCartQty && cartQty > 0) setCartOpen(true)
    setPrevCartQty(cartQty)
  }, [cartQty]) // eslint-disable-line

  useReveal([])

  return (
    <>
      {/* Custom cursor */}
      <div
        className={`cur${cursorHover ? ' hov' : ''}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden="true"
      />

      <AnnouncementBar />

      <Navbar
        scrolled={scrolled}
        cartQty={cartQty}
        cartLoading={cartLoading}
        onCartOpen={() => setCartOpen(true)}
        onHover={setCursorHover}
      />

      <main>
        <Hero onHover={setCursorHover} />

        {error && (
          <div className="shopify-error">
            <strong>⚠ Shopify not connected</strong>
            <span>Add your <code>VITE_SHOPIFY_TOKEN</code> to <code>.env</code> to load live products.</span>
          </div>
        )}

        <Collection
          products={products}
          loading={loading}
          onAdd={addToCart}
          onQuickView={setQuickViewProduct}
          onHover={setCursorHover}
        />

        <Campaign products={products} onAdd={addToCart} onHover={setCursorHover} />
        <Lookbook onHover={setCursorHover} />
        <About onHover={setCursorHover} />
        <Newsletter onHover={setCursorHover} />
      </main>

      <Footer onHover={setCursorHover} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        cartQty={cartQty}
        cartSubtotal={cartSubtotal}
        cartTotal={cartTotal}
        cartCurrency={cartCurrency}
        cartLoading={cartLoading}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={checkout}
        onHover={setCursorHover}
      />

      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAdd={addToCart}
          onHover={setCursorHover}
        />
      )}

      <Toasts toasts={toasts} />
    </>
  )
}
