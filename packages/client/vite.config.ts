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
        "/.proxy/assets":{
                target: "http://localhost:3000/assets",
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/.proxy\/assets/, ''),
        },
        "/.proxy/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/.proxy\/api/, ""),
        }
      },
      hmr: {
        clientPort: 3000,
      },
    },
  });
};
