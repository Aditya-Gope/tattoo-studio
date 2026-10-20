"use client";

import { useState } from "react";
import { tattooStyles } from "@/lib/content";
import { step1Schema, type Step1Data } from "@/lib/validations/booking";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface Props {
  data: Partial<Step1Data>;
  onNext: (data: Step1Data) => void;
}

const sizes = [
  { value: "small", label: "Small", hint: "Coin-sized or smaller" },
  { value: "medium", label: "Medium", hint: "Palm-sized" },
  { value: "large", label: "Large", hint: "Half sleeve or torso" },
  { value: "extra-large", label: "Extra Large", hint: "Full sleeve or back piece" },
  { value: "unsure", label: "Not Sure", hint: "We can advise" },
];

const colours = [
  { value: "colour", label: "Colour" },
  { value: "black-and-grey", label: "Black & Grey" },
  { value: "unsure", label: "Not Sure Yet" },
];

export default function Step1Style({ data, onNext }: Props) {
  const [form, setForm] = useState<Partial<Step1Data>>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof Step1Data, string>>>({});

  const set = (key: keyof Step1Data, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleNext = () => {
    const result = step1Schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const [k, msgs] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[k as keyof Step1Data] = (msgs as string[])[0];
      }
      setErrors(fieldErrors);
      return;
    }
    onNext(result.data);
  };

  return (
    <div className="space-y-8">
      {/* Tattoo style */}
      <div>
        <label className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
          TATTOO STYLE <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Tattoo style selection">
          {tattooStyles.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={form.style === s}
              onClick={() => set("style", s)}
              className={cn(
                "px-4 py-2 font-mono-brand text-[0.65rem] tracking-widest border transition-colors duration-200 min-h-[44px]",
                form.style === s
                  ? "border-warm-bone text-warm-bone bg-warm-bone/10"
                  : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
              )}
            >
              {s}
            </button>
          ))}
        </div>
        {errors.style && <p className="text-oxblood text-xs mt-2" role="alert">{errors.style}</p>}
      </div>

      {/* Placement */}
      <div>
        <label htmlFor="placement" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
          PLACEMENT <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <input
          id="placement"
          type="text"
          value={form.placement ?? ""}
          onChange={(e) => set("placement", e.target.value)}
          placeholder="e.g. Inner forearm, ribcage, shoulder blade"
          aria-describedby={errors.placement ? "placement-error" : undefined}
          className="w-full bg-charcoal border border-border-subtle text-warm-bone placeholder:text-smoke-grey/50 px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors"
        />
        {errors.placement && <p id="placement-error" className="text-oxblood text-xs mt-2" role="alert">{errors.placement}</p>}
      </div>

      {/* Size */}
      <div>
        <fieldset>
          <legend className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-3">
            APPROXIMATE SIZE <span className="text-oxblood" aria-hidden="true">*</span>
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {sizes.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={form.size === s.value}
                onClick={() => set("size", s.value)}
                className={cn(
                  "flex flex-col items-start p-3 border rounded transition-colors duration-200 min-h-[44px]",
                  form.size === s.value
                    ? "border-warm-bone bg-warm-bone/10 text-warm-bone"
                    : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
                )}
              >
                <span className="font-mono-brand text-[0.65rem] tracking-widest">{s.label}</span>
                <span className="text-[0.65rem] mt-0.5 opacity-60">{s.hint}</span>
              </button>
            ))}
          </div>
          {errors.size && <p className="text-oxblood text-xs mt-2" role="alert">{errors.size}</p>}
        </fieldset>
      </div>

      {/* Colour */}
      <div>
        <fieldset>
          <legend className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-3">
            COLOUR PREFERENCE <span className="text-oxblood" aria-hidden="true">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {colours.map((c) => (
              <button
                key={c.value}
                type="button"
                aria-pressed={form.colourPreference === c.value}
                onClick={() => set("colourPreference", c.value)}
                className={cn(
                  "px-4 py-2 font-mono-brand text-[0.65rem] tracking-widest border transition-colors duration-200 min-h-[44px]",
                  form.colourPreference === c.value
                    ? "border-warm-bone text-warm-bone bg-warm-bone/10"
                    : "border-border-subtle text-smoke-grey hover:border-smoke-grey"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          {errors.colourPreference && <p className="text-oxblood text-xs mt-2" role="alert">{errors.colourPreference}</p>}
        </fieldset>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest block mb-3">
          DESCRIBE YOUR IDEA <span className="text-oxblood" aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          value={form.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Tell us about your idea — theme, imagery, meaning, style inspiration..."
          aria-describedby={errors.description ? "description-error" : undefined}
          className="w-full bg-charcoal border border-border-subtle text-warm-bone placeholder:text-smoke-grey/50 px-4 py-3 text-sm rounded focus:outline-none focus:border-warm-bone/50 transition-colors resize-y"
        />
        <p className="text-smoke-grey/50 text-xs mt-1">{(form.description ?? "").length}/2000</p>
        {errors.description && <p id="description-error" className="text-oxblood text-xs mt-2" role="alert">{errors.description}</p>}
      </div>

      <div className="flex justify-end pt-4">
        <Button variant="primary" size="md" onClick={handleNext}>
          Continue →
        </Button>
      </div>
    </div>
  );
}
