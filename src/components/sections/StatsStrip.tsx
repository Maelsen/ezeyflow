"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

export default function StatsStrip() {
  const hours = useCountUp(80)       // Beispielwerte – demonstrativ
  const errors = useCountUp(60)
  const speed = useCountUp(14)

  const item = (label: string, value: string) => (
    <div className="rounded-xl border bg-card/60 p-4 text-center shadow">
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )

  return (
    <section aria-label="Ergebnis in Zahlen" className="mx-auto max-w-7xl px-6 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {item("gesparte Stunden/Monat (Beispiel)", `~${hours}`)}
        {item("Fehlerreduktion (Beispiel)", `-${errors}%`)}
        {item("Go-Live in Tagen (typisch)", `~${speed}`)}
      </motion.div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Richtwerte aus typischen Projekten – wir kalkulieren für Ihren Prozess konkret.
      </p>
    </section>
  )
}
