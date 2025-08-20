# Vite React Consumer - wc-carousel

This app demonstrates consuming the Angular Elements web component `<wc-carousel>` from the producer server.

## Prerequisites
- Producer server running at http://localhost:4000
  - From `angular-elements-producer`, run: `npm run serve:cdn:build`

## Run
```bash
npm install
npm run dev
```

Then open http://localhost:5174.

The page mounts `<wc-carousel>` and sets its properties from React using `useEffect` after `customElements.whenDefined('wc-carousel')`.
