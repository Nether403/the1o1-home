export interface InquiryData {
  name: string;
  email: string;
  company: string;
  situation: string;
  brief: string;
  timing: string;
}

export interface InquiryState {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
  values: InquiryData;
  revision: number;
}

export const EMPTY_INQUIRY: InquiryData = { name: "", email: "", company: "", situation: "", brief: "", timing: "" };
export const INITIAL_INQUIRY_STATE: InquiryState = { status: "idle", message: "", errors: {}, values: EMPTY_INQUIRY, revision: 0 };

export type InquiryValidation =
  | { ok: true; data: InquiryData }
  | { ok: false; spam?: boolean; errors: Record<string, string>; values: InquiryData };

const value = (formData: FormData, key: string, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);

export function validateInquiry(formData: FormData): InquiryValidation {
  const data: InquiryData = {
    name: value(formData, "name", 100),
    email: value(formData, "email", 254).toLowerCase(),
    company: value(formData, "company", 120),
    situation: value(formData, "situation", 40),
    brief: value(formData, "brief", 3000),
    timing: value(formData, "timing", 40),
  };
  if (value(formData, "website", 200)) return { ok: false, spam: true, errors: {}, values: data };
  const errors: Record<string, string> = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.brief.length < 20) errors.brief = "Tell me a little more about the decision, product, or launch.";

  return Object.keys(errors).length ? { ok: false, errors, values: data } : { ok: true, data };
}

export function formatInquiry(data: InquiryData) {
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company / product: ${data.company || "Not provided"}`,
    `Situation: ${data.situation || "Not provided"}`,
    `Timing: ${data.timing || "Not provided"}`,
    "",
    "Product question:",
    data.brief,
  ];
  return lines.join("\n");
}

export async function processInquiry(
  previous: InquiryState,
  formData: FormData,
  deliver: (data: InquiryData) => Promise<void>,
): Promise<InquiryState> {
  const revision = previous.revision + 1;
  const validation = validateInquiry(formData);
  if (!validation.ok) {
    if (validation.spam) return { status: "success", message: "Your inquiry has been received.", errors: {}, values: EMPTY_INQUIRY, revision };
    return { status: "error", message: "Please check the highlighted fields.", errors: validation.errors, values: validation.values, revision };
  }

  try {
    await deliver(validation.data);
    return { status: "success", message: "Your inquiry has been sent. Thank you for bringing the hard question.", errors: {}, values: EMPTY_INQUIRY, revision };
  } catch {
    return {
      status: "error",
      message: "The message could not be delivered. Your entries have been preserved; please use the email fallback.",
      errors: {},
      values: validation.data,
      revision,
    };
  }
}
