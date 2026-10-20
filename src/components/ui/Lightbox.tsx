"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/content";

interface LightboxProps {
  items: PortfolioItem[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const currentIndexRef = useRef(initialIndex);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus close button on open
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const updateImage = useCallback((index: number) => {
    const item = items[index];
    if (!item || !imageRef.current) return;
    imageRef.current.src = item.image || "/images/placeholder-tattoo.svg";
    imageRef.current.alt = item.alt || item.title;

    // Update caption
    const caption = containerRef.current?.querySelector("[data-caption]");
    if (caption) {
      caption.textContent = `${item.style} — ${item.artist}`;
    }
    const title = containerRef.current?.querySelector("[data-title]");
    if (title) {
      title.textContent = item.title;
    }
  }, [items]);

  const navigate = useCallback((direction: -1 | 1) => {
    currentIndexRef.current = (currentIndexRef.current + direction + items.length) % items.length;
    updateImage(currentIndexRef.current);
  }, [items.length, updateImage]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate, onClose]);

  const current = items[initialIndex];

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio lightbox"
      className="fixed inset-0 z-[70] bg-ink-black/95 backdrop-blur-sm flex items-center justify-center"
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center text-warm-bone hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded z-10"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <line x1="1" y1="1" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="19" y1="1" x2="1" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Previous */}
      {items.length > 1 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-warm-bone hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Image */}
      <div className="max-w-4xl w-full mx-16 sm:mx-24 flex flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imageRef}
          src={current?.image || "/images/placeholder-tattoo.svg"}
          alt={current?.alt || current?.title || "Portfolio item"}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded"
        />
        <div className="text-center">
          <p data-title className="text-warm-bone font-editorial italic text-lg">
            {current?.title}
          </p>
          <p data-caption className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-widest mt-1">
            {current?.style} — {current?.artist}
          </p>
        </div>
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={() => navigate(1)}
          className={cn(
            "absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center",
            "text-warm-bone hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-warm-bone rounded"
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />
    </div>
  );
}
