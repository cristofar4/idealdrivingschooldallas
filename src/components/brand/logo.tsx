import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Ideal Driving School emblem">
      <defs>
        <linearGradient id="lm-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset="0.5" stopColor="#f5a524" />
          <stop offset="1" stopColor="#c87f15" />
        </linearGradient>
        <linearGradient id="lm-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16203a" />
          <stop offset="1" stopColor="#080b14" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="url(#lm-bg)" stroke="url(#lm-ring)" strokeWidth="1.5" />
      {/* steering wheel + road */}
      <circle cx="24" cy="22" r="11.5" fill="none" stroke="url(#lm-ring)" strokeWidth="2.4" />
      <circle cx="24" cy="22" r="3" fill="#f5a524" />
      <path d="M24 25v7.5" stroke="#f5a524" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M21.4 20.6 14.7 17" stroke="#f5a524" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M26.6 20.6 33.3 17" stroke="#f5a524" strokeWidth="2.4" strokeLinecap="round" />
      {/* forward road dashes */}
      <path d="M24 38.5v2.2" stroke="#f5a524" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function Logo({
  className,
  variant = "full",
  invert = false,
}: {
  className?: string;
  variant?: "full" | "mark";
  invert?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 shrink-0" />
      {variant === "full" && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[1.15rem] font-bold tracking-tight",
              invert ? "text-cream" : "text-foreground",
            )}
          >
            Ideal
            <span className="text-gradient-gold">.</span>
          </span>
          <span
            className={cn(
              "text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
              invert ? "text-cream/55" : "text-muted-foreground",
            )}
          >
            Driving School
          </span>
        </span>
      )}
    </span>
  );
}
