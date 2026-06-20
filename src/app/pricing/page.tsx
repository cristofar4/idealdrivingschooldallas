import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { PricingCards, ALaCarte } from "@/components/sections/pricing-cards";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent driving school pricing in Dallas–Fort Worth. Teen programs from $399, private lessons from $60/hr, 3rd-party road test $80. No hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumb="Pricing"
        eyebrow="Transparent Pricing"
        title="Honest pricing, everything included"
        highlight={["included"]}
        scene="map"
        accent="teal"
        description="No hidden fees, no upsells at the curb. Choose a complete package or pay only for the services you need — the price you see is the price you pay."
      >
        <Button asChild variant="gold" size="lg">
          <Link href="/booking">
            Book a Lesson <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </PageHero>

      {/* Plans */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-28">
        <SectionHeading
          eyebrow="Packages"
          title="Pick the package that fits"
          highlight={["fits"]}
          description="Every package includes paperwork support, certified instructors, and our calm, judgment-free teaching style."
        />
        <div className="mt-16">
          <PricingCards />
        </div>
        <p className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <ShieldCheck className="size-4 text-gold-deep" />
          Flexible payment options available · TDLR-approved curriculum
        </p>
      </section>

      {/* Comparison */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto max-w-[88rem]">
          <SectionHeading
            eyebrow="Side By Side"
            title="Compare every package"
            highlight={["Compare"]}
            description="See exactly what's included at each tier so you can choose with total confidence."
          />
          <div className="mt-12">
            <PricingComparison />
          </div>
        </div>
      </section>

      {/* A la carte */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-28">
        <ALaCarte />
      </section>

      {/* FAQ */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            align="left"
            eyebrow="Pricing FAQ"
            title="Questions about cost"
            highlight={["cost"]}
            description="Transparent answers about packages, payments, and what's included."
          />
          <FaqAccordion category="Programs & Pricing" />
        </div>
      </section>

      <CtaBand
        title="Great value. Real results."
        description="Join 12,000+ licensed Texas drivers who started with an Ideal package."
      />
    </>
  );
}
