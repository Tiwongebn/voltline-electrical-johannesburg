# Voltline Electrical – Next.js template (Johannesburg edition)

A multi-page, conversion-focused website template for electrical contractors,
localised for **Johannesburg, South Africa**.
Next.js (App Router) · TypeScript (strict) · Tailwind CSS 3 · Lucide icons.

## Johannesburg localisation

- SA terminology: DB boards, plug points, earth leakage, Certificate of Compliance (CoC), SANS 10142-1
- Services include **Solar, Inverter & Backup Power** (load shedding) and **CoC** pages, alongside DB board upgrades, EV chargers, residential, commercial and emergency work
- 12 Joburg suburbs as service areas (Sandton, Randburg, Fourways, Bryanston, Rosebank, …) – edit in `lib/site.ts`
- WhatsApp click-to-chat (hero, contact page, footer, mobile bar), SA emergency numbers (112 / 10177), `en-ZA` locale, ZAR in schema
- Local-SEO titles/descriptions include "Johannesburg"; JSON-LD lists the city and every suburb in `areaServed`
- All phone numbers, registration numbers, addresses and reviews are **placeholders**

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

### Starting from scratch instead (`create-next-app`)

```bash
npx create-next-app@latest my-electrician-site --typescript --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"
cd my-electrician-site
npm install lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
```

Then copy `app/`, `components/`, `lib/`, `tailwind.config.ts` and `postcss.config.mjs`
from this template over the generated project (replace the generated `app/` folder).
Tailwind 3 is used so the brand palette lives in `tailwind.config.ts`.

## Rebranding in 5 minutes

| What                          | Where                                                     |
| ----------------------------- | --------------------------------------------------------- |
| Name, phone, email, address, hours, service areas, licence no. | `lib/site.ts` |
| Services, scope of work, FAQs | `lib/services.ts`                                         |
| Testimonials (placeholders!)  | `lib/testimonials.ts`                                     |
| Colours                       | `tailwind.config.ts` (`ink`, `paper`, `sheet`, `copper`, `stamp`) |
| Production domain             | `NEXT_PUBLIC_SITE_URL` env var (used for canonical URLs, sitemap, JSON-LD) |

Everything (header, footer, metadata, JSON-LD schema, sitemap) reads from those files.

## File tree

```
app/
  layout.tsx                 Root layout, metadata, sticky header, JSON-LD
  page.tsx                   Home
  globals.css                Tailwind layers + shared button/field classes
  icon.svg                   Favicon
  not-found.tsx              404
  robots.ts / sitemap.ts     SEO files
  about/page.tsx
  contact/page.tsx
  services/page.tsx
  services/[slug]/page.tsx   Statically generated service pages
  api/quote/route.ts         Simulated quote endpoint (validates + returns a reference)
components/
  layout/   EmergencyBar, Header (client), Footer, MobileCallBar
  home/     Hero, SupplyDiagram (SVG), QuoteSection, ServiceSchedule, NotesAndAreas, AreaChecker, Testimonials
  quote/    QuoteForm (client; "widget" 2-step + "full" variants)
  ui/       Section, PageHero, SafetyDisclaimer, ServiceIcon, JsonLd
lib/
  site.ts  services.ts  testimonials.ts  validation.ts  schema.ts
```

## Making the quote form real

`app/api/quote/route.ts` validates server-side (same rules as the client, from
`lib/validation.ts`), has a honeypot spam trap, and then *simulates* success.
Replace the marked block with an email provider (Resend, Postmark), a CRM/job
webhook (ServiceM8, Jobber, Zapier) or a database, and store photos in object
storage. Add rate limiting (e.g. Upstash) before going live.

## Before you launch checklist

- [ ] Replace placeholder business details, licence number and copy
- [ ] Replace sample testimonials with real, permissioned reviews
- [ ] Add real photos (use `next/image`) – the template ships image-free for speed
- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] Connect the quote API to email/CRM and add rate limiting
- [ ] Verify the Electrician JSON-LD in Google's Rich Results Test
- [ ] Add a privacy policy page (the form collects personal data)
- [ ] Run Lighthouse on the deployed site

## Notes

- **Visual style: "single-line diagram".** A drafting-sheet look: ruled tables, a double-rule sheet frame,
  a schematic hero (`components/home/SupplyDiagram.tsx`), a schedule-of-works services table and a
  title-block footer. Tokens: `ink` #0C2B4B, `paper` #DDE8EC, `sheet` #F7FAFB, `copper` #9A3E0C, `stamp` #B3261E.
  Component classes (`.btn-primary`, `.field`, `.sched` …) live in `app/globals.css`.
- Fonts (Bricolage Grotesque + IBM Plex Mono) are self-hosted via `@fontsource` packages, so there are no
  runtime requests to Google and builds work offline.
- No `aggregateRating` schema is emitted on purpose – only add it for real, visible reviews.
