import { cn } from "@/lib/utils";

function Wheel({ cx, cy, r = 16 }: { cx: number; cy: number; r: number }) {
  return (
    <g style={{ transformBox: "fill-box", transformOrigin: "center" }} className="animate-wheel">
      <circle cx={cx} cy={cy} r={r} fill="#0b0e16" stroke="#252b38" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r * 0.62} fill="none" stroke="#cfd6e0" strokeWidth="2" />
      {/* spokes */}
      <line x1={cx - r * 0.6} y1={cy} x2={cx + r * 0.6} y2={cy} stroke="#9aa6bd" strokeWidth="2" />
      <line x1={cx} y1={cy - r * 0.6} x2={cx} y2={cy + r * 0.6} stroke="#9aa6bd" strokeWidth="2" />
      <line x1={cx - r * 0.42} y1={cy - r * 0.42} x2={cx + r * 0.42} y2={cy + r * 0.42} stroke="#9aa6bd" strokeWidth="2" />
      <line x1={cx - r * 0.42} y1={cy + r * 0.42} x2={cx + r * 0.42} y2={cy - r * 0.42} stroke="#9aa6bd" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="3.2" fill="#f5a524" />
    </g>
  );
}

function Car() {
  return (
    <svg viewBox="0 0 260 120" className="w-full">
      <defs>
        <linearGradient id="ds-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffdf9b" />
          <stop offset="0.55" stopColor="#f5a524" />
          <stop offset="1" stopColor="#c87f15" />
        </linearGradient>
        <linearGradient id="ds-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fb0ff" />
          <stop offset="1" stopColor="#16203a" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="131" cy="110" rx="106" ry="7" fill="#000" opacity="0.4" />

      {/* cabin */}
      <path
        d="M82 66 L106 44 C110 41 114 40 120 40 L154 40 C164 40 173 44 180 52 L194 66 Z"
        fill="url(#ds-body)"
      />
      {/* window */}
      <path
        d="M106 62 L122 48 C125 45.5 128 45 132 45 L152 45 C159 45 165 48 170 54 L176 62 Z"
        fill="url(#ds-glass)"
        opacity="0.9"
      />
      <line x1="134" y1="46" x2="134" y2="62" stroke="#0b1020" strokeWidth="2" opacity="0.45" />

      {/* lower body */}
      <path
        d="M26 92 C26 74 44 66 64 66 L198 66 C218 66 233 74 236 89 C236.5 95 232 98 226 98 L36 98 C30 98 26 96 26 92 Z"
        fill="url(#ds-body)"
      />
      <path d="M42 80 L220 80" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />

      {/* lights */}
      <circle cx="230" cy="82" r="4" fill="#fff7e0" />
      <path d="M234 82 L300 71 L300 95 Z" fill="#fff3cf" opacity="0.16" />
      <rect x="25" y="78" width="5" height="8" rx="2" fill="#ff5a4d" />

      <Wheel cx={80} cy={98} r={16} />
      <Wheel cx={188} cy={98} r={16} />
    </svg>
  );
}

/** Animated side-view driving scene — spinning wheels, streaming road, gentle motion. */
export function DrivingScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#0a1430] via-[#15244a] to-[#2c2418]",
        className,
      )}
      role="img"
      aria-label="A car driving down the road"
    >
      {/* sun + glow */}
      <div className="absolute left-1/2 top-[16%] size-52 -translate-x-1/2 rounded-full bg-gold/35 blur-3xl" />
      <div className="absolute left-1/2 top-[19%] size-20 -translate-x-1/2 rounded-full bg-gold-soft blur-lg" />

      {/* drifting clouds */}
      <div className="absolute inset-x-0 top-[16%] animate-drift">
        <div className="absolute left-[12%] h-5 w-24 rounded-full bg-white/10 blur-md" />
        <div className="absolute left-[58%] top-6 h-4 w-20 rounded-full bg-white/10 blur-md" />
        <div className="absolute left-[78%] h-6 w-28 rounded-full bg-white/[0.07] blur-md" />
      </div>

      {/* distant skyline */}
      <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[36%] h-16 w-full opacity-50">
        <g fill="#0a1124">
          {[
            [10, 40], [42, 24], [70, 50], [104, 16], [140, 44], [180, 30],
            [220, 52], [262, 22], [300, 46], [338, 30], [372, 50],
          ].map(([x, top], i) => (
            <rect key={i} x={x} y={top} width="28" height={80 - top} />
          ))}
        </g>
      </svg>

      {/* road */}
      <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-b from-[#0c1018] to-[#05070d]">
        <div className="absolute inset-x-0 top-0 h-px bg-gold/30" />
        <div
          className="animate-road absolute inset-x-0 top-[48%] h-1.5 opacity-90"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg,#f5c06a 0 28px,transparent 28px 56px)",
          }}
        />
      </div>

      {/* speed streaks */}
      <div className="absolute bottom-[40%] left-[10%] flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-streak h-0.5 w-12 rounded-full bg-cream/60"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>

      {/* the car */}
      <div className="animate-bob absolute bottom-[29%] left-1/2 w-[66%] max-w-[420px] -translate-x-1/2">
        <Car />
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,6,12,0.55))]" />
    </div>
  );
}
