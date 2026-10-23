"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, X } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { emptyInquiry, inquirySummary, MESSAGE_MAX, validateInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/format";
import { budgetRanges, inquiryInterests, type InquiryData, type InquiryErrors } from "@/types";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  /** No delivery service is configured: offer email/WhatsApp with the message prefilled. */
  | { kind: "unavailable" }
  | { kind: "error"; message: string };

export type DiamondContext = { reference: string; name: string };

type InquiryFormProps = {
  initial?: Partial<InquiryData>;
  diamond?: DiamondContext;
};

const fieldOrder: (keyof InquiryData)[] = ["name", "email", "phone", "interest", "budget", "diamondReference", "message", "consent"];

const inputClass =
  "w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/45 transition-colors focus:border-bronze focus:outline-none aria-[invalid=true]:border-red-400/70";

function Field({
  id,
  label,
  required,
  optionalHint,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optionalHint?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-white/60">
        <span>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-1 text-bronze">
              *
            </span>
          )}
        </span>
        {optionalHint && <span className="normal-case tracking-normal text-white/55">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-white/55">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm({ initial, diamond }: InquiryFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<InquiryData>({ ...emptyInquiry, ...initial });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof InquiryData, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");

  const fieldId = (name: keyof InquiryData) => `${id}-${name}`;

  const describedBy = (name: keyof InquiryData, hasHint = false) =>
    [errors[name] ? `${fieldId(name)}-error` : null, hasHint && !errors[name] ? `${fieldId(name)}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const update = <K extends keyof InquiryData>(name: K, value: InquiryData[K]) => {
    const next = { ...data, [name]: value };
    setData(next);
    // Re-validate a field as soon as it has been visited, so errors clear while typing.
    if (touched[name] || errors[name]) {
      const fieldError = validateInquiry(next)[name];
      setErrors((current) => ({ ...current, [name]: fieldError }));
    }
  };

  const onChange =
    (name: keyof InquiryData) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = event.target;
      update(name, (target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value) as never);
    };

  const onBlur = (name: keyof InquiryData) => () => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateInquiry(data)[name] }));
  };

  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus());

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiry(data);
    setErrors(validation);
    setTouched(Object.fromEntries(fieldOrder.map((name) => [name, true])));

    const firstInvalid = fieldOrder.find((name) => validation[name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const result = (await response.json().catch(() => ({}))) as { code?: string; errors?: InquiryErrors };

      if (response.ok) {
        setStatus({ kind: "success" });
      } else if (result.code === "not_configured") {
        setStatus({ kind: "unavailable" });
      } else if (response.status === 400 && result.errors) {
        setErrors(result.errors);
        setStatus({ kind: "error", message: "Please check the highlighted fields." });
      } else {
        setStatus({ kind: "error", message: "Your message could not be sent just now. Please try again, or contact us directly." });
      }
    } catch {
      setStatus({ kind: "error", message: "We could not reach the server. Check your connection and try again, or contact us directly." });
    }
    focusStatus();
  };

  const summary = inquirySummary(data);
  const mailHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Natural diamond inquiry${data.diamondReference ? ` — ${data.diamondReference}` : ""}`,
  )}&body=${encodeURIComponent(summary)}`;

  if (status.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-bronze/30 bg-bronze/[0.06] p-8 text-center focus:outline-none sm:p-12">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-12 text-bronze" strokeWidth={1.25} />
        <h2 className="mt-6 font-serif text-3xl font-light text-white">Thank you, {data.name.trim().split(" ")[0]}</h2>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          Your inquiry has been sent. A member of our team will reply to {data.email.trim()}.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setData({ ...emptyInquiry });
            setErrors({});
            setTouched({});
            setStatus({ kind: "idle" });
          }}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-required-note`} className="space-y-6">
      <p id={`${id}-required-note`} className="text-xs text-white/55">
        Fields marked <span className="text-bronze">*</span> are required.
      </p>

      {diamond && data.diamondReference === diamond.reference && (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-bronze/30 bg-bronze/[0.06] p-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-bronze">Enquiring about</p>
            <p className="mt-1 font-serif text-xl text-white">{diamond.name}</p>
            <p className="text-xs text-white/60">Reference {diamond.reference}</p>
          </div>
          <button
            type="button"
            onClick={() => update("diamondReference", "")}
            aria-label="Remove this diamond from the inquiry"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Full name" required error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={onChange("name")}
            onBlur={onBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            aria-required="true"
            className={cn(inputClass, "border-white/15")}
          />
        </Field>
        <Field id={fieldId("email")} label="Email" required error={errors.email}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={data.email}
            onChange={onChange("email")}
            onBlur={onBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            aria-required="true"
            className={cn(inputClass, "border-white/15")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("phone")} label="Phone" optionalHint error={errors.phone} hint="Include your country code, e.g. +91.">
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={data.phone}
            onChange={onChange("phone")}
            onBlur={onBlur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", true)}
            className={cn(inputClass, "border-white/15")}
          />
        </Field>
        <Field id={fieldId("interest")} label="Area of interest" required error={errors.interest}>
          <select
            id={fieldId("interest")}
            name="interest"
            value={data.interest}
            onChange={onChange("interest")}
            onBlur={onBlur("interest")}
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={describedBy("interest")}
            aria-required="true"
            className={cn(inputClass, "cursor-pointer appearance-none border-white/15 bg-ink-900", !data.interest && "text-white/55")}
          >
            <option value="">Select an option</option>
            {inquiryInterests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId("budget")} label="Approximate budget" optionalHint error={errors.budget}>
          <select
            id={fieldId("budget")}
            name="budget"
            value={data.budget}
            onChange={onChange("budget")}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={describedBy("budget")}
            className={cn(inputClass, "cursor-pointer appearance-none border-white/15 bg-ink-900", !data.budget && "text-white/55")}
          >
            <option value="">Select a range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id={fieldId("diamondReference")}
          label="Diamond reference"
          optionalHint
          error={errors.diamondReference}
          hint="If you are asking about a listed diamond."
        >
          <input
            id={fieldId("diamondReference")}
            name="diamondReference"
            type="text"
            placeholder="e.g. NDS-101"
            value={data.diamondReference}
            onChange={onChange("diamondReference")}
            onBlur={onBlur("diamondReference")}
            aria-invalid={Boolean(errors.diamondReference)}
            aria-describedby={describedBy("diamondReference", true)}
            className={cn(inputClass, "border-white/15")}
          />
        </Field>
      </div>

      <Field id={fieldId("message")} label="Message" required error={errors.message}>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          maxLength={MESSAGE_MAX}
          placeholder="Tell us about the diamond or piece you have in mind."
          value={data.message}
          onChange={onChange("message")}
          onBlur={onBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          aria-required="true"
          className={cn(inputClass, "resize-y border-white/15")}
        />
      </Field>
      <p className="-mt-4 text-right text-[11px] text-white/55" aria-hidden="true">
        {data.message.length}/{MESSAGE_MAX}
      </p>

      {/* Spam trap: hidden from people, filled in by some bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/60">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={data.consent}
            onChange={onChange("consent")}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            aria-required="true"
            className="mt-1 size-4 shrink-0 cursor-pointer accent-bronze"
          />
          <span>
            I agree that {siteConfig.company} may use these details to respond to my inquiry.
            <span aria-hidden="true" className="ml-1 text-bronze">
              *
            </span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${fieldId("consent")}-error`} className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
            <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
            {errors.consent}
          </p>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none">
        {status.kind === "unavailable" && (
          <div className="rounded-xl border border-bronze/30 bg-bronze/[0.06] p-5 text-sm leading-relaxed text-white/70">
            <p className="font-medium text-white">Online sending is not connected yet.</p>
            <p className="mt-1">
              Your message has <strong className="font-medium text-white">not</strong> been sent. Please send it by email
              or WhatsApp instead — we have prepared it for you.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={mailHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-bronze px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-900 transition-colors hover:bg-bronze-400"
              >
                <Mail aria-hidden="true" className="size-4" /> Send by email
              </a>
              <a
                href={whatsappHref(summary)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink-900"
              >
                <WhatsAppIcon className="size-4" /> Send on WhatsApp
              </a>
            </div>
          </div>
        )}
        {status.kind === "error" && (
          <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/[0.06] p-4 text-sm text-red-200">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {status.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto" aria-disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send inquiry"
        )}
      </Button>
    </form>
  );
}
