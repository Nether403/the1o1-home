/**
 * M4 — self-hosted font pipeline via next/font.
 *
 * Replaces the Google Fonts CDN: latin-subset woff2 served from our own
 * origin, size-adjusted fallback metrics generated per face (CLS guard),
 * zero third-party requests.
 *
 * Preload strategy: no explicit font preloads. The opening register is
 * randomized, so every face uses `display: swap` and is discovered through
 * actual CSS usage. Browser tests measure requests; `preload: false` is not
 * described as viewport-based lazy loading.
 */
import {
  Archivo,
  Archivo_Black,
  Baloo_2,
  Bodoni_Moda,
  IBM_Plex_Mono,
  Inter,
  Michroma,
  Oswald,
  Playfair_Display,
} from "next/font/google";

/* — spine faces — */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

/* — world display faces — */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
});
export const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
  preload: false,
});
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  preload: false,
});
export const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  preload: false,
});
export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  preload: false,
});
export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});
export const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
  preload: false,
});

export const fontVariables = [
  inter.variable,
  plexMono.variable,
  archivo.variable,
  archivoBlack.variable,
  bodoni.variable,
  baloo.variable,
  oswald.variable,
  playfair.variable,
  michroma.variable,
].join(" ");
