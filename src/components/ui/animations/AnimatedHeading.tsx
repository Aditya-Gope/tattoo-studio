"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { splitTextIntoWords } from "@/lib/splitText";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedHeading({
  children,
  className,
  as: Component = "h2",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".anim-word");
      if (!words || words.length === 0) return;

      gsap.fromTo(
        words,
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Component ref={containerRef} className={cn(className)}>
      {splitTextIntoWords(children)}
    </Component>
  );
}
