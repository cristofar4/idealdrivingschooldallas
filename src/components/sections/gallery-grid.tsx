"use client";

import { motion } from "framer-motion";
import { gallery, type GalleryItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Scene } from "@/components/visuals/scene";

const spanClass: Record<GalleryItem["span"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

export function GalleryGrid() {
  return (
    <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[230px] lg:grid-cols-3">
      {gallery.map((item, i) => (
        <motion.figure
          key={item.title}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.06 }}
          className={cn(
            "group relative overflow-hidden rounded-3xl border border-border",
            spanClass[item.span],
          )}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
            <Scene kind={item.scene} accent={item.accent} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-500 group-hover:translate-y-0">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
              {item.title}
            </p>
            <p className="mt-1 font-display text-lg font-bold text-cream">{item.caption}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
