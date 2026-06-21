"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Phone, ShieldCheck, Star, ChevronDown } from "lucide-react";
import { site, stats } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/anim/magnetic";
import { TextReveal } from "@/components/anim/reveal";
import { Counter } from "@/components/anim/counter";
import { Scene } from "@/components/visuals/scene";

const EASE = [0.16, 1, 0.3, 1] as const;

const quickPicks = [
  { label: "Teen Driver Ed", href: "/booking?plan=teen", note: "Ages 14 to 17" },
  { label: "Private Lessons", href: "/booking?plan=private", note: "Your pace" },
  { label: "Road Test", href: "/booking?service=road-test", note: "$80 · same day" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="dark relative flex min-h-[100svh] items-center overflow-hidden bg-ink pb-16 pt-28 text-cream"
    >
      {/* Background scene + parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20 scale-110">
        <Scene kind="hero" accent="gold" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Aurora blobs */}
      <div className="absolute -left-20 top-20 -z-10 size-[28rem] rounded-full bg-gold/20 blur-[120px] animate-aurora" />
      <div className="absolute -right-10 bottom-0 -z-10 size-[26rem] rounded-full bg-sky-400/25 blur-[130px] animate-aurora [animation-delay:-6s]" />

      <motion.div style={{ y: contentY }} className="container-px mx-auto w-full max-w-[88rem]">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur"
            >
              <ShieldCheck className="size-4 text-gold" />
              <span className="text-cream/80">TDLR Approved</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="flex items-center gap-1 text-cream/80">
                <Star className="size-3.5 fill-gold text-gold" /> 4.9 · 320+ reviews
              </span>
            </motion.div>

            <h1 className="font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl xl:text-[4.6rem]">
              <TextReveal text="Master the road," highlight={["road,", "road"]} />
              <br />
              <span className="text-gradient-gold">
                <TextReveal text="for life." delay={0.35} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg"
            >
              Ideal Driving School turns first timers into calm, capable, road test ready drivers
              across the {site.address.area}, with certified instructors and lessons built entirely
              around you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button asChild variant="gold" size="xl">
                  <Link href="/booking">
                    Start Driving Today <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild variant="glass" size="xl">
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {stats.slice(0, 3).map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-cream">
                    {s.prefix}
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-xs text-cream/55">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right, quick booking card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-px -z-10 rounded-[1.8rem] bg-gradient-to-b from-gold/40 via-white/10 to-transparent" />
              <div className="glass-dark rounded-[1.75rem] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      Quick Start
                    </p>
                    <h2 className="mt-1 font-display text-xl font-bold text-cream">
                      Book in 2 minutes
                    </h2>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Enrolling now
                  </span>
                </div>

                <div className="mt-6 space-y-2.5">
                  {quickPicks.map((q) => (
                    <Link
                      key={q.label}
                      href={q.href}
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all hover:border-gold/40 hover:bg-white/[0.06]"
                    >
                      <span className="flex flex-col">
                        <span className="font-semibold text-cream">{q.label}</span>
                        <span className="text-xs text-cream/50">{q.note}</span>
                      </span>
                      <span className="grid size-8 place-items-center rounded-full border border-white/10 text-cream/60 transition-all group-hover:border-gold/50 group-hover:bg-gold group-hover:text-ink">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  ))}
                </div>

                <Button asChild variant="gold" size="lg" className="mt-5 w-full">
                  <Link href="/booking">See full availability</Link>
                </Button>

                <a
                  href={site.phoneHref}
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-cream/60 transition-colors hover:text-gold"
                >
                  <Phone className="size-4" /> Prefer to call? {site.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-6 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1.5 text-cream/45"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
