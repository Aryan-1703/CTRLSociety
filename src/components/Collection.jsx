import { useState } from 'react'
import { PRODUCTS, FILTERS } from '../data/products'
import ProductCard from './ProductCard'
import { useReveal } from '../hooks/useReveal'

export default function Collection({ onAdd, onHover }) {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered = PRODUCTS.filter(
    (p) => activeFilter === 'ALL' || p.tag === activeFilter,
  )

  // Re-run reveal animations when filter changes and new cards mount
  useReveal([activeFilter])

  return (
    <section id="collection" className="sec">
      {/* Header row */}
      <div className="collection-header">
        <div className="reveal">
          <div className="sec-lbl">The Drop</div>
          <h2 className="sec-h">LATEST COLLECTION</h2>
        </div>
        <div className="reveal d2 collection-controls">
          <div className="pills">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`pill${activeFilter === f ? ' on' : ''}`}
                onClick={() => setActiveFilter(f)}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            className="btn btn-o"
            style={{ fontSize: '.62rem' }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
          >
            View All Products →
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="pgrid">
        {filtered.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={onAdd}
            onHover={onHover}
            delay={(i % 4) + 1}
          />
        ))}
      </div>
    </section>
  )
}
