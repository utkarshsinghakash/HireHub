import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://hirehub-ho32.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    // Fix for buffer dependency
    "process.env": {},
  },
  optimizeDeps: {
    exclude: ["express", "buffer"],
  },
});
