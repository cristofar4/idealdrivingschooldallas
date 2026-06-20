import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { TrustMarquee } from "@/components/sections/trust-marquee";
import { Journey } from "@/components/sections/journey";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProgramsShowcase } from "@/components/sections/programs-showcase";
import { StatsBand } from "@/components/sections/stats-band";
import { WhyUs } from "@/components/sections/why-us";
import { Instructors } from "@/components/sections/instructors";
import { TestimonialsWall } from "@/components/sections/testimonials-wall";
import { PricingCards } from "@/components/sections/pricing-cards";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />

      {/* Programs */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-32">
        <SectionHeading
          eyebrow="Programs Built For You"
          title="Every path to a Texas license, under one roof"
          highlight={["license,"]}
          description="From a teen's very first permit to an adult refresher or a same-day road test — choose the lane that fits, and we'll handle the rest."
        />
        <div className="mt-14">
          <ProgramsShowcase />
        </div>
      </section>

      <Journey />

      <StatsBand />

      <WhyUs />

      <Instructors />

      {/* Testimonials */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto max-w-[88rem]">
          <SectionHeading
            eyebrow="Loved By DFW Families"
            title="Thousands of confident drivers, one shared story"
            highlight={["confident"]}
            description="Real reviews from the teens, parents, and adult learners who trusted us with the wheel."
          />
          <div className="mt-14">
            <TestimonialsWall limit={6} />
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="default" size="lg">
              <Link href="/testimonials">
                Read all reviews <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-32">
        <SectionHeading
          eyebrow="Simple, Honest Pricing"
          title="Clear packages. No surprises."
          highlight={["No", "surprises."]}
          description="Transparent pricing with everything included — from paperwork to your mock road test. Pick a package or pay à la carte."
        />
        <div className="mt-14">
          <PricingCards />
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Need something specific?{" "}
          <Link href="/pricing" className="font-semibold text-gold-deep underline-offset-4 hover:underline">
            See full pricing & à la carte options
          </Link>
        </p>
      </section>
    </>
  );
}
