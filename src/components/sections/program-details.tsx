"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Clock, Users } from "lucide-react";
import { programs } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/lib/icons";
import { Scene, type SceneKind } from "@/components/visuals/scene";
import { Reveal } from "@/components/anim/reveal";
import { Button } from "@/components/ui/button";

const sceneFor: Record<string, SceneKind> = {
  teen: "wheel",
  adult: "road",
  private: "lesson",
  "road-test": "test",
  permit: "map",
  defensive: "city",
};

export function ProgramDetails() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {programs.map((p, i) => {
        const reversed = i % 2 === 1;
        return (
          <div
            key={p.slug}
            id={p.slug}
            className="grid scroll-mt-28 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
          >
            <Reveal className={cn(reversed && "lg:order-2")}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border">
                <Scene kind={sceneFor[p.slug]} accent={p.accent} />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-4 py-2 text-sm font-semibold text-cream backdrop-blur">
                  <Icon name={p.icon as IconName} className="size-4 text-gold" />
                  {p.name}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className={cn(reversed && "lg:order-1")}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  {p.tagline}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                    <Users className="size-4 text-gold-deep" /> {p.ages}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                    <Clock className="size-4 text-gold-deep" /> {p.duration}
                  </span>
                </div>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold/12 text-gold-deep">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div>
                    <span className="font-display text-3xl font-bold">{p.price}</span>
                    {p.priceNote && (
                      <span className="ml-2 text-sm text-muted-foreground">{p.priceNote}</span>
                    )}
                  </div>
                  <Button asChild variant="gold" size="lg">
                    <Link href={`/booking?plan=${p.slug}`}>
                      Book now <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}
