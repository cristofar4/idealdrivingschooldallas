import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileCheck,
  Flag,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/anim/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Road Test Services",
  description:
    "Skip the DPS wait. Take your official Texas road test with Ideal's DPS-authorized third-party examiners — $80, in our car or yours, with same-day results.",
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Book your slot",
    body: "Reserve a road-test appointment online or by phone — most students test within days, not weeks.",
  },
  {
    icon: ClipboardList,
    title: "Pre-test walkthrough",
    body: "We inspect the vehicle and walk you through exactly what the examiner evaluates, so there are no surprises.",
  },
  {
    icon: Car,
    title: "Drive the route",
    body: "Complete the official ~45-minute exam with a calm, state-authorized examiner on a familiar route.",
  },
  {
    icon: Flag,
    title: "Get your result",
    body: "Receive your pass result the same day, with the paperwork you need to finish at DPS.",
  },
];

const bring = [
  "Valid learner's permit",
  "Proof of identity & residency",
  "Proof of insurance (if using your car)",
  "Verification of Enrollment (under 18)",
  "Impact Texas Drivers completion",
  "Comfortable, closed-toe shoes",
];

const vehicle = [
  "Valid registration & inspection",
  "Working lights, signals & brakes",
  "Functioning seatbelts",
  "Insured & road-worthy",
  "Or simply use our dual-control car",
];

export default function RoadTestPage() {
  return (
    <>
      <PageHero
        crumb="Road Test"
        eyebrow="3rd-Party Road Testing"
        title="Skip the DPS wait. Pass with confidence."
        highlight={["confidence."]}
        scene="test"
        accent="violet"
        description="As a Texas DPS-authorized testing partner, we administer the official road test on your schedule — in our car or yours — and hand you the result the same day."
      >
        <Button asChild variant="gold" size="lg">
          <Link href="/booking?service=road-test">
            Book your road test <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </PageHero>

      {/* Value + price card */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Test With Ideal"
              title="The fast, calm way to get licensed"
              highlight={["fast,", "calm"]}
              description="DPS appointments can be booked out for weeks. We make road testing simple, quick, and far less stressful."
            />
            <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Clock, label: "Same-day results", sub: "No anxious waiting" },
                { icon: BadgeCheck, label: "State-authorized", sub: "Official DPS partner" },
                { icon: Car, label: "Our car or yours", sub: "Dual-control available" },
                { icon: FileCheck, label: "Paperwork help", sub: "We guide every form" },
              ].map((f) => (
                <StaggerItem key={f.label}>
                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold-deep">
                      <f.icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{f.label}</p>
                      <p className="text-sm text-muted-foreground">{f.sub}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal delay={0.1}>
            <div className="dark relative overflow-hidden rounded-[2rem] border border-gold/30 bg-ink p-8 text-cream">
              <div className="absolute -right-12 -top-12 size-48 rounded-full bg-gold/20 blur-[80px]" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                3rd-Party Road Test
              </p>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-6xl font-extrabold">$80</span>
                <span className="mb-2 text-cream/50 line-through">$100</span>
              </div>
              <p className="mt-2 text-sm text-cream/60">By appointment · same-day result</p>

              <ul className="mt-7 space-y-3">
                {[
                  "Official Texas road test",
                  "State-authorized examiner",
                  "Use our car or your own",
                  "Pre-test vehicle inspection",
                  "Same-day pass results",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-5 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button asChild variant="gold" size="lg" className="mt-8 w-full">
                <Link href="/booking?service=road-test">Reserve my appointment</Link>
              </Button>
              <p className="mt-4 text-center text-sm text-cream/55">
                Or call{" "}
                <a href={site.phoneHref} className="font-semibold text-gold">
                  {site.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto max-w-[88rem]">
          <SectionHeading
            eyebrow="How It Works"
            title="Four simple steps to licensed"
            highlight={["Four"]}
          />
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="relative h-full rounded-3xl border border-border bg-card p-7">
                  <span className="font-display text-5xl font-extrabold text-gold/20">
                    0{i + 1}
                  </span>
                  <span className="mt-3 grid size-12 place-items-center rounded-2xl bg-gold/12 text-gold-deep">
                    <s.icon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Requirements */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-32">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <ChecklistCard title="What to bring" icon={<ClipboardList className="size-5" />} items={bring} />
          </Reveal>
          <Reveal delay={0.1}>
            <ChecklistCard title="Vehicle requirements" icon={<Car className="size-5" />} items={vehicle} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="Road Test FAQ"
            title="Everything you're wondering"
            highlight={["wondering"]}
            description="Still have a question? Call us — we're happy to walk you through it."
          />
          <FaqAccordion category="Road Test" />
        </div>
      </section>

      <CtaBand
        title="Ready to pass on the first try?"
        description="Book your third-party road test today and join thousands who got licensed the easy way."
        primary={{ label: "Book road test", href: "/booking?service=road-test" }}
      />
    </>
  );
}

function ChecklistCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="h-full rounded-3xl border border-border bg-card p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-gold/12 text-gold-deep">
          {icon}
        </span>
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-foreground/85">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-deep" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
