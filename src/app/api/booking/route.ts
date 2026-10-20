import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { bookingApiSchema } from "@/lib/validations/booking";

// Rate limiting: simple in-memory store (use Redis/KV in production)
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3; // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || entry.reset < now) {
    rateLimitMap.set(key, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check
    const clientKey = getRateLimitKey(req);
    if (!checkRateLimit(clientKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Zod validation
    const result = bookingApiSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed.", details: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = result.data;

    // ── Demo Mode Override ──────────────────────────────────────────
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json(
        { success: true, message: "Demo submission complete." },
        { status: 200 }
      );
    }

    // ── Optional Turnstile CAPTCHA verification ──────────────────────
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && "cfTurnstileToken" in (body as Record<string, unknown>)) {
      const token = (body as Record<string, unknown>).cfTurnstileToken as string;
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ secret: turnstileSecret, response: token }),
        }
      );
      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return NextResponse.json({ error: "CAPTCHA verification failed." }, { status: 403 });
      }
    }

    // ── Save booking request ─────────────────────────────────────────
    // When Supabase is configured, save the record
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("booking_requests").insert([
          {
            status: "pending",
            style: data.style,
            placement: data.placement,
            size: data.size,
            colour_preference: data.colourPreference,
            description: data.description,
            preferred_date: data.preferredDate,
            alternative_date: data.alternativeDate,
            preferred_time: data.preferredTime,
            budget: data.budget,
            is_cover_up: data.isCoverUp,
            full_name: data.fullName,
            whatsapp: data.whatsapp,
            email: data.email,
            reference_urls: data.referenceUrls ?? [],
            submitted_at: new Date().toISOString(),
          },
        ]);
      } catch (err) {
        console.error("[booking] Supabase save failed:", err);
        // Don't block — still send email notification
      }
    }

    // ── Send email notifications ─────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
    const fromEmail = process.env.BOOKING_FROM_EMAIL ?? "noreply@example.com";

    if (resendKey && notifyEmail) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);

        // Studio notification
        await resend.emails.send({
          from: fromEmail,
          to: notifyEmail,
          subject: `New Booking Request — ${data.fullName} (${data.style})`,
          text: `
New booking consultation request received.

Name: ${data.fullName}
WhatsApp: ${data.whatsapp}
Email: ${data.email}
Style: ${data.style}
Placement: ${data.placement}
Size: ${data.size}
Colour: ${data.colourPreference}
Preferred Date: ${data.preferredDate}
Budget: ${data.budget}
Cover-up: ${data.isCoverUp}

Description:
${data.description}
          `.trim(),
        });

        // Customer confirmation
        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: "We received your consultation request",
          text: `
Hi ${data.fullName},

Thank you for reaching out. We have received your consultation request and will be in touch shortly via WhatsApp or email to discuss your idea.

${bookingApiSchema.description ?? "Submitting this form does not confirm an appointment. Our studio will contact you after reviewing your request."}

Best,
The Studio Team
          `.trim(),
        });
      } catch (err) {
        console.error("[booking] Email send failed:", err);
        // Don't block success — booking is saved
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[booking] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
