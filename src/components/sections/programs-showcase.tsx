"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { programs, type Program } from "@/lib/site";
import { Icon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { StaggerGroup, StaggerItem } from "@/components/anim/reveal";
import { Button } from "@/components/ui/button";

const accentRGB: Record<Program["accent"], string> = {
  gold: "245,165,36",
  navy: "96,140,255",
  teal: "45,212,191",
  violet: "167,139,250",
  rose: "251,113,133",
  sky: "56,189,248",
};
const accentText: Record<Program["accent"], string> = {
  gold: "text-gold-deep dark:text-gold",
  navy: "text-blue-500",
  teal: "text-teal-500",
  violet: "text-violet-500",
  rose: "text-rose-500",
  sky: "text-sky-500",
};

function ProgramCard({ program }: { program: Program }) {
  const ref = useRef<HTMLDivElement>(null);
  const rgb = accentRGB[program.accent];

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <StaggerItem className="h-full">
      <div
        ref={ref}
        onMouseMove={onMove}
        id={program.slug}
        style={{ ["--rgb" as string]: rgb }}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-50px_rgba(8,11,20,0.5)]",
          program.popular ? "border-gold/40 ring-1 ring-gold/20" : "border-border",
        )}
      >
        {/* cursor spotlight */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx) var(--my), rgba(var(--rgb),0.14), transparent 65%)",
          }}
        />
        {/* top edge accent */}
        <div
          className="absolute inset-x-0 top-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.8), transparent)` }}
        />

        {program.popular && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-ink">
            <Sparkles className="size-3" /> Popular
          </span>
        )}

        <div className="relative">
          <span
            className="grid size-14 place-items-center rounded-2xl border border-border"
            style={{ background: `rgba(${rgb},0.12)` }}
          >
            <Icon name={program.icon as IconName} className={cn("size-7", accentText[program.accent])} />
          </span>

          <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{program.name}</h3>
          <p className={cn("mt-1 text-xs font-semibold uppercase tracking-wide", accentText[program.accent])}>
            {program.tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{program.description}</p>

          <ul className="mt-5 space-y-2.5">
            {program.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <Check className="mt-0.5 size-4 shrink-0" style={{ color: `rgb(${rgb})` }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-auto flex items-end justify-between pt-7">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-display text-3xl font-bold tracking-tight">{program.price}</p>
            {program.priceNote && <p className="text-xs text-muted-foreground">{program.priceNote}</p>}
          </div>
          <Link
            href={`/booking?plan=${program.slug}`}
            className="grid size-12 place-items-center rounded-full border border-border text-foreground transition-all group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground"
            aria-label={`Book ${program.name}`}
          >
            <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </div>
    </StaggerItem>
  );
}

export function ProgramsShowcase({
  showCta = true,
  className,
}: {
  showCta?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </StaggerGroup>

      {showCta && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="default" size="lg">
            <Link href="/programs">
              Compare all programs <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
