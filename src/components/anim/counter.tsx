"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals,
  duration = 2,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(
          latest.toLocaleString("en-US", {
            minimumFractionDigits: dp,
            maximumFractionDigits: dp,
          }),
        );
      },
    });
    return () => controls.stop();
  }, [inView, value, duration, mv, dp]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
