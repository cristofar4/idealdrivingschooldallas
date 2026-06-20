"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type SceneKind =
  | "road"
  | "wheel"
  | "city"
  | "lesson"
  | "test"
  | "night"
  | "map"
  | "park"
  | "sunrise"
  | "hero";

export type SceneAccent = "gold" | "navy" | "teal" | "violet" | "rose" | "sky";

const PALETTES: Record<SceneAccent, { top: string; bot: string; glow: string; glow2: string; road: string; line: string }> = {
  gold: { top: "#0a1022", bot: "#2a1a26", glow: "#f5a524", glow2: "#ff7a3c", road: "#0b1120", line: "#f5c06a" },
  navy: { top: "#070d1c", bot: "#102444", glow: "#3b82f6", glow2: "#22d3ee", road: "#0a1326", line: "#9cc3ff" },
  teal: { top: "#04141a", bot: "#0a2e33", glow: "#2dd4bf", glow2: "#38bdf8", road: "#06181d", line: "#7df0e0" },
  violet: { top: "#0a0820", bot: "#241546", glow: "#8b5cf6", glow2: "#e879f9", road: "#0b0a1f", line: "#c4b5fd" },
  rose: { top: "#1a0712", bot: "#3a0f2a", glow: "#fb7185", glow2: "#f59e0b", road: "#160611", line: "#fecdd3" },
  sky: { top: "#0a1a33", bot: "#10365e", glow: "#38bdf8", glow2: "#a78bfa", road: "#08182e", line: "#bae6fd" },
};

function dashPolys(): string[] {
  const vpY = 300;
  const out: string[] = [];
  for (let k = 0; k < 6; k++) {
    const t0 = k * 0.165;
    const t1 = Math.min(t0 + 0.085, 0.98);
    const y0 = 600 - (600 - vpY) * t0;
    const y1 = 600 - (600 - vpY) * t1;
    const w0 = 16 * (1 - t0) + 1.2;
    const w1 = 16 * (1 - t1) + 1.2;
    out.push(`${400 - w0},${y0} ${400 + w0},${y0} ${400 + w1},${y1} ${400 - w1},${y1}`);
  }
  return out;
}

