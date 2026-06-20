"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { plans, aLaCarte } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/anim/reveal";

export function PricingCards() {
  return (
    <StaggerGroup className="grid items-stretch gap-6 lg:grid-cols-3">
      {plans.map((plan) => {
        const popular = plan.popular;
        return (
          <StaggerItem key={plan.name} className="h-full">
            <div
              className={cn(
                "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 sm:p-8",
                popular
                  ? "dark border-gold/40 bg-ink text-cream shadow-[0_50px_100px_-50px_rgba(245,165,36,0.4)] lg:-mt-4 lg:mb-4"
                  : "border-border bg-card hover:-translate-y-1",
              )}
            >
              {popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-ink">
                  <Sparkles className="size-3" /> Most Popular
                </span>
              )}

              <div>
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className={cn("text-sm", popular ? "text-cream/55" : "text-muted-foreground")}>
                  {plan.audience}
                </p>
              </div>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-5xl font-extrabold tracking-tight">
                  ${plan.price}
                </span>
                {plan.unit && (
                  <span className={cn("mb-1.5 text-sm", popular ? "text-cream/50" : "text-muted-foreground")}>
                    / {plan.unit}
                  </span>
                )}
              </div>

              <p className={cn("mt-3 text-sm leading-relaxed", popular ? "text-cream/65" : "text-muted-foreground")}>
                {plan.blurb}
              </p>

              <ul className="mt-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        popular ? "bg-gold text-ink" : "bg-gold/12 text-gold-deep",
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className={popular ? "text-cream/85" : "text-foreground/85"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={popular ? "gold" : "default"}
                size="lg"
                className="mt-8 w-full"
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}

export function ALaCarte() {
  return (
    <Reveal>
      <div className="rounded-3xl border border-border bg-card p-7 sm:p-9">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-bold">À la carte services</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Just need one thing? Pay only for what you use. No packages required.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/booking">Book any service</Link>
          </Button>
        </div>

        <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {aLaCarte.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 bg-card p-5">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
              <p className="shrink-0 font-display text-lg font-bold text-gold-deep">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
