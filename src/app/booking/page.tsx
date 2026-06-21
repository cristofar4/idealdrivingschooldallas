import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { BookingFlow } from "@/components/booking/booking-flow";

export const metadata: Metadata = {
  title: "Book a Lesson",
  description:
    "Reserve your driving lesson, class, or 3rd party road test with Ideal Driving School in four simple steps. No payment required to book.",
};

function normalize(v: string | string[] | undefined): string | null {
  if (!v) return null;
  return Array.isArray(v) ? v[0] : v;
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[]; service?: string | string[] }>;
}) {
  const sp = await searchParams;
  const initial = normalize(sp.plan) ?? normalize(sp.service);

  return (
    <>
      <PageHero
        crumb="Booking"
        eyebrow="Reserve Your Spot"
        title="Book your lesson in four easy steps"
        highlight={["four"]}
        scene="wheel"
        accent="gold"
        description="Choose your service, pick a time, meet your instructor, and you're set. It takes about two minutes, and you can always adjust later."
      />

      <section className="container-px mx-auto max-w-[88rem] py-20 sm:py-24">
        <BookingFlow initialService={initial} />
      </section>
    </>
  );
}
