import { useState, useCallback } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])
  const [toasts, setToasts] = useState([])

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      return existing
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }]
    })
    const id = Date.now()
    setToasts((prev) => [...prev, { id, msg: `Added — ${product.name}` }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200)
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const cartQty = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return { cart, addToCart, removeFromCart, cartQty, cartTotal, toasts }
}
