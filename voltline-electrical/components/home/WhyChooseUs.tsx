import { BadgeCheck, FileCheck, Receipt, ShieldCheck, ThumbsUp } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/Section";

const badges = [
  {
    icon: BadgeCheck,
    title: "Registered",
    text: "Qualified electricians registered to carry out, test and certify electrical installations.",
  },
  {
    icon: FileCheck,
    title: "CoC Issued",
    text: "Certificates of Compliance for property sales, rentals and insurance, issued by registered persons.",
  },
  {
    icon: ShieldCheck,
    title: "Insured",
    text: "Public liability cover on every job, big or small, for complete peace of mind.",
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction Guarantee",
    text: "If the work isn't right, we come back and fix it at no extra charge.",
  },
  {
    icon: Receipt,
    title: "Upfront Pricing",
    text: "A clear, written price before work begins. The price we quote is the price you pay.",
  },
];

/** Trust badges. Replace the copy with the client's real credentials. */
export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-slate-950 py-16 text-white lg:py-24">
      <Container>
        <div id="why-heading">
          <SectionHeading
            tone="dark"
            eyebrow="Why choose us"
            title="Electricians you can trust in your home"
            lead="Safety, transparency and reliability are built into every job we do."
          />
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {badges.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-amber-brand/60 hover:bg-white/10"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-brand text-slate-950">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
