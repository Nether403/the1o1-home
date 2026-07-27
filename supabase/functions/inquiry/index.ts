import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend@^4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InquiryData {
  name: string;
  email: string;
  company: string;
  situation: string;
  brief: string;
  timing: string;
  website?: string;
}

function validate(data: InquiryData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.email ?? "").trim().toLowerCase()))
    errors.email = "Please enter a valid email address.";
  if (!data.brief || data.brief.trim().length < 20)
    errors.brief = "Tell me a little more about the decision, product, or launch.";
  return errors;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body: InquiryData = await req.json();

    // Honeypot check
    if (body.website) {
      return new Response(
        JSON.stringify({ status: "success", message: "Your inquiry has been received." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const errors = validate(body);
    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ status: "error", message: "Please check the highlighted fields.", errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("INQUIRY_FROM");
    const to = Deno.env.get("INQUIRY_TO") ?? "support@101dev.xyz";

    if (!apiKey || !from) {
      return new Response(
        JSON.stringify({ status: "error", message: "Delivery unavailable. Please try the email fallback." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(apiKey);
    const name = body.name.trim();
    const email = body.email.trim().toLowerCase();

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company / product: ${body.company?.trim() || "Not provided"}`,
      `Situation: ${body.situation || "Not provided"}`,
      `Timing: ${body.timing || "Not provided"}`,
      "",
      "Product question:",
      body.brief.trim(),
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Product inquiry from ${name}`,
      text,
    });

    if (error) {
      return new Response(
        JSON.stringify({ status: "error", message: "The message could not be delivered. Please use the email fallback." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: "success", message: "Your inquiry has been sent. Thank you for bringing the hard question." }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ status: "error", message: "Something went wrong. Please try the email fallback." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
