"use client";

import { stats } from "@/lib/site";
import { Counter } from "@/components/anim/counter";
import { Reveal } from "@/components/anim/reveal";
import { Scene } from "@/components/visuals/scene";

export function StatsBand() {
  return (
    <section className="container-px mx-auto -mt-px max-w-[88rem] py-16 sm:py-20">
      <Reveal>
        <div className="dark relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink px-6 py-12 text-cream sm:px-12 sm:py-14">
          <div className="absolute inset-0 -z-10 opacity-70">
            <Scene kind="night" accent="navy" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="relative">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-cream sm:text-6xl">
                    <span className="text-gradient-gold">
                      {s.prefix}
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                  </p>
                  <p className="mt-3 font-semibold text-cream/90">{s.label}</p>
                  {s.sub && <p className="mt-1 text-sm text-cream/50">{s.sub}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
