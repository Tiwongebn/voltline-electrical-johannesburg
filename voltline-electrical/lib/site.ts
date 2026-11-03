/**
 * Single source of truth for business details.
 * Edit this file to rebrand the whole template – every page, the footer,
 * the metadata and the JSON-LD schema read from here.
 *
 * Localised for Johannesburg, South Africa. All values below are PLACEHOLDERS.
 */
export const siteConfig = {
  // ⚡ Replace with the client's business name
  name: "Voltline Electrical",
  legalName: "Voltline Electrical (Pty) Ltd",
  tagline: "Registered electricians in Johannesburg. On time. Upfront pricing.",
  description:
    "Registered Johannesburg electricians for residential, commercial and emergency work. Certificates of Compliance (CoC), DB board upgrades, solar and backup power, EV chargers and 24/7 call-outs with upfront pricing.",
  // Replace with the production domain (used for canonical URLs & schema)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.co.za",

  phone: "011 555 0123",
  // tel: links must contain digits (and an optional +) only
  phoneHref: "tel:+27115550123",
  // WhatsApp click-to-chat: https://wa.me/<country code + number, digits only>
  whatsappHref: "https://wa.me/27825550123",
  email: "hello@example.co.za",

  address: {
    street: "12 Example Road",
    suburb: "Sandton",
    city: "Johannesburg",
    region: "Gauteng",
    postalCode: "2196",
    country: "ZA",
  },

  // Replace with the real registration details (shown in the footer & About page)
  licenceNumber: "DEL registration no. 0000000",
  founded: 2009,

  /** Shown in safety notices. 112 works from any cell phone in South Africa. */
  emergencyNumbers: "112 (from a cell phone) or 10177",

  hours: [
    { days: "Monday – Friday", time: "07:00 – 17:00" },
    { days: "Saturday", time: "08:00 – 13:00" },
    { days: "Emergency call-outs", time: "24 hours, 7 days a week" },
  ],

  // Used on the home page, footer, contact page and in schema.org areaServed
  serviceAreas: [
    "Sandton",
    "Randburg",
    "Fourways",
    "Bryanston",
    "Rosebank",
    "Parktown",
    "Melville",
    "Northcliff",
    "Roodepoort",
    "Midrand",
    "Bedfordview",
    "Edenvale",
  ],
  // Plain-English boundary shown in disclaimers
  serviceRadius: "across Johannesburg, within roughly 40 km of Sandton",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
