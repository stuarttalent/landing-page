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

3) Fill in SMTP/email settings in `.env.local` (see below).

4) Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Email Delivery (SMTP)

Form submissions are POSTed to `POST /api/pre-register`, validated server-side, and sent by email.

Set these environment variables (locally in `.env.local`, and in Vercel Project Settings → Environment Variables):

- **SMTP_HOST**: SMTP hostname (e.g. `smtp.yourprovider.com`)
- **SMTP_PORT**: typically `587` (STARTTLS) or `465` (TLS)
- **SMTP_SECURE**: `"true"` for port `465`, otherwise `"false"` (optional)
- **SMTP_USER**: SMTP username
- **SMTP_PASS**: SMTP password / app password
- **EMAIL_FROM**: sender address allowed by your SMTP provider (required)
- **EMAIL_TO**: recipient for submissions (defaults to `retread_vigor2f@icloud.com`)

## Deploy (Vercel)

- Import this repo/folder into Vercel.
- Add the environment variables above.
- Deploy.

