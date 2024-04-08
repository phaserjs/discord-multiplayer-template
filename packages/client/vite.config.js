import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  build: {
    rollupOptions: {
        output: {
            manualChunks: {
                phaser: ['phaser']
            }
        }
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 5173, // for development: 5173, for production: 443
    },
  },
});
