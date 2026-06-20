"use client";

import { Globe, Award } from "lucide-react";
import { instructors, type Instructor } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/sections/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/anim/reveal";

const ring: Record<Instructor["accent"], string> = {
  gold: "from-gold to-gold-deep",
  navy: "from-blue-400 to-blue-600",
  teal: "from-teal-300 to-teal-500",
  violet: "from-violet-400 to-violet-600",
};

export function Instructors({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="container-px mx-auto max-w-[88rem] py-24 sm:py-32">
      {withHeading && (
        <SectionHeading
          eyebrow="The People Who Teach You"
          title="Certified instructors who genuinely care"
          highlight={["care"]}
          description="Calm, background-checked, and endlessly patient — these are the people parents request by name and students never forget."
        />
      )}

      <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {instructors.map((ins) => (
          <StaggerItem key={ins.name} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-50px_rgba(8,11,20,0.5)]">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display text-xl font-bold text-white shadow-inner",
                    ring[ins.accent],
                  )}
                >
                  {ins.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold leading-tight">{ins.name}</h3>
                  <p className="text-xs text-muted-foreground">{ins.role}</p>
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">{ins.bio}</p>

              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Award className="size-3.5 text-gold-deep" />
                  <span className="font-semibold text-foreground">{ins.years} years</span> teaching
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Globe className="mt-0.5 size-3.5 text-gold-deep" />
                  {ins.languages.join(" · ")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ins.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-medium text-secondary-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
