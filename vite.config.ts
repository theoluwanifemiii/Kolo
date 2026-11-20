import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two entry points because the design uses two generations of the Kolo design system:
// v1 (cream, ink outlines) for onboarding; v2 (soft grey cards) for home, groups, receipts and emails.
// Their component classes share names (kl-btn, kl-pill...), so each page loads only its own bundle.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        onboarding: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'app.html'),
      },
    },
  },
});
