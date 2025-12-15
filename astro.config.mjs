// @ts-check

import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import i18nSettings from "./project.inlang/settings.json";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PROD ? "https://TEST.COM" : "http://localhost:4321",
  trailingSlash: "always", // Astro robi plik index.html per route więc <<< domyślnie "always"
  vite: {
    plugins: [
      tailwindcss(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
      }),
    ],
  },
  i18n: {
    defaultLocale: i18nSettings.baseLocale,
    locales: i18nSettings.locales,
  },
  integrations: [sitemap()],
});
