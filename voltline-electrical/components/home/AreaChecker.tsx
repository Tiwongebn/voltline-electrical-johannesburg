"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

/**
 * Tiny "do you cover my suburb?" widget. Matches against siteConfig.serviceAreas
 * and falls back to an honest "call us to confirm", never a false promise.
 */
export function AreaChecker() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const match =
    q.length >= 2
      ? siteConfig.serviceAreas.find((a) => a.toLowerCase().includes(q))
      : undefined;

  return (
    <div>
      <label htmlFor="area-check" className="field-label">
        Check your suburb
      </label>
      <input
        id="area-check"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. Fourways"
        autoComplete="off"
        className="field"
      />

      <div aria-live="polite" className="mt-3 min-h-[3.5rem] text-[15.5px]">
        {match && (
          <p className="flex items-start gap-2 border border-ink bg-white p-3 font-medium">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
            <span>
              Yes, we cover <strong>{match}</strong>.{" "}
              <Link href="/contact#quote" className="underline underline-offset-4">
                Request a quote
              </Link>
            </span>
          </p>
        )}
        {!match && q.length >= 2 && (
          <p className="flex items-start gap-2 border border-ink bg-white p-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
            <span>
              We don&apos;t list that suburb, but we may still reach you. Call{" "}
              <a href={siteConfig.phoneHref} className="font-bold underline underline-offset-4">
                {siteConfig.phone}
              </a>{" "}
              to confirm.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
