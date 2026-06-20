"use client";

import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/anim/reveal";

type Cell = boolean | string;

const columns = ["Permit Starter", "Teen Complete", "Private Pro"];
const rows: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Classroom instruction", values: ["Online prep", "32 hours", false] },
  { label: "Behind-the-wheel hours", values: [false, "7 hours", "10 hours"] },
  { label: "Observation hours", values: [false, "7 hours", false] },
  { label: "Permit / knowledge prep", values: [true, true, "Add-on"] },
  { label: "Pickup & drop-off", values: [false, "Optional", true] },
  { label: "Female instructor option", values: [true, true, true] },
  { label: "Mock road test", values: [false, true, true] },
  { label: "Priority scheduling", values: [false, true, true] },
];

function CellView({ value }: { value: Cell }) {
  if (value === true)
    return (
      <span className="mx-auto grid size-6 place-items-center rounded-full bg-gold/15 text-gold-deep">
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto grid size-6 place-items-center text-muted-foreground/40">
        <Minus className="size-4" />
      </span>
    );
  return <span className="text-sm font-medium text-foreground/85">{value}</span>;
}

export function PricingComparison() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-center">
            <thead>
              <tr className="border-b border-border">
                <th className="p-5 text-left font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Compare features
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    className={cn(
                      "p-5 font-display text-base font-bold",
                      i === 1 && "bg-gold/[0.06] text-gold-deep",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-border/70 last:border-0">
                  <td className="p-5 text-left text-sm font-medium">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className={cn("p-5", i === 1 && "bg-gold/[0.04]")}>
                      <CellView value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
