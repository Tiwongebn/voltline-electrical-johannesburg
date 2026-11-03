/**
 * The signature visual: a single-line diagram of a typical home supply
 * (supply → main breaker → DB board → circuits, with an earth bar below),
 * plus an inspector's "Certificate of Compliance" stamp.
 *
 * Decorative illustration with a descriptive aria-label. On narrow screens the
 * drawing keeps a minimum width and scrolls sideways so the labels stay legible.
 */
const circuits = [
  { x: 80, label: "Lights" },
  { x: 180, label: "Plugs" },
  { x: 280, label: "Geyser" },
  { x: 380, label: "Inverter" },
  { x: 480, label: "EV charger" },
] as const;

const INK = "#0C2B4B";
const COPPER = "#9A3E0C";
const MONO = "IBM Plex Mono, ui-monospace, monospace";

export function SupplyDiagram() {
  return (
    <figure className="relative border border-ink bg-sheet/90 p-3.5">
      <div
        role="region"
        aria-label="Single-line diagram of a home electrical supply"
        tabIndex={0}
        className="overflow-x-auto"
      >
        <svg
          viewBox="0 0 560 500"
          role="img"
          aria-label="Single-line diagram: supply, main breaker and DB board feeding lights, plugs, geyser, inverter and EV charger circuits, with an earth bar below"
          className="block h-auto w-full min-w-[480px] lg:min-w-0"
        >
          {/* Supply, main breaker, busbar */}
          <g fill="none" stroke={INK} strokeWidth={2}>
            <rect x={215} y={14} width={130} height={38} />
            <line x1={280} y1={52} x2={280} y2={104} />
            <rect x={263} y={104} width={34} height={54} />
            <line x1={263} y1={158} x2={297} y2={104} />
            <line x1={280} y1={158} x2={280} y2={200} />
            <line x1={52} y1={200} x2={508} y2={200} strokeWidth={7} />

            {/* One breaker per circuit */}
            {circuits.map(({ x }) => (
              <g key={x}>
                <line x1={x} y1={200} x2={x} y2={234} />
                <rect x={x - 9} y={234} width={18} height={30} />
                <line x1={x - 9} y1={264} x2={x + 9} y2={234} />
                <line x1={x} y1={264} x2={x} y2={x === 280 ? 312 : 318} />
              </g>
            ))}

            {/* Loads: lamp, socket, geyser, inverter, EV charger */}
            <circle cx={80} cy={334} r={16} />
            <line x1={69} y1={323} x2={91} y2={345} />
            <line x1={91} y1={323} x2={69} y2={345} />

            <circle cx={180} cy={334} r={16} />
            <line x1={174} y1={326} x2={174} y2={338} />
            <line x1={186} y1={326} x2={186} y2={338} />

            <rect x={260} y={312} width={40} height={52} />
            <path d="M266 326 l8 6 l-8 6 l8 6 l8 6 l-4 0" />

            <rect x={360} y={318} width={40} height={34} />
            <path d="M366 335 q7 -14 14 0 t14 0" />

            <rect x={460} y={318} width={40} height={34} />
            <line x1={470} y1={330} x2={470} y2={340} />
            <line x1={476} y1={330} x2={476} y2={340} />
            <line x1={482} y1={335} x2={494} y2={335} />
          </g>

          {/* Earth bar in copper */}
          <g fill="none" stroke={COPPER} strokeWidth={2}>
            <line x1={40} y1={452} x2={520} y2={452} strokeDasharray="7 5" />
            <line x1={260} y1={452} x2={300} y2={452} />
            <line x1={268} y1={460} x2={292} y2={460} />
            <line x1={275} y1={468} x2={285} y2={468} />
          </g>

          {/* Labels */}
          <g fill={INK} fontFamily={MONO} fontSize={13} textAnchor="middle">
            <text x={280} y={38}>
              Supply
            </text>
            {circuits.map(({ x, label }) => (
              <text key={label} x={x} y={388}>
                {label}
              </text>
            ))}
          </g>
          <g fill={INK} fontFamily={MONO} fontSize={13}>
            <text x={312} y={136}>
              Main breaker
            </text>
            <text x={52} y={186}>
              DB board
            </text>
            <text x={40} y={440} fill={COPPER}>
              Earth, tested and certified
            </text>
          </g>
        </svg>
      </div>

      {/* Inspector's stamp */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-5 grid h-[108px] w-[108px] -rotate-[11deg] place-items-center rounded-full border-[3px] border-stamp bg-sheet/90 p-3 text-center font-mono text-[11px] font-medium leading-tight text-stamp sm:h-32 sm:w-32 sm:text-[12.5px]"
      >
        <div>
          <b className="block text-[12px] sm:text-[14px]">Certificate of Compliance</b>
          issued on a pass
        </div>
      </div>

      <figcaption className="mt-2 font-mono text-[13px]">
        Typical home supply, drawn the way we test it.
      </figcaption>
    </figure>
  );
}
