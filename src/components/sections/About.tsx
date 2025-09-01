"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        {/* Bild – ersetze /me.jpg später durch dein echtes Bild */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl border bg-card/60 shadow aspect-[4/3]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/me.jpg"
            alt="Gründer von ezeyflow"
            className="h-full w-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
          />
          {/* Fallback: Brand-Gradient, falls noch kein Bild */}
          <div className="absolute inset-0 bg-brand-gradient opacity-60" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
        <p className="mt-3 text-lg text-muted-foreground">
          Ich bin 20 und baue End-to-End-Automatisierungen – Zertifikate, Dashboards, Partner-APIs und AI-Workflows. 
          Ich denke in „Eingang → Regeln → Aktionen“, damit aus manueller Arbeit ein klarer Flow wird.
        </p>
        <p className="mt-3 text-muted-foreground">
          Ziel: in 1–2 Wochen live gehen und sofort Zeit sparen. Technik darf sich leicht anfühlen – genau das liefere ich.
        </p>


          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="rounded-xl" asChild>
              <a href="#funnel">Projekt starten</a>
            </Button>
            <Button variant="outline" className="rounded-xl" asChild>
              <a href="#portfolio">Projekte ansehen</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
