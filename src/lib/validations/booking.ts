import { z } from "zod";

export const MAX_FILE_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_UPLOADS = 5;

export const step1Schema = z.object({
  style: z.string().min(1, "Please select a tattoo style"),
  placement: z.string().min(2, "Please describe the placement").max(200),
  size: z.enum(["small", "medium", "large", "extra-large", "unsure"] as const, {
    error: "Please select a size",
  }),
  colourPreference: z.enum(["colour", "black-and-grey", "unsure"] as const, {
    error: "Please select a colour preference",
  }),
  description: z
    .string()
    .min(20, "Please provide at least 20 characters describing your idea")
    .max(2000, "Description must be under 2000 characters"),
});

export const step3Schema = z.object({
  preferredDate: z.string().min(1, "Please select a preferred date"),
  alternativeDate: z.string().optional(),
  preferredTime: z.enum(["morning", "afternoon", "evening", "flexible"] as const, {
    error: "Please select a preferred time",
  }),
  budget: z.enum(
    ["under-5000", "5000-10000", "10000-20000", "20000-plus", "not-sure"] as const,
    { error: "Please select a budget range" }
  ),
  isCoverUp: z.enum(["yes", "no"] as const, {
    error: "Please indicate if this is a cover-up",
  }),
});

export const step4Schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100),
  whatsapp: z
    .string()
    .min(10, "Please enter a valid WhatsApp number")
    .max(20)
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  ageConfirmed: z
    .boolean()
    .refine((v) => v === true, "You must confirm you are 18 or over"),
  contactConsent: z
    .boolean()
    .refine((v) => v === true, "You must consent to being contacted"),
  policyAgreed: z
    .boolean()
    .refine((v) => v === true, "You must agree to the booking policy"),
  honeypot: z.string().max(0, "Spam detected"),
});

export const bookingApiSchema = step1Schema
  .merge(step3Schema)
  .merge(step4Schema.omit({ honeypot: true }))
  .extend({
    referenceUrls: z.array(z.string().url()).max(MAX_UPLOADS).optional(),
  });

export type Step1Data = z.infer<typeof step1Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;
export type BookingApiData = z.infer<typeof bookingApiSchema>;
