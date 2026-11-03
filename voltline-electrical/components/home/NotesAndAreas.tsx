import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";
import { AreaChecker } from "./AreaChecker";

/** Trust points. Replace with the client's real credentials. */
const notes = [
  { title: "Registered.", text: "Qualified to test, certify and sign off the work." },
  { title: "Certificate issued.", text: "A Certificate of Compliance once the installation passes." },
  { title: "Insured.", text: "Public liability cover, with proof on request." },
  { title: "Guaranteed.", text: "If it is not right, we come back at no charge." },
  { title: "Fixed price.", text: "Written before work starts, and that is what you pay." },
] as const;

/**
 * Two-panel block, like the notes and coverage panels on a drawing sheet:
 * trust points on the left, service areas (with a suburb checker) on the right.
 */
export function NotesAndAreas() {
  return (
    <section id="areas" aria-label="Why choose us and areas we cover" className="scroll-mt-32 border-b border-ink">
      <Container className="py-14 lg:py-20">
        <div className="grid border border-ink bg-sheet/90 lg:grid-cols-2">
          <div className="p-7 lg:p-9">
            <h2 className="text-3xl font-extrabold leading-tight">On every job</h2>
            <ul className="mt-5">
              {notes.map((n) => (
                <li key={n.title} className="relative border-t border-ink/35 py-3 pl-8 text-[17.5px]">
                  {/* Earth-symbol tick */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1 top-[1.2rem] h-0.5 w-3.5 bg-copper shadow-[0_5px_0_#9A3E0C]"
                  />
                  <strong className="font-bold">{n.title}</strong> {n.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-ink p-7 lg:border-l lg:border-t-0 lg:p-9">
            <h2 className="text-3xl font-extrabold leading-tight">Areas we cover</h2>
            <ul className="mt-5 grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3">
              {siteConfig.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="border-b border-r border-ink bg-white px-3 py-2.5 text-[17px] font-medium"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[13.5px]">
              Service available {siteConfig.serviceRadius}. Not sure we reach you? Ask.
            </p>
            <div className="mt-6">
              <AreaChecker />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
