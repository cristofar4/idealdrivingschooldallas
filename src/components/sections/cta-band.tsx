"use client";

import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/anim/reveal";
import { Magnetic } from "@/components/anim/magnetic";

export function CtaBand({
  title = "Ready when you are",
  description = "Book your first lesson in under two minutes, or call and we'll find the perfect time together.",
  primary = { label: "Book a Lesson", href: "/booking" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
}) {
  return (
    <section className="container-px mx-auto max-w-[88rem] py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-card to-card px-6 py-14 text-center sm:px-12">
          <div className="absolute -left-10 -top-10 size-48 rounded-full bg-gold/15 blur-[80px]" />
          <div className="absolute -bottom-10 -right-10 size-48 rounded-full bg-gold/10 blur-[80px]" />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Button asChild variant="gold" size="lg">
                <Link href={primary.href}>
                  {primary.label} <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg">
              <a href={site.phoneHref}>
                <Phone className="size-4" /> {site.phone}
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
