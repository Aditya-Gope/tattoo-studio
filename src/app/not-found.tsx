import Container from "@/components/ui/Container";

import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink-black flex items-center justify-center px-5">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <p className="font-mono-brand text-smoke-grey text-[0.65rem] tracking-[0.3em] mb-6">
            404
          </p>
          <h1 className="font-editorial headline-lg text-warm-bone italic mb-6">
            Page not found.
          </h1>
          <p className="text-smoke-grey text-sm leading-relaxed mb-10">
            The page you are looking for has moved or does not exist. Head back to the homepage or explore our portfolio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" variant="primary" size="md">Back to Home</Button>
            <Button href="/portfolio" variant="secondary" size="md">View Portfolio</Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
