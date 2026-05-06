import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/weather-api': {
        target: 'https://devapi.qweather.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather-api/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            proxyReq.setHeader('Referer', 'https://lingzhiwu.com');
            proxyReq.setHeader('Origin', 'https://lingzhiwu.com');
          });
        },
      },
    },
  },
});
