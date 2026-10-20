"use client";

import { useState } from "react";
import { step4Schema, type Step4Data } from "@/lib/validations/booking";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { booking } from "@/lib/content";

interface Props {
  data: Partial<Step4Data>;
  onBack: () => void;
  onSubmit: (data: Step4Data) => void;
  isSubmitting: boolean;
}

export default function Step4Contact({ data, onBack, onSubmit, isSubmitting }: Props) {
  const [form, setForm] = useState<Partial<Step4Data>>({
    ...data,
    honeypot: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Step4Data, string>>>({});

  const setField = (key: keyof Step4Data, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = () => {
    const result = step4Schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const [k, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[k as keyof Step4Data] = (msgs as string[])[0];
      }
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  };

  return (
    <div className="space-y-8">
      {/* Honeypot — hidden from real users, catches bots */}
      <input
        type="text"
        name="website"
        value={form.honeypot ?? ""}
        onChange={(e) => setField("honeypot", e.target.value)}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="full-name" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
            FULL NAME <span className="text-oxblood" aria-hidden="true">*</span>
          </label>
          <input
            id="full-name"
            type="text"
            autoComplete="name"
            value={form.fullName ?? ""}
            onChange={(e) => setField("fullName", e.target.value)}
            aria-describedby={errors.fullName ? "name-error" : undefined}
            className="w-full bg-charcoal border border-border-subtle text-warm-bone placeholder:text-smoke-grey/50 px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors"
          />
          {errors.fullName && <p id="name-error" className="text-oxblood text-xs mt-2" role="alert">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="whatsapp" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
            WHATSAPP NUMBER <span className="text-oxblood" aria-hidden="true">*</span>
          </label>
          <input
            id="whatsapp"
            type="tel"
            autoComplete="tel"
            value={form.whatsapp ?? ""}
            onChange={(e) => setField("whatsapp", e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            className="w-full bg-charcoal border border-border-subtle text-warm-bone placeholder:text-smoke-grey/50 px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors"
          />
          {errors.whatsapp && <p id="whatsapp-error" className="text-oxblood text-xs mt-2" role="alert">{errors.whatsapp}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
          EMAIL ADDRESS <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={form.email ?? ""}
          onChange={(e) => setField("email", e.target.value)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full bg-charcoal border border-border-subtle text-warm-bone placeholder:text-smoke-grey/50 px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors"
        />
        {errors.email && <p id="email-error" className="text-oxblood text-xs mt-2" role="alert">{errors.email}</p>}
      </div>

      {/* Consents */}
      <div className="space-y-4 border-t border-border-subtle pt-6">
        {[
          {
            key: "ageConfirmed" as const,
            label: "I confirm that I am 18 years of age or older.",
            id: "age-confirm",
            error: errors.ageConfirmed,
            errorId: "age-error",
          },
          {
            key: "contactConsent" as const,
            label: "I consent to being contacted via WhatsApp or email regarding my booking request.",
            id: "contact-consent",
            error: errors.contactConsent,
            errorId: "contact-error",
          },
          {
            key: "policyAgreed" as const,
            label: (
              <>
                I have read and agree to the{" "}
                <Link href="/booking-policy" className="text-warm-bone underline hover:text-white" target="_blank" rel="noopener noreferrer">
                  booking policy
                </Link>
                .
              </>
            ),
            id: "policy-agree",
            error: errors.policyAgreed,
            errorId: "policy-error",
          },
        ].map(({ key, label, id, error, errorId }) => (
          <div key={key}>
            <div className="flex items-start gap-3">
              <input
                id={id}
                type="checkbox"
                checked={!!form[key]}
                onChange={(e) => setField(key, e.target.checked)}
                aria-describedby={error ? errorId : undefined}
                className={cn(
                  "mt-0.5 w-4 h-4 shrink-0 rounded border border-border-subtle bg-charcoal",
                  "checked:bg-warm-bone checked:border-warm-bone focus:ring-2 focus:ring-warm-bone/50"
                )}
              />
              <label htmlFor={id} className="text-smoke-grey text-sm leading-relaxed cursor-pointer">
                {label}
              </label>
            </div>
            {error && <p id={errorId} className="text-oxblood text-xs mt-1 ml-7" role="alert">{error}</p>}
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className="p-5 border border-border-subtle rounded bg-charcoal/30">
        <p className="text-smoke-grey text-xs leading-relaxed">{booking.notice}</p>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" size="md" onClick={onBack} disabled={isSubmitting}>← Back</Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Submit Request"}
        </Button>
      </div>
    </div>
  );
}
