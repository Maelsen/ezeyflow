"use client"

import { motion } from "framer-motion"
import { CalendarClock, Workflow, Wrench, Rocket } from "lucide-react"

const steps = [
  {
    icon: CalendarClock,
    title: "Kick-off (45 Min)",
    text: "Wir schärfen Ziel, Datenquellen & Erfolgskriterien. Danach bekommst du einen schlanken Plan (MVP).",
  },
  {
    icon: Workflow,
    title: "Blueprint & Prototyp",
    text: "Wir definieren die Schritte (Eingang → Regeln → Aktionen) und zeigen einen klickbaren Prototyp.",
  },
  {
    icon: Wrench,
    title: "Build (1–2 Wochen)",
    text: "Wir bauen die Automationen, Tests & Logging – eng im Austausch, damit alles wirklich passt.",
  },
  {
    icon: Rocket,
    title: "Go-Live & Hand-off",
    text: "Übergabe, Doku, Training. Optional Wartung/Erweiterung. Fokus: messbar Zeit sparen.",
  },
]

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-24">
      <motion.h2
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
      >
        Ablauf – so arbeiten wir
      </motion.h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="rounded-2xl border bg-card/60 p-5 shadow hover-glow"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient">
                <Icon className="h-5 w-5 text-background" />
              </span>
              <div className="text-lg font-semibold">{title}</div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
