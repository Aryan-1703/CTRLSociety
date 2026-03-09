import { useState, useEffect, useCallback, useRef } from 'react'
import {
  shopifyFetch,
  GET_PRODUCTS,
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINE,
  REMOVE_FROM_CART,
  GET_CART,
} from '../lib/shopify'

// ─── Parsers ──────────────────────────────────────────────────────────────────

export function parseProducts(data) {
  return data.products.edges.map(({ node }) => {
    const images = node.images.edges.map(e => e.node.url)
    const variants = node.variants.edges.map(e => ({
      id: e.node.id,
      title: e.node.title,
      availableForSale: e.node.availableForSale,
      quantityAvailable: e.node.quantityAvailable,
      price: parseFloat(e.node.price.amount),
      currency: e.node.price.currencyCode,
      compareAtPrice: e.node.compareAtPrice ? parseFloat(e.node.compareAtPrice.amount) : null,
      selectedOptions: e.node.selectedOptions,
    }))
    const tags = node.tags || []

    let tag = null
    if (tags.includes('new') || tags.includes('NEW')) tag = 'NEW'
    if (tags.includes('limited') || tags.includes('LIMITED')) tag = 'LIMITED'
    if (tags.includes('set') || tags.includes('SET')) tag = 'SET'
    if (tags.includes('sale') || tags.includes('SALE')) tag = 'SALE'

    return {
      id: node.id,
      handle: node.handle,
      name: node.title,
      description: node.description,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      maxPrice: parseFloat(node.priceRange.maxVariantPrice.amount),
      currency: node.priceRange.minVariantPrice.currencyCode,
      tag,
      tags,
      img: images[0] || null,
      img2: images[1] || images[0] || null,
      images,
      variants,
      options: node.options || [],
      sold: variants.every(v => !v.availableForSale),
      selectedVariantId: variants.find(v => v.availableForSale)?.id || variants[0]?.id,
    }
  })
}

export function parseCart(cart) {
  const items = cart.lines.edges.map(({ node }) => ({
    lineId: node.id,
    qty: node.quantity,
    variantId: node.merchandise.id,
    name: node.merchandise.product.title,
    variant: node.merchandise.title !== 'Default Title' ? node.merchandise.title : null,
    price: parseFloat(node.merchandise.price.amount),
    currency: node.merchandise.price.currencyCode,
    lineTotal: parseFloat(node.cost.totalAmount.amount),
    img: node.merchandise.product.images.edges[0]?.node.url || null,
    imgAlt: node.merchandise.product.images.edges[0]?.node.altText || '',
  }))
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    items,
    subtotal: parseFloat(cart.cost.subtotalAmount.amount),
    total: parseFloat(cart.cost.totalAmount.amount),
    currency: cart.cost.totalAmount.currencyCode,
    qty: items.reduce((s, i) => s + i.qty, 0),
  }
}

// ─── Cart persistence ─────────────────────────────────────────────────────────
const CART_ID_KEY = 'ctrl_cart_id'

function saveCartId(id) {
  try { localStorage.setItem(CART_ID_KEY, id) } catch {}
}
function loadCartId() {
  try { return localStorage.getItem(CART_ID_KEY) } catch { return null }
}
function clearCartId() {
  try { localStorage.removeItem(CART_ID_KEY) } catch {}
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useShopify() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState(null)
  const [cartId, setCartId] = useState(() => loadCartId())
  const [loading, setLoading] = useState(true)
  const [cartLoading, setCartLoading] = useState(false)
  const [toasts, setToasts] = useState([])
  const [error, setError] = useState(null)
  const toastCounter = useRef(0)

  // Load products
  useEffect(() => {
    shopifyFetch(GET_PRODUCTS, { first: 24 })
      .then(data => setProducts(parseProducts(data)))
      .catch(err => {
        console.error('Products error:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  // Restore cart from localStorage
  useEffect(() => {
    if (!cartId) return
    shopifyFetch(GET_CART, { cartId })
      .then(data => {
        if (data.cart) setCart(parseCart(data.cart))
        else { clearCartId(); setCartId(null) }
      })
      .catch(() => { clearCartId(); setCartId(null) })
  }, []) // eslint-disable-line

  // Toast helper
  const toast = useCallback((msg, type = 'success') => {
    const id = ++toastCounter.current
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  // Add to cart
  const addToCart = useCallback(async (product, variantId) => {
    const vid = variantId || product.selectedVariantId
    if (!vid) return
    setCartLoading(true)
    try {
      if (!cartId) {
        const data = await shopifyFetch(CREATE_CART, {
          lines: [{ merchandiseId: vid, quantity: 1 }],
        })
        const parsed = parseCart(data.cartCreate.cart)
        saveCartId(parsed.id)
        setCartId(parsed.id)
        setCart(parsed)
      } else {
        const data = await shopifyFetch(ADD_TO_CART, {
          cartId,
          lines: [{ merchandiseId: vid, quantity: 1 }],
        })
        setCart(parseCart(data.cartLinesAdd.cart))
      }
      toast(`Added — ${product.name}`)
    } catch (err) {
      console.error('Add to cart:', err)
      toast('Could not add item. Try again.', 'error')
    } finally {
      setCartLoading(false)
    }
  }, [cartId, toast])

  // Update quantity
  const updateQty = useCallback(async (lineId, quantity) => {
    if (!cartId) return
    if (quantity < 1) return
    setCartLoading(true)
    try {
      const data = await shopifyFetch(UPDATE_CART_LINE, {
        cartId,
        lines: [{ id: lineId, quantity }],
      })
      setCart(parseCart(data.cartLinesUpdate.cart))
    } catch (err) {
      console.error('Update qty:', err)
      toast('Could not update quantity.', 'error')
    } finally {
      setCartLoading(false)
    }
  }, [cartId, toast])

  // Remove from cart
  const removeFromCart = useCallback(async lineId => {
    if (!cartId) return
    setCartLoading(true)
    try {
      const data = await shopifyFetch(REMOVE_FROM_CART, {
        cartId,
        lineIds: [lineId],
      })
      const parsed = parseCart(data.cartLinesRemove.cart)
      setCart(parsed)
      if (parsed.qty === 0) { clearCartId(); setCartId(null); setCart(null) }
    } catch (err) {
      console.error('Remove from cart:', err)
      toast('Could not remove item.', 'error')
    } finally {
      setCartLoading(false)
    }
  }, [cartId, toast])

  // Checkout
  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl
  }, [cart])

  return {
    products,
    loading,
    error,
    cart,
    cartLoading,
    cartQty: cart?.qty ?? 0,
    cartTotal: cart?.total ?? 0,
    cartSubtotal: cart?.subtotal ?? 0,
    cartItems: cart?.items ?? [],
    cartCurrency: cart?.currency ?? 'CAD',
    addToCart,
    updateQty,
    removeFromCart,
    checkout,
    toasts,
  }
}
