"use server";

import { Resend } from "resend";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { processInquiry, type InquiryData, type InquiryState } from "@/lib/inquiry";
import { createInquiryEmail } from "@/lib/inquiry-email";
import { takeInquirySlot } from "@/lib/inquiry-rate-limit";

export async function submitInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  const deliver = async (data: InquiryData) => {
    const requestHeaders = await headers();
    const source = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-real-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const fingerprint = createHash("sha256").update(source.trim()).digest("hex");
    if (!takeInquirySlot(fingerprint)) throw new Error("Rate limited");

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.INQUIRY_FROM;
    const to = process.env.INQUIRY_TO ?? "support@101dev.xyz";
    if (!apiKey || !from) throw new Error("Delivery unavailable");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(createInquiryEmail(data, from, to));
    if (error) throw new Error("Delivery rejected");
  };
  return processInquiry(_previous, formData, deliver);
}
