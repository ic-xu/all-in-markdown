
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // This ensures assets are loaded correctly in both web and electron
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      external: ['electron', 'path', 'fs', 'os']
    }
  }
});