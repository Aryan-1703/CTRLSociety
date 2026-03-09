import { CAMPAIGN_IMG } from '../data/products'

export default function Campaign({ products, onAdd, onHover }) {
  // Use the second Shopify product if available, else a placeholder
  const featuredProduct = products?.[1] || null

  return (
    <section className="camp" aria-label="Campaign">
      <div className="camp-img">
        {CAMPAIGN_IMG
          ? <img src={CAMPAIGN_IMG} alt="Warrior Edition Campaign" loading="lazy" />
          : <div className="camp-img-ph" />
        }
      </div>
      <div className="camp-body">
        <div className="reveal">
          <p className="camp-lbl">Warrior Edition</p>
          <h2 className="camp-h">
            FOR THOSE<br />WHO LEAD,<br />NOT<br /><span>FOLLOW.</span>
          </h2>
          <p className="camp-p">
            The Warrior Edition honours discipline, grit, and the mindset of those who
            forge their own path. Limited units. No restocks.
          </p>
          {featuredProduct ? (
            <button
              className="btn btn-r"
              onClick={() => onAdd(featuredProduct, featuredProduct.selectedVariantId)}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              Shop {featuredProduct.name} →
            </button>
          ) : (
            <button
              className="btn btn-r"
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
            >
              Shop Warrior Edition →
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
