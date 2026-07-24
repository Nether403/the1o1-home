import type { Metadata } from "next";
import Script from "next/script";
import { DEAL_SCRIPT } from "@/lib/deal";
import "./globals.css";

export const metadata: Metadata = {
  title: "the1o1.one — The House of Every Style",
  description:
    "Martin van Deursen — design & consultancy. Every style imaginable, made high-end. One standard.",
  metadataBase: new URL("https://the1o1.one"),
  openGraph: {
    title: "the1o1.one — The House of Every Style",
    description: "We don't have a style. We have a standard.",
    url: "https://the1o1.one",
    type: "website",
    images: [{ url: "/og/deal", width: 1200, height: 630, alt: "the1o1.one — six worlds, one standard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "the1o1.one — The House of Every Style",
    description: "We don't have a style. We have a standard.",
    images: ["/og/deal"],
  },
};

/**
 * M1 notes:
 * - Fonts stay on the Google Fonts CDN <link> for exact v1 parity.
 *   M4 replaces this with per-world subset woff2 via the font pipeline.
 * - THE DEAL runs beforeInteractive so <html data-hero> exists pre-paint;
 *   suppressHydrationWarning covers the attribute React doesn't manage.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-m1-pending="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Black&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400;1,6..96,500&family=IBM+Plex+Mono:wght@400;500;600&family=Baloo+2:wght@500;600;700;800&family=Oswald:wght@300;400;500;600&family=Playfair+Display:ital,wght@1,400;1,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script id="the-deal" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: DEAL_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