export function Scene({
  kind = "road",
  accent = "gold",
  className,
}: {
  kind?: SceneKind;
  accent?: SceneAccent;
  className?: string;
}) {
  const raw = useId();
  const uid = raw.replace(/[:]/g, "");
  const p = PALETTES[accent];

  const isNight = kind === "night";
  const isSunrise = kind === "sunrise" || kind === "hero";
  const glowCY = isSunrise ? 318 : isNight ? 150 : 250;
  const glowCX = kind === "night" ? 600 : 400;

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.top} />
          <stop offset="1" stopColor={p.bot} />
        </linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.95" />
          <stop offset="0.45" stopColor={p.glow2} stopOpacity="0.4" />
          <stop offset="1" stopColor={p.glow2} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`road-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.road} stopOpacity="0" />
          <stop offset="0.25" stopColor={p.road} stopOpacity="0.7" />
          <stop offset="1" stopColor="#04070e" />
        </linearGradient>
        <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
        <filter id={`grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <radialGradient id={`vig-${uid}`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="600" fill={`url(#sky-${uid})`} />

      {/* Atmospheric glow */}
      <rect x={glowCX - 360} y={glowCY - 360} width="720" height="720" fill={`url(#glow-${uid})`} />

      {/* Stars for night */}
      {isNight &&
        Array.from({ length: 36 }).map((_, i) => {
          const x = (i * 211.3) % 800;
          const y = (i * 97.7) % 230;
          const r = (i % 3) * 0.5 + 0.5;
          return <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.18 + (i % 4) * 0.12} />;
        })}

      {/* City skyline */}
      {(kind === "city" || kind === "lesson" || kind === "test") && (
        <g opacity="0.8" fill="#04070e">
          {[
            [60, 220], [110, 180], [150, 240], [205, 150], [260, 210], [310, 175],
            [360, 235], [470, 200], [520, 160], [575, 225], [630, 185], [690, 235], [745, 205],
          ].map(([x, top], i) => (
            <g key={i}>
              <rect x={x} y={top} width={42} height={300 - top} />
              {x % 2 === 0 && <rect x={x + 10} y={top + 12} width="5" height="8" fill={p.glow} opacity="0.6" />}
            </g>
          ))}
        </g>
      )}

      {/* Horizon line */}
      <rect x="0" y="298" width="800" height="2" fill={p.line} opacity="0.35" />

      {/* MAP route variant */}
      {kind === "map" ? (
        <g>
          <path
            d="M120 560 C 220 470, 120 380, 300 330 S 540 300, 470 220 S 560 130, 690 90"
            fill="none"
            stroke={p.line}
            strokeOpacity="0.5"
            strokeWidth="3"
            strokeDasharray="2 12"
            strokeLinecap="round"
          />
          {[[120, 560], [300, 330], [470, 220], [690, 90]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="13" fill={p.glow} opacity="0.18" />
              <circle cx={x} cy={y} r="6" fill={p.glow} />
              <circle cx={x} cy={y} r="2.4" fill="#04070e" />
            </g>
          ))}
        </g>
      ) : (
        <>
          {/* Perspective road */}
          <polygon points="40,600 760,600 406,300 394,300" fill={`url(#road-${uid})`} />
          <polygon points="40,600 760,600 406,300 394,300" fill="none" stroke={p.line} strokeOpacity="0.18" strokeWidth="2" />
          {/* Edge lines */}
          <polygon points="40,600 70,600 401,300 399,300" fill={p.line} opacity="0.14" />
          <polygon points="730,600 760,600 401,300 399,300" fill={p.line} opacity="0.14" />
          {/* Center dashes */}
          {dashPolys().map((pts, i) => (
            <polygon key={i} points={pts} fill={p.line} opacity={0.85 - i * 0.12} />
          ))}
        </>
      )}

      {/* Parking bays */}
      {kind === "park" && (
        <g stroke={p.line} strokeWidth="3" opacity="0.55" fill="none">
          <path d="M250 600 L 330 360" />
          <path d="M360 600 L 392 360" />
          <path d="M470 600 L 462 360" />
          <path d="M580 600 L 532 360" />
          <rect x="395" y="430" width="80" height="120" rx="8" fill={p.glow} fillOpacity="0.14" stroke={p.glow} strokeOpacity="0.7" />
        </g>
      )}

      {/* Car silhouette for lesson */}
      {kind === "lesson" && (
        <g transform="translate(400 470)">
          <ellipse cx="0" cy="78" rx="120" ry="16" fill="#04070e" opacity="0.6" />
          <path d="M-96 30 C -92 -2, -70 -28, -34 -34 L 40 -34 C 70 -30, 92 -6, 104 30 L 104 56 C 104 64, 98 70, 90 70 L -90 70 C -98 70, -104 64, -104 56 Z" fill="#0c1322" stroke={p.line} strokeOpacity="0.5" strokeWidth="2" />
          <path d="M-58 -28 L 40 -28 C 58 -26, 72 -10, 80 14 L -80 14 C -74 -8, -70 -22, -58 -28 Z" fill={p.glow} fillOpacity="0.25" />
          <circle cx="-64" cy="62" r="20" fill="#05080f" stroke={p.line} strokeOpacity="0.5" strokeWidth="3" />
          <circle cx="68" cy="62" r="20" fill="#05080f" stroke={p.line} strokeOpacity="0.5" strokeWidth="3" />
          <rect x="-12" y="22" width="24" height="14" rx="3" fill={p.glow} />
          <text x="0" y="34" textAnchor="middle" fontSize="12" fontWeight="700" fill="#04070e">L</text>
        </g>
      )}

      {/* Checkered flag for test */}
      {kind === "test" && (
        <g transform="translate(560 200)">
          <rect x="0" y="0" width="4" height="150" fill={p.line} opacity="0.7" />
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={6 + c * 18}
                y={4 + r * 16}
                width="18"
                height="16"
                fill={(r + c) % 2 === 0 ? "#f4f4f5" : "#0a0e18"}
                opacity="0.92"
              />
            )),
          )}
        </g>
      )}

      {/* Headlight beams for night */}
      {isNight && (
        <g opacity="0.5">
          <polygon points="370,540 430,540 470,360 330,360" fill={p.line} fillOpacity="0.18" />
        </g>
      )}

      {/* Steering wheel motif */}
      {(kind === "wheel" || kind === "hero") && (
        <g transform={`translate(400 ${kind === "hero" ? 330 : 300})`} opacity="0.92">
          <circle r="118" fill="none" stroke={p.line} strokeOpacity="0.35" strokeWidth="2" />
          <circle r="96" fill="none" stroke={p.glow} strokeOpacity="0.85" strokeWidth="10" />
          <circle r="96" fill="none" stroke={p.glow2} strokeOpacity="0.5" strokeWidth="2" />
          <circle r="26" fill={p.road} stroke={p.glow} strokeOpacity="0.8" strokeWidth="3" />
          <rect x="-7" y="20" width="14" height="74" rx="6" fill={p.glow} opacity="0.85" />
          <rect x="-86" y="-7" width="70" height="14" rx="6" transform="rotate(28)" fill={p.glow} opacity="0.85" />
          <rect x="16" y="-7" width="70" height="14" rx="6" transform="rotate(-28)" fill={p.glow} opacity="0.85" />
          <circle r="6" fill={p.glow2} />
        </g>
      )}

      {/* Road bottom fade for legibility */}
      <rect x="0" y="380" width="800" height="220" fill={`url(#fade-${uid})`} />

      {/* Grain + vignette */}
      <rect width="800" height="600" filter={`url(#grain-${uid})`} opacity="0.05" />
      <rect width="800" height="600" fill={`url(#vig-${uid})`} />
    </svg>
  );
}
