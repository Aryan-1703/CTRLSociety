export default function CartDrawer({
  open, onClose,
  cartItems, cartQty, cartSubtotal, cartTotal, cartCurrency, cartLoading,
  onUpdateQty, onRemove, onCheckout, onHover,
}) {
  const sym = cartCurrency === 'GBP' ? '£' : '$'
  const hasDiscount = cartSubtotal !== cartTotal

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-bg${open ? ' show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`cart-panel${open ? ' show' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="cart-hd">
          <div className="cart-hd-left">
            <span className="cart-ttl">Your Bag</span>
            {cartQty > 0 && <span className="cart-count">{cartQty} {cartQty === 1 ? 'item' : 'items'}</span>}
          </div>
          <button className="cart-xb" onClick={onClose} aria-label="Close bag">✕</button>
        </div>

        {/* Loading bar */}
        {cartLoading && <div className="cart-progress"><div className="cart-progress-bar" /></div>}

        {/* Body */}
        <div className="cart-bdy">
          {cartItems.length === 0 ? (
            <div className="cart-emp">
              <div className="cart-ei">
                <svg width="42" height="42" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.25">
                  <path d="M14 10V6a4 4 0 00-8 0v4" strokeLinecap="round" /><rect x="1" y="9" width="18" height="12" rx="2" />
                </svg>
              </div>
              <p className="cart-et">Your bag is empty</p>
              <button className="btn btn-d" style={{ fontSize: '.65rem' }} onClick={onClose}>
                Start Shopping →
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.lineId} className="cart-rw">
                {item.img
                  ? <img src={item.img} alt={item.imgAlt || item.name} className="cart-rw-img" />
                  : <div className="cart-rw-img cart-rw-img-ph" />
                }
                <div className="cart-rw-body">
                  <div className="cart-rw-name">{item.name}</div>
                  {item.variant && <div className="cart-rw-meta">{item.variant}</div>}
                  <div className="cart-rw-price">{sym}{item.price.toFixed(2)}</div>

                  {/* Quantity controls */}
                  <div className="cart-qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() => item.qty > 1 ? onUpdateQty(item.lineId, item.qty - 1) : onRemove(item.lineId)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="cart-qty-val">{item.qty}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.lineId, item.qty + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                </div>
                <div className="cart-rw-right">
                  <div className="cart-rw-total">{sym}{item.lineTotal.toFixed(2)}</div>
                  <button className="cart-rm" onClick={() => onRemove(item.lineId)} aria-label={`Remove ${item.name}`}>
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-ft">
            {hasDiscount && (
              <div className="cart-line">
                <span className="cart-tl">Subtotal</span>
                <span className="cart-tv-sm">{sym}{cartSubtotal.toFixed(2)}</span>
              </div>
            )}
            <div className="cart-tot">
              <span className="cart-tl">Total</span>
              <span className="cart-tv">{sym}{cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart-note">Taxes and shipping calculated at checkout</p>
            <button
              className="btn btn-d cart-checkout-btn"
              onClick={onCheckout}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              Checkout via Shopify →
            </button>
            <button
              className="btn btn-o cart-continue-btn"
              onClick={onClose}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
