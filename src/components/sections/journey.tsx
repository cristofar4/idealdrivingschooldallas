"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { journey } from "@/lib/site";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { Icon, type IconName } from "@/lib/icons";
import { Scene, type SceneKind } from "@/components/visuals/scene";
import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";

// One signature scene per journey stage.
const scenes: SceneKind[] = ["sunrise", "wheel", "road", "map", "test"];

export function Journey() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion() || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: wrapRef.current!,
        start: "top 60%",
        end: "bottom 75%",
        onUpdate: (self) => {
          if (railRef.current) {
            railRef.current.style.transform = `scaleY(${self.progress})`;
          }
          const idx = Math.min(journey.length - 1, Math.floor(self.progress * journey.length));
          setActive((prev) => (prev !== idx ? idx : prev));
        },
      });
      return () => st.kill();
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="dark relative overflow-clip bg-ink py-24 text-cream sm:py-32">
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -left-32 top-1/3 -z-10 size-[30rem] rounded-full bg-gold/10 blur-[140px]" />

      <div className="container-px mx-auto max-w-[88rem]">
        <SectionHeading
          invert
          eyebrow="The Ideal Journey"
          title="From first permit to fully licensed"
          highlight={["licensed"]}
          description="Five deliberate stages, one calm path. Here's exactly how we take you from nervous beginner to confident, road test ready driver."
        />

        <div ref={wrapRef} className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Sticky visual (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
                {scenes.map((kind, i) => (
                  <div
                    key={i}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700 ease-out",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Scene kind={kind} accent={i % 2 === 0 ? "gold" : "navy"} />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />

                {/* Floating active label */}
                <div className="absolute inset-x-6 bottom-6">
                  <div className="glass-dark rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-12 place-items-center rounded-xl bg-gold text-ink">
                        <Icon name={journey[active].icon as IconName} className="size-6" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                          Step {journey[active].index} · {journey[active].subtitle}
                        </p>
                        <p className="font-display text-lg font-bold text-cream">
                          {journey[active].title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="absolute right-5 top-5 flex flex-col gap-2">
                  {journey.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-6 w-1 rounded-full transition-all duration-500",
                        i === active ? "bg-gold" : "bg-white/20",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Progress rail */}
            <div className="absolute left-[1.45rem] top-2 hidden h-[calc(100%-4rem)] w-px bg-white/10 sm:block">
              <div
                ref={railRef}
                className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-gradient-to-b from-gold to-gold-deep"
              />
            </div>

            <ol className="space-y-5">
              {journey.map((step, i) => (
                <li
                  key={step.index}
                  className={cn(
                    "relative rounded-3xl border p-6 transition-all duration-500 sm:pl-16 sm:pr-8",
                    i === active
                      ? "border-gold/30 bg-white/[0.04]"
                      : "border-white/8 bg-transparent",
                  )}
                >
                  {/* Node */}
                  <span
                    className={cn(
                      "absolute left-2 top-7 hidden size-7 place-items-center rounded-full border-2 text-[0.7rem] font-bold transition-all duration-500 sm:grid",
                      i <= active
                        ? "border-gold bg-gold text-ink"
                        : "border-white/20 bg-ink text-cream/50",
                    )}
                  >
                    {i < active ? <Check className="size-3.5" /> : step.index}
                  </span>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                        {step.subtitle}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold text-cream">{step.title}</h3>
                    </div>
                    <span className="font-display text-3xl font-bold text-white/10">{step.index}</span>
                  </div>

                  {/* Mobile scene */}
                  <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 lg:hidden">
                    <Scene kind={scenes[i]} accent={i % 2 === 0 ? "gold" : "navy"} />
                  </div>

                  <p className="mt-4 text-pretty text-cream/65">{step.body}</p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {step.points.map((pt) => (
                      <li
                        key={pt}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cream/75"
                      >
                        <ArrowRight className="size-3 text-gold" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
