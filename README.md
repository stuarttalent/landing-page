# CWPS Pre-Registration Landing Page

Single-page Next.js landing site for medical facilities to pre-register for the **CWPS Medical Waste Compliance Program**.

## Local Development

1) Install dependencies:

```bash
npm install
```

2) Create a local env file:

```bash
cp .env.example .env.local
```

3) Fill in Resend/email settings in `.env.local` (see below).

4) Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Email Delivery (Resend)

Form submissions are POSTed to `POST /api/pre-register`, validated server-side, and sent by email.

Set these environment variables (locally in `.env.local`, and in Vercel Project Settings → Environment Variables):

- **RESEND_API_KEY**: your Resend API key (required)
- **EMAIL_FROM**: sender address (for now, you can use `onboarding@resend.dev`)
- **EMAIL_TO**: recipient for submissions (defaults to `retread_vigor2f@icloud.com`)

## Deploy (Vercel)

- Import this repo/folder into Vercel.
- Add the environment variables above.
- Deploy.

