import { siteConfig } from "./site";
import { services } from "./services";

/**
 * schema.org JSON-LD for a local electrician (type: Electrician, a subtype of
 * LocalBusiness). Rendered once in the root layout via <JsonLd />.
 *
 * NOTE: We deliberately do NOT output aggregateRating / review markup.
 * Marking up placeholder or unverifiable reviews breaches Google's structured
 * data guidelines. Add it only when it reflects real, on-page customer reviews.
 */
export function buildElectricianSchema() {
  const { address } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    email: siteConfig.email,
    foundingDate: String(siteConfig.founded),
    priceRange: "$$",
    currenciesAccepted: "ZAR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.suburb}`,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    // The city itself plus each suburb we list (helps "electrician in <suburb>" searches)
    areaServed: [
      { "@type": "City", name: address.city },
      ...siteConfig.serviceAreas.map((name) => ({
        "@type": "Place",
        name: `${name}, ${address.city}`,
      })),
    ],
    // Open 24 hours for emergency call-outs
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: `${siteConfig.url}/services/${s.slug}`,
        },
      })),
    },
  };
}

/** Per-service Service schema for /services/[slug] pages. */
export function buildServiceSchema(slug: string) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: siteConfig.serviceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
  };
}

/** FAQPage schema – only valid when the FAQs are visible on the page. */
export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
