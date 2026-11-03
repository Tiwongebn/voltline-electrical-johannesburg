import { MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui/Section";
import { AreaChecker } from "./AreaChecker";

/** Service-area list + interactive "check my suburb" widget. Good for local SEO copy. */
export function ServiceAreas() {
  return (
    <section aria-labelledby="areas-heading" className="bg-slate-50 py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div id="areas-heading">
            <SectionHeading
              align="left"
              eyebrow="Service areas"
              title={`Local electricians in ${siteConfig.address.city} and surrounds`}
              lead={`We serve homes and businesses ${siteConfig.serviceRadius}. Local crews mean faster arrival times and fewer travel charges.`}
            />
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area} className="flex items-center gap-2 font-semibold text-slate-800">
                <MapPin className="h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <AreaChecker />
      </Container>
    </section>
  );
}
