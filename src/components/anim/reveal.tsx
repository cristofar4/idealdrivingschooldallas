"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "header";
} & Omit<HTMLMotionProps<"div">, "ref">;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = true,
  once = true,
  as = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -8% 0px" });
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }
      }
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Word-by-word headline reveal. */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** words (lowercased, no punctuation) to paint gold */
  highlight?: string[];
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");
  const hi = new Set((highlight ?? []).map((w) => w.toLowerCase()));

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      aria-label={text}
    >
      {words.map((word, i) => {
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return (
          <span
            key={i}
            className="relative inline-flex overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
            aria-hidden="true"
          >
            <motion.span
              variants={child}
              className={cn("inline-block will-change-transform", hi.has(clean) && "text-gradient-gold")}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
}

/** Staggered container for grids/lists. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div variants={staggerItem} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
