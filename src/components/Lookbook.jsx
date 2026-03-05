import { useRef } from "react";
import { LOOKBOOK } from "../data/products";

export default function Lookbook({ onHover }) {
	const scrollRef = useRef(null);

	const scroll = dir =>
		scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

	return (
		<section id="lookbook" className="sec-sm">
			<div className="lookbook-header">
				<div className="reveal">
					<div className="sec-lbl">Lookbook</div>
					<h2 className="sec-h" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>
						FW25 EDITORIAL
					</h2>
				</div>
				<div className="reveal d2" style={{ display: "flex", gap: ".5rem" }}>
					{[-1, 1].map(d => (
						<button
							key={d}
							className="arr-btn"
							onClick={() => scroll(d)}
							onMouseEnter={() => onHover(true)}
							onMouseLeave={() => onHover(false)}
							aria-label={d === -1 ? "Previous" : "Next"}
						>
							{d === -1 ? "←" : "→"}
						</button>
					))}
				</div>
			</div>

			<div className="look-scroll" ref={scrollRef}>
				{LOOKBOOK.map((src, i) => (
					<div
						key={i}
						className="look-item"
						onMouseEnter={() => onHover(true)}
						onMouseLeave={() => onHover(false)}
					>
						<span className="look-num">0{i + 1}</span>
						<img src={src} alt={`Editorial look ${i + 1}`} loading="lazy" />
					</div>
				))}
			</div>
		</section>
	);
}
