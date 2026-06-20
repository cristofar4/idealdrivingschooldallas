import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/visuals/scene";

export default function NotFound() {
  return (
    <section className="dark relative grid min-h-[100svh] place-items-center overflow-hidden bg-ink px-6 text-center text-cream">
      <div className="absolute inset-0 -z-10 opacity-80">
        <Scene kind="night" accent="gold" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />

      <div className="max-w-lg">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">
          <Compass className="size-4 text-gold" /> Wrong turn
        </span>
        <h1 className="mt-6 font-display text-7xl font-extrabold tracking-tight sm:text-8xl">
          <span className="text-gradient-gold">404</span>
        </h1>
        <p className="mt-4 text-pretty text-cream/70">
          Looks like this road doesn&apos;t lead anywhere. Let&apos;s get you back on route.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="gold" size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" /> Back to home
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link href="/booking">Book a lesson</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
