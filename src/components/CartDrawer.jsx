export default function CartDrawer({ open, onClose, cart, cartQty, cartTotal, onRemove }) {
  return (
    <>
      <div className={`cart-bg${open ? ' show' : ''}`} onClick={onClose} />

      <div className={`cart-panel${open ? ' show' : ''}`} role="dialog" aria-label="Shopping bag">
        {/* Header */}
        <div className="cart-hd">
          <span className="cart-ttl">Your Bag ({cartQty})</span>
          <button className="cart-xb" onClick={onClose} aria-label="Close bag">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-bdy">
          {cart.length === 0 ? (
            <div className="cart-emp">
              <div className="cart-ei">○</div>
              <p className="cart-et">Your bag is empty</p>
              <button className="btn btn-d" style={{ fontSize: '.62rem' }} onClick={onClose}>
                Continue Shopping →
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-rw">
                <img src={item.img} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <div className="cart-rw-name">{item.name}</div>
                  <div className="cart-rw-meta">Qty: {item.qty}</div>
                  <div className="cart-rw-price">£{item.price * item.qty}</div>
                  <button className="cart-rm" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-ft">
            <div className="cart-tot">
              <span className="cart-tl">Total</span>
              <span className="cart-tv">£{cartTotal}</span>
            </div>
            <button className="btn btn-d" style={{ width: '100%', justifyContent: 'center', marginBottom: '.6rem' }}>
              Checkout →
            </button>
            <button className="btn btn-o" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
