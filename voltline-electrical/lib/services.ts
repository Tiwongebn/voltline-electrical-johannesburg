/**
 * Service content, written for the Johannesburg market.
 * Pure data (no JSX) so it can be used in server components,
 * generateStaticParams, the sitemap and JSON-LD alike.
 * `icon` is a key resolved in components/ui/ServiceIcon.tsx.
 */
export type ServiceIconKey =
  | "home"
  | "building"
  | "alert"
  | "panel"
  | "plug"
  | "solar"
  | "certificate";

export interface Service {
  slug: string;
  title: string;
  icon: ServiceIconKey;
  /** Pre-selects this option in the quote form (must match SERVICE_TYPES) */
  quoteService: string;
  /** One-line summary for cards */
  summary: string;
  /** Intro paragraph for the detail page */
  intro: string;
  /** Scope-of-work breakdown */
  scope: string[];
  /** Honest expectations / things worth knowing */
  notes: string[];
  process: { title: string; text: string }[];
  typicalTimeframe: string;
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "residential-electrical",
    title: "Residential Electrical",
    icon: "home",
    quoteService: "New Fixture or Plug Point",
    summary:
      "Lighting, plug points, rewiring, geyser electrics and fault finding for your home.",
    intro:
      "From a single new light fitting to a full rewire, our registered residential electricians keep your Johannesburg home safe, compliant and comfortable. Every job is quoted upfront and finished with a tidy site and a Certificate of Compliance where required.",
    scope: [
      "Fault finding and repair (tripping circuits, dead plugs, flickering lights)",
      "New plug points, switches, dimmers and light fittings",
      "Downlights, outdoor, garden and security lighting",
      "Geyser element, thermostat and timer replacement",
      "Partial and full rewires",
      "Smoke alarms and earth leakage (RCD) protection",
    ],
    notes: [
      "Quotes are fixed once we have seen the job on site.",
      "Larger projects may need a short site visit before pricing.",
    ],
    process: [
      { title: "Tell us what's wrong", text: "Call, WhatsApp or send the quick-quote form with a few details and photos." },
      { title: "Upfront quote", text: "You get a clear price before any work begins. No surprise add-ons." },
      { title: "Safe, tidy install", text: "A registered electrician completes the work and tests every circuit." },
      { title: "Sign-off", text: "We walk you through the work and supply a Certificate of Compliance where required." },
    ],
    typicalTimeframe: "Same day for most small jobs; 1–5 days for rewires.",
    faqs: [
      {
        q: "Will I get a Certificate of Compliance after the work?",
        a: "Where the work requires it, yes. A registered person must test and certify the installation, and we issue the correct certificate for the work we carry out.",
      },
      {
        q: "Can you work around my schedule?",
        a: "Yes. We book morning and afternoon windows and will phone ahead on the day.",
      },
    ],
  },
  {
    slug: "commercial-electrical",
    title: "Commercial Electrical",
    icon: "building",
    quoteService: "Commercial Work",
    summary:
      "Shop fit-outs, office power, lighting upgrades and maintenance contracts.",
    intro:
      "Downtime costs money. We plan commercial work around your trading hours and keep disruption to a minimum, from small retail units to multi-tenant offices across Johannesburg.",
    scope: [
      "Shop and office fit-outs, power and data points",
      "LED lighting upgrades and emergency lighting",
      "Distribution board (DB) installation and maintenance",
      "Planned preventive maintenance contracts",
      "Testing, inspection and Certificates of Compliance for landlords and tenants",
      "After-hours and weekend scheduling",
    ],
    notes: [
      "Site induction and method statements supplied on request.",
      "Large-scale industrial projects are assessed case by case.",
    ],
    process: [
      { title: "Site walk-through", text: "We assess the premises, loads and your trading hours." },
      { title: "Written proposal", text: "Itemised scope, programme and fixed price." },
      { title: "Scheduled works", text: "Work completed out of hours where possible." },
      { title: "Handover & records", text: "Test results, certificates and as-built notes provided." },
    ],
    typicalTimeframe: "Depends on scope; a site visit is the fastest way to confirm.",
    faqs: [
      {
        q: "Do you offer maintenance agreements?",
        a: "Yes, planned maintenance visits can be scheduled monthly, quarterly or annually.",
      },
      {
        q: "Can you work outside business hours?",
        a: "Yes. Evening and weekend work is available so your business keeps trading.",
      },
    ],
  },
  {
    slug: "emergency-repairs",
    title: "Emergency Repairs",
    icon: "alert",
    quoteService: "Emergency Repair",
    summary:
      "24/7 call-outs for power loss, burning smells, sparking and dangerous faults.",
    intro:
      "Electrical emergencies don't wait for business hours. Our on-call electricians respond around the clock across Johannesburg to make your property safe first, then repair it properly.",
    scope: [
      "Total or partial power loss that isn't a municipal outage or load shedding",
      "Sparking, burning smells or overheated plugs and switches",
      "Main breaker or earth leakage that won't reset",
      "Storm, flood or fire damage making-safe",
      "Damaged cables and exposed wiring",
      "Temporary power restoration while a full repair is arranged",
    ],
    notes: [
      "If you see flames or smoke, or someone has been shocked, call 112 (from a cell phone) or 10177 first.",
      "If it is safe to do so, switch off the affected circuit or main switch while you wait for us.",
    ],
    process: [
      { title: "Call us 24/7", text: "A real person answers and takes your address and symptoms." },
      { title: "Dispatch", text: "The nearest available electrician is sent with an arrival estimate." },
      { title: "Make safe", text: "We isolate the fault and restore power where it is safe to do so." },
      { title: "Permanent fix", text: "We repair properly, or book the follow-up work at a time that suits you." },
    ],
    typicalTimeframe: "Dispatch begins immediately; arrival time depends on distance and traffic.",
    faqs: [
      {
        q: "How do I know if it's a fault or an outage?",
        a: "Check whether your neighbours also have no power and look at your supplier's outage or load-shedding updates (City Power or Eskom, depending on your area). If only your property is affected, it's likely a fault on your side.",
      },
      {
        q: "Is there a call-out fee?",
        a: "Emergency call-outs carry a call-out fee that is confirmed on the phone before we dispatch.",
      },
      {
        q: "Can you diagnose the problem over the phone?",
        a: "We can give safety advice by phone, but remote diagnosis never replaces an on-site inspection by a registered electrician.",
      },
    ],
  },
  {
    slug: "db-board-upgrades",
    title: "DB Board Upgrades",
    icon: "panel",
    quoteService: "DB Board Upgrade",
    summary:
      "Replace outdated or overloaded distribution boards with modern, protected DB boards.",
    intro:
      "Old, overloaded or damaged DB boards are a leading cause of nuisance tripping and electrical fires. We upgrade your distribution board with proper earth leakage and surge protection and clear circuit labelling.",
    scope: [
      "Assessment of the existing DB board, load and earthing",
      "Replacement of distribution boards and circuit breakers",
      "Earth leakage (RCD) and surge protection",
      "Separate circuits for geysers, stoves and high-load appliances",
      "Circuit labelling and Certificate of Compliance",
      "Preparing the board for solar, inverter or EV charger additions",
    ],
    notes: [
      "A planned power outage of a few hours is normal for a board change.",
      "Supply-capacity changes may need approval from your electricity supplier.",
    ],
    process: [
      { title: "Load assessment", text: "We inspect your board and calculate your current and future demand." },
      { title: "Fixed quote", text: "A written price covering parts, labour and certification." },
      { title: "Scheduled changeover", text: "We arrange the outage window and swap the board safely." },
      { title: "Test & certify", text: "Every circuit is tested, labelled and documented." },
    ],
    typicalTimeframe: "Usually one day on site.",
    faqs: [
      {
        q: "How do I know if I need a DB board upgrade?",
        a: "Frequent tripping, warm or buzzing boards, old rewirable fuses, and adding major loads such as an inverter system or EV charger are common triggers.",
      },
      {
        q: "Will I lose power during the upgrade?",
        a: "Yes, for a few hours. We schedule this with you and keep it as short as possible.",
      },
    ],
  },
  {
    slug: "solar-inverter-backup-power",
    title: "Solar, Inverter & Backup Power",
    icon: "solar",
    quoteService: "Solar / Inverter / Backup Power",
    summary:
      "Inverters, batteries, solar PV and changeover switches to keep the lights on.",
    intro:
      "Load shedding and outages cost you time and money. We design and install inverter, battery and solar systems that keep your essentials running, and wire them in safely and to code.",
    scope: [
      "Site assessment and load calculation (what you need to back up)",
      "Inverter and battery installation",
      "Solar PV panel installation and wiring",
      "Changeover switches and generator connections",
      "Essential-load circuits (lights, Wi-Fi, fridge, security)",
      "Testing, Certificate of Compliance and handover walk-through",
    ],
    notes: [
      "Grid-tied systems may need to be registered with your municipal supplier (for example City Power); we can guide you through the process.",
      "We'll recommend a system size based on your real usage, not the biggest one we can sell.",
    ],
    process: [
      { title: "Needs assessment", text: "We look at your usage, your budget and what you want to keep running." },
      { title: "System design & quote", text: "A clear, itemised proposal with options at different budgets." },
      { title: "Installation", text: "Neat, labelled installation by registered electricians." },
      { title: "Commissioning", text: "Testing, certification and a walk-through of how your system works." },
    ],
    typicalTimeframe: "Inverter and battery installs are often done in a day; larger solar systems take longer.",
    faqs: [
      {
        q: "Can I bring my own inverter or batteries?",
        a: "Yes, we can install equipment you have already bought, subject to a quick compatibility and safety check.",
      },
      {
        q: "Can I run my whole house on an inverter?",
        a: "Usually only the essentials. High-draw appliances like geysers, stoves and ovens need a much larger system. We'll help you choose what to back up.",
      },
    ],
  },
  {
    slug: "ev-charger-installation",
    title: "EV Charger Installation",
    icon: "plug",
    quoteService: "EV Charger Installation",
    summary:
      "Home and workplace EV charging points installed, tested and certified.",
    intro:
      "Charge at home overnight and wake up to a full battery. We install and commission home and workplace EV chargers, checking your supply and DB board can handle the load first.",
    scope: [
      "Site survey and supply capacity check",
      "Dedicated circuit from your DB board",
      "Wall or pedestal charger mounting",
      "Load management and smart-charging setup where supported",
      "Testing, Certificate of Compliance and handover walk-through",
      "Workplace and multi-bay charging installations",
    ],
    notes: [
      "We install most major charger brands; ask us if you're unsure about compatibility.",
      "Some homes need a DB board upgrade before a charger can be fitted.",
    ],
    process: [
      { title: "Survey", text: "We check cable run, board capacity and the best mounting location." },
      { title: "Quote", text: "Fixed price for the circuit, install and certification." },
      { title: "Install", text: "Dedicated circuit run, charger mounted and commissioned." },
      { title: "Handover", text: "We show you how to use the charger and supply the paperwork." },
    ],
    typicalTimeframe: "Typically half a day to one day on site.",
    faqs: [
      {
        q: "Can I supply my own charger?",
        a: "Yes, we can install a charger you've already bought, or supply one for you.",
      },
      {
        q: "Will my existing DB board cope?",
        a: "Often yes, but we check during the survey. If not, we'll quote a DB board upgrade alongside.",
      },
    ],
  },
  {
    slug: "certificate-of-compliance",
    title: "Certificate of Compliance (CoC)",
    icon: "certificate",
    quoteService: "Certificate of Compliance (CoC)",
    summary:
      "Inspection, testing, repairs and CoC issuing for property sales, rentals and insurance.",
    intro:
      "Selling or renting out a property? An electrical Certificate of Compliance shows the installation has been inspected and tested. We inspect, fix whatever doesn't comply, and issue the certificate, all through one registered team.",
    scope: [
      "Full inspection and testing of the electrical installation",
      "Written fault list and fixed-price quote for any repairs",
      "Repairs to bring the installation into compliance",
      "Earth leakage, surge protection and DB board corrections",
      "Issuing the Certificate of Compliance on a pass",
      "Re-testing after repairs",
    ],
    notes: [
      "A certificate can only be issued once the installation passes. If repairs are needed, we quote them first.",
      "Ask your estate agent or conveyancer which certificates are required for your transaction.",
    ],
    process: [
      { title: "Book an inspection", text: "Tell us the property address and when you need the certificate." },
      { title: "Inspect & test", text: "A registered electrician tests the installation and lists any faults." },
      { title: "Repair", text: "We quote and fix anything that doesn't comply." },
      { title: "Certificate issued", text: "Once it passes, we issue the CoC and send you a copy." },
    ],
    typicalTimeframe: "Inspection usually takes a few hours; turnaround depends on whether repairs are needed.",
    faqs: [
      {
        q: "Why do I need a CoC?",
        a: "It is commonly required when you sell a property, and landlords, insurers and buyers often ask for one. Your agent or conveyancer can confirm what applies to you.",
      },
      {
        q: "What if my installation fails the inspection?",
        a: "You'll get a clear list of what needs fixing and a fixed quote. We can do the repairs and re-test so you get the certificate quickly.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
