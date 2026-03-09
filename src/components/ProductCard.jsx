import { useState } from 'react'

function formatPrice(price, currency = 'CAD') {
  const sym = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : '$'
  return `${sym}${price.toFixed(2)}`
}

export default function ProductCard({ product, onAdd, onQuickView, onHover, delay = 1 }) {
  const sizes = product.variants?.filter(v => v.availableForSale) ?? []
  const hasNamedSizes = sizes.length > 1 && sizes[0]?.title !== 'Default Title'

  const [selectedVariant, setSelectedVariant] = useState(
    sizes[0]?.id || product.selectedVariantId
  )
  const [adding, setAdding] = useState(false)

  const selectedVar = product.variants?.find(v => v.id === selectedVariant)
  const price = selectedVar?.price ?? product.price
  const compareAt = selectedVar?.compareAtPrice ?? null
  const isOnSale = compareAt && compareAt > price

  const handleAdd = async e => {
    e.stopPropagation()
    if (adding || product.sold) return
    setAdding(true)
    await onAdd(product, selectedVariant)
    setAdding(false)
  }

  return (
    <article
      className={`pc reveal d${delay}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={() => onQuickView && onQuickView(product)}
    >
      <div className="pc-img">
        {/* Tags */}
        {product.tag && (
          <span className={`pc-tag${product.tag === 'LIMITED' ? ' r' : product.tag === 'SALE' ? ' sale' : ''}`}>
            {product.tag}
          </span>
        )}

        {/* Images */}
        {product.img
          ? <img className="pc-front" src={product.img} alt={product.name} loading="lazy" />
          : <div className="pc-front pc-img-ph" />
        }
        {product.img2 && product.img2 !== product.img && (
          <img className="pc-back" src={product.img2} alt={product.name} loading="lazy" />
        )}

        {/* Sold out overlay */}
        {product.sold && <div className="pc-sold">Sold Out</div>}

        {/* Add to bag slide-up */}
        {!product.sold && (
          <button
            className={`pc-atc${adding ? ' loading' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to bag`}
          >
            {adding ? 'Adding…' : '+ Add to Bag'}
          </button>
        )}

        {/* Quick view on hover */}
        <button
          className="pc-qv"
          onClick={e => { e.stopPropagation(); onQuickView && onQuickView(product) }}
          aria-label={`Quick view ${product.name}`}
        >
          Quick View
        </button>
      </div>

      <div className="pc-info">
        <div className="pc-name">{product.name}</div>
        <div className="pc-row">
          <div className="pc-prices">
            <span className="pc-price">{formatPrice(price, product.currency)}</span>
            {isOnSale && <span className="pc-compare">{formatPrice(compareAt, product.currency)}</span>}
          </div>
          {product.options?.find(o => o.name === 'Color') && (
            <div className="swatches" aria-label="Colors">
              {product.options.find(o => o.name === 'Color')?.values.slice(0, 4).map(c => (
                <span key={c} className="swatch" title={c} style={{ background: c.toLowerCase() }} />
              ))}
            </div>
          )}
        </div>

        {/* Size selector */}
        {hasNamedSizes && (
          <div className="pc-sizes" role="group" aria-label="Select size" onClick={e => e.stopPropagation()}>
            {product.variants.map(v => (
              <button
                key={v.id}
                className={`size-btn${selectedVariant === v.id ? ' on' : ''}${!v.availableForSale ? ' oos' : ''}`}
                onClick={e => { e.stopPropagation(); v.availableForSale && setSelectedVariant(v.id) }}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                disabled={!v.availableForSale}
                title={!v.availableForSale ? 'Out of stock' : v.title}
                aria-pressed={selectedVariant === v.id}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
