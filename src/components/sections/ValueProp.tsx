"use client"

import { motion } from "framer-motion"
import { Rocket, Sparkles, Smile } from "lucide-react"

const items = [
  {
    icon: Rocket,
    title: "Geschwindigkeit",
    text: "Komplette Systeme in 1–2 Wochen – MVP statt Overhead.",
  },
  {
    icon: Sparkles,
    title: "KI-Power",
    text: "Moderne AI-Integration, sofort nutzbar & erweiterbar.",
  },
  {
    icon: Smile,
    title: "User Experience",
    text: "Intuitive Oberflächen, die Teams wirklich gerne nutzen.",
  },
]

export default function ValueProp() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-6 py-24">
      <motion.h2
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
      >
        Warum ezeyflow?
      </motion.h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border bg-card/60 p-5 shadow"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient">
                <Icon className="h-5 w-5 text-background" />
              </span>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{text}</p>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Wir liefern nicht nur Code – wir liefern Systeme, die Teams lieben.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
