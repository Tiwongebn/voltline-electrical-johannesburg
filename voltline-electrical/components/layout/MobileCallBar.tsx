import Link from "next/link";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Fixed bottom action bar for phones: the highest-converting actions
 * (call, WhatsApp, request a quote) are always reachable. Hidden from md upwards.
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px border-t-2 border-ink bg-ink md:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex items-center justify-center gap-1.5 bg-ink py-3.5 text-sm font-extrabold text-white"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        Call 24/7
      </a>
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 bg-sheet py-3.5 text-sm font-extrabold text-ink"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
      <Link
        href="/contact#quote"
        className="flex items-center justify-center gap-1.5 bg-copper py-3.5 text-sm font-extrabold text-white"
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        Quote
      </Link>
    </div>
  );
}
