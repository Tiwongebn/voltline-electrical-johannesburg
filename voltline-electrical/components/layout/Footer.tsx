import Link from "next/link";
import { Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/Section";

/** Small mono caption used inside the title block cells. */
function Cap({ children }: { children: string }) {
  return <span className="block font-mono text-[12.5px] text-ink/80">{children}</span>;
}

/**
 * Site footer, styled like the title block in the corner of a drawing:
 * CTA band, link columns, areas as a ruled grid, then the contractor block.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { address } = siteConfig;

  return (
    <footer className="border-t border-ink bg-sheet/90 pb-14 md:pb-0">
      {/* CTA band */}
      <div className="border-b border-ink">
        <Container className="flex flex-col items-start justify-between gap-5 py-9 sm:flex-row sm:items-center">
          <div>
            <p className="text-3xl font-extrabold leading-tight">Need an electrician today?</p>
            <p className="mt-1 text-lg text-ink/80">Call now or request a free, fixed-price quote.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={siteConfig.phoneHref} className="btn-primary">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <Link href="/contact#quote" className="btn-outline">
              Request a quote
            </Link>
          </div>
        </Container>
      </div>

      {/* Links + areas */}
      <Container className="grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)]">
        <nav aria-label="Footer">
          <h2 className="text-lg font-extrabold">Site</h2>
          <ul className="mt-3 space-y-2 text-[17px]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline hover:decoration-copper hover:decoration-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-lg font-extrabold">Services</h2>
          <ul className="mt-3 space-y-2 text-[17px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="underline-offset-4 hover:underline hover:decoration-copper hover:decoration-2"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-lg font-extrabold">Areas we cover</h2>
          <ul className="mt-3 grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area}>
                <Link
                  href="/contact#quote"
                  className="block border-b border-r border-ink bg-white px-3 py-2.5 text-base font-medium hover:bg-ink hover:text-white"
                >
                  {area}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-mono text-[13px]">Service available {siteConfig.serviceRadius}.</p>
        </div>
      </Container>

      {/* Title block */}
      <Container className="pb-8">
        <div className="grid gap-px border-2 border-ink bg-ink md:grid-cols-3">
          <div className="bg-sheet p-4">
            <Cap>Contractor</Cap>
            <span className="text-2xl font-extrabold leading-tight">{siteConfig.name}</span>
            <p className="text-base">Registered electricians, {address.city}</p>
          </div>
          <div className="bg-sheet p-4">
            <Cap>Registration</Cap>
            <p className="text-base">{siteConfig.licenceNumber}</p>
          </div>
          <div className="bg-sheet p-4">
            <Cap>Phone, 24/7</Cap>
            <a href={siteConfig.phoneHref} className="text-lg font-bold underline underline-offset-4">
              {siteConfig.phone}
            </a>
          </div>
          <div className="bg-sheet p-4">
            <Cap>Address</Cap>
            <address className="text-base not-italic">
              {address.street}, {address.suburb}, {address.city}, {address.postalCode}
            </address>
          </div>
          <div className="bg-sheet p-4">
            <Cap>Hours</Cap>
            <p className="text-base">
              {siteConfig.hours[0].days} {siteConfig.hours[0].time}
              <br />
              {siteConfig.hours[1].days} {siteConfig.hours[1].time}
              <br />
              Emergencies 24/7
            </p>
          </div>
          <div className="bg-sheet p-4">
            <Cap>Email and WhatsApp</Cap>
            <a href={`mailto:${siteConfig.email}`} className="block break-all text-base underline underline-offset-4">
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-base underline underline-offset-4"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-col justify-between gap-1 font-mono text-[12.5px] sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>Remote advice does not replace an on-site safety inspection.</p>
        </div>
      </Container>
    </footer>
  );
}
