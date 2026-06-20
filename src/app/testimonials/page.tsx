import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { TestimonialsWall } from "@/components/sections/testimonials-wall";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/anim/reveal";
import { Counter } from "@/components/anim/counter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read real reviews from teens, parents, and adult learners who earned their license with Ideal Driving School in Dallas–Fort Worth. 4.9★ from 320+ reviews.",
};

const breakdown = [
  { stars: 5, pct: 94 },
  { stars: 4, pct: 5 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        crumb="Testimonials"
        eyebrow="Student Stories"
        title="The reviews that mean the most"
        highlight={["reviews"]}
        scene="sunrise"
        description="We're proud of our pass rate — but we're proudest of the families who trust us, return to us, and recommend us to their neighbors across North Texas."
      />

      {/* Rating summary */}
      <section className="container-px mx-auto max-w-[88rem] py-20">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2rem] border border-border bg-card p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
            <div className="text-center lg:border-r lg:border-border lg:pr-12">
              <p className="font-display text-7xl font-extrabold tracking-tight text-gold-deep">
                <Counter value={4.9} decimals={1} />
              </p>
              <div className="mt-2 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                <Counter value={320} suffix="+" /> verified reviews
              </p>
            </div>
            <div className="space-y-2.5">
              {breakdown.map((b) => (
                <div key={b.stars} className="flex items-center gap-3">
                  <span className="flex w-12 items-center gap-1 text-sm text-muted-foreground">
                    {b.stars} <Star className="size-3 fill-gold text-gold" />
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-gold-deep"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm text-muted-foreground">{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Wall */}
      <section className="container-px mx-auto max-w-[88rem] pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="In Their Words"
          title="Real reviews from real drivers"
          highlight={["Real", "real"]}
          description="Tap a story badge to hear from students who started exactly where you are now."
        />
        <div className="mt-14">
          <TestimonialsWall />
        </div>
        <div className="mt-14 text-center">
          <Button asChild variant="gold" size="lg">
            <Link href="/booking">
              Become the next success story <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand title="Your story starts here" />
    </>
  );
}
