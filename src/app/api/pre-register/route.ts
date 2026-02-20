import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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
    const from = requiredEnv("EMAIL_FROM");

    const host = requiredEnv("SMTP_HOST");
    const port = Number(process.env.SMTP_PORT ?? "587");
    const secure =
      (process.env.SMTP_SECURE ?? "").toLowerCase() === "true" || port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: requiredEnv("SMTP_USER"),
        pass: requiredEnv("SMTP_PASS"),
      },
    });

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

    await transporter.sendMail({
      to,
      from,
      subject: "New CWPS Pre-Registration Submission",
      text: textBody,
      html: htmlBody,
      replyTo: `${data.contactName} <${data.email}>`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error while sending email. Please try again." },
      { status: 500 },
    );
  }
}

