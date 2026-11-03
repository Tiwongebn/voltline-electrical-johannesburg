import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, HardHat, HeartHandshake, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Us – Johannesburg Electricians",
  description: `Meet ${siteConfig.name}: a locally owned team of registered electricians serving Johannesburg since ${siteConfig.founded}. Safety-first, fully insured, community-focused.`,
  alternates: { canonical: "/about" },
};

const safetyStandards = [
  "Isolate, lock out and prove dead before every job",
  "Every circuit tested and results recorded before we leave",
  "Correct PPE and calibrated test equipment on every vehicle",
  "Ongoing training and regular safety refreshers for the whole team",
  "Clean, protected work areas, because we respect your home and business",
  "Work tested to SANS 10142-1, with a Certificate of Compliance issued where required",
];

const credentials = [
  {
    icon: BadgeCheck,
    title: "Registered electricians",
    text: `Our electricians are registered persons qualified to test and certify installations and issue Certificates of Compliance. ${siteConfig.licenceNumber}.`,
  },
  {
    icon: ShieldCheck,
    title: "Fully insured",
    text: "Public liability cover on every project, with proof available on request.",
  },
  {
    icon: HardHat,
    title: "Vetted and trained team",
    text: "Background-checked staff, ongoing training and apprentices supervised by senior electricians.",
  },
];

export default function AboutPage() {
  const years = new Date().getFullYear() - siteConfig.founded;

  const stats = [
    { k: `${years}+`, v: "Years in business" },
    { k: "24/7", v: "Emergency cover" },
    { k: "100%", v: "Registered electricians" },
    { k: "Fixed", v: "Upfront pricing" },
  ];

  return (
    <>
      <PageHero
        title={`About ${siteConfig.name}`}
        lead="A locally owned electrical contractor built on safety, honest pricing and showing up when we say we will."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="border-b border-ink">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <SectionHeading title={`Powering ${siteConfig.address.city} since ${siteConfig.founded}`} />
            <div className="mt-6 space-y-4 text-xl leading-relaxed">
              <p>
                {siteConfig.name} started with one van, one electrician and a simple promise: do the
                job properly, charge a fair price and treat every customer&apos;s property like our
                own.
              </p>
              <p>
                Today we&apos;re a team of registered electricians and apprentices handling everything
                from emergency call-outs and load-shedding backup systems to Certificates of
                Compliance and full commercial fit-outs, and most of our work still comes from repeat
                customers and neighbours&apos; recommendations.
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px border-2 border-ink bg-ink">
            {stats.map((s) => (
              <div key={s.v} className="bg-sheet p-6 text-center">
                <dt className="sr-only">{s.v}</dt>
                <dd className="text-4xl font-extrabold" aria-hidden="true">
                  {s.k}
                </dd>
                <dd className="mt-1 font-mono text-[13px] font-medium">
                  <span className="sr-only">{s.k} </span>
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Credentials */}
      <section aria-labelledby="creds" className="border-b border-ink">
        <Container className="py-14 lg:py-20">
          <div id="creds">
            <SectionHeading
              title="Qualified, registered and insured"
              lead="Electrical work in South Africa is regulated for good reason. Here's what stands behind every job we do."
            />
          </div>
          <ul className="mt-10 grid gap-px border-2 border-ink bg-ink md:grid-cols-3">
            {credentials.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-sheet p-7">
                <span className="flex h-12 w-12 items-center justify-center border-2 border-ink">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-ink/80">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Safety standards */}
      <section className="border-b border-ink">
        <Container className="grid gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <SectionHeading title="Our team safety standards" />
            <p className="mt-4 text-xl">
              Electricity is unforgiving. These are the non-negotiables our crews follow on every
              site, every day.
            </p>
          </div>
          <ul>
            {safetyStandards.map((s) => (
              <li key={s} className="relative border-t border-ink/35 py-3.5 pl-8 text-[17.5px]">
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-[1.4rem] h-0.5 w-3.5 bg-copper shadow-[0_5px_0_#9A3E0C]"
                />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Community */}
      <section aria-labelledby="community" className="bg-ink text-white">
        <Container className="flex flex-col items-center gap-6 py-14 text-center lg:py-20">
          <HeartHandshake className="h-12 w-12" aria-hidden="true" />
          <h2 id="community" className="text-3xl font-extrabold sm:text-4xl">
            Local, and proud of it
          </h2>
          <p className="max-w-2xl text-xl text-white/85">
            We live and work in the communities we serve. We sponsor local youth teams, offer
            apprenticeships to local school-leavers and help elderly neighbours with free safety
            checks each winter.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact#quote"
              className="btn border-white bg-white text-ink hover:border-white hover:bg-transparent hover:text-white"
            >
              Get a free quote
            </Link>
            <Link href="/services" className="btn border-white text-white hover:bg-white hover:text-ink">
              Explore services
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
