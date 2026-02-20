import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const FacilityTypeSchema = z.enum([
  "Clinic",
  "Hospital",
  "Laboratory",
  "Pharmacy",
  "Other",
]);

const PreRegistrationSchema = z.object({
  facilityName: z.string().trim().min(1),
  facilityType: FacilityTypeSchema,
  address: z.string().trim().min(1),
  city: z.string().trim().min(1),
  contactName: z.string().trim().min(1),
  role: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  facilitySize: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
  website: z.string().optional(), // honeypot
  formStartedAt: z.number().int().optional(),
});

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function publicSendErrorMessage(input: unknown) {
  // Keep messages helpful without leaking secrets.
  if (input instanceof Error) {
    if (input.message.startsWith("Missing required environment variable: ")) {
      return input.message;
    }
    return "Email service failed. Please try again.";
  }

  if (typeof input === "object" && input) {
    const maybe = input as { name?: string; message?: string; statusCode?: number | null };
    const msg = (maybe.message ?? "").toLowerCase();
    const status = maybe.statusCode ?? null;

    // Common Resend SDK error shapes:
    // - { name: 'application_error', statusCode: null, message: 'Unable to fetch data...' }
    // - { name: 'validation_error', statusCode: 422, message: ... }
    // - { name: 'authentication_error', statusCode: 401, message: ... }
    if (msg.includes("unable to fetch") || msg.includes("could not be resolved")) {
      return "Email service is unreachable from the server. Please try again shortly.";
    }
    if (status === 401 || status === 403 || msg.includes("api key")) {
      return "Email service authorization failed. Check your RESEND_API_KEY and redeploy.";
    }
    if (status === 422 || maybe.name === "validation_error") {
      return "Email service rejected the request (validation). Please review sender/recipient settings.";
    }
  }

  return "Server error while sending email. Please try again.";
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = PreRegistrationSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form fields and try again." },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Basic spam protection:
    // - Honeypot field (bots fill it)
    // - Minimum interaction time (very fast posts are likely automated)
    const startedAt = data.formStartedAt ?? 0;
    const elapsedMs = startedAt ? Date.now() - startedAt : 0;
    const isLikelyBot = Boolean(data.website?.trim()) || (elapsedMs > 0 && elapsedMs < 1500);
    if (isLikelyBot) {
      // Pretend success to avoid training bots.
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const to = process.env.EMAIL_TO ?? "retread_vigor2f@icloud.com";
    const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
    const resend = new Resend(requiredEnv("RESEND_API_KEY"));

    const submittedAt = new Date().toISOString();

    const lines: Array<[label: string, value: string]> = [
      ["Submitted At (UTC)", submittedAt],
      ["Facility Name", data.facilityName],
      ["Facility Type", data.facilityType],
      ["Physical Address", data.address],
      ["City / Location", data.city],
      ["Contact Person Full Name", data.contactName],
      ["Role / Position", data.role],
      ["Email Address", data.email],
      ["Phone Number", data.phone],
      ["Estimated Facility Size", data.facilitySize?.trim() || "(not provided)"],
      ["Additional Notes", data.notes?.trim() || "(not provided)"],
    ];

    const textBody = [
      "New CWPS Pre-Registration Submission",
      "",
      ...lines.map(([k, v]) => `${k}: ${v}`),
      "",
      "— Sent from the CWPS pre-registration landing page",
    ].join("\n");

    const htmlBody = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #0f172a;">
        <h2 style="margin:0 0 12px 0;">New CWPS Pre-Registration Submission</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tbody>
            ${lines
              .map(
                ([k, v]) => `
                  <tr>
                    <td style="padding:10px 12px; border:1px solid #e2e8f0; width: 220px; background:#f8fafc; font-weight:600; vertical-align: top;">
                      ${escapeHtml(k)}
                    </td>
                    <td style="padding:10px 12px; border:1px solid #e2e8f0; vertical-align: top;">
                      ${escapeHtml(v)}
                    </td>
                  </tr>`,
              )
              .join("")}
          </tbody>
        </table>
        <p style="margin:16px 0 0 0; font-size: 12px; color:#475569;">
          — Sent from the CWPS pre-registration landing page
        </p>
      </div>
    `.trim();

    const { error } = await resend.emails.send({
      to,
      from,
      subject: "New CWPS Pre-Registration Submission",
      text: textBody,
      html: htmlBody,
      // Resend's API expects an email (or array). Keep it simple and valid.
      replyTo: data.email,
    });
    if (error) {
      console.error("Resend send error", { error });
      return NextResponse.json(
        {
          error: publicSendErrorMessage(error),
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Pre-register route error", err);
    return NextResponse.json(
      {
        error: publicSendErrorMessage(err),
      },
      { status: 500 },
    );
  }
}

