import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./Section";

export interface Crumb {
  label: string;
  href?: string;
}

/** Inner-page header: breadcrumb trail, H1 and lead text, closed off with a ruled line. */
export function PageHero({
  title,
  lead,
  crumbs,
}: {
  title: string;
  lead?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="border-b border-ink">
      <Container className="py-10 lg:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[13px]">
            <li>
              <Link href="/" className="underline underline-offset-4 hover:text-copper">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="underline underline-offset-4 hover:text-copper">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.04] sm:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-xl text-ink/80">{lead}</p>}
      </Container>
    </section>
  );
}
