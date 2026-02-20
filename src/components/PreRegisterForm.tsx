"use client";

import type { HTMLInputTypeAttribute } from "react";
import { useMemo, useState } from "react";

type FacilityType = "Clinic" | "Hospital" | "Laboratory" | "Pharmacy" | "Other";

type PreRegistrationPayload = {
  facilityName: string;
  facilityType: FacilityType | "";
  address: string;
  city: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  facilitySize?: string;
  notes?: string;
  website?: string; // honeypot
  formStartedAt?: number; // basic bot check
};

type FieldErrors = Partial<Record<keyof PreRegistrationPayload, string>> & {
  form?: string;
};

const FACILITY_TYPES: FacilityType[] = [
  "Clinic",
  "Hospital",
  "Laboratory",
  "Pharmacy",
  "Other",
];

function isEmailLike(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validate(payload: PreRegistrationPayload): FieldErrors {
  const errors: FieldErrors = {};

  if (!payload.facilityName.trim()) errors.facilityName = "Facility name is required.";
  if (!payload.facilityType) errors.facilityType = "Facility type is required.";
  if (!payload.address.trim()) errors.address = "Physical address is required.";
  if (!payload.city.trim()) errors.city = "City / location is required.";
  if (!payload.contactName.trim())
    errors.contactName = "Contact person full name is required.";
  if (!payload.role.trim()) errors.role = "Role / position is required.";
  if (!payload.email.trim()) errors.email = "Email address is required.";
  else if (!isEmailLike(payload.email)) errors.email = "Enter a valid email address.";
  if (!payload.phone.trim()) errors.phone = "Phone number is required.";

  return errors;
}

function Input({
  id,
  label,
  required,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-900">
        {label} {required ? <span className="text-emerald-700">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 shadow-sm",
          "placeholder:text-slate-400",
          "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100",
          error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100" : "",
        ].join(" ")}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Textarea({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-900">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={[
          "w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm",
          "placeholder:text-slate-400",
          "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100",
        ].join(" ")}
      />
    </div>
  );
}

export function PreRegisterForm() {
  const [payload, setPayload] = useState<PreRegistrationPayload>({
    facilityName: "",
    facilityType: "",
    address: "",
    city: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    facilitySize: "",
    notes: "",
    website: "",
    formStartedAt: Date.now(),
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const canSubmit = useMemo(() => !submitting, [submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(false);

    const nextErrors = validate(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrors({
          form:
            data?.error ??
            "We couldn’t submit your pre-registration. Please try again.",
        });
        return;
      }

      setSubmitted(true);
      setErrors({});
      setPayload((p) => ({
        ...p,
        facilityName: "",
        facilityType: "",
        address: "",
        city: "",
        contactName: "",
        role: "",
        email: "",
        phone: "",
        facilitySize: "",
        notes: "",
        website: "",
        formStartedAt: Date.now(),
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {errors.form ? (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        >
          {errors.form}
        </div>
      ) : null}

      {submitted ? (
        <div
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          Thank you. Your facility has been pre-registered. The CWPS team will
          contact you soon.
        </div>
      ) : null}

      {/* Honeypot: keep hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={payload.website ?? ""}
          onChange={(e) => setPayload((p) => ({ ...p, website: e.target.value }))}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          id="facilityName"
          label="Facility Name"
          required
          value={payload.facilityName}
          onChange={(v) => setPayload((p) => ({ ...p, facilityName: v }))}
          placeholder="e.g., Green Valley Medical Clinic"
          error={errors.facilityName}
          autoComplete="organization"
        />

        <div className="space-y-1.5">
          <label
            htmlFor="facilityType"
            className="text-sm font-medium text-slate-900"
          >
            Facility Type <span className="text-emerald-700">*</span>
          </label>
          <select
            id="facilityType"
            name="facilityType"
            value={payload.facilityType}
            onChange={(e) =>
              setPayload((p) => ({
                ...p,
                facilityType: e.target.value as PreRegistrationPayload["facilityType"],
              }))
            }
            aria-invalid={Boolean(errors.facilityType) || undefined}
            aria-describedby={errors.facilityType ? "facilityType-error" : undefined}
            className={[
              "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 shadow-sm",
              "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100",
              errors.facilityType
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                : "",
            ].join(" ")}
          >
            <option value="" disabled>
              Select a facility type
            </option>
            {FACILITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.facilityType ? (
            <p id="facilityType-error" className="text-sm text-rose-700">
              {errors.facilityType}
            </p>
          ) : null}
        </div>
      </div>

      <Input
        id="address"
        label="Physical Address"
        required
        value={payload.address}
        onChange={(v) => setPayload((p) => ({ ...p, address: v }))}
        placeholder="Street address"
        error={errors.address}
        autoComplete="street-address"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          id="city"
          label="City / Location"
          required
          value={payload.city}
          onChange={(v) => setPayload((p) => ({ ...p, city: v }))}
          placeholder="City, State/Province"
          error={errors.city}
          autoComplete="address-level2"
        />

        <Input
          id="facilitySize"
          label="Estimated Facility Size (optional)"
          value={payload.facilitySize ?? ""}
          onChange={(v) => setPayload((p) => ({ ...p, facilitySize: v }))}
          placeholder="e.g., 25 beds or 40 staff"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          id="contactName"
          label="Contact Person Full Name"
          required
          value={payload.contactName}
          onChange={(v) => setPayload((p) => ({ ...p, contactName: v }))}
          placeholder="Full name"
          error={errors.contactName}
          autoComplete="name"
        />

        <Input
          id="role"
          label="Role / Position"
          required
          value={payload.role}
          onChange={(v) => setPayload((p) => ({ ...p, role: v }))}
          placeholder="e.g., Compliance Officer"
          error={errors.role}
          autoComplete="organization-title"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Input
          id="email"
          label="Email Address"
          required
          value={payload.email}
          onChange={(v) => setPayload((p) => ({ ...p, email: v }))}
          placeholder="name@facility.org"
          error={errors.email}
          type="email"
          autoComplete="email"
        />

        <Input
          id="phone"
          label="Phone Number"
          required
          value={payload.phone}
          onChange={(v) => setPayload((p) => ({ ...p, phone: v }))}
          placeholder="(555) 555-5555"
          error={errors.phone}
          type="tel"
          autoComplete="tel"
        />
      </div>

      <Textarea
        id="notes"
        label="Additional Notes (optional)"
        value={payload.notes ?? ""}
        onChange={(v) => setPayload((p) => ({ ...p, notes: v }))}
        placeholder="Anything you want the CWPS team to know (timelines, special requirements, etc.)"
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className={[
          "inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold text-white shadow-sm",
          "bg-emerald-600 hover:bg-emerald-700",
          "focus:ring-4 focus:ring-emerald-200",
          "disabled:cursor-not-allowed disabled:bg-slate-300",
        ].join(" ")}
      >
        {submitting ? "Submitting..." : "Pre-Register Your Facility"}
      </button>

      <p className="text-xs leading-5 text-slate-500">
        By submitting this form, you agree to be contacted by the CWPS team about
        early access and onboarding.
      </p>
    </form>
  );
}

