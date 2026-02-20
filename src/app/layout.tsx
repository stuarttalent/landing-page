import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CWPS Medical Waste Compliance Program — Pre-Registration",
  description:
    "Pre-register your medical facility for CWPS: a centralized compliance, documentation, and training platform for healthcare facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
