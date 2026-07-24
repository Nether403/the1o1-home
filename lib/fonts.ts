/**
 * M4 — self-hosted font pipeline via next/font.
 *
 * Replaces the Google Fonts CDN: latin-subset woff2 served from our own
 * origin, size-adjusted fallback metrics generated per face (CLS guard),
 * zero third-party requests.
 *
 * Preload strategy: the two SPINE faces (Inter, IBM Plex Mono) appear in
 * every world from first paint, so they preload. World display faces
 * can't be statically predicted (THE DEAL randomizes the hero), so they
 * load on demand with `display: swap` — the semantic content is never
 * blocked on a display face.
 */
import {
  Archivo,
  Archivo_Black,
  Baloo_2,
  Bodoni_Moda,
  IBM_Plex_Mono,
  Inter,
  Oswald,
  Playfair_Display,
} from "next/font/google";

/* — spine faces: preloaded — */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: true,
});

/* — world display faces: on-demand, swap — */
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

export const fontVariables = [
  inter.variable,
  plexMono.variable,
  archivo.variable,
  archivoBlack.variable,
  bodoni.variable,
  baloo.variable,
  oswald.variable,
  playfair.variable,
].join(" ");
