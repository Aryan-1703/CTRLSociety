import { useState } from "react";
import { NAV_CATS } from "../data/products";

export default function Navbar({ scrolled, cartQty, onCartOpen, onHover }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	const scrollTo = id => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setMobileOpen(false);
	};

	return (
		<>
			<header className={`nav${scrolled ? " up" : ""}`}>
				<div className="nav-inner">
					{/* Logo */}
					<a
						className="logo"
						href="#"
						onClick={e => {
							e.preventDefault();
							scrollTo("hero");
						}}
					>
						CTRL<sup>®</sup> SOCIETY
					</a>

					{/* Desktop links */}
					<ul className="nav-links">
						{NAV_CATS.map(cat => (
							<li key={cat}>
								<a
									href="#"
									onClick={e => {
										e.preventDefault();
										scrollTo("collection");
									}}
								>
									{cat}
								</a>
							</li>
						))}
					</ul>

					{/* Actions */}
					<div className="nav-right">
						<button className="nav-act">Search</button>
						<button
							className="nav-act"
							onClick={onCartOpen}
							onMouseEnter={() => onHover(true)}
							onMouseLeave={() => onHover(false)}
						>
							Bag {cartQty > 0 && <span className="chip">{cartQty}</span>}
						</button>
						<button
							className={`ham${mobileOpen ? " x" : ""}`}
							onClick={() => setMobileOpen(v => !v)}
							aria-label="Toggle menu"
						>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>

			{/* Mobile drawer */}
			<div
				className={`mob-bg${mobileOpen ? " show" : ""}`}
				onClick={() => setMobileOpen(false)}
			/>
			<div className={`mob-drawer${mobileOpen ? " show" : ""}`}>
				<button className="mob-x" onClick={() => setMobileOpen(false)}>
					✕
				</button>
				{NAV_CATS.map(cat => (
					<a key={cat} className="mob-link" onClick={() => scrollTo("collection")}>
						{cat}
					</a>
				))}
			</div>
		</>
	);
}
