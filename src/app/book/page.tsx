import type { Metadata } from "next";
import Link from "next/link";
import { studio, booking } from "@/lib/content";
import Container from "@/components/ui/Container";
import BookingForm from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: `Book a Consultation | ${studio.name}`,
  description: `Request a tattoo consultation at ${studio.name}. Fill out our 4-step form and we'll be in touch.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <main className="pt-24 pb-24 lg:pt-32 bg-ink-black min-h-screen">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex gap-2 font-mono-brand text-[0.65rem] tracking-widest text-smoke-grey">
            <li><Link href="/" className="hover:text-warm-bone transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-warm-bone">Book</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-4">
                CONSULTATIONS
              </p>
              <h1 className="font-editorial headline-md text-warm-bone italic mb-4">
                Book a Consultation
              </h1>
              <p className="text-smoke-grey text-sm leading-relaxed">
                Fill in the form with as much detail as you can. The more we know about your idea, the better our conversation will be.
              </p>
            </div>

            <div className="p-5 border border-oxblood/20 bg-oxblood/5 rounded">
              <p className="text-smoke-grey text-xs leading-relaxed">{booking.notice}</p>
            </div>

            <div className="space-y-3">
              <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest">PREFER TO CHAT?</p>
              <a
                href={`https://wa.me/${studio.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-warm-bone text-sm hover:text-white transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <span>WhatsApp us directly</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="space-y-1 text-smoke-grey text-xs border-t border-border-subtle pt-6">
              <p>Minimum age: {booking.minimumAge} years</p>
              <p>Max reference files: {booking.maximumUploads}</p>
              <p>Max file size: {booking.maximumFileSizeMb} MB</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
