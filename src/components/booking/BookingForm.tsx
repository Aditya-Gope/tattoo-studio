"use client";

import { useState } from "react";
import Step1Style from "./steps/Step1Style";
import Step2References from "./steps/Step2References";
import Step3Schedule from "./steps/Step3Schedule";
import Step4Contact from "./steps/Step4Contact";
import type { Step1Data, Step3Data, Step4Data } from "@/lib/validations/booking";
import { cn } from "@/lib/utils";

const STEPS = ["Style", "References", "Schedule", "Contact"];

interface FormState {
  step1: Partial<Step1Data>;
  step2Files: File[];
  step3: Partial<Step3Data>;
  step4: Partial<Step4Data>;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({
    step1: {},
    step2Files: [],
    step3: {},
    step4: {},
  });

  const handleStep1Next = (data: Step1Data) => {
    setFormState((prev) => ({ ...prev, step1: data }));
    setCurrentStep(1);
    scrollToForm();
  };

  const handleStep2Next = (files: File[]) => {
    setFormState((prev) => ({ ...prev, step2Files: files }));
    setCurrentStep(2);
    scrollToForm();
  };

  const handleStep3Next = (data: Step3Data) => {
    setFormState((prev) => ({ ...prev, step3: data }));
    setCurrentStep(3);
    scrollToForm();
  };

  const handleStep4Submit = async (data: Step4Data) => {
    // Honeypot check — if filled, silently fail for bots
    if (data.honeypot) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const payload = {
        ...formState.step1,
        ...formState.step3,
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        ageConfirmed: data.ageConfirmed,
        contactConsent: data.contactConsent,
        policyAgreed: data.policyAgreed,
        // Reference file uploads would be handled here via Supabase Storage
        // For now we send filenames as metadata
        referenceFiles: formState.step2Files.map((f) => f.name),
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  function scrollToForm() {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (status === "success") {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
    return (
      <div className="py-20 text-center">
        <p className="font-mono-brand text-oxblood text-[0.65rem] tracking-widest mb-4">
          {isDemoMode ? "DEMO SUBMISSION COMPLETE" : "REQUEST RECEIVED"}
        </p>
        <h2 className="font-editorial headline-md text-warm-bone italic mb-4">Thank you!</h2>
        <p className="text-smoke-grey text-sm leading-relaxed max-w-md mx-auto mb-8">
          {isDemoMode
            ? "Demo submission — no appointment has been created. Submitting this form does not confirm an appointment. The studio will contact you after reviewing your request."
            : "We have received your consultation request. Our studio will review it and reach out via WhatsApp or email within 1–3 business days."}
        </p>
        <p className="text-smoke-grey/60 text-xs font-mono-brand tracking-widest">
          THIS DOES NOT CONFIRM AN APPOINTMENT
        </p>
      </div>
    );
  }

  return (
    <div id="booking-form">
      {/* Step indicator */}
      <nav aria-label="Booking form steps" className="mb-10">
        <ol className="flex gap-1 sm:gap-3">
          {STEPS.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-1 sm:gap-3"
              aria-current={i === currentStep ? "step" : undefined}
            >
              <div className={cn(
                "flex items-center gap-2",
                i < currentStep ? "text-warm-bone" : i === currentStep ? "text-warm-bone" : "text-smoke-grey/40"
              )}>
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center font-mono-brand text-[0.6rem] shrink-0",
                  i < currentStep
                    ? "bg-warm-bone text-ink-black"
                    : i === currentStep
                    ? "border border-warm-bone text-warm-bone"
                    : "border border-smoke-grey/30 text-smoke-grey/40"
                )}>
                  {i < currentStep ? "✓" : i + 1}
                </span>
                <span className={cn(
                  "font-mono-brand text-[0.65rem] tracking-widest hidden sm:block",
                  i === currentStep ? "text-warm-bone" : "text-smoke-grey/40"
                )}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-1", i < currentStep ? "bg-warm-bone/30" : "bg-border-subtle")} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Error banner */}
      {status === "error" && errorMessage && (
        <div className="mb-6 p-4 border border-oxblood/50 bg-oxblood/10 rounded" role="alert">
          <p className="text-oxblood text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Step content */}
      {currentStep === 0 && (
        <Step1Style data={formState.step1} onNext={handleStep1Next} />
      )}
      {currentStep === 1 && (
        <Step2References
          files={formState.step2Files}
          onNext={handleStep2Next}
          onBack={() => setCurrentStep(0)}
        />
      )}
      {currentStep === 2 && (
        <Step3Schedule
          data={formState.step3}
          onNext={handleStep3Next}
          onBack={() => setCurrentStep(1)}
        />
      )}
      {currentStep === 3 && (
        <Step4Contact
          data={formState.step4}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleStep4Submit}
          isSubmitting={status === "submitting"}
        />
      )}
    </div>
  );
}
