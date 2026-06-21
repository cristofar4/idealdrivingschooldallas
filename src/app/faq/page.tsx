import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircleQuestion, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/anim/reveal";
import { Button } from "@/components/ui/button";
import { faqCategories, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about teen and adult driver education, road tests, scheduling, and pricing at Ideal Driving School in Dallas Fort Worth.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        eyebrow="Questions & Answers"
        title="Everything you need to know"
        highlight={["everything", "know"]}
        scene="wheel"
        description="From permits to pricing, here are clear answers to the questions DFW families ask us most. Can't find yours? We're a phone call away."
      />

      <section className="container-px mx-auto max-w-5xl py-20 sm:py-28">
        <Tabs defaultValue={faqCategories[0]} className="flex flex-col items-center">
          <TabsList>
            {faqCategories.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
          {faqCategories.map((c) => (
            <TabsContent key={c} value={c} className="w-full">
              <FaqAccordion category={c} />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Still have questions */}
      <section className="container-px mx-auto max-w-[88rem] pb-24 sm:pb-32">
        <Reveal>
          <div className="dark relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-8 text-cream sm:p-12">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-gold/15 blur-[90px]" />
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
                  <MessageCircleQuestion className="size-7" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold">Still have questions?</h2>
                  <p className="mt-1 max-w-md text-cream/65">
                    Our friendly front desk is happy to help you choose the right program or get you
                    booked in minutes.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">Contact us</Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <a href={site.phoneHref}>
                    <Phone className="size-4" /> {site.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
