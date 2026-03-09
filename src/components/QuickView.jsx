import { useState, useEffect } from 'react'

export default function QuickView({ product, onClose, onAdd, onHover }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find(v => v.availableForSale)?.id || product.selectedVariantId
  )
  const [activeImg, setActiveImg] = useState(0)
  const [adding, setAdding] = useState(false)

  const selectedVar = product.variants?.find(v => v.id === selectedVariant)
  const price = selectedVar?.price ?? product.price
  const currency = product.currency

  const sym = currency === 'GBP' ? '£' : '$'
  const hasNamedSizes = product.variants?.length > 1 && product.variants?.[0]?.title !== 'Default Title'

  // Close on escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAdd = async () => {
    if (adding || product.sold) return
    setAdding(true)
    await onAdd(product, selectedVariant)
    setAdding(false)
    onClose()
  }

  const images = product.images?.length > 0 ? product.images : [product.img, product.img2].filter(Boolean)

  return (
    <div className="qv-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="qv-panel" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="qv-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Images */}
        <div className="qv-imgs">
          <div className="qv-main-img">
            {images[activeImg]
              ? <img src={images[activeImg]} alt={product.name} />
              : <div className="qv-img-ph" />
            }
            {product.tag && (
              <span className={`pc-tag${product.tag === 'LIMITED' ? ' r' : ''}`}>{product.tag}</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="qv-thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`qv-thumb${activeImg === i ? ' on' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  <img src={src} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="qv-info">
          <div className="qv-meta">
            {product.tag && <span className="qv-tag-lbl">{product.tag}</span>}
          </div>
          <h2 className="qv-name">{product.name}</h2>
          <div className="qv-price">{sym}{price.toFixed(2)}</div>

          {product.description && (
            <p className="qv-desc">{product.description}</p>
          )}

          {/* Size selector */}
          {hasNamedSizes && (
            <div className="qv-sizes">
              <div className="qv-sizes-lbl">Size</div>
              <div className="qv-sizes-grid">
                {product.variants.map(v => (
                  <button
                    key={v.id}
                    className={`size-btn${selectedVariant === v.id ? ' on' : ''}${!v.availableForSale ? ' oos' : ''}`}
                    onClick={() => v.availableForSale && setSelectedVariant(v.id)}
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}
                    disabled={!v.availableForSale}
                    title={!v.availableForSale ? 'Out of stock' : ''}
                    aria-pressed={selectedVariant === v.id}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to bag */}
          <div className="qv-actions">
            {product.sold ? (
              <button className="btn btn-o" disabled style={{ opacity: 0.5, width: '100%', justifyContent: 'center' }}>
                Sold Out
              </button>
            ) : (
              <button
                className={`btn btn-d${adding ? ' loading' : ''}`}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleAdd}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                disabled={adding}
              >
                {adding ? 'Adding…' : '+ Add to Bag'}
              </button>
            )}
          </div>

          <div className="qv-footnote">
            Free shipping on orders over $100 &nbsp;·&nbsp; Easy returns
          </div>
        </div>
      </div>
    </div>
  )
}
