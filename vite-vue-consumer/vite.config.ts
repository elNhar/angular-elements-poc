import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat web components as custom elements to avoid warnings in Vue
          isCustomElement: (tag) => tag.startsWith('wc-'),
        },
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
