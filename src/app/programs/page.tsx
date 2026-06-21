import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProgramsShowcase } from "@/components/sections/programs-showcase";
import { ProgramDetails } from "@/components/sections/program-details";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Teen and adult driver education, private lessons, permit prep, defensive driving, and 3rd party road testing, TDLR approved programs for every Texas driver.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        crumb="Programs"
        eyebrow="Programs & Courses"
        title="Find the program that fits your road ahead"
        highlight={["fits"]}
        scene="road"
        accent="navy"
        description="Six focused programs, one consistent standard of patient, professional instruction. Whether it's a first permit or a final road test, there's a clear lane for you."
      >
        <Button asChild variant="gold" size="lg">
          <Link href="/booking">
            Book a Lesson <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <a href={site.phoneHref}>
            <Phone className="size-4" /> {site.phone}
          </a>
        </Button>
      </PageHero>

      {/* Overview cards */}
      <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-28">
        <SectionHeading
          eyebrow="At A Glance"
          title="All six programs, side by side"
          highlight={["six"]}
          description="Tap any program to jump to the details, or book directly from the card."
        />
        <div className="mt-14">
          <ProgramsShowcase showCta={false} />
        </div>
      </section>

      {/* Deep dives */}
      <section className="bg-bone/40 py-24 sm:py-32">
        <div className="container-px mx-auto max-w-[88rem]">
          <SectionHeading
            align="left"
            eyebrow="In Detail"
            title="Exactly what's included"
            highlight={["included"]}
            description="No fine print, no surprises, here's precisely what each program covers and who it's built for."
          />
          <div className="mt-16">
            <ProgramDetails />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which program fits?"
        description="Tell us your goals and we'll recommend the perfect path, no pressure, no obligation."
        primary={{ label: "Talk to an advisor", href: "/contact" }}
      />
    </>
  );
}
