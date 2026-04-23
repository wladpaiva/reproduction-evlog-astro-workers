// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import evlog from "evlog/vite";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  vite: {
    plugins: [
      evlog({
        service: "website",
      }),
    ],
  },
});
