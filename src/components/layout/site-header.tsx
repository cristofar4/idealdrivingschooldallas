"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Phone, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/lib/site";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/anim/magnetic";

const desktopLinks = navLinks;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="container-px mx-auto max-w-[88rem]">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5",
              scrolled
                ? "h-15 glass shadow-[0_18px_50px_-30px_rgba(8,11,20,0.5)]"
                : "h-16 bg-transparent",
            )}
          >
            <Link href="/" aria-label="Ideal Driving School, home" className="shrink-0">
              <Logo invert={!scrolled} />
            </Link>

            <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
              {desktopLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors",
                      scrolled
                        ? active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                        : active
                          ? "text-cream"
                          : "text-cream/70 hover:text-cream",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.phoneHref}
                className={cn(
                  "hidden items-center gap-2 rounded-full px-3 py-2 text-[0.82rem] font-medium transition-colors lg:flex",
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-cream/70 hover:text-cream",
                )}
              >
                <Phone className="size-3.5" />
                {site.phone}
              </a>
              <Magnetic strength={0.25} className="hidden sm:block">
                <Button asChild variant="gold" size="sm" className="h-10 px-5">
                  <Link href="/booking">
                    Book a Lesson
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "grid size-10 place-items-center rounded-full border backdrop-blur transition-colors xl:hidden",
                  scrolled
                    ? "border-border bg-card/60 text-foreground"
                    : "border-white/20 bg-white/10 text-cream",
                )}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* scroll progress */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold via-gold-soft to-gold/0"
        />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 xl:hidden"
        >
          <div className="dark absolute inset-0 bg-ink text-cream bg-grid-dark">
            <div className="absolute -top-24 right-0 size-80 rounded-full bg-gold/20 blur-[100px]" />
            <div className="flex h-full flex-col px-6 pb-10 pt-28">
              <nav className="flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 28 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-baseline justify-between border-b border-white/10 py-4 font-display text-3xl font-semibold tracking-tight transition-colors",
                          active ? "text-gold" : "text-cream/90 hover:text-gold",
                        )}
                      >
                        {link.label}
                        <span className="font-sans text-xs text-cream/30">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid gap-3 pt-6"
              >
                <Button asChild variant="gold" size="lg" className="w-full">
                  <Link href="/booking" onClick={onClose}>
                    Book a Lesson
                  </Link>
                </Button>
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 text-sm text-cream/70"
                >
                  <Phone className="size-4" /> {site.phone}
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
