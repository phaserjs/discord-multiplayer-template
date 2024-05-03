import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    envDir: "../../",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            phaser: ["phaser"],
          },
        },
      },
    },
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      hmr: {
        clientPort: 443, // for dev: 3000, for production: 443
      },
    },
  });
};
