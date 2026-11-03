import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Info, Phone } from "lucide-react";
import { getServiceBySlug, services } from "@/lib/services";
import { buildFaqSchema, buildServiceSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SafetyDisclaimer } from "@/components/ui/SafetyDisclaimer";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { QuoteForm } from "@/components/quote/QuoteForm";

// Next.js 15+: route params are a Promise
type Props = { params: Promise<{ slug: string }> };

// Pre-render every service page at build time (static, fast, SEO-friendly)
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Unknown slugs 404 instead of rendering on demand
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} in Johannesburg`,
    description: `${service.summary} ${siteConfig.name}: registered Johannesburg electricians, upfront pricing, call ${siteConfig.phone}.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${service.title} | ${siteConfig.name}`, url: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const serviceSchema = buildServiceSchema(service.slug);

  return (
    <>
      {serviceSchema && <JsonLd data={serviceSchema} />}
      <JsonLd data={buildFaqSchema(service.faqs)} />

      <PageHero
        title={service.title}
        lead={service.summary}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />

      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:py-20">
        {/* ───────── Main content ───────── */}
        <div className="space-y-12">
          <section aria-labelledby="overview">
            <h2 id="overview" className="flex items-center gap-3 text-2xl font-extrabold">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-ink">
                <ServiceIcon name={service.icon} className="h-5 w-5" />
              </span>
              Overview
            </h2>
            <p className="mt-4 text-xl leading-relaxed">{service.intro}</p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[13.5px] font-medium text-copper">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {service.typicalTimeframe}
            </p>
          </section>

          <section aria-labelledby="scope" className="border-t border-ink pt-8">
            <h2 id="scope" className="text-2xl font-extrabold">
              What&apos;s included
            </h2>
            <ul className="mt-4">
              {service.scope.map((item) => (
                <li key={item} className="relative border-t border-ink/35 py-3 pl-8 text-[17.5px]">
                  <span
                    aria-hidden="true"
                    className="absolute left-1 top-[1.2rem] h-0.5 w-3.5 bg-copper shadow-[0_5px_0_#9A3E0C]"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 border border-ink bg-sheet/90 p-4">
              <p className="flex items-center gap-2 font-mono text-[13px] font-medium">
                <Info className="h-4 w-4" aria-hidden="true" /> Good to know
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-[15.5px]">
                {service.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="process" className="border-t border-ink pt-8">
            <h2 id="process" className="text-2xl font-extrabold">
              How it works
            </h2>
            <ol className="mt-6 space-y-5">
              {service.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink bg-sheet font-mono font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="text-ink/80">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="faq" className="border-t border-ink pt-8">
            <h2 id="faq" className="text-2xl font-extrabold">
              Frequently asked questions
            </h2>
            <div className="mt-4 divide-y divide-ink border border-ink bg-sheet/90">
              {service.faqs.map((f) => (
                <details key={f.q} className="group p-4">
                  <summary className="cursor-pointer list-none font-bold marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span aria-hidden="true" className="font-mono text-xl text-copper transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <SafetyDisclaimer />

          <section aria-labelledby="other" className="border-t border-ink pt-8">
            <h2 id="other" className="text-xl font-extrabold">
              Other services
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/services/${o.slug}`}
                    className="inline-block border-2 border-ink bg-sheet px-4 py-2 text-[15.5px] font-semibold hover:bg-ink hover:text-white"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ───────── Sticky quote column ───────── */}
        <aside className="lg:sticky lg:top-32 lg:self-start" aria-label="Request a quote">
          <div id="quote" className="scroll-mt-32">
            <QuoteForm variant="widget" defaultService={service.quoteService} title="Get a fast quote" />
          </div>
          <a href={siteConfig.phoneHref} className="btn-outline mt-4 w-full">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Prefer to talk? Call {siteConfig.phone}
          </a>
        </aside>
      </Container>
    </>
  );
}
