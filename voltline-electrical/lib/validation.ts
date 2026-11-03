/**
 * Quote-request validation.
 * Pure functions with no browser/Node dependencies, so the exact same rules
 * run in the client form (instant feedback) AND in the API route (trust boundary).
 */

export const SERVICE_TYPES = [
  "Fault Finding",
  "New Fixture or Plug Point",
  "DB Board Upgrade",
  "Solar / Inverter / Backup Power",
  "Certificate of Compliance (CoC)",
  "EV Charger Installation",
  "Rewiring",
  "Commercial Work",
  "Emergency Repair",
  "Other / Not Sure",
] as const;

export const URGENCY_OPTIONS = [
  { value: "emergency", label: "Emergency – right now" },
  { value: "soon", label: "Within a few days" },
  { value: "flexible", label: "Flexible / planning ahead" },
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];
export type Urgency = (typeof URGENCY_OPTIONS)[number]["value"];

export interface QuoteInput {
  service: string;
  urgency: string;
  description: string;
  name: string;
  phone: string;
  email: string;
  suburb: string;
  consent: boolean;
}

export type QuoteErrors = Partial<Record<keyof QuoteInput | "photos", string>>;

// Photo upload limits (also enforced server-side)
export const MAX_PHOTOS = 3;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB each
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts +, digits, spaces, dashes, brackets; needs 7–15 digits. */
function isValidPhone(value: string): boolean {
  if (!/^[+\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function validateQuote(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};

  if (!(SERVICE_TYPES as readonly string[]).includes(input.service)) {
    errors.service = "Please choose the type of service you need.";
  }

  if (!URGENCY_OPTIONS.some((o) => o.value === input.urgency)) {
    errors.urgency = "Please tell us how urgent this is.";
  }

  const description = input.description.trim();
  if (description.length < 10) {
    errors.description = "Please describe the job in at least 10 characters.";
  } else if (description.length > 1000) {
    errors.description = "Please keep the description under 1,000 characters.";
  }

  const name = input.name.trim();
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 100) errors.name = "That name looks too long.";

  if (!isValidPhone(input.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const suburb = input.suburb.trim();
  if (suburb.length < 2) {
    errors.suburb = "Please enter your suburb or postcode so we can confirm we cover your area.";
  }

  if (!input.consent) {
    errors.consent = "Please confirm you understand the safety notice.";
  }

  return errors;
}

export interface PhotoMeta {
  name: string;
  size: number;
  type: string;
}

export function validatePhotos(photos: PhotoMeta[]): string | undefined {
  if (photos.length > MAX_PHOTOS) {
    return `You can attach up to ${MAX_PHOTOS} photos.`;
  }
  for (const p of photos) {
    if (!ALLOWED_PHOTO_TYPES.includes(p.type)) {
      return `"${p.name}" isn't a supported image (use JPG, PNG or WebP).`;
    }
    if (p.size > MAX_PHOTO_BYTES) {
      return `"${p.name}" is larger than 5 MB.`;
    }
  }
  return undefined;
}
