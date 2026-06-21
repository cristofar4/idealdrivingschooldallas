import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { Logo } from "@/components/brand/logo";
import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Scene } from "@/components/visuals/scene";

export function SiteFooter() {
  return (
    <footer className="dark relative overflow-hidden bg-ink text-cream">
      {/* CTA band */}
      <div className="container-px mx-auto max-w-[88rem] pt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-14 sm:px-12 sm:py-20">
          <div className="absolute inset-0 -z-10 opacity-90">
            <Scene kind="sunrise" accent="gold" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cream/70">
              Your license is closer than you think
            </p>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s get you on
              <br />
              <span className="text-gradient-gold">the road.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-cream/65">
              Join 12,000+ confident Texas drivers who started right here. Book your first lesson in
              under two minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="gold" size="lg">
                <Link href="/booking">
                  Book a Lesson <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={site.phoneHref}>
                  <Phone className="size-4" /> {site.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-px mx-auto max-w-[88rem] py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">{site.description}</p>
            <div className="mt-6 flex gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-white/12 bg-white/5 text-cream/70 transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                >
                  <Icon name={s.icon as "facebook"} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-cream/45">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-cream/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                      <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-14 grid gap-5 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <ContactItem icon={<MapPin className="size-4" />} label="Visit">
            {site.address.line1}, {site.address.city}, {site.address.region} {site.address.postal}
          </ContactItem>
          <ContactItem icon={<Phone className="size-4" />} label="Call">
            <a href={site.phoneHref} className="hover:text-gold">
              {site.phone}
            </a>
            <span className="text-cream/30"> · </span>
            <a href={site.phoneAltHref} className="hover:text-gold">
              {site.phoneAlt}
            </a>
          </ContactItem>
          <ContactItem icon={<Mail className="size-4" />} label="Email">
            <a href={site.emailHref} className="hover:text-gold">
              {site.email}
            </a>
          </ContactItem>
          <ContactItem icon={<Clock className="size-4" />} label="Hours">
            Mon to Fri 9 to 7 · Sat 9 to 5 · Sun by appt.
          </ContactItem>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-px mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-3 py-6 text-xs text-cream/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Serving the {site.address.area}.
          </p>
          <p className="flex items-center gap-4">
            <span>TDLR Approved Driver Education</span>
            <span className="hidden sm:inline">·</span>
            <Link href="/contact" className="hover:text-gold">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-white/12 bg-white/5 text-gold">
        {icon}
      </span>
      <div className="text-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/40">{label}</p>
        <p className="mt-1 text-cream/70">{children}</p>
      </div>
    </div>
  );
}
