# CTRL Society — React + Shopify Storefront

Custom React 19 / Vite storefront with full Shopify Storefront API integration.

---

## Quick Start

```bash
npm install
cp .env.example .env   # then fill in your Shopify token
npm run dev
```

---

## Connecting Shopify (5 minutes)

### Step 1 — Get your Storefront API token

1. Go to **Shopify Admin → Settings → Apps → Develop apps**
2. Click **Create an app** → name it "CTRL Society Storefront"
3. Click **Configuration** tab → find **Storefront API integration** → click **Edit**
4. Enable these permissions:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_write_checkouts`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_read_selling_plans`
5. **Save** → **Install app**
6. Go to **API credentials** tab → copy the **Storefront API access token**

### Step 2 — Add to .env

```env
VITE_SHOPIFY_DOMAIN=ctrlsociety.ca
VITE_SHOPIFY_TOKEN=paste_your_token_here
```

### Step 3 — Add products in Shopify Admin

Go to **Products → Add product** and tag your products:
- Tag `new` → shows NEW badge
- Tag `limited` → shows LIMITED badge (red)
- Tag `set` → shows SET badge
- Tag `sale` → shows SALE badge (green)

Upload **at least 2 images per product** (front + back for the hover-swap effect).

Add **variants** (sizes: S / M / L / XL / XXL) for the size selector to appear.

### Step 4 — Inventory management

Just update inventory in **Shopify Admin → Products → [product] → Inventory**.
The website automatically reflects stock levels — sold out variants are greyed out,
fully sold-out products show "Sold Out" overlay.

---

## Project Structure

```
src/
  components/
    CTRLSociety.jsx     ← main orchestrator
    AnnouncementBar.jsx
    Navbar.jsx          ← search bar + mobile drawer
    Hero.jsx
    Collection.jsx      ← filter pills + product grid
    ProductCard.jsx     ← size selector + quick view button
    QuickView.jsx       ← product modal with images + add to bag
    Campaign.jsx
    Lookbook.jsx
    About.jsx
    Newsletter.jsx
    Footer.jsx
    CartDrawer.jsx      ← quantity controls + checkout
    Toasts.jsx
  data/
    products.js         ← local images, copy, nav links
  hooks/
    useShopify.js       ← products, cart, checkout logic
    useReveal.js        ← scroll reveal
  lib/
    shopify.js          ← Storefront API client + GraphQL queries
  styles/
    global.css
  assets/               ← place 1.jpeg–11.jpeg here
```

---

## Features

- ✅ Shopify Storefront API — live products, inventory, pricing
- ✅ Cart persists across page refreshes (localStorage)
- ✅ Quantity +/- controls in cart
- ✅ Quick View modal per product
- ✅ Size selector (auto-shows when variants exist)
- ✅ Sold out detection (variant + product level)
- ✅ Product filter pills (ALL / NEW / LIMITED / SET / SALE)
- ✅ Skeleton loading state
- ✅ Image hover swap (front → back)
- ✅ Shopify hosted checkout
- ✅ Toast notifications (success + error)
- ✅ Custom cursor
- ✅ Scroll reveal animations
- ✅ Mobile responsive (hamburger menu)
- ✅ Environment variable security (.env)

---

## Deployment

```bash
npm run build   # outputs to /dist
```

Deploy `/dist` to **Vercel**, **Netlify**, or any static host.

For Vercel: set the environment variables in **Project Settings → Environment Variables**.

---

## Local Images

Place your product images in `src/assets/`:
- `1.jpeg` → `11.jpeg`

These are used as the Hero, Campaign, About, and Lookbook images.
Product card images come from Shopify once connected.
