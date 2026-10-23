import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { inquirySummary, toInquiryData, validateInquiry } from "@/lib/inquiry";

/**
 * Inquiry delivery endpoint.
 *
 * Validates the submission and forwards it as JSON to INQUIRY_WEBHOOK_URL
 * (an email service, CRM, Zapier/Make hook or Formspree form endpoint).
 * Without that variable it answers 503 `not_configured`, and the form tells
 * the visitor plainly that nothing was sent and offers email/WhatsApp instead.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success and drop it.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  const data = toInquiryData(body);
  const errors = validateInquiry(data);
  if (Object.values(errors).some(Boolean)) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 400 });
  }

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json", Accept: "application/json" };
  if (process.env.INQUIRY_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: siteConfig.name,
        submittedAt: new Date().toISOString(),
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        interest: data.interest,
        budget: data.budget,
        diamondReference: data.diamondReference.trim(),
        message: data.message.trim(),
        // Ready-to-read text for email-style integrations.
        summary: inquirySummary(data),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error(`Inquiry webhook responded with ${response.status}`);
      return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Inquiry webhook request failed", error);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
