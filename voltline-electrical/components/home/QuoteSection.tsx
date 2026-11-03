import { Siren } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { SafetyDisclaimer } from "@/components/ui/SafetyDisclaimer";
import { QuoteForm } from "@/components/quote/QuoteForm";

/**
 * Fast-quote section right under the hero: emergency callout, a plain-English
 * "load shedding or a fault?" helper, the safety notice and the 2-step widget.
 */
export function QuoteSection() {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="scroll-mt-32 border-b border-ink"
    >
      <Container className="grid gap-10 py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:py-20">
        <div className="space-y-6">
          <h2 id="quote-heading" className="text-3xl font-extrabold leading-[1.05] sm:text-[44px]">
            Request a fixed quote
          </h2>
          <p className="max-w-[40ch] text-lg">
            Tell us what is wrong and where you are. We reply with a price before anyone picks up a
            tool.
          </p>

          {/* Emergency callout */}
          <a
            href={siteConfig.phoneHref}
            className="flex items-start gap-3 border-2 border-stamp bg-sheet p-4 text-stamp transition-colors hover:bg-stamp hover:text-white"
          >
            <Siren className="mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
            <span>
              <strong className="block text-lg">Electrical emergency? Call, don&apos;t type.</strong>
              <span className="block">
                {siteConfig.phone}, answered 24/7. Fire, smoke or a shock? Call{" "}
                {siteConfig.emergencyNumbers} first.
              </span>
            </span>
          </a>

          <p className="max-w-[44ch] text-[16.5px]">
            <strong>Load shedding or a fault?</strong> Check whether your neighbours are dark too. If
            only your property is, the fault is on your side and we should take a look.
          </p>

          <SafetyDisclaimer compact />
        </div>

        <QuoteForm variant="widget" />
      </Container>
    </section>
  );
}
