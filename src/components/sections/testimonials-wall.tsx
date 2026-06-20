"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Quote, Star, X } from "lucide-react";
import { testimonials, type Testimonial } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Scene } from "@/components/visuals/scene";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("size-4", i < n ? "fill-gold text-gold" : "text-muted-foreground/30")} />
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-ink font-display text-sm font-bold text-cream">
      {initials}
    </span>
  );
}

export function TestimonialsWall({ limit }: { limit?: number }) {
  const [active, setActive] = useState<Testimonial | null>(null);
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {items.map((t, i) => (
          <motion.div
            key={t.name + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
            className="break-inside-avoid"
          >
            <figure
              className={cn(
                "group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300",
                t.highlight
                  ? "border-gold/30 bg-gradient-to-b from-gold/[0.06] to-card"
                  : "border-border bg-card hover:border-gold/20",
              )}
            >
              <Quote className="size-7 text-gold/40" />
              <div className="mt-3">
                <Stars n={t.rating} />
              </div>
              <blockquote className="mt-4 text-pretty text-[0.95rem] leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </div>
                {t.video && (
                  <button
                    type="button"
                    onClick={() => setActive(t)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-deep transition-colors hover:bg-gold/20"
                    aria-label={`Watch ${t.name}'s story`}
                  >
                    <Play className="size-3 fill-current" /> Story
                  </button>
                )}
              </figcaption>
            </figure>
          </motion.div>
        ))}
      </div>

      <StoryModal item={active} onClose={() => setActive(null)} />
    </>
  );
}

function StoryModal({ item, onClose }: { item: Testimonial | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="dark relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-ink text-cream"
          >
            <div className="relative aspect-video">
              <Scene kind="sunrise" accent="gold" />
              <div className="absolute inset-0 grid place-items-center bg-ink/20">
                <span className="grid size-16 place-items-center rounded-full bg-gold text-ink shadow-lg">
                  <Play className="size-7 fill-current" />
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-ink/60 text-cream backdrop-blur transition-colors hover:bg-ink"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="p-6">
              <Stars n={item.rating} />
              <blockquote className="mt-3 text-pretty leading-relaxed text-cream/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-4 font-semibold">{item.name}</p>
              <p className="text-sm text-cream/55">
                {item.role} · {item.location}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
