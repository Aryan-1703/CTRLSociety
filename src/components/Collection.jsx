import { useState, useMemo } from 'react'
import { FILTERS } from '../data/products'
import ProductCard from './ProductCard'
import { useReveal } from '../hooks/useReveal'

export default function Collection({ products, loading, onAdd, onQuickView, onHover }) {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filtered = useMemo(() =>
    products.filter(p => activeFilter === 'ALL' || p.tag === activeFilter),
    [products, activeFilter]
  )

  useReveal([activeFilter, loading, products.length])

  return (
    <section id="collection" className="sec">
      {/* Header */}
      <div className="collection-header">
        <div className="reveal">
          <div className="sec-lbl">The Drop</div>
          <h2 className="sec-h">LATEST COLLECTION</h2>
        </div>
        <div className="reveal d2 collection-controls">
          <div className="pills" role="group" aria-label="Filter products">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`pill${activeFilter === f ? ' on' : ''}`}
                onClick={() => setActiveFilter(f)}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="collection-count">
            {loading ? '—' : filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </span>
        </div>
      </div>

      {/* Skeleton loader */}
      {loading && (
        <div className="collection-loading" aria-busy="true" aria-label="Loading products">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="pc-skeleton" />
          ))}
        </div>
      )}

      {/* Product grid */}
      {!loading && (
        <div className="pgrid">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAdd}
              onQuickView={onQuickView}
              onHover={onHover}
              delay={(i % 4) + 1}
            />
          ))}
          {filtered.length === 0 && !loading && (
            <div className="no-results">
              No products in this category yet.
            </div>
          )}
        </div>
      )}
    </section>
  )
}
