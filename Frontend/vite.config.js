import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const copyRedirectsPlugin = () => ({
  name: 'copy-redirects',
  closeBundle() {
    const src = resolve(__dirname, 'public/_redirects');
    const dest = resolve(__dirname, 'dist/_redirects');
    if (existsSync(src)) {
      copyFileSync(src, dest);
      console.log("✅ _redirects copied to dist/");
    } else {
      console.warn("❌ _redirects not found");
    }
  }
});

export default defineConfig({
  plugins: [react(), tailwindcss(), copyRedirectsPlugin()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];
          }
        }
      }
    }
  }
});
