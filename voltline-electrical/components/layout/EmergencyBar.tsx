import { Phone, Zap } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Slim 24/7 emergency strip above the main navigation.
 * Sits inside the sticky header wrapper (see app/layout.tsx), so the direct
 * tel: link is always one tap away.
 */
export function EmergencyBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-center gap-2 px-4 py-1.5 text-center font-mono text-[12.5px] sm:text-[13px]">
        <Zap className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden="true" />
        <span>24/7 emergency electricians in Johannesburg</span>
        <a
          href={siteConfig.phoneHref}
          className="inline-flex items-center gap-1 font-medium underline decoration-white/60 underline-offset-2 hover:decoration-white"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
