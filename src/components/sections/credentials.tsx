"use client";

import { trustBadges } from "@/lib/site";
import { Icon, type IconName } from "@/lib/icons";
import { StaggerGroup, StaggerItem } from "@/components/anim/reveal";

export function Credentials() {
  return (
    <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {trustBadges.map((b) => (
        <StaggerItem key={b.label}>
          <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold-deep">
              <Icon name={b.icon as IconName} className="size-6" />
            </span>
            <div>
              <p className="font-display font-bold">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.sub}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
