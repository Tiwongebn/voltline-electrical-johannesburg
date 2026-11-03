"use client";

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Loader2,
  Phone,
  X,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  MAX_PHOTOS,
  SERVICE_TYPES,
  URGENCY_OPTIONS,
  validatePhotos,
  validateQuote,
  type QuoteErrors,
  type QuoteInput,
} from "@/lib/validation";

type Variant = "widget" | "full";
type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  /** "widget" = compact 2-step fast-quote card. "full" = single long form (contact page). */
  variant?: Variant;
  /** Pre-select a service, e.g. when used on a service detail page. */
  defaultService?: string;
  /** Optional heading rendered inside the form card (omit when the page already has one). */
  title?: string;
}

const EMPTY: QuoteInput = {
  service: "",
  urgency: "soon",
  description: "",
  name: "",
  phone: "",
  email: "",
  suburb: "",
  consent: false,
};

// Which fields belong to which step in the 2-step widget
const STEP_ONE_FIELDS: (keyof QuoteErrors)[] = ["service", "urgency", "description", "photos"];
// Order used to focus the first invalid field
const FIELD_ORDER: (keyof QuoteErrors)[] = [
  "service",
  "urgency",
  "description",
  "photos",
  "name",
  "phone",
  "email",
  "suburb",
  "consent",
];

