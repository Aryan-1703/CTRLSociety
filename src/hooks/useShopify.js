import { useState, useEffect, useCallback } from "react";
import {
	shopifyFetch,
	GET_PRODUCTS,
	CREATE_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART,
} from "../lib/shopify";

// ─── Helpers ──────────────────────────────────────────────────────

function parseProducts(data) {
	return data.products.edges.map(({ node }) => {
		const images = node.images.edges.map(e => e.node.url);
		const variants = node.variants.edges.map(e => e.node);
		const tags = node.tags || [];

		// Map Shopify tags to our filter system
		let tag = null;
		if (tags.includes("new")) tag = "NEW";
		if (tags.includes("limited")) tag = "LIMITED";
		if (tags.includes("set")) tag = "SET";

		return {
			id: node.id,
			handle: node.handle,
			name: node.title,
			price: parseFloat(node.priceRange.minVariantPrice.amount),
			currency: node.priceRange.minVariantPrice.currencyCode,
			tag,
			img: images[0] || null,
			img2: images[1] || images[0] || null,
			variants,
			sold: variants.every(v => !v.availableForSale),
			// Default to first available variant
			selectedVariantId: variants.find(v => v.availableForSale)?.id || variants[0]?.id,
		};
	});
}

function parseCart(cart) {
	const items = cart.lines.edges.map(({ node }) => ({
		lineId: node.id,
		qty: node.quantity,
		variantId: node.merchandise.id,
		name: node.merchandise.product.title,
		variant: node.merchandise.title !== "Default Title" ? node.merchandise.title : null,
		price: parseFloat(node.merchandise.price.amount),
		img: node.merchandise.product.images.edges[0]?.node.url || null,
	}));
	return {
		id: cart.id,
		checkoutUrl: cart.checkoutUrl,
		items,
		total: parseFloat(cart.cost.totalAmount.amount),
		qty: items.reduce((s, i) => s + i.qty, 0),
	};
}

// ─── Hook ─────────────────────────────────────────────────────────

export function useShopify() {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState(null); // parsed cart object
	const [cartId, setCartId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [toasts, setToasts] = useState([]);
	const [error, setError] = useState(null);

	// ── Load products on mount ───────────────────────────────────────
	useEffect(() => {
		shopifyFetch(GET_PRODUCTS, { first: 24 })
			.then(data => setProducts(parseProducts(data)))
			.catch(err => {
				console.error("Shopify products error:", err);
				setError(err.message);
			})
			.finally(() => setLoading(false));
	}, []);

	// ── Toast helper ─────────────────────────────────────────────────
	const toast = useCallback(msg => {
		const id = Date.now();
		setToasts(prev => [...prev, { id, msg }]);
		setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
	}, []);

	// ── Add to cart ──────────────────────────────────────────────────
	const addToCart = useCallback(
		async (product, variantId) => {
			const vid = variantId || product.selectedVariantId;
			if (!vid) return;

			try {
				if (!cartId) {
					// Create a new Shopify cart
					const data = await shopifyFetch(CREATE_CART, {
						lines: [{ merchandiseId: vid, quantity: 1 }],
					});
					const parsed = parseCart(data.cartCreate.cart);
					setCartId(parsed.id);
					setCart(parsed);
				} else {
					// Add to existing cart
					const data = await shopifyFetch(ADD_TO_CART, {
						cartId,
						lines: [{ merchandiseId: vid, quantity: 1 }],
					});
					setCart(parseCart(data.cartLinesAdd.cart));
				}
				toast(`Added — ${product.name}`);
			} catch (err) {
				console.error("Add to cart error:", err);
				toast("Something went wrong. Try again.");
			}
		},
		[cartId, toast],
	);

	// ── Remove from cart ─────────────────────────────────────────────
	const removeFromCart = useCallback(
		async lineId => {
			if (!cartId) return;
			try {
				const data = await shopifyFetch(REMOVE_FROM_CART, {
					cartId,
					lineIds: [lineId],
				});
				setCart(parseCart(data.cartLinesRemove.cart));
			} catch (err) {
				console.error("Remove from cart error:", err);
			}
		},
		[cartId],
	);

	// ── Go to Shopify checkout ───────────────────────────────────────
	const checkout = useCallback(() => {
		if (cart?.checkoutUrl) {
			window.location.href = cart.checkoutUrl;
		}
	}, [cart]);

	return {
		products,
		loading,
		error,
		cart,
		cartQty: cart?.qty ?? 0,
		cartTotal: cart?.total ?? 0,
		cartItems: cart?.items ?? [],
		addToCart,
		removeFromCart,
		checkout,
		toasts,
	};
}
