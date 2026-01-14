// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import i18nSettings from "./project.inlang/settings.json";

/**
 * @type {Array<{ pattern: string, localized: Array<[import("./src/paraglide/runtime").Locale, string]> }>}
 */
const urlPatterns = [
  {
    pattern: "/",
    localized: [
      ["pl", "/"],
      ["en", "/en/"],
    ],
  },
  {
    pattern: "/cennik/",
    localized: [
      ["pl", "/cennik/"],
      ["en", "/pricing/"],
    ],
  },
];

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
        urlPatterns,
      }),
    ],
  },
  i18n: {
    defaultLocale: i18nSettings.baseLocale,
    locales: i18nSettings.locales,
  },
  integrations: [sitemap(), react()],
  experimental: {
    fonts: [
      {
        cssVariable: "--font-syne",
        name: "Syne",
        provider: fontProviders.fontsource(),
        weights: ["400 800"],
        subsets: ["latin", "latin-ext"],
      },
      {
        cssVariable: "--font-manrope",
        name: "Manrope",
        provider: fontProviders.fontsource(),
        weights: ["200 800"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },
});
