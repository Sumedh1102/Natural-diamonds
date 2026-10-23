import { budgetRanges, inquiryInterests, type InquiryData, type InquiryErrors } from "@/types";

export const emptyInquiry: InquiryData = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  budget: "",
  diamondReference: "",
  message: "",
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{7,20}$/;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

/** Validation shared by the contact form and the inquiry API route. */
export function validateInquiry(data: InquiryData): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = data.phone.trim();
  const message = data.message.trim();

  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";

  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = "Please enter a valid phone number, including country code.";

  if (!data.interest) errors.interest = "Please choose what you are interested in.";
  else if (!inquiryInterests.includes(data.interest)) errors.interest = "Please choose an option from the list.";

  if (data.budget && !budgetRanges.includes(data.budget)) errors.budget = "Please choose an option from the list.";

  if (data.diamondReference.length > 60) errors.diamondReference = "Please shorten the reference.";

  if (message.length < MESSAGE_MIN) errors.message = `Please tell us a little more (at least ${MESSAGE_MIN} characters).`;
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;

  if (!data.consent) errors.consent = "Please confirm we may contact you about your inquiry.";

  return errors;
}

/** Coerce an unknown JSON body into InquiryData (unknown fields are dropped). */
export function toInquiryData(body: unknown): InquiryData {
  const source = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const text = (key: keyof InquiryData) => (typeof source[key] === "string" ? (source[key] as string) : "");
  return {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    interest: text("interest") as InquiryData["interest"],
    budget: text("budget") as InquiryData["budget"],
    diamondReference: text("diamondReference"),
    message: text("message"),
    consent: source.consent === true,
  };
}

/** Plain-text summary used for email/WhatsApp fallbacks and webhook payloads. */
export function inquirySummary(data: InquiryData) {
  const details: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Interest", data.interest],
    ["Budget", data.budget],
    ["Diamond reference", data.diamondReference],
  ];
  const lines = details
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`);
  return [...lines, "", data.message.trim()].join("\n");
}