export function QuoteForm({ variant = "full", defaultService = "", title }: Props) {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;
  const fileInput = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<QuoteInput>({ ...EMPTY, service: defaultService });
  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<{ reference: string; message: string } | null>(null);
  const [serverError, setServerError] = useState("");

  const isWidget = variant === "widget";
  const showStepOne = !isWidget || step === 1;
  const showStepTwo = !isWidget || step === 2;

  /* ───────── helpers ───────── */

  function update<K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    // Clear the error for a field as soon as the user edits it
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function collectErrors(onlyFields?: (keyof QuoteErrors)[]): QuoteErrors {
    const all = validateQuote(values);
    const photoError = validatePhotos(
      photos.map((p) => ({ name: p.name, size: p.size, type: p.type })),
    );
    if (photoError) all.photos = photoError;

    if (!onlyFields) return all;
    const subset: QuoteErrors = {};
    for (const key of onlyFields) if (all[key]) subset[key] = all[key];
    return subset;
  }

  function focusFirstError(errs: QuoteErrors) {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) document.getElementById(id(first))?.focus();
  }

  /* ───────── photos ───────── */

  function onPickPhotos(e: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const combined = [...photos, ...picked];
    const error = validatePhotos(
      combined.map((p) => ({ name: p.name, size: p.size, type: p.type })),
    );
    if (error) {
      setErrors((prev) => ({ ...prev, photos: error }));
    } else {
      setPhotos(combined);
      setErrors((prev) => ({ ...prev, photos: undefined }));
    }
    // Allow re-selecting the same file after removing it
    e.target.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((p) => p.filter((_, i) => i !== index));
    setErrors((prev) => ({ ...prev, photos: undefined }));
  }

  /* ───────── submit ───────── */

  function goNext() {
    const errs = collectErrors(STEP_ONE_FIELDS);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return focusFirstError(errs);
    setStep(2);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isWidget && step === 1) return goNext();

    const errs = collectErrors();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // In the widget, send the user back if a step-1 field is the problem
      if (isWidget && STEP_ONE_FIELDS.some((k) => errs[k])) setStep(1);
      // Wait a tick so the step's fields are mounted before focusing
      return void setTimeout(() => focusFirstError(errs), 0);
    }

    setStatus("submitting");
    setServerError("");

    try {
      const body = new FormData();
      body.set("service", values.service);
      body.set("urgency", values.urgency);
      body.set("description", values.description);
      body.set("name", values.name);
      body.set("phone", values.phone);
      body.set("email", values.email);
      body.set("suburb", values.suburb);
      body.set("consent", String(values.consent));
      // Honeypot value (should be empty for humans)
      body.set("website", (e.currentTarget.elements.namedItem("website") as HTMLInputElement).value);
      photos.forEach((p) => body.append("photos", p));

      const res = await fetch("/api/quote", { method: "POST", body });
      const data = await res.json();

      if (res.ok && data.ok) {
        setResult({ reference: data.reference, message: data.message });
        setStatus("success");
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      throw new Error(data.message ?? "Something went wrong.");
    } catch {
      setStatus("error");
      setServerError(
        `We couldn't send your request. Please try again, or call us on ${siteConfig.phone}.`,
      );
    }
  }

  function reset() {
    setValues({ ...EMPTY, service: defaultService });
    setPhotos([]);
    setErrors({});
    setStep(1);
    setStatus("idle");
    setResult(null);
  }

  /* ───────── success state: an inspector's stamp ───────── */

  if (status === "success" && result) {
    return (
      <div role="status" className="border-2 border-ink bg-sheet p-6 text-center sm:p-9">
        <div
          aria-hidden="true"
          className="mx-auto grid h-32 w-32 -rotate-[11deg] place-items-center rounded-full border-[3px] border-stamp p-3 font-mono text-[12.5px] font-medium leading-tight text-stamp"
        >
          <div>
            <b className="block text-sm">Request received</b>
            we&apos;ll be in touch
          </div>
        </div>
        <h3 className="mt-6 text-2xl font-extrabold">Thanks, we have your request</h3>
        <p className="mx-auto mt-2 max-w-[40ch]">{result.message}</p>
        <p className="mt-4 text-sm">
          Your reference:{" "}
          <span className="border border-ink bg-white px-2 py-1 font-mono font-medium">
            {result.reference}
          </span>
        </p>
        <a href={siteConfig.phoneHref} className="btn-primary mt-6">
          <Phone className="h-4 w-4" aria-hidden="true" />
          Urgent? Call {siteConfig.phone}
        </a>
        <button type="button" onClick={reset} className="mt-3 block w-full text-sm font-semibold underline underline-offset-4">
          Submit another request
        </button>
      </div>
    );
  }

  /* ───────── form ───────── */

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Request a quote"
      className="relative border-2 border-ink bg-sheet/95 p-5 sm:p-7"
    >
      {title && <h2 className="mb-4 text-2xl font-extrabold">{title}</h2>}

      {isWidget && (
        <div className="mb-6">
          <p className="font-mono text-[13px] font-medium">
            Step {step} of 2: {step === 1 ? "about the job" : "your details"}
          </p>
          <div
            className="mt-2 h-1.5 bg-ink/15"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={2}
            aria-valuenow={step}
            aria-label="Form progress"
          >
            <div
              className="h-full bg-copper transition-all"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        </div>
      )}

      <div className="space-y-5">
        {showStepOne && (
          <>
            <Field id={id("service")} label="What do you need?" error={errors.service}>
              <select
                id={id("service")}
                value={values.service}
                onChange={(e) => update("service", e.target.value)}
                className={`field ${errors.service ? "field-error" : ""}`}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? `${id("service")}-error` : undefined}
              >
                <option value="">Select a service…</option>
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={id("urgency")} label="How urgent is it?" error={errors.urgency}>
              <select
                id={id("urgency")}
                value={values.urgency}
                onChange={(e) => update("urgency", e.target.value)}
                className={`field ${errors.urgency ? "field-error" : ""}`}
                aria-invalid={!!errors.urgency}
              >
                {URGENCY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            {values.urgency === "emergency" && (
              <p role="note" className="border-2 border-stamp bg-white p-3 text-sm font-semibold text-stamp">
                For an emergency, please{" "}
                <a href={siteConfig.phoneHref} className="underline underline-offset-4">
                  call {siteConfig.phone}
                </a>
                . It&apos;s the fastest way to get an electrician dispatched.
              </p>
            )}

            <Field
              id={id("description")}
              label="Briefly describe the job"
              error={errors.description}
              hint={`${values.description.trim().length}/1000`}
            >
              <textarea
                id={id("description")}
                rows={3}
                maxLength={1000}
                value={values.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="e.g. Kitchen plugs stopped working after the earth leakage tripped."
                className={`field resize-y border-2 ${errors.description ? "field-error" : ""}`}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? `${id("description")}-error` : undefined}
              />
            </Field>

            {/* Photos */}
            <div>
              <label htmlFor={id("photos")} className="field-label">
                Photos <span className="font-normal">(optional, up to {MAX_PHOTOS})</span>
              </label>
              <input
                ref={fileInput}
                id={id("photos")}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={onPickPhotos}
                className="sr-only"
                aria-describedby={`${id("photos")}-hint`}
              />
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                disabled={photos.length >= MAX_PHOTOS}
                className="flex w-full items-center justify-center gap-2 border-2 border-dashed border-ink px-4 py-3 text-[15.5px] font-semibold transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ImagePlus className="h-4 w-4" aria-hidden="true" />
                Add photos of the problem
              </button>
              <p id={`${id("photos")}-hint`} className="mt-1.5 text-[13.5px] text-ink/80">
                JPG, PNG or WebP, max 5 MB each. You can also just mention photos in the description
                and send them when we call back.
              </p>
              {photos.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {photos.map((p, i) => (
                    <li
                      key={`${p.name}-${i}`}
                      className="flex items-center justify-between border border-ink bg-white px-3 py-1.5 text-sm"
                    >
                      <span className="truncate pr-2 font-mono">{p.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label={`Remove ${p.name}`}
                        className="p-1 hover:bg-ink hover:text-white"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {errors.photos && (
                <p id={`${id("photos")}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-stamp">
                  {errors.photos}
                </p>
              )}
            </div>
          </>
        )}

        {showStepTwo && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={id("name")} label="Full name" error={errors.name}>
                <input
                  id={id("name")}
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={`field ${errors.name ? "field-error" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id("name")}-error` : undefined}
                />
              </Field>
              <Field id={id("phone")} label="Phone" error={errors.phone}>
                <input
                  id={id("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={`field ${errors.phone ? "field-error" : ""}`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${id("phone")}-error` : undefined}
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={id("email")} label="Email" error={errors.email}>
                <input
                  id={id("email")}
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`field ${errors.email ? "field-error" : ""}`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id("email")}-error` : undefined}
                />
              </Field>
              <Field id={id("suburb")} label="Suburb or postcode" error={errors.suburb}>
                <input
                  id={id("suburb")}
                  type="text"
                  autoComplete="postal-code"
                  value={values.suburb}
                  onChange={(e) => update("suburb", e.target.value)}
                  placeholder="e.g. Fourways"
                  className={`field ${errors.suburb ? "field-error" : ""}`}
                  aria-invalid={!!errors.suburb}
                  aria-describedby={errors.suburb ? `${id("suburb")}-error` : undefined}
                />
              </Field>
            </div>

            {/* Safety disclaimer acknowledgement */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  id={id("consent")}
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 accent-copper"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
                />
                <label htmlFor={id("consent")} className="text-[15.5px]">
                  I understand that remote advice does <strong>not</strong> replace an on-site safety
                  inspection, and that service is available {siteConfig.serviceRadius}.
                </label>
              </div>
              {errors.consent && (
                <p id={`${id("consent")}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-stamp">
                  {errors.consent}
                </p>
              )}
            </div>
          </>
        )}

        {/* Honeypot: hidden from humans and assistive tech, tempting to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        {status === "error" && (
          <p role="alert" className="border-2 border-stamp bg-white p-3 text-sm font-semibold text-stamp">
            {serverError}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          {isWidget && step === 2 && (
            <button type="button" onClick={() => setStep(1)} className="btn-outline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          )}
          <button type="submit" disabled={status === "submitting"} className="btn-primary flex-1">
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : isWidget && step === 1 ? (
              <>
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              "Get my free quote"
            )}
          </button>
        </div>

        {/* Screen-reader announcement for step changes / submission */}
        <p className="sr-only" aria-live="polite">
          {status === "submitting" ? "Sending your request" : isWidget ? `Step ${step} of 2` : ""}
        </p>
      </div>
    </form>
  );
}

/** Label + control + error message wrapper. */
function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        {hint && <span className="font-mono text-xs text-ink/70">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-stamp">
          {error}
        </p>
      )}
    </div>
  );
}
