"use client";

import { useRef, useEffect } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Share Your Idea",
    description:
      "Tell us your concept through our consultation form — include placement, size, style and any references that inspire you.",
  },
  {
    number: "02",
    title: "Speak With the Artist",
    description:
      "Your assigned artist will reach out via WhatsApp or email to discuss your vision in detail.",
  },
  {
    number: "03",
    title: "Plan Design, Size & Placement",
    description:
      "We refine the concept together, considering your body shape and how the design will age beautifully.",
  },
  {
    number: "04",
    title: "Confirm & Pay Deposit",
    description:
      "A deposit secures your appointment and confirms the design direction. Full booking policy is provided on confirmation.",
  },
  {
    number: "05",
    title: "Attend Your Session",
    description:
      "Arrive rested and fed. The studio is calm, clean and ready. We take care of everything from there.",
  },
  {
    number: "06",
    title: "Receive Aftercare Support",
    description:
      "We provide written aftercare instructions and remain available if you have any questions during healing.",
  },
];

export default function CustomerJourney() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !lineRef.current) return;

    // Dynamically import GSAP to keep it client-only
    import("gsap").then(({ gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const line = lineRef.current;
        if (!line) return;
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.5,
          onUpdate: (self) => {
            if (line) {
              gsap.set(line, { strokeDashoffset: length * (1 - self.progress) });
            }
          },
        });

        // Highlight steps
        const stepsElems = gsap.utils.toArray<HTMLElement>(".journey-step");
        stepsElems.forEach((stepElem) => {
          ScrollTrigger.create({
            trigger: stepElem,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => activateStep(stepElem),
            onEnterBack: () => activateStep(stepElem),
            onLeave: () => deactivateStep(stepElem),
            onLeaveBack: () => deactivateStep(stepElem),
          });
        });

        function activateStep(el: HTMLElement) {
          const dot = el.querySelector(".step-dot");
          const title = el.querySelector(".step-title");
          if (dot) gsap.to(dot, { borderColor: "var(--oxblood)", color: "var(--oxblood)", backgroundColor: "rgba(124,32,39,0.1)", duration: 0.4 });
          if (title) gsap.to(title, { color: "var(--warm-bone)", duration: 0.4 });
        }

        function deactivateStep(el: HTMLElement) {
          const dot = el.querySelector(".step-dot");
          const title = el.querySelector(".step-title");
          if (dot) gsap.to(dot, { borderColor: "var(--border-subtle)", color: "var(--smoke-grey)", backgroundColor: "transparent", duration: 0.4 });
          if (title) gsap.to(title, { color: "var(--smoke-grey)", duration: 0.4 });
        }

        return () => {
          st.kill();
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      })
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-ink-black"
      aria-label="Your tattoo journey"
    >
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          heading="Your Journey, Step by Step"
          subheading="We've designed the process to be straightforward, personal and stress-free."
          align="center"
          className="mb-16 max-w-2xl mx-auto"
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Animated vertical connector */}
          <svg
            className="absolute left-[19px] top-3 hidden sm:block pointer-events-none"
            width="2"
            height="calc(100% - 24px)"
            style={{ height: "calc(100% - 24px)" }}
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="#7C2027"
              strokeWidth="1"
            />
          </svg>

          <ol className="space-y-10 sm:space-y-12">
            {steps.map((step) => (
              <li key={step.number} className="journey-step flex gap-6 sm:gap-8 items-start">
                {/* Step number dot */}
                <div
                  className="step-dot shrink-0 w-10 h-10 rounded-full border border-border-subtle text-smoke-grey bg-ink-black flex items-center justify-center font-mono-brand text-[0.65rem] tracking-wider transition-colors duration-500"
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                <div className="pt-1">
                  <h3 className="step-title text-smoke-grey transition-colors duration-500 font-medium text-base sm:text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-smoke-grey/70 text-sm leading-relaxed transition-opacity duration-500">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
