// ─── Local image imports (1.jpeg – 11.jpeg) ─────────────────────
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.jpeg";
import img6 from "../assets/6.jpeg";
import img7 from "../assets/7.jpeg";
import img8 from "../assets/8.jpeg";
import img9 from "../assets/9.jpeg";
import img10 from "../assets/10.jpeg";
import img11 from "../assets/11.jpeg";

// ─── Products ───────────────────────────────────────────────────
export const PRODUCTS = [
	{
		id: 1,
		name: "Doberman Signature Hoodie",
		price: 89,
		tag: "NEW",
		colors: ["#F2F0EB", "#1A1917", "#2D4A2D"],
		img: img1,
		img2: img7,
		sold: false,
	},
	{
		id: 2,
		name: "Warrior Edition Hoodie",
		price: 95,
		tag: "LIMITED",
		colors: ["#2D4A2D", "#1A1917"],
		img: img5,
		img2: img6,
		sold: false,
	},
	{
		id: 3,
		name: "Arabic Calligraphy Hoodie",
		price: 92,
		tag: null,
		colors: ["#1A1917"],
		img: img2,
		img2: img4,
		sold: false,
	},
	{
		id: 4,
		name: "Triple Doberman Hoodie",
		price: 89,
		tag: null,
		colors: ["#F2F0EB"],
		img: img3,
		img2: img8,
		sold: false,
	},
	{
		id: 5,
		name: "CTRL Core Tracksuit — Forest",
		price: 149,
		tag: "SET",
		colors: ["#2D4A2D"],
		img: img9,
		img2: img6,
		sold: false,
	},
	{
		id: 6,
		name: "CTRL Core Tracksuit — Black",
		price: 149,
		tag: "SET",
		colors: ["#1A1917"],
		img: img10,
		img2: img4,
		sold: false,
	},
	{
		id: 7,
		name: "CTRL Core Tracksuit — All Colours",
		price: 149,
		tag: "NEW",
		colors: ["#4A3728", "#2D4A2D", "#1A1917"],
		img: img11,
		img2: img9,
		sold: false,
	},
	{
		id: 8,
		name: "CTRL Society Hoodie — White",
		price: 75,
		tag: null,
		colors: ["#F2F0EB", "#1A1917"],
		img: img7,
		img2: img8,
		sold: false,
	},
];

// ─── Lookbook ───────────────────────────────────────────────────
export const LOOKBOOK = [img1, img2, img3, img5, img9, img11];

// ─── Editorial singles ──────────────────────────────────────────
export const HERO_IMG = img4; // front-facing hoodie shot
export const CAMPAIGN_IMG = img5; // warrior green hoodie back
export const ABOUT_IMG = img11; // three models lineup

// ─── Static copy ────────────────────────────────────────────────
export const ANNOUNCEMENTS = [
	"FREE SHIPPING ON ORDERS OVER £75  •  USE CODE: CTRL25",
	"NEW DROP: WARRIOR EDITION — LIMITED UNITS REMAINING",
	"FW25 COLLECTION NOW LIVE — SHOP THE FULL DROP",
];

export const NAV_CATS = [
	"NEW IN",
	"HOODIES",
	"TRACKSUITS",
	"TOPS",
	"ACCESSORIES",
	"SALE",
];

export const FILTERS = ["ALL", "NEW", "LIMITED", "SET"];
