/**
 * PLACEHOLDER testimonials for the template demo.
 * Replace with real, verifiable customer reviews before going live.
 */
export interface Testimonial {
  name: string;
  area: string;
  service: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sample Customer A.",
    area: "Randburg",
    service: "Emergency Repairs",
    quote:
      "Power tripped late on a Sunday night and wouldn't reset. Someone answered straight away and an electrician was at the door within the hour.",
    rating: 5,
  },
  {
    name: "Sample Customer B.",
    area: "Bryanston",
    service: "DB Board Upgrades",
    quote:
      "Clear quote, no surprises. The old board was replaced in a day and everything is neatly labelled.",
    rating: 5,
  },
  {
    name: "Sample Customer C.",
    area: "Fourways",
    service: "Solar, Inverter & Backup Power",
    quote:
      "They sized the inverter around what we actually needed. Load shedding is now barely noticeable.",
    rating: 5,
  },
  {
    name: "Sample Business D.",
    area: "Rosebank",
    service: "Commercial Electrical",
    quote:
      "Our shop fit-out was wired out of hours so we never lost a day of trading. Professional and tidy.",
    rating: 5,
  },
  {
    name: "Sample Customer E.",
    area: "Melville",
    service: "Certificate of Compliance",
    quote:
      "Needed a CoC to sell our house. They inspected, fixed the faults and issued the certificate within the week.",
    rating: 5,
  },
  {
    name: "Sample Customer F.",
    area: "Midrand",
    service: "EV Charger Installation",
    quote:
      "They checked our board first, explained the options and had the charger running the same afternoon.",
    rating: 5,
  },
];
