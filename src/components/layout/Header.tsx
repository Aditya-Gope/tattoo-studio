"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { studio } from "@/lib/content";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Artists", href: "/artists" },
  { label: "Studio", href: "/studio" },
  { label: "Reviews", href: "/reviews" },
  { label: "Aftercare", href: "/aftercare" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 48);
      
      if (currentScrollY > 200) {
        if (currentScrollY > lastScrollY.current) {
          setHidden(true); // scrolling down
        } else {
          setHidden(false); // scrolling up
        }
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
          scrolled ? "bg-ink-black/95 backdrop-blur-sm border-b border-border-subtle" : "bg-transparent",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16 xl:px-20 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-editorial text-warm-bone text-xl tracking-wide italic"
            aria-label={`${studio.name} — Home`}
          >
            {studio.shortName || "[Studio Name]"}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-mono-brand text-smoke-grey hover:text-warm-bone transition-colors duration-200 text-[0.65rem] tracking-[0.18em] py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-warm-bone transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <Button href="/book" variant="primary" size="sm" className="hidden lg:inline-flex">
              Book Consultation
            </Button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
            >
              <span className={cn("block w-6 h-px bg-warm-bone transition-all duration-300", menuOpen && "opacity-0")} />
              <span className={cn("block w-6 h-px bg-warm-bone transition-all duration-300", menuOpen && "opacity-0")} />
              <span className={cn("block w-4 h-px bg-warm-bone transition-all duration-300 self-start", menuOpen && "opacity-0")} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
