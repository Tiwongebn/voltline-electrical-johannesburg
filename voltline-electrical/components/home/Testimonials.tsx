import { Star } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import { Container, SectionHeading } from "@/components/ui/Section";

/**
 * Customer reviews as ruled cells. Mobile: native CSS scroll-snap carousel (no
 * JavaScript, works with swipe and keyboard). Tablet/desktop: responsive grid.
 * Sample reviews live in lib/testimonials.ts and must be replaced before launch.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="reviews-heading">
      <Container className="py-14 lg:py-20">
        <div id="reviews-heading">
          <SectionHeading
            title="What customers say"
            lead="Real jobs, real homes, real businesses across Johannesburg."
          />
        </div>

        <div
          role="region"
          aria-label="Customer testimonials"
          tabIndex={0}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[85%] shrink-0 snap-center flex-col border border-ink bg-sheet/90 p-6 sm:w-auto"
            >
              <div className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-copper text-copper" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-lg leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 border-t border-ink/35 pt-3 text-[15.5px]">
                <span className="block font-bold">{t.name}</span>
                <span className="font-mono text-[13px]">
                  {t.service}, {t.area}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
