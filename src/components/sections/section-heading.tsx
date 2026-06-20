"use client";

import { cn } from "@/lib/utils";
import { Reveal, TextReveal } from "@/components/anim/reveal";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
              invert
                ? "border-white/15 bg-white/5 text-cream/70"
                : "border-gold/25 bg-gold/8 text-gold-deep",
            )}
          >
            <span className="size-1.5 rounded-full bg-gold" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <h2
        className={cn(
          "max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]",
          invert ? "text-cream" : "text-foreground",
        )}
      >
        <TextReveal text={title} highlight={highlight} />
      </h2>

      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
              align === "center" ? "mx-auto" : "",
              invert ? "text-cream/65" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
