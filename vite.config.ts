import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3044,
    proxy: {
      "/api": {
        target: "http://192.168.10.122:5555",
        changeOrigin: true,
      },
      "/hubs": {
        target: "http://192.168.10.122:5555",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

// 改天來學