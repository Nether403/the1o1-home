import { formatInquiry, type InquiryData } from "./inquiry";

export function createInquiryEmail(data: InquiryData, from: string, to: string) {
  return {
    from,
    to: [to],
    replyTo: data.email,
    subject: `Product inquiry from ${data.name}`,
    text: formatInquiry(data),
  };
}
