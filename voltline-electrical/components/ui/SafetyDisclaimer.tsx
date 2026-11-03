import { ShieldAlert } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Required notice: remote diagnosis ≠ on-site inspection, plus service-area
 * boundary. Shown beside the quote form and on the contact page.
 */
export function SafetyDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      aria-label="Safety notice"
      className="border-2 border-ink bg-sheet p-4 text-[15.5px]"
    >
      <p className="flex items-center gap-2 font-mono text-[13px] font-medium">
        <ShieldAlert className="h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
        Safety notice
      </p>
      <ul className="mt-2 list-disc space-y-1.5 pl-6">
        <li>
          Advice given by phone, email or from photos is general guidance only.{" "}
          <strong>Remote diagnosis does not replace an on-site safety inspection</strong> by a
          registered electrician.
        </li>
        {!compact && (
          <li>
            If there is fire or smoke, or someone has received a shock, call{" "}
            {siteConfig.emergencyNumbers} first.
          </li>
        )}
        <li>
          We service customers {siteConfig.serviceRadius}. Outside this area we may be unable to
          attend; we&apos;ll tell you when you call.
        </li>
      </ul>
    </aside>
  );
}
