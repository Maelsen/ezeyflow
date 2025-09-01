"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Wie schnell seid ihr live?",
    a: "Typisch 1–2 Wochen für einen wertschöpfenden MVP. Wir priorisieren die Schritte mit größtem Zeitspar-Effekt und bauen danach aus.",
  },
  {
    q: "Welche Tools und Schnittstellen nutzt ihr?",
    a: "Next.js/Tailwind für UIs, bewährte Automations-Stacks (z. B. Zapier/Make/Server), OpenAI/LLMs, und saubere APIs/Webhooks – abhängig von deinem System.",
  },
  {
    q: "Könnt ihr mit unserem CRM/ERP?",
    a: "In der Regel ja. Wir prüfen die API/Exportformate vorab und zeigen dir einen kleinen Proof (z. B. Lead → Termin → CRM-Update).",
  },
  {
    q: "Was ist mit Datenschutz/DSGVO?",
    a: "Wir verarbeiten nur notwendige Daten, loggen minimal & transparent, und hosten auf europäischen Rechenzentren, wo möglich. Externe Dienste nennen wir in der Doku.",
  },
  {
    q: "Was kostet ein Projekt?",
    a: "Hängt von Scope & Systemen ab. Wir geben dir nach dem Kick-off einen festen MVP-Preisrahmen und Optionen für Erweiterungen.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-2xl md:text-3xl font-bold">FAQ – häufige Fragen</h2>
      <Accordion type="single" collapsible className="mt-6">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
