# Vite + Vue Consumer for wc-carousel

This is a minimal Vue 3 app created with Vite that consumes the `<wc-carousel>` element produced by the Angular Elements producer.

## Prerequisites
- Producer server running at `http://localhost:4000` (from the `angular-elements-producer` project)

## Run locally
```bash
# In this vite-vue-consumer folder
npm install
npm run dev
```
Open http://localhost:5173 in your browser.

## Notes
- `index.html` includes the web component bundles from the producer:
  - `/elements/carousel/browser/polyfills.js`
  - `/elements/carousel/browser/main.js`
- The page mounts Vue and then configures the web component via properties in `App.vue`.
