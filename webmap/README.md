# Simple MapLibre Webmap Skeleton

Minimal starter project for a webmap using MapLibre GL JS and local GeoJSON data.

## Quick start

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Project structure

- `index.html` app shell
- `src/main.js` map setup, GeoJSON source/layers, hover + click interactivity
- `src/style.css` full-screen map layout + small overlay header
- `public/data/sample.geojson` sample data (replace with your own)

## Use your own GeoJSON

1. Replace `public/data/sample.geojson` with your file.
2. Ensure each feature has a unique `id` (required for hover state).
3. Update properties like `name` and `description` used in popup HTML.
