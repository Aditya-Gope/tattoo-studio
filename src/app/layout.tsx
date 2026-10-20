import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { seo, studio } from "@/lib/content";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/layout/PageIntro";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

/* ─── Fonts ─────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-brand",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-brand",
  display: "swap",
});

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

/* ─── Default metadata ──────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? seo.siteUrl ?? "http://localhost:3000"
  ),
  title: {
    default: seo.defaultTitle,
    template: `%s | ${studio.name}`,
  },
  description: seo.defaultDescription,
  openGraph: {
    type: "website",
    siteName: studio.name,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.defaultDescription,
  },
  robots: isDemoMode ? { index: false, follow: false } : { index: true, follow: true },
};

/* ─── Root layout ───────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body className="font-sans-brand bg-ink-black text-warm-bone antialiased">
        <PageIntro />
        <ScrollProgress />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        {isDemoMode && (
          <div className="fixed bottom-4 left-4 z-50 pointer-events-none bg-oxblood text-warm-bone px-3 py-1.5 rounded-sm font-mono-brand text-[0.65rem] tracking-widest uppercase shadow-lg shadow-black/50 border border-warm-bone/20">
            Concept Preview
          </div>
        )}
      </body>
    </html>
  );
}
