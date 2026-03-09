import { useState } from "react";

export default function Newsletter({ onHover }) {
	const [email, setEmail] = useState("");
	const [done, setDone] = useState(false);

	const handleSubmit = () => {
		if (email.trim()) setDone(true);
	};

	return (
		<section className="news">
			<div className="reveal">
				<div
					className="sec-lbl"
					style={{ justifyContent: "center", marginBottom: ".75rem" }}
				>
					Stay Connected
				</div>
				<h2 className="sec-h">JOIN THE CTRL</h2>
				<p
					style={{
						color: "var(--mid)",
						fontSize: ".8rem",
						marginTop: ".75rem",
						letterSpacing: ".05em",
						lineHeight: 1.85,
					}}
				>
					First access to drops. No noise. Just CTRL.
				</p>
			</div>

			{done ? (
				<p className="news-ok reveal">✓ You&apos;re in. Welcome to the CTRL.</p>
			) : (
				<div className="news-form reveal d1">
					<input
						className="news-in"
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={e => setEmail(e.target.value)}
						onKeyDown={e => e.key === "Enter" && handleSubmit()}
					/>
					<button
						className="news-sub"
						onClick={handleSubmit}
						onMouseEnter={() => onHover(true)}
						onMouseLeave={() => onHover(false)}
					>
						Subscribe
					</button>
				</div>
			)}
		</section>
	);
}
