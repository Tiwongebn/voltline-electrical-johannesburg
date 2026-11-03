import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-6xl font-medium text-copper">404</p>
      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">This circuit is open</h1>
      <p className="mx-auto mt-3 max-w-md text-lg text-ink/80">
        We couldn&apos;t find that page. Head back to the homepage, or call us if you need an
        electrician right now.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <a href={siteConfig.phoneHref} className="btn-outline">
          <Phone className="h-4 w-4" aria-hidden="true" />
          {siteConfig.phone}
        </a>
      </div>
    </Container>
  );
}
