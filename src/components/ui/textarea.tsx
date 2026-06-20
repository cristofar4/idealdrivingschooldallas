import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-input bg-card/60 px-4 py-3 text-sm shadow-sm transition-all",
        "placeholder:text-muted-foreground/70 resize-none",
        "focus-visible:outline-none focus-visible:border-gold/60 focus-visible:ring-4 focus-visible:ring-gold/12",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
