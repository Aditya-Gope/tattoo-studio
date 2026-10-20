"use client";

import { useState } from "react";
import { step3Schema, type Step3Data } from "@/lib/validations/booking";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  data: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

const times = [
  { value: "morning", label: "Morning", hint: "10:00 – 13:00" },
  { value: "afternoon", label: "Afternoon", hint: "13:00 – 17:00" },
  { value: "evening", label: "Evening", hint: "17:00 – 20:00" },
  { value: "flexible", label: "Flexible", hint: "Any time works" },
];

const budgets = [
  { value: "under-5000", label: "Under ₹5,000" },
  { value: "5000-10000", label: "₹5,000 – ₹10,000" },
  { value: "10000-20000", label: "₹10,000 – ₹20,000" },
  { value: "20000-plus", label: "₹20,000+" },
  { value: "not-sure", label: "Not Sure" },
];

const todayStr = new Date().toISOString().split("T")[0];

export default function Step3Schedule({ data, onNext, onBack }: Props) {
  const [form, setForm] = useState<Partial<Step3Data>>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof Step3Data, string>>>({});

  const set = (key: keyof Step3Data, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleNext = () => {
    const result = step3Schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const [k, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[k as keyof Step3Data] = (msgs as string[])[0];
      }
      setErrors(fieldErrors);
      return;
    }
    onNext(result.data);
  };

  return (
    <div className="space-y-8">
      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="preferred-date" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
            PREFERRED DATE <span className="text-oxblood" aria-hidden="true">*</span>
          </label>
          <input
            id="preferred-date"
            type="date"
            min={todayStr}
            value={form.preferredDate ?? ""}
            onChange={(e) => set("preferredDate", e.target.value)}
            aria-describedby={errors.preferredDate ? "preferred-date-error" : undefined}
            className="w-full bg-charcoal border border-border-subtle text-warm-bone px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors"
          />
          {errors.preferredDate && <p id="preferred-date-error" className="text-oxblood text-xs mt-2" role="alert">{errors.preferredDate}</p>}
        </div>
        <div>
          <label htmlFor="alt-date" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
            ALTERNATIVE DATE (OPTIONAL)
          </label>
          <input
            id="alt-date"
            type="date"
            min={todayStr}
            value={form.alternativeDate ?? ""}
            onChange={(e) => set("alternativeDate", e.target.value)}
            className="w-full bg-charcoal border border-border-subtle text-warm-bone px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors"
          />
        </div>
      </div>

      {/* Preferred time */}
      <div>
        <fieldset>
          <legend className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-3">
            PREFERRED TIME <span className="text-oxblood" aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {times.map((t) => (
              <button
                key={t.value}
                type="button"
                aria-pressed={form.preferredTime === t.value}
                onClick={() => set("preferredTime", t.value)}
                className={cn(
                  "flex flex-col items-start p-3 border rounded transition-colors duration-200 min-h-[44px]",
                  form.preferredTime === t.value
                    ? "border-warm-bone bg-warm-bone/10 text-warm-bone"
                    : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
                )}
              >
                <span className="font-mono-brand text-[0.65rem] tracking-widest">{t.label}</span>
                <span className="text-[0.65rem] mt-0.5 opacity-60">{t.hint}</span>
              </button>
            ))}
          </div>
          {errors.preferredTime && <p className="text-oxblood text-xs mt-2" role="alert">{errors.preferredTime}</p>}
        </fieldset>
      </div>

      {/* Budget */}
      <div>
        <fieldset>
          <legend className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-3">
            BUDGET RANGE <span className="text-oxblood" aria-hidden="true">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {budgets.map((b) => (
              <button
                key={b.value}
                type="button"
                aria-pressed={form.budget === b.value}
                onClick={() => set("budget", b.value)}
                className={cn(
                  "px-4 py-2 font-mono-brand text-[0.65rem] tracking-widest border transition-colors duration-200 min-h-[44px]",
                  form.budget === b.value
                    ? "border-warm-bone text-warm-bone bg-warm-bone/10"
                    : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
          {errors.budget && <p className="text-oxblood text-xs mt-2" role="alert">{errors.budget}</p>}
        </fieldset>
      </div>

      {/* Cover-up */}
      <div>
        <fieldset>
          <legend className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-3">
            IS THIS A COVER-UP? <span className="text-oxblood" aria-hidden="true">*</span>
          </legend>
          <div className="flex gap-2">
            {[{ value: "yes", label: "Yes, cover-up" }, { value: "no", label: "No, new tattoo" }].map((o) => (
              <button
                key={o.value}
                type="button"
                aria-pressed={form.isCoverUp === o.value}
                onClick={() => set("isCoverUp", o.value)}
                className={cn(
                  "px-4 py-2 font-mono-brand text-[0.65rem] tracking-widest border transition-colors duration-200 min-h-[44px]",
                  form.isCoverUp === o.value
                    ? "border-warm-bone text-warm-bone bg-warm-bone/10"
                    : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          {errors.isCoverUp && <p className="text-oxblood text-xs mt-2" role="alert">{errors.isCoverUp}</p>}
        </fieldset>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" size="md" onClick={onBack}>← Back</Button>
        <Button variant="primary" size="md" onClick={handleNext}>Continue →</Button>
      </div>
    </div>
  );
}
