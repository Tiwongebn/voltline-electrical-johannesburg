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

/** Section title with an optional lead paragraph. */
export function SectionHeading({
  title,
  lead,
  align = "left",
}: {
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2 className="text-3xl font-extrabold leading-[1.05] sm:text-[44px]">{title}</h2>
      {lead && <p className="mt-4 text-lg text-ink/80">{lead}</p>}
    </div>
  );
}
