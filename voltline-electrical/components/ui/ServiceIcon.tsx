import {
  Building2,
  FileCheck,
  Home,
  PlugZap,
  ServerCog,
  Siren,
  SunMedium,
  type LucideProps,
} from "lucide-react";
import type { ServiceIconKey } from "@/lib/services";

const icons = {
  home: Home,
  building: Building2,
  alert: Siren,
  panel: ServerCog,
  plug: PlugZap,
  solar: SunMedium,
  certificate: FileCheck,
} satisfies Record<ServiceIconKey, React.ComponentType<LucideProps>>;

/** Maps a serialisable icon key from lib/services.ts to a Lucide icon. */
export function ServiceIcon({
  name,
  ...props
}: { name: ServiceIconKey } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" {...props} />;
}
