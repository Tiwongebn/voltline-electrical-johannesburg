import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { Container, SectionHeading } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Overview grid linking to each /services/[slug] page. */
export function ServicesGrid() {
  return (
    <section aria-labelledby="services-heading" className="bg-slate-50 py-16 lg:py-24">
      <Container>
        <div id="services-heading">
          <SectionHeading
            eyebrow="What we do"
            title="Electrical services for every job"
            lead="Whatever the size of the problem, you get a registered electrician, a clear price and tidy, tested work."
          />
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-brand hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-amber-brand transition group-hover:bg-amber-brand group-hover:text-slate-950">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold text-slate-950">{s.title}</h3>
                <p className="mt-2 flex-1 text-slate-600">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-slate-950">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
