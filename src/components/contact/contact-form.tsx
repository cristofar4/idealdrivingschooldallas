"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const interests = ["Teen Driver Ed", "Adult Lessons", "Private Lessons", "Road Test", "Other"];

export function ContactForm() {
  const [interest, setInterest] = useState("Teen Driver Ed");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const valid = form.name && form.email.includes("@") && form.message.length > 4;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSent(true);
  }

  return (
    <div className="rounded-[2rem] border border-border bg-card p-7 sm:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid place-items-center py-12 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="grid size-16 place-items-center rounded-full bg-gold text-ink"
            >
              <CheckCircle2 className="size-8" />
            </motion.span>
            <h3 className="mt-5 font-display text-2xl font-bold">Message sent!</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! Our team will reply within one
              business day. For anything urgent, give us a call.
            </p>
            <Button variant="outline" size="lg" className="mt-6" onClick={() => setSent(false)}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={submit}
            className="space-y-6"
          >
            <div>
              <h2 className="font-display text-2xl font-bold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We typically reply within one business day.
              </p>
            </div>

            <div>
              <Label className="mb-3 block">I&apos;m interested in</Label>
              <div className="flex flex-wrap gap-2">
                {interests.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setInterest(opt)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                      interest === opt
                        ? "border-gold bg-gold/10 text-gold-deep"
                        : "border-border bg-card text-muted-foreground hover:border-gold/40",
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jordan Rivera"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(214) 555-0199"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Message *</Label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us a little about what you're looking for…"
                className="min-h-32"
              />
            </div>

            <Button type="submit" variant="gold" size="lg" disabled={!valid} className="w-full">
              Send message <Send className="size-4" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
