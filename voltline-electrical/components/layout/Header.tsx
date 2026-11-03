"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";

/** Circuit-breaker symbol used as the logo mark (ink body, copper slash). */
function BreakerMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="9" y="4" width="14" height="24" fill="none" stroke="#0C2B4B" strokeWidth="2.5" />
      <line x1="9" y1="28" x2="23" y2="4" stroke="#9A3E0C" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Main navigation. Client component because of the mobile menu state and
 * active-link highlighting (usePathname).
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-ink bg-sheet">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-4 px-4 sm:px-9">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          <BreakerMark />
          <span className="text-xl font-extrabold tracking-tight sm:text-[25px]">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-[17px] font-medium underline-offset-8 hover:underline hover:decoration-2 ${
                isActive(link.href) ? "underline decoration-copper decoration-2" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={siteConfig.phoneHref} className="btn-primary hidden !min-h-[44px] !py-2 sm:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call 24/7
            <span className="hidden font-medium xl:inline">· {siteConfig.phone}</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="border-2 border-ink p-2 hover:bg-ink hover:text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-ink bg-sheet lg:hidden">
          <ul className="mx-auto max-w-[1180px] px-4 py-3 sm:px-9">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-ink/25 last:border-b-0">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block py-3 text-lg font-semibold ${
                    isActive(link.href) ? "text-copper" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a href={siteConfig.phoneHref} className="btn-primary w-full">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call 24/7 · {siteConfig.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
