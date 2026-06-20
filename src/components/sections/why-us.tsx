"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { differentiators } from "@/lib/site";
import { Icon, type IconName } from "@/lib/icons";
import { SectionHeading } from "@/components/sections/section-heading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/anim/reveal";
import { Scene } from "@/components/visuals/scene";
import { Button } from "@/components/ui/button";

export function WhyUs() {
  return (
    <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        {/* Left: visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border">
              <Scene kind="lesson" accent="gold" />
            </div>
            {/* floating credential card */}
            <div className="absolute -bottom-6 -right-4 w-60 rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-30px_rgba(8,11,20,0.4)] sm:-right-8">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-gold/12 text-gold-deep">
                  <Icon name="shield-check" className="size-6" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold leading-none">100%</p>
                  <p className="text-xs text-muted-foreground">Certified & insured</p>
                </div>
              </div>
            </div>
            {/* floating rating card */}
            <div className="absolute -left-4 top-8 rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_30px_60px_-30px_rgba(8,11,20,0.4)] sm:-left-8">
              <p className="font-display text-lg font-bold leading-none text-gold">★ 4.9</p>
              <p className="text-[0.7rem] text-muted-foreground">320+ reviews</p>
            </div>
          </div>
        </Reveal>

        {/* Right: content */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Why families choose Ideal"
            title="A premium standard, set behind every wheel"
            highlight={["premium"]}
            description="We didn't just modernize driving lessons — we rebuilt the experience around safety, patience, and people. Here's what makes Ideal different."
          />

          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
            {differentiators.map((d) => (
              <StaggerItem key={d.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:bg-gold/[0.03]">
                  <span className="grid size-12 place-items-center rounded-xl bg-secondary text-gold-deep transition-colors group-hover:bg-gold/12">
                    <Icon name={d.icon as IconName} className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-9">
            <Button asChild variant="default" size="lg">
              <Link href="/about">
                Meet the academy <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
