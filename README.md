# CTRL Society — React Storefront

## Setup

1. Install dependencies:
   npm install

2. Add your product images to src/assets/ (named 1.jpeg through 11.jpeg)

3. Connect Shopify (optional but recommended):
   Open src/lib/shopify.js and fill in:
   - SHOPIFY_STORE_DOMAIN  → your-store.myshopify.com
   - SHOPIFY_STOREFRONT_TOKEN → from Shopify Admin > Settings > Apps > Develop apps

4. Run locally:
   npm run dev

5. Build for production:
   npm run build

## Project Structure

src/
  components/     → All UI components
  data/           → Product data & local images
  hooks/          → useShopify, useCart, useReveal
  lib/            → Shopify Storefront API client
  styles/         → global.css (all styles)
  assets/         → Place 1.jpeg–11.jpeg here

## Shopify Integration

To get your Storefront API token:
1. Shopify Admin → Settings → Apps → Develop apps → Create an app
2. Configuration → Storefront API → Enable:
   ✅ unauthenticated_read_product_listings
   ✅ unauthenticated_write_checkouts
   ✅ unauthenticated_read_checkouts
3. Save → Install app
4. API credentials → Copy Storefront API access token
5. Paste into src/lib/shopify.js

## Files to DELETE from your project (duplicates)
- src/components/App.jsx
- src/components/main.jsx
