export default function CartDrawer({ open, onClose, cartItems, cartQty, cartTotal, onRemove, onCheckout }) {
  return (
    <>
      <div className={`cart-bg${open ? ' show' : ''}`} onClick={onClose} />

      <div className={`cart-panel${open ? ' show' : ''}`} role="dialog" aria-label="Shopping bag">
        {/* Header */}
        <div className="cart-hd">
          <span className="cart-ttl">Your Bag ({cartQty})</span>
          <button className="cart-xb" onClick={onClose} aria-label="Close bag">✕</button>
        </div>

        {/* Body */}
        <div className="cart-bdy">
          {cartItems.length === 0 ? (
            <div className="cart-emp">
              <div className="cart-ei">○</div>
              <p className="cart-et">Your bag is empty</p>
              <button className="btn btn-d" style={{ fontSize: '.62rem' }} onClick={onClose}>
                Continue Shopping →
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.lineId} className="cart-rw">
                {item.img && <img src={item.img} alt={item.name} />}
                <div style={{ flex: 1 }}>
                  <div className="cart-rw-name">{item.name}</div>
                  {item.variant && <div className="cart-rw-meta">{item.variant}</div>}
                  <div className="cart-rw-meta">Qty: {item.qty}</div>
                  <div className="cart-rw-price">£{(item.price * item.qty).toFixed(2)}</div>
                  <button className="cart-rm" onClick={() => onRemove(item.lineId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-ft">
            <div className="cart-tot">
              <span className="cart-tl">Total</span>
              <span className="cart-tv">£{cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-d"
              style={{ width: '100%', justifyContent: 'center', marginBottom: '.6rem' }}
              onClick={onCheckout}
            >
              Checkout via Shopify →
            </button>
            <button
              className="btn btn-o"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
