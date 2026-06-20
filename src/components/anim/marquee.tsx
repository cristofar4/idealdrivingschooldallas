"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group relative flex w-full overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
