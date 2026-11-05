import type { ReactNode } from "react";

/** Constrains content width and gives consistent horizontal padding. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-9 ${className}`}>
      {children}
    </div>
  );
}

/** Section title with an optional eyebrow label and lead paragraph. */
export function SectionHeading({
  title,
  lead,
  eyebrow,
  align = "left",
  tone = "light",
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  align?: "left" | "center";
  /** Use "dark" when the heading sits on a dark background. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-sm font-bold uppercase tracking-[0.14em] ${
            dark ? "text-paper/80" : "text-copper"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-extrabold leading-[1.05] sm:text-[44px] ${dark ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-4 text-lg ${dark ? "text-white/75" : "text-ink/80"}`}>{lead}</p>}
    </div>
  );
}
