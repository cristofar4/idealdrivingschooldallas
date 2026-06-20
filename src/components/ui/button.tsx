import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_30px_-12px_rgba(8,11,20,0.5)] hover:shadow-[0_18px_45px_-12px_rgba(8,11,20,0.55)] hover:-translate-y-0.5",
        gold: "bg-gold text-[#0a0e18] shadow-[0_10px_34px_-10px_rgba(245,165,36,0.65)] hover:bg-gold-soft hover:shadow-[0_18px_50px_-12px_rgba(245,165,36,0.7)] hover:-translate-y-0.5",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/[0.04] hover:border-foreground/25",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "bg-transparent hover:bg-foreground/[0.05] text-foreground",
        glass:
          "glass text-foreground hover:bg-card/80 shadow-[0_8px_30px_-15px_rgba(8,11,20,0.4)]",
        link: "text-foreground underline-offset-4 hover:underline rounded-none px-0",
      },
      size: {
        sm: "h-9 px-4 text-[0.8rem]",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-[0.95rem]",
        xl: "h-15 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
