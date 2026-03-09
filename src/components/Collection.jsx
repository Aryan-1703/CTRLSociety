import { useState } from "react";
import { FILTERS } from "../data/products";
import ProductCard from "./ProductCard";
import { useReveal } from "../hooks/useReveal";

export default function Collection({ products, loading, onAdd, onHover }) {
	const [activeFilter, setActiveFilter] = useState("ALL");

	const filtered = products.filter(p => activeFilter === "ALL" || p.tag === activeFilter);

	useReveal([activeFilter, loading]);

	return (
		<section id="collection" className="sec">
			{/* Header */}
			<div className="collection-header">
				<div className="reveal">
					<div className="sec-lbl">The Drop</div>
					<h2 className="sec-h">LATEST COLLECTION</h2>
				</div>
				<div className="reveal d2 collection-controls">
					<div className="pills">
						{FILTERS.map(f => (
							<button
								key={f}
								className={`pill${activeFilter === f ? " on" : ""}`}
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
						style={{ fontSize: ".62rem" }}
						onMouseEnter={() => onHover(true)}
						onMouseLeave={() => onHover(false)}
					>
						View All Products →
					</button>
				</div>
			</div>

			{/* Loading state */}
			{loading && (
				<div className="collection-loading">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="pc-skeleton" />
					))}
				</div>
			)}

			{/* Grid */}
			{!loading && (
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
					{filtered.length === 0 && (
						<div className="no-results">No products in this category yet.</div>
					)}
				</div>
			)}
		</section>
	);
}
