import { cn } from "@/lib/utils";
import { AnimatedHeading } from "@/components/ui/animations/AnimatedHeading";
import { AnimatedLabel } from "@/components/ui/animations/AnimatedLabel";
import { AnimatedParagraph } from "@/components/ui/animations/AnimatedParagraph";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
  headingAs?: "h1" | "h2" | "h3";
  editorial?: boolean;
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "left",
  className,
  headingAs: Tag = "h2",
  editorial = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "flex flex-col items-center text-center" : "",
        className
      )}
    >
      {eyebrow && (
        <AnimatedLabel className="text-smoke-grey uppercase" delay={0.1}>
          {eyebrow}
        </AnimatedLabel>
      )}
      <AnimatedHeading
        as={Tag}
        className={cn(
          editorial ? "font-editorial headline-lg" : "font-sans-brand font-semibold text-3xl",
          "text-warm-bone"
        )}
        delay={0.2}
      >
        {heading}
      </AnimatedHeading>
      {subheading && (
        <AnimatedParagraph className="text-smoke-grey leading-relaxed max-w-xl text-sm sm:text-base" delay={0.3}>
          {subheading}
        </AnimatedParagraph>
      )}
    </div>
  );
}
