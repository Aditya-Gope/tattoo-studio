import type { Metadata } from "next";
import Link from "next/link";
import { studio, booking } from "@/lib/content";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `Booking Policy | ${studio.name}`,
  description: `Booking and cancellation policy for ${studio.name}. Read before submitting a consultation request.`,
  alternates: { canonical: "/booking-policy" },
};

export default function BookingPolicyPage() {
  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Booking Policy</li>
          </ol>
        </nav>

        <h1 className="font-editorial headline-md text-warm-bone italic mb-4">Booking &amp; Cancellation Policy</h1>
        <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mb-10">
          PLACEHOLDER — REPLACE WITH YOUR VERIFIED STUDIO POLICY
        </p>

        <div className="space-y-8 text-smoke-grey text-sm leading-relaxed">
          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Consultation Requests</h2>
            <p>{booking.notice}</p>
            <p className="mt-3">
              Submitting the online form begins the conversation — it does not guarantee an appointment date, time or price.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Deposit</h2>
            <p>[DEPOSIT AMOUNT AND TERMS — ADD VERIFIED STUDIO POLICY HERE]</p>
            <p className="mt-3">Deposits are non-refundable unless the studio cancels the appointment.</p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Rescheduling</h2>
            <p>[RESCHEDULING TERMS — ADD VERIFIED STUDIO POLICY HERE]</p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Cancellations</h2>
            <p>[CANCELLATION NOTICE PERIOD AND TERMS — ADD VERIFIED STUDIO POLICY HERE]</p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Age Requirement</h2>
            <p>
              You must be at least {booking.minimumAge} years of age to receive a tattoo at our studio. Valid photo identification will be required at your appointment.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Reference Images</h2>
            <p>
              Reference images you provide are for inspiration only. We do not copy another artist&apos;s work. All tattoos created at our studio are original.
            </p>
          </section>

          <section>
            <h2 className="font-editorial text-warm-bone text-xl italic mb-3">Contact</h2>
            <p>
              Questions about this policy? Contact us at{" "}
              <a href={`mailto:${studio.email}`} className="text-warm-bone hover:underline">{studio.email}</a> or{" "}
              <a href={`https://wa.me/${studio.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-warm-bone hover:underline">WhatsApp</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 border border-oxblood/20 bg-oxblood/5 rounded">
          <p className="text-smoke-grey text-xs leading-relaxed">
            <strong className="text-warm-bone">Important:</strong> Replace all [PLACEHOLDER] sections with your actual studio policies before publishing.
          </p>
        </div>
      </Container>
    </main>
  );
}
