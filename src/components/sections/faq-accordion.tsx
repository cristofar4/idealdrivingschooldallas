"use client";

import { faqs, type Faq } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/anim/reveal";

export function FaqAccordion({
  category,
  items,
  className,
}: {
  category?: string;
  items?: Faq[];
  className?: string;
}) {
  const list = items ?? (category ? faqs.filter((f) => f.category === category) : faqs);
  return (
    <Reveal className={className}>
      <Accordion type="single" collapsible className="w-full">
        {list.map((f, i) => (
          <AccordionItem key={f.q} value={`item-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Reveal>
  );
}
