import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { SafetyDisclaimer } from "@/components/ui/SafetyDisclaimer";
import { QuoteForm } from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Contact & Request a Quote in Johannesburg",
  description: `Call ${siteConfig.phone} for 24/7 emergency electricians in Johannesburg, WhatsApp us, or request a free quote online. ${siteConfig.name} serves ${siteConfig.serviceAreas.slice(0, 4).join(", ")} and surrounding suburbs.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { address } = siteConfig;

  return (
    <>
      <PageHero
        title="Contact us"
        lead="Call for emergencies, or send the form below and we'll come back to you with a clear, upfront quote."
        crumbs={[{ label: "Contact" }]}
      />

      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:py-20">
        {/* ───────── Contact details ───────── */}
        <div className="space-y-7">
          {/* Emergency dispatch notice */}
          <div className="border-2 border-stamp bg-sheet p-6 text-stamp">
            <h2 className="flex items-center gap-2 text-xl font-extrabold">
              <Siren className="h-6 w-6" aria-hidden="true" />
              Emergency dispatch
            </h2>
            <p className="mt-2 text-ink">
              For power loss, burning smells, sparking or exposed wiring,{" "}
              <strong>please phone, don&apos;t use the form</strong>. Calls are answered 24/7 and the
              nearest electrician is dispatched immediately.
            </p>
            <a href={siteConfig.phoneHref} className="btn mt-4 border-stamp bg-stamp text-white hover:bg-white hover:text-stamp">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {siteConfig.phone}
            </a>
            <p className="mt-3 text-sm text-ink">
              If there is fire or smoke, or someone has been shocked, call{" "}
              {siteConfig.emergencyNumbers} first.
            </p>
          </div>

          <address className="not-italic">
            <ul className="space-y-4">
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[13px] font-medium">Phone</p>
                  <a href={siteConfig.phoneHref} className="text-lg font-bold underline underline-offset-4">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[13px] font-medium">WhatsApp</p>
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg underline underline-offset-4"
                  >
                    Message us on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[13px] font-medium">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-lg underline underline-offset-4">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[13px] font-medium">Office</p>
                  <p className="text-lg">
                    {address.street}, {address.suburb}
                    <br />
                    {address.city}, {address.region}, {address.postalCode}
                  </p>
                </div>
              </li>
            </ul>
          </address>

          {/* Operating hours */}
          <section aria-labelledby="hours" className="border border-ink bg-sheet/90 p-6">
            <h2 id="hours" className="flex items-center gap-2 text-lg font-extrabold">
              <Clock className="h-5 w-5 text-copper" aria-hidden="true" />
              Operating hours
            </h2>
            <dl className="mt-4 divide-y divide-ink/30 text-base">
              {siteConfig.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-2.5">
                  <dt className="font-semibold">{h.days}</dt>
                  <dd className="text-right font-mono text-sm">{h.time}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="areas">
            <h2 id="areas" className="text-lg font-extrabold">
              Where we work
            </h2>
            <p className="mt-2">{siteConfig.serviceAreas.join(", ")}.</p>
          </section>

          <SafetyDisclaimer />
        </div>

        {/* ───────── Full service-request form ───────── */}
        <div id="quote" className="scroll-mt-32 lg:sticky lg:top-32 lg:self-start">
          <h2 className="mb-4 text-2xl font-extrabold">Request a free quote</h2>
          <QuoteForm variant="full" />
        </div>
      </Container>
    </>
  );
}
