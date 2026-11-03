import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
// Self-hosted fonts (no external requests): headings/body + monospace annotations
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { buildElectricianSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { EmergencyBar } from "@/components/layout/EmergencyBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";

/**
 * Root metadata. Child pages override `title` (the template adds the brand
 * suffix) and may extend `description`, `alternates`, etc.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Registered Electricians in Johannesburg – 24/7 Emergency Service`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Registered Electricians in Johannesburg`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Registered Electricians in Johannesburg`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  // Mobile click-to-call detection is handled explicitly with tel: links
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C2B4B",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA">
      <body className="min-h-screen p-2 sm:p-5">
        {/* Accessibility: lets keyboard users bypass the navigation */}
        <a
          href="#main"
          className="sr-only z-[60] border-2 border-ink bg-sheet px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        {/* The drafting-sheet frame: heavy outer rule, hairline inner rule */}
        <div className="border-2 border-ink p-1.5">
          <div className="flex min-h-[calc(100vh-2.75rem)] flex-col border border-ink">
            {/* Sticky: emergency strip + navigation stay visible while scrolling */}
            <div className="sticky top-0 z-50">
              <EmergencyBar />
              <Header />
            </div>

            <main id="main" className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </div>

        <MobileCallBar />

        {/* Local business structured data (Electrician) for the whole site */}
        <JsonLd data={buildElectricianSchema()} />
      </body>
    </html>
  );
}
