import { NextResponse } from "next/server";
import {
  validatePhotos,
  validateQuote,
  type QuoteErrors,
  type QuoteInput,
} from "@/lib/validation";

/**
 * POST /api/quote
 *
 * SIMULATED endpoint for the template. It validates the submission exactly as
 * a real backend should (never trust the client), then pretends to queue the
 * request and returns a reference number.
 *
 * To make it real, replace the "simulate" block with one of:
 *   - an email provider (Resend, Postmark, SendGrid) to notify the electrician
 *   - a CRM / job-management webhook (ServiceM8, Jobber, HubSpot, Zapier)
 *   - a database insert (Postgres, Supabase, etc.) plus file storage for photos
 */

type QuoteResponse =
  | { ok: true; reference: string; message: string }
  | { ok: false; errors: QuoteErrors; message: string };

const asString = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value : "";

/** Human-friendly reference such as QT-7K3M9X (no ambiguous characters). */
function makeReference(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `QT-${id}`;
}

export async function POST(request: Request): Promise<NextResponse<QuoteResponse>> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, errors: {}, message: "Invalid request. Please try again." },
      { status: 400 },
    );
  }

  // Honeypot: real users never see or fill this field. Bots usually do.
  // Respond with a fake success so the bot learns nothing.
  if (asString(form.get("website")).length > 0) {
    return NextResponse.json(
      { ok: true, reference: makeReference(), message: "Thanks – we'll be in touch." },
      { status: 201 },
    );
  }

  const input: QuoteInput = {
    service: asString(form.get("service")),
    urgency: asString(form.get("urgency")),
    description: asString(form.get("description")),
    name: asString(form.get("name")),
    phone: asString(form.get("phone")),
    email: asString(form.get("email")),
    suburb: asString(form.get("suburb")),
    consent: form.get("consent") === "true",
  };

  const errors = validateQuote(input);

  const photos = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const photoError = validatePhotos(
    photos.map((p) => ({ name: p.name, size: p.size, type: p.type })),
  );
  if (photoError) errors.photos = photoError;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors, message: "Please fix the highlighted fields." },
      { status: 422 },
    );
  }

  // ── Simulate processing (replace with real integration) ───────────────
  await new Promise((resolve) => setTimeout(resolve, 700));
  const reference = makeReference();
  // Log only non-personal metadata. Never log names, phones or emails.
  console.info(
    `[quote] ${reference} service="${input.service}" urgency=${input.urgency} photos=${photos.length}`,
  );
  // ──────────────────────────────────────────────────────────────────────

  const message =
    input.urgency === "emergency"
      ? "Emergency noted. For the fastest response, please also call us now."
      : "Thanks! We'll contact you shortly with your quote.";

  return NextResponse.json({ ok: true, reference, message }, { status: 201 });
}

// Anything other than POST is not supported.
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
