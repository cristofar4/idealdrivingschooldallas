"use client";

import { motion } from "framer-motion";
import { TextReveal, Reveal } from "@/components/anim/reveal";
import { Scene, type SceneKind, type SceneAccent } from "@/components/visuals/scene";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  scene = "road",
  accent = "gold",
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string[];
  description?: string;
  scene?: SceneKind;
  accent?: SceneAccent;
  /** Kept for compatibility; breadcrumb is no longer shown. */
  crumb?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="dark relative overflow-hidden bg-ink pb-20 pt-36 text-cream sm:pb-28 sm:pt-44">
      <div className="absolute inset-0 -z-20 scale-110 opacity-90">
        <Scene kind={scene} accent={accent} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/60 to-background" />
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -right-20 top-10 -z-10 size-[24rem] rounded-full bg-gold/15 blur-[120px]" />

      <div className="container-px mx-auto max-w-[88rem]">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream/70 backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-gold" />
          {eyebrow}
        </motion.span>

        <h1 className="mt-6 max-w-4xl font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-[4rem]">
          <TextReveal text={title} highlight={highlight} delay={0.1} />
        </h1>

        {description && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-cream/65 sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap items-center gap-3">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
