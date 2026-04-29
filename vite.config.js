import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use relative asset paths so GitHub Pages works both under /bracelet-designer/
  // and when previewed from the generated dist folder.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
});
