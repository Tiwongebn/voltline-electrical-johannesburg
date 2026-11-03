import Link from "next/link";
import { services } from "@/lib/services";
import { Container, SectionHeading } from "@/components/ui/Section";

/**
 * Services as a "schedule of works", the table you'd find on a drawing.
 * A real <table> (accessible, SEO-friendly); the .sched styles in globals.css
 * stack it as cards on phones. Each service name links to its own page.
 */
export function ServiceSchedule() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-32 border-b border-ink"
    >
      <Container className="py-14 lg:py-20">
        <div id="services-heading">
          <SectionHeading
            title="Schedule of works"
            lead="Whatever the size of the job, you get a registered electrician, a clear price and tidy, tested work."
          />
        </div>

        <table className="sched mt-8">
          <caption className="sr-only">
            Electrical services, what is included and the typical time for each
          </caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">What is included</th>
              <th scope="col">Typical time</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.slug}>
                <th scope="row">
                  <Link
                    href={`/services/${s.slug}`}
                    className="underline-offset-4 hover:underline hover:decoration-copper hover:decoration-2"
                  >
                    {s.title}
                  </Link>
                </th>
                <td>{s.summary}</td>
                <td className="time">{s.typicalTimeframe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  );
}
