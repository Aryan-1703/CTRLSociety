import { useState } from "react";

export default function ProductCard({ product, onAdd, onHover, delay }) {
	const sizes = product.variants?.filter(v => v.availableForSale) || [];
	const [selectedVariant, setSelectedVariant] = useState(
		sizes[0]?.id || product.selectedVariantId,
	);

	const handleAdd = () => {
		onAdd(product, selectedVariant);
	};

	return (
		<div
			className={`pc reveal d${delay}`}
			onMouseEnter={() => onHover(true)}
			onMouseLeave={() => onHover(false)}
		>
			<div className="pc-img">
				{product.tag && (
					<span className={`pc-tag${product.tag === "LIMITED" ? " r" : ""}`}>
						{product.tag}
					</span>
				)}
				<img className="pc-front" src={product.img} alt={product.name} loading="lazy" />
				{product.img2 && (
					<img className="pc-back" src={product.img2} alt={product.name} loading="lazy" />
				)}
				{product.sold && <div className="pc-sold">Sold Out</div>}
				{!product.sold && (
					<button className="pc-atc" onClick={handleAdd}>
						+ Add to Bag
					</button>
				)}
			</div>

			<div className="pc-info">
				<div className="pc-name">{product.name}</div>
				<div className="pc-row">
					<span className="pc-price">
						{product.currency === "GBP" ? "£" : product.currency + " "}
						{product.price.toFixed(2)}
					</span>
					{product.colors && (
						<div className="swatches">
							{product.colors.map(c => (
								<span key={c} className="swatch" style={{ background: c }} />
							))}
						</div>
					)}
				</div>

				{/* Size selector — shown if product has named variants (not just "Default Title") */}
				{sizes.length > 1 && sizes[0].title !== "Default Title" && (
					<div className="pc-sizes">
						{sizes.map(v => (
							<button
								key={v.id}
								className={`size-btn${selectedVariant === v.id ? " on" : ""}`}
								onClick={e => {
									e.stopPropagation();
									setSelectedVariant(v.id);
								}}
								onMouseEnter={() => onHover(true)}
								onMouseLeave={() => onHover(false)}
							>
								{v.title}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
