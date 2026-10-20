import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function BookingCta() {
  return (
    <section
      className="py-20 bg-oxblood/10 border-y border-oxblood/20"
      aria-label="Book a consultation"
    >
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.2em] mb-3">
              READY TO START?
            </p>
            <h2 className="font-editorial headline-md text-warm-bone italic">
              Your next tattoo begins<br className="hidden sm:block" /> with a conversation.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button href="/book" variant="primary" size="lg">
              Book a Consultation
            </Button>
            <Button
              href="https://wa.me/91XXXXXXXXXX"
              variant="secondary"
              size="lg"
              external
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
