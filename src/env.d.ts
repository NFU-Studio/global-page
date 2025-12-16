/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

import type Lenis from "lenis";

declare global {
  interface Window {
    lenis: Lenis;
  }
}
