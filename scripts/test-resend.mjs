import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
if (!key) {
  console.error("Missing RESEND_API_KEY in environment.");
  process.exit(1);
}

const resend = new Resend(key);

const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
const to = process.env.EMAIL_TO ?? "retread_vigor2f@icloud.com";

const { data, error } = await resend.emails.send({
  from,
  to,
  subject: "CWPS Resend Test",
  text: "If you received this, Resend is configured correctly.",
});

console.log({ data, error });
if (error) process.exit(1);

