"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { gallery, type GalleryItem } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Scene } from "@/components/visuals/scene";

const spanClass: Record<GalleryItem["span"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

function GalleryTile({ item, index }: { item: GalleryItem; index: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.06 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border bg-ink",
        spanClass[item.span],
      )}
    >
      {/* SVG art is always present as the base / fallback */}
      <div className="absolute inset-0">
        <Scene kind={item.scene} accent={item.accent} />
      </div>

      {/* Real photo layered on top; hidden if it fails to load.
          Plain <img> loads browser-direct from the CDN (works even if the
          server can't reach it) and supports the onError fallback below. */}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.img}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 transition-transform duration-500 group-hover:translate-y-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
          {item.title}
        </p>
        <p className="mt-1 font-display text-lg font-bold text-cream">{item.caption}</p>
      </figcaption>
    </motion.figure>
  );
}

export function GalleryGrid() {
  return (
    <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[230px] sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item, i) => (
        <GalleryTile key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}
