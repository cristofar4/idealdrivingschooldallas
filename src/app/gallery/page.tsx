import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside the Ideal Driving School experience, from first lessons to test-day success across the Dallas Fort Worth Metroplex.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Inside The Academy"
        title="Where confidence is built"
        highlight={["confidence"]}
        scene="city"
        accent="sky"
        description="Every lesson, every milestone, every road. A visual journey through the moments that turn learners into licensed, lifelong drivers."
      >
        <Button asChild variant="gold" size="lg">
          <Link href="/booking">
            Start your journey <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </PageHero>

      <section className="container-px mx-auto max-w-[88rem] py-20 sm:py-24">
        <SectionHeading
          align="left"
          eyebrow="The Experience"
          title="From the driver's seat"
          highlight={["driver's"]}
        />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </section>

      <CtaBand
        title="See yourself behind the wheel?"
        description="The best view of the road starts with your first lesson. Let's book it."
      />
    </>
  );
}
