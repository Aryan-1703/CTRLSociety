export default function ProductCard({ product, onAdd, onHover, delay }) {
  return (
    <div
      className={`pc reveal d${delay}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="pc-img">
        {product.tag && (
          <span className={`pc-tag${product.tag === 'LIMITED' ? ' r' : ''}`}>
            {product.tag}
          </span>
        )}
        <img className="pc-front" src={product.img} alt={product.name} loading="lazy" />
        <img className="pc-back" src={product.img2} alt={product.name} loading="lazy" />
        {product.sold && <div className="pc-sold">Sold Out</div>}
        {!product.sold && (
          <button className="pc-atc" onClick={() => onAdd(product)}>
            + Add to Bag
          </button>
        )}
      </div>
      <div className="pc-info">
        <div className="pc-name">{product.name}</div>
        <div className="pc-row">
          <span className="pc-price">£{product.price}</span>
          <div className="swatches">
            {product.colors.map((c) => (
              <span key={c} className="swatch" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
