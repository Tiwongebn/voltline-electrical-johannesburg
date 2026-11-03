import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { SupplyDiagram } from "./SupplyDiagram";

/**
 * Above-the-fold section: the value proposition and the supply diagram.
 * Pure server component so the headline paints immediately. The fast-quote
 * widget follows directly underneath (see QuoteSection).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-ink">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-12 lg:py-16">
        <div>
          <h1
            id="hero-heading"
            className="text-[38px] font-extrabold leading-[1.04] sm:text-5xl lg:text-[60px]"
          >
            From the meter to your plug points, done properly.
          </h1>

          <p className="mt-6 max-w-[44ch] text-xl">
            Registered Johannesburg electricians for DB boards, backup power, Certificates of
            Compliance and 24/7 emergencies. A fixed price before we start.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={siteConfig.phoneHref} className="btn-primary !px-6 !text-lg">
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {siteConfig.phone}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !px-6 !text-lg"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>

          <p className="mt-6 max-w-[46ch] text-[15.5px]">
            Advice by phone or photo never replaces an on-site safety inspection by a registered
            electrician.
          </p>
        </div>

        <SupplyDiagram />
      </Container>
    </section>
  );
}
