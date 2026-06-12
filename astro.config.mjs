// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

export default defineConfig({
  adapter: vercel(),
  output: "server",

  vite: {
    server: {
      allowedHosts: ["tephritic-mari-breezy.ngrok-free.dev"],
    },
    plugins: [tailwindcss()],
  },
});