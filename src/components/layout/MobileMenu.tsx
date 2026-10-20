"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /* Focus management */
  useEffect(() => {
    if (open) {
      setTimeout(() => closeRef.current?.focus(), 50);
    }
  }, [open]);

  /* Keyboard: Escape to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-ink-black transition-opacity duration-300 lg:hidden",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle">
        <span className="font-editorial text-warm-bone text-xl italic">Menu</span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center text-warm-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
        >
          {/* X icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <line x1="1" y1="1" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="19" y1="1" x2="1" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav aria-label="Mobile navigation" className="flex-1 flex flex-col justify-center px-8 gap-2">
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            ref={i === 0 ? firstLinkRef : undefined}
            onClick={onClose}
            className="font-editorial text-warm-bone text-5xl sm:text-6xl italic py-3 border-b border-border-subtle hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <div className="px-8 pb-12">
        <Button
          href="/book"
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          Book a Consultation
        </Button>
      </div>
    </div>
  );
}
