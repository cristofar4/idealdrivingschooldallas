import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/anim/reveal";
import { Scene } from "@/components/visuals/scene";
import { Icon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ideal Driving School in Plano, TX. Call (214) 884-5350, email us, or visit 4101 E. Park Blvd. Serving the Dallas Fort Worth Metroplex.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Get In Touch"
        title="We'd love to hear from you"
        highlight={["love"]}
        scene="map"
        accent="rose"
        description="Questions about a program, scheduling, or pricing? Reach out and a real person will get back to you fast, usually the same day."
      />

      <section className="container-px mx-auto max-w-[88rem] py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Info */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<Phone className="size-5" />} title="Call us" lines={[site.phone, site.phoneAlt]} href={site.phoneHref} />
              <InfoCard icon={<Mail className="size-5" />} title="Email us" lines={[site.email]} href={site.emailHref} />
              <InfoCard
                icon={<MapPin className="size-5" />}
                title="Visit us"
                lines={[site.address.line1, `${site.address.city}, ${site.address.region} ${site.address.postal}`]}
                href={site.address.mapHref}
              />
              <InfoCard
                icon={<Clock className="size-5" />}
                title="Hours"
                lines={site.hours.map((h) => `${h.day}: ${h.time}`)}
              />
            </div>

            {/* Map */}
            <Reveal className="mt-6">
              <div className="relative overflow-hidden rounded-3xl border border-border">
                <div className="aspect-[16/10]">
                  <Scene kind="map" accent="navy" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-cream">
                    <p className="font-display text-lg font-bold">{site.name}</p>
                    <p className="text-sm text-cream/70">
                      {site.address.line1}, {site.address.city}, {site.address.region}
                    </p>
                  </div>
                  <Button asChild variant="gold" size="sm">
                    <a href={site.address.mapHref} target="_blank" rel="noreferrer">
                      Get directions
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Follow us</span>
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-gold/40 hover:text-gold-deep"
                >
                  <Icon name={s.icon as "facebook"} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  lines,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-[0_30px_60px_-40px_rgba(8,11,20,0.4)]">
      <span className="grid size-11 place-items-center rounded-xl bg-gold/12 text-gold-deep">
        {icon}
      </span>
      <p className="mt-4 font-display font-bold">{title}</p>
      <div className="mt-1 space-y-0.5">
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}
