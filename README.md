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

3) Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Pre-Registration Form

The pre-registration form is a **Google Form embed** displayed on the landing page via an `<iframe>`.
No server-side email sending or database is used for this version.

## Deploy (Vercel)

- Import this repo/folder into Vercel.
- Deploy.

