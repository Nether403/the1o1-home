import type { Metadata } from "next";
import Script from "next/script";
import { DEAL_SCRIPT } from "@/lib/deal";
import { fontVariables } from "@/lib/fonts";
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
 * M4 notes:
 * - Fonts are self-hosted latin subsets via next/font (lib/fonts.ts):
 *   spine faces preload, world display faces swap in on demand. No
 *   third-party font requests remain.
 * - THE DEAL runs beforeInteractive so <html data-hero> exists pre-paint;
 *   suppressHydrationWarning covers the attribute React doesn't manage.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body>
        <Script id="the-deal" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: DEAL_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
