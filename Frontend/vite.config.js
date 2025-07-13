import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
import { resolve } from 'path'
import { copyFileSync } from 'fs'

// ✅ Custom plugin to copy _redirects into dist
const copyRedirectsPlugin = () => ({
  name: 'copy-redirects',
  closeBundle() {
    copyFileSync(resolve(__dirname, 'public/_redirects'), resolve(__dirname, 'dist/_redirects'))
  }
})

export default defineConfig({
  plugins: [react(),tailwindcss(),copyRedirectsPlugin ()],
    base:'/',
  build: {
       outDir: 'dist',
       chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    }
})
