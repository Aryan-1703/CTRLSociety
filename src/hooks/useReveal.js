import { useEffect } from "react";

/**
 * Watches all .reveal elements and adds .in when they enter the viewport.
 * Re-runs when `deps` changes (e.g. when a filter changes and new cards mount).
 */
export function useReveal(deps = []) {
	useEffect(() => {
		const io = new IntersectionObserver(
			entries => {
				entries.forEach(e => {
					if (e.isIntersecting) e.target.classList.add("in");
				});
			},
			{ threshold: 0.1 },
		);
		document.querySelectorAll(".reveal").forEach(el => io.observe(el));
		return () => io.disconnect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}
