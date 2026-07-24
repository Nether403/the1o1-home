import type { Metadata } from "next";
import Script from "next/script";
import { DEAL_SCRIPT } from "@/lib/deal";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "the1o1.one — Product Design & Engineering",
  description:
    "Martin van Deursen helps founders and product leaders clarify difficult bets, make them tangible, and launch systems built to learn.",
  metadataBase: new URL("https://the1o1.one"),
  openGraph: {
    title: "the1o1.one — Product Design & Engineering",
    description: "We don't have a style. We have a standard.",
    url: "https://the1o1.one",
    type: "website",
    images: [{ url: "/og/deal", width: 1200, height: 630, alt: "the1o1.one — six core worlds, one active guest, one standard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "the1o1.one — Product Design & Engineering",
    description: "We don't have a style. We have a standard.",
    images: ["/og/deal"],
  },
};

/**
 * Fonts are self-hosted through next/font; browser tests guard the static
 * fallback and prohibit third-party font requests.
 * - THE DEAL runs beforeInteractive so <html data-hero> exists pre-paint;
 *   suppressHydrationWarning covers the attribute React doesn't manage.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-hero="swiss" suppressHydrationWarning className={fontVariables}>
      <body>
        <Script id="the-deal" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: DEAL_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
