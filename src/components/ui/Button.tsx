import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "oxblood";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-warm-bone text-ink-black hover:bg-white focus-visible:ring-2 focus-visible:ring-warm-bone",
  secondary:
    "border border-warm-bone/30 text-warm-bone hover:border-warm-bone/70 hover:bg-warm-bone/5",
  ghost:
    "text-warm-bone hover:text-white underline-offset-4 hover:underline",
  oxblood:
    "bg-oxblood text-warm-bone hover:bg-[#9a2830] focus-visible:ring-2 focus-visible:ring-oxblood",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-7 py-3.5 text-xs tracking-widest",
  lg: "px-9 py-5 text-sm tracking-widest",
};

const base =
  "inline-flex items-center justify-center font-mono-brand uppercase transition-colors duration-200 select-none min-h-[44px] min-w-[44px]";

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  disabled,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    disabled && "opacity-40 pointer-events-none",
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
