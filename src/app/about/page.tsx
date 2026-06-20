import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Heart, ShieldCheck, Target } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Reveal } from "@/components/anim/reveal";
import { Scene } from "@/components/visuals/scene";
import { StatsBand } from "@/components/sections/stats-band";
import { Instructors } from "@/components/sections/instructors";
import { Credentials } from "@/components/sections/credentials";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Ideal Driving School — TDLR-approved driver education built on patience, safety, and genuine care, serving the Dallas–Fort Worth Metroplex since 2008.",
};

const values = [
  {
    icon: Heart,
    title: "Patience first",
    body: "Nobody learns under pressure. Calm, encouraging coaching is the foundation of every lesson we teach.",
  },
  {
    icon: ShieldCheck,
    title: "Safety is non-negotiable",
    body: "Dual-control vehicles, certified instructors, and habits built to last a lifetime — not just until test day.",
  },
  {
    icon: Target,
    title: "Built around you",
    body: "Your schedule, your pace, your goals. We adapt the lessons to the student, never the other way around.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Our Story"
        title="Driven by patience. Defined by trust."
        highlight={["trust."]}
        scene="sunrise"
        description={`For over 17 years, Ideal Driving School has helped DFW families turn nervous beginners into confident, lifelong drivers — one calm lesson at a time.`}
      >
        <Button asChild variant="gold" size="lg">
          <Link href="/booking">
            Start your journey <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <Link href="/programs">Explore programs</Link>
        </Button>
      </PageHero>

      {/* Story */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border">
              <Scene kind="city" accent="navy" />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-ink/70 px-5 py-3 backdrop-blur">
                <p className="font-display text-3xl font-bold text-cream">2008</p>
                <p className="text-xs text-cream/60">Teaching DFW to drive</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A driving academy, reimagined"
              highlight={["reimagined"]}
            />
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Ideal Driving School began with a simple frustration: driving lessons that felt
                rushed, impersonal, and intimidating. We believed Texas families deserved better —
                so we built it.
              </p>
              <p>
                Today, from our home in Plano we serve the entire Dallas–Fort Worth Metroplex with
                TDLR-approved teen and adult education, private behind-the-wheel coaching, and
                same-day third-party road testing. What hasn&apos;t changed is the philosophy:
                teach calmly, teach thoroughly, and treat every student like family.
              </p>
              <p>
                The result is a road-test pass rate we&apos;re proud of — and thousands of drivers
                across North Texas who learned to love the road, safely.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <p className="font-display text-3xl font-bold text-gold-deep">12,000+</p>
                <p className="text-sm text-muted-foreground">Drivers licensed</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-gold-deep">98%</p>
                <p className="text-sm text-muted-foreground">First-attempt pass rate</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-gold-deep">4.9★</p>
                <p className="text-sm text-muted-foreground">From 320+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto max-w-[88rem]">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Three principles behind every lesson"
            highlight={["principles"]}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-card p-8">
                  <span className="grid size-14 place-items-center rounded-2xl bg-gold/12 text-gold-deep">
                    <v.icon className="size-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StatsBand />

      <Instructors />

      {/* Credentials */}
      <section className="container-px mx-auto max-w-[88rem] pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="Credentials & Safety"
          title="Held to the highest standard"
          highlight={["highest"]}
          description="Every instructor, vehicle, and certificate meets or exceeds Texas requirements — so the only thing you focus on is driving."
        />
        <div className="mt-12">
          <Credentials />
        </div>
      </section>

      <CtaBand
        title="Come learn the Ideal way"
        description={`Visit us at ${site.address.line1}, ${site.address.city}, or book online and we'll take it from there.`}
      />
    </>
  );
}
