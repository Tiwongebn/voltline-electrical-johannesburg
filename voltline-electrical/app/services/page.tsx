import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SafetyDisclaimer } from "@/components/ui/SafetyDisclaimer";

export const metadata: Metadata = {
  title: "Electrical Services in Johannesburg",
  description: `Residential, commercial and emergency electricians in Johannesburg: DB board upgrades, solar and backup power, EV chargers and Certificates of Compliance from ${siteConfig.name}. See exactly what's included in each job.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Electrical services"
        lead="Every service below includes a clear written scope, upfront pricing and a tested, certified finish."
        crumbs={[{ label: "Services" }]}
      />

      <Container className="space-y-6 py-14 lg:py-20">
        {services.map((s) => (
          <article
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-32 border border-ink bg-sheet/90 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            {/* Summary cell */}
            <div className="border-b border-ink p-7 lg:border-b-0 lg:border-r">
              <span className="flex h-11 w-11 items-center justify-center border-2 border-ink">
                <ServiceIcon name={s.icon} className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight">
                <Link
                  href={`/services/${s.slug}`}
                  className="underline-offset-4 hover:underline hover:decoration-copper hover:decoration-2"
                >
                  {s.title}
                </Link>
              </h2>
              <p className="mt-2">{s.summary}</p>
              <p className="mt-4 flex items-start gap-2 font-mono text-[13.5px] font-medium text-copper">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {s.typicalTimeframe}
              </p>
              <Link href={`/services/${s.slug}`} className="btn-primary mt-5">
                Details and quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Scope-of-work cell */}
            <div className="p-7">
              <h3 className="font-mono text-[13px] font-medium">Scope of work</h3>
              <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                {s.scope.map((item) => (
                  <li key={item} className="relative border-t border-ink/35 py-3 pl-8 text-[16.5px]">
                    <span
                      aria-hidden="true"
                      className="absolute left-1 top-[1.15rem] h-0.5 w-3.5 bg-copper shadow-[0_5px_0_#9A3E0C]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <SafetyDisclaimer />
      </Container>
    </>
  );
}
