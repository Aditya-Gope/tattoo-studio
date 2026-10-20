"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run once per session
    const hasRun = sessionStorage.getItem("hasSeenIntro");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (hasRun || prefersReduced) {
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
          sessionStorage.setItem("hasSeenIntro", "true");
        }
      });

      // Simple elegant SVG line drawing
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(pathRef.current, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" });
      }

      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 10 });
        tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");
      }

      // Hide intro by masking upward
      if (containerRef.current) {
        tl.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.4
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-black pointer-events-none"
    >
      <div className="relative flex flex-col items-center">
        <svg
          width="40"
          height="120"
          viewBox="0 0 40 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6"
        >
          <path
            ref={pathRef}
            d="M20 0 L20 120"
            stroke="var(--warm-bone)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <div ref={textRef} className="font-mono-brand text-warm-bone text-[0.65rem] tracking-[0.3em]">
          CONCEPT
        </div>
      </div>
    </div>
  );
}
