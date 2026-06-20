"use client";

import { Star } from "lucide-react";
import { Marquee } from "@/components/anim/marquee";
import { Icon } from "@/lib/icons";
import { trustBadges } from "@/lib/site";

const reviewPlatforms = ["Google", "Facebook", "Yelp", "Nextdoor", "Sulekha"];

export function TrustMarquee() {
  return (
    <section className="relative border-y border-border bg-background py-8">
      <div className="container-px mx-auto mb-6 max-w-[88rem]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Trusted across the Dallas–Fort Worth Metroplex
        </p>
      </div>
      <Marquee>
        {trustBadges.map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5"
          >
            <Icon name={b.icon as "shield-check"} className="size-5 text-gold-deep" />
            <span className="whitespace-nowrap text-sm font-semibold text-foreground">{b.label}</span>
          </div>
        ))}
        {reviewPlatforms.map((p) => (
          <div
            key={p}
            className="flex items-center gap-2 whitespace-nowrap px-3 text-lg font-semibold tracking-tight text-muted-foreground/70"
          >
            <span className="flex items-center gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-gold text-gold" />
              ))}
            </span>
            <span className="font-display">{p}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
