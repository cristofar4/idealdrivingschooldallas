"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  PartyPopper,
  Sparkles,
  User,
} from "lucide-react";
import { submitBooking } from "@/app/actions";
import { programs, instructors, site } from "@/lib/site";
import { Icon, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EASE = [0.16, 1, 0.3, 1] as const;
const stepLabels = ["Service", "Schedule", "Instructor", "Confirm"];
const timeSlots = ["9:00 AM", "10:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Details = { name: string; email: string; phone: string; notes: string };

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function BookingFlow({ initialService }: { initialService?: string | null }) {
  const validInitial = programs.some((p) => p.slug === initialService) ? initialService! : "";
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [service, setService] = useState(validInitial);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [instructor, setInstructor] = useState("");
  const [details, setDetails] = useState<Details>({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const selectedProgram = programs.find((p) => p.slug === service);

  function confirm() {
    if (pending) return;
    setError(null);
    startTransition(async () => {
      const res = await submitBooking({
        service: selectedProgram?.name ?? service,
        date: date ? date.toISOString() : null,
        time,
        instructor,
        name: details.name,
        email: details.email,
        phone: details.phone,
        notes: details.notes,
      });
      if (res.ok) setSubmitted(true);
      else setError(res.error ?? "Something went wrong. Please call us to book.");
    });
  }

  const canProceed = useMemo(() => {
    if (step === 0) return !!service;
    if (step === 1) return !!date && !!time;
    if (step === 2) return !!instructor;
    if (step === 3) return details.name && details.email.includes("@") && details.phone.length >= 7;
    return false;
  }, [step, service, date, time, instructor, details]);

  function go(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  if (submitted) {
    return (
      <BookingSuccess
        program={selectedProgram?.name ?? "Lesson"}
        date={date}
        time={time}
        instructor={instructor}
        name={details.name}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
      {/* Main */}
      <div className="order-1">
        {/* Stepper */}
        <div className="mb-10">
          <div className="flex items-center">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => i < step && go(i)}
                  disabled={i > step}
                  className="flex items-center gap-3"
                >
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                      i < step
                        ? "border-gold bg-gold text-ink"
                        : i === step
                          ? "border-gold bg-gold/10 text-gold-deep"
                          : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {i < step ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden text-sm font-semibold sm:block",
                      i <= step ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </button>
                {i < stepLabels.length - 1 && (
                  <span className="mx-3 h-px flex-1 bg-border">
                    <span
                      className={cn(
                        "block h-full origin-left bg-gold transition-transform duration-500",
                        i < step ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {step === 0 && <ServiceStep value={service} onChange={setService} />}
              {step === 1 && (
                <ScheduleStep date={date} time={time} onDate={setDate} onTime={setTime} />
              )}
              {step === 2 && <InstructorStep value={instructor} onChange={setInstructor} />}
              {step === 3 && <DetailsStep details={details} onChange={setDetails} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => go(Math.max(0, step - 1))}
            className={cn(step === 0 && "pointer-events-none opacity-0")}
          >
            <ArrowLeft className="size-4" /> Back
          </Button>
          {step < 3 ? (
            <Button variant="gold" size="lg" disabled={!canProceed} onClick={() => go(step + 1)}>
              Continue <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button variant="gold" size="lg" disabled={!canProceed || pending} onClick={confirm}>
              {pending ? (
                <>
                  Booking… <Loader2 className="size-4 animate-spin" />
                </>
              ) : (
                <>
                  Confirm booking <CheckCircle2 className="size-4" />
                </>
              )}
            </Button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      {/* Summary */}
      <aside className="order-2">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="dark bg-ink p-6 text-cream">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <Sparkles className="size-3.5" /> Your booking
              </p>
              <p className="mt-2 font-display text-xl font-bold">
                {selectedProgram ? selectedProgram.name : "Build your lesson"}
              </p>
            </div>
            <div className="space-y-4 p-6">
              <SummaryRow icon={<Icon name="car" className="size-4" />} label="Service">
                {selectedProgram?.name ?? "—"}
              </SummaryRow>
              <SummaryRow icon={<CalendarIcon className="size-4" />} label="Date">
                {date ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "—"}
              </SummaryRow>
              <SummaryRow icon={<Clock className="size-4" />} label="Time">
                {time || "—"}
              </SummaryRow>
              <SummaryRow icon={<User className="size-4" />} label="Instructor">
                {instructor || "—"}
              </SummaryRow>

              <div className="border-t border-border pt-4">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <span className="font-display text-2xl font-bold">
                    {selectedProgram?.price ?? "$—"}
                  </span>
                </div>
                {selectedProgram?.priceNote && (
                  <p className="mt-1 text-right text-xs text-muted-foreground">
                    {selectedProgram.priceNote}
                  </p>
                )}
              </div>

              <p className="rounded-xl bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
                No payment required to reserve. We&apos;ll confirm your slot and answer any questions
                before your first lesson.
              </p>
            </div>
          </div>

          <a
            href={site.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold-deep"
          >
            Prefer to book by phone? {site.phone}
          </a>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-gold-deep">{icon}</span>
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-foreground">{children}</span>
    </div>
  );
}

/* ---------- Step 1: Service ---------- */
function ServiceStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepTitle title="What would you like to book?" sub="Choose a program or service to get started." />
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {programs.map((p) => {
          const active = value === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onChange(p.slug)}
              className={cn(
                "group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                active
                  ? "border-gold bg-gold/[0.06] ring-1 ring-gold/30"
                  : "border-border bg-card hover:border-gold/40",
              )}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-xl transition-colors",
                  active ? "bg-gold text-ink" : "bg-secondary text-gold-deep",
                )}
              >
                <Icon name={p.icon as IconName} className="size-6" />
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-display font-bold">{p.name}</span>
                  <span className="font-display text-sm font-bold text-gold-deep">{p.price}</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{p.tagline}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Step 2: Schedule ---------- */
function ScheduleStep({
  date,
  time,
  onDate,
  onTime,
}: {
  date: Date | null;
  time: string;
  onDate: (d: Date) => void;
  onTime: (t: string) => void;
}) {
  const today = startOfToday();
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });

  const firstDay = new Date(view.y, view.m, 1).getDay();
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.y, view.m, d));

  const isPrevDisabled = view.y === today.getFullYear() && view.m === today.getMonth();

  function shift(delta: number) {
    setView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });
  }

  return (
    <div>
      <StepTitle title="Pick a date & time" sub="Select a day that works, then choose an available slot." />
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        {/* Calendar */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="font-display font-bold">
              {MONTHS[view.m]} {view.y}
            </p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => shift(-1)}
                disabled={isPrevDisabled}
                className="grid size-8 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary disabled:opacity-30"
                aria-label="Previous month"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => shift(1)}
                className="grid size-8 place-items-center rounded-lg border border-border transition-colors hover:bg-secondary"
                aria-label="Next month"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
            {WEEKDAYS.map((w) => (
              <span key={w} className="py-1 font-semibold">
                {w}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              if (!cell) return <span key={i} />;
              const past = cell < today;
              const isSunday = cell.getDay() === 0;
              const disabled = past || isSunday;
              const selected = date && cell.toDateString() === date.toDateString();
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => onDate(cell)}
                  className={cn(
                    "aspect-square rounded-lg text-sm font-medium transition-all",
                    selected
                      ? "bg-gold text-ink shadow-sm"
                      : disabled
                        ? "cursor-not-allowed text-muted-foreground/30"
                        : "text-foreground hover:bg-gold/15",
                  )}
                >
                  {cell.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Times */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-display font-bold">Available times</p>
          {!date ? (
            <p className="mt-6 text-sm text-muted-foreground">Select a date to see open slots.</p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {timeSlots.map((slot, i) => {
                const unavailable = (date.getDate() + i) % 5 === 0;
                const active = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={unavailable}
                    onClick={() => onTime(slot)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-sm font-semibold transition-all",
                      active
                        ? "border-gold bg-gold text-ink"
                        : unavailable
                          ? "cursor-not-allowed border-border bg-secondary/40 text-muted-foreground/40 line-through"
                          : "border-border bg-card hover:border-gold/50",
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
          {date && (
            <p className="mt-5 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
              Times shown in Central Time. Evening and weekend slots fill fast.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 3: Instructor ---------- */
function InstructorStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = [
    { name: "Any available instructor", role: "We'll match you with the best fit", initials: "★" },
    ...instructors.map((i) => ({ name: i.name, role: i.role, initials: i.initials })),
  ];
  return (
    <div>
      <StepTitle title="Choose your instructor" sub="Pick a favorite or let us match you. Female instructors available on request." />
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const active = value === o.name;
          return (
            <button
              key={o.name}
              type="button"
              onClick={() => onChange(o.name)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                active
                  ? "border-gold bg-gold/[0.06] ring-1 ring-gold/30"
                  : "border-border bg-card hover:border-gold/40",
              )}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-full font-display font-bold transition-colors",
                  active ? "bg-gold text-ink" : "bg-gradient-to-br from-navy to-ink text-cream",
                )}
              >
                {o.initials}
              </span>
              <span className="flex-1">
                <span className="block font-semibold">{o.name}</span>
                <span className="block text-xs text-muted-foreground">{o.role}</span>
              </span>
              {active && <Check className="size-5 text-gold-deep" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Step 4: Details ---------- */
function DetailsStep({
  details,
  onChange,
}: {
  details: Details;
  onChange: (d: Details) => void;
}) {
  return (
    <div>
      <StepTitle title="Almost there — your details" sub="We'll use these to confirm your booking. No payment required now." />
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required>
          <Input
            value={details.name}
            onChange={(e) => onChange({ ...details, name: e.target.value })}
            placeholder="Jordan Rivera"
          />
        </Field>
        <Field label="Phone" required>
          <Input
            type="tel"
            value={details.phone}
            onChange={(e) => onChange({ ...details, phone: e.target.value })}
            placeholder="(214) 555-0199"
          />
        </Field>
        <Field label="Email" required className="sm:col-span-2">
          <Input
            type="email"
            value={details.email}
            onChange={(e) => onChange({ ...details, email: e.target.value })}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Anything we should know?" className="sm:col-span-2">
          <Textarea
            value={details.notes}
            onChange={(e) => onChange({ ...details, notes: e.target.value })}
            placeholder="Student age, prior experience, pickup location, special requests…"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label}
        {required && <span className="ml-0.5 text-gold-deep">*</span>}
      </Label>
      {children}
    </div>
  );
}

function StepTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 text-muted-foreground">{sub}</p>
    </div>
  );
}

/* ---------- Success ---------- */
function BookingSuccess({
  program,
  date,
  time,
  instructor,
  name,
}: {
  program: string;
  date: Date | null;
  time: string;
  instructor: string;
  name: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mx-auto max-w-xl text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-gold text-ink shadow-[0_20px_50px_-15px_rgba(245,165,36,0.6)]"
      >
        <PartyPopper className="size-10" />
      </motion.div>

      <h2 className="mt-7 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        You&apos;re booked{name ? `, ${name.split(" ")[0]}` : ""}!
      </h2>
      <p className="mt-3 text-pretty text-muted-foreground">
        We&apos;ve received your request and will text a confirmation shortly. Here&apos;s what you
        reserved:
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-left">
        <dl className="space-y-3">
          <SuccessRow label="Service" value={program} />
          <SuccessRow
            label="When"
            value={
              date
                ? `${date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}${time ? ` · ${time}` : ""}`
                : "To be confirmed"
            }
          />
          <SuccessRow label="Instructor" value={instructor || "Any available"} />
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="gold" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/programs">Explore more programs</Link>
        </Button>
      </div>
    </motion.div>
  );
}

function SuccessRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
