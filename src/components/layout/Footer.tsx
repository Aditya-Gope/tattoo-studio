import Link from "next/link";
import Container from "@/components/ui/Container";
import { studio, openingHours } from "@/lib/content";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Artists", href: "/artists" },
  { label: "Studio", href: "/studio" },
  { label: "Reviews", href: "/reviews" },
  { label: "Aftercare", href: "/aftercare" },
  { label: "Book", href: "/book" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Booking Policy", href: "/booking-policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-border-subtle mt-0">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-editorial text-warm-bone text-2xl italic"
              aria-label={`${studio.name} — Home`}
            >
              {studio.shortName || "[Studio Name]"}
            </Link>
            <p className="text-smoke-grey text-sm leading-relaxed max-w-xs">
              {studio.tagline}
            </p>
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest">
              {studio.city || "[City]"}, {studio.country}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] uppercase">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-smoke-grey hover:text-warm-bone text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact + Hours */}
          <div className="space-y-4">
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] uppercase">
              Visit Us
            </p>
            <address className="not-italic text-smoke-grey text-sm leading-relaxed space-y-1">
              <p>{studio.address || "[Studio Address]"}</p>
              {studio.landmark && <p className="text-[0.75rem]">Near {studio.landmark}</p>}
              <p className="pt-2">
                <a
                  href={`tel:${studio.phoneDisplay}`}
                  className="hover:text-warm-bone transition-colors duration-200"
                >
                  {studio.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${studio.email}`}
                  className="hover:text-warm-bone transition-colors duration-200"
                >
                  {studio.email}
                </a>
              </p>
            </address>
            <dl className="text-smoke-grey text-xs space-y-1 pt-2">
              {openingHours.map((h) => (
                <div key={h.days} className="flex gap-3">
                  <dt className="w-36 shrink-0">{h.days}</dt>
                  <dd>{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-smoke-grey text-xs">
            &copy; {year} {studio.name || "[Studio Name]"}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-smoke-grey hover:text-warm-bone text-xs transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
