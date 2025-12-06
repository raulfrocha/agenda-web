import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/agenda-web/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "AgendeWeb",
        short_name: "AgendeWeb",
        start_url: "/agenda-web/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        icons: [
          {
            src: "/agenda-web/icons/icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/agenda-web/icons/icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
});
