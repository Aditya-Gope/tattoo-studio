import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { whatsappLink } from "@/lib/content";

export default function FinalCta() {
  const waHref = whatsappLink("Hi! I'm ready to wear my story. I'd like to book a consultation.");

  return (
    <section
      className="py-28 lg:py-36 bg-ink-black relative overflow-hidden text-center"
      aria-label="Final call to action"
    >
      {/* Decorative background element */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          className="w-[600px] h-[600px] opacity-[0.04]"
          fill="none"
          stroke="#EFE9DE"
          strokeWidth="0.5"
        >
          <circle cx="200" cy="200" r="180" />
          <circle cx="200" cy="200" r="140" />
          <circle cx="200" cy="200" r="100" />
          <line x1="20" y1="200" x2="380" y2="200" />
          <line x1="200" y1="20" x2="200" y2="380" />
          <line x1="72" y1="72" x2="328" y2="328" />
          <line x1="328" y1="72" x2="72" y2="328" />
        </svg>
      </div>

      <Container className="relative z-10">
        <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.3em] mb-6">
          YOUR STORY STARTS HERE
        </p>
        <h2 className="font-editorial headline-xl text-warm-bone italic mb-10 max-w-3xl mx-auto">
          Ready to wear your story?
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book" variant="primary" size="lg">
            Start Your Tattoo
          </Button>
          <Button
            href={waHref}
            variant="secondary"
            size="lg"
            external
            aria-label="Chat with us on WhatsApp"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
