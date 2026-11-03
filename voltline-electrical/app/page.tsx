import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ServiceSchedule } from "@/components/home/ServiceSchedule";
import { NotesAndAreas } from "@/components/home/NotesAndAreas";
import { Testimonials } from "@/components/home/Testimonials";
import { siteConfig } from "@/lib/site";

// Home page uses the default title from the root layout; only the description is tuned.
export const metadata: Metadata = {
  description: `${siteConfig.name}: registered Johannesburg electricians for emergency repairs, Certificates of Compliance, DB board upgrades, solar and backup power, and EV chargers. Upfront pricing. Call 24/7.`,
  alternates: { canonical: "/" },
};

/** Home page: independent, server-rendered sections laid out like a drawing sheet. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <ServiceSchedule />
      <NotesAndAreas />
      <Testimonials />
    </>
  );
}
