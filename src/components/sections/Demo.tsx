"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3)))) // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

export default function Demo() {
  const [name, setName] = useState("")
  const [seed, setSeed] = useState(1)
  const [shared, setShared] = useState(false)

  // Zielwerte berechnen (leicht abhängig vom Namen, damit es „persönlich“ wirkt)
  const targets = useMemo(() => {
    const n = name.trim().length || 5
    return {
      leads: 120 + n * 3 + seed,
      hours: 18 + Math.floor(n / 2),
      errors: 35 - Math.min(25, Math.floor(n / 2)), // weniger Fehler
    }
  }, [name, seed])

  // animierte Werte
  const leads = useCountUp(targets.leads)
  const hours = useCountUp(targets.hours)
  const errors = useCountUp(targets.errors)

  const publicUrl = useMemo(() => {
    const slug = (name || "gast").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    return `https://ezeyflow.com/share/${slug || "gast"}`
  }, [name])

  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold">Interaktive Demo</h2>
        <p className="mt-2 text-muted-foreground">
          Gib einen Namen ein und sieh, wie ein Workflow-Dashboard sofort entsteht.
        </p>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        {/* Linke Spalte: Mini-App */}
        <div className="rounded-2xl border bg-card/60 p-5 shadow">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              placeholder="Name eingeben …"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="md:max-w-xs"
            />
            <Button onClick={() => setSeed((s) => s + 1)} className="rounded-xl">
              Generieren
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border bg-background p-4">
              <div className="text-xs text-muted-foreground">Leads automatisiert</div>
              <div className="mt-1 text-2xl font-bold">{leads}</div>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <div className="text-xs text-muted-foreground">Stunden gespart / Monat</div>
              <div className="mt-1 text-2xl font-bold">~{hours}</div>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <div className="text-xs text-muted-foreground">Fehler reduziert</div>
              <div className="mt-1 text-2xl font-bold">-{errors}%</div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Switch id="share" checked={shared} onCheckedChange={setShared} />
            <label htmlFor="share" className="text-sm">
              Öffentlichen Share-Link aktivieren
            </label>
          </div>

          {shared && (
            <div className="mt-3 rounded-lg border bg-background px-3 py-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{publicUrl}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(publicUrl)
                      alert("Link kopiert! (Demo)")
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  Kopieren
                </Button>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Demo: Link ändert die Sichtbarkeit nicht wirklich, zeigt nur das Prinzip.
              </p>
            </div>
          )}
        </div>

        {/* Rechte Spalte: Erklärung */}
        <div className="md:pl-2">
          <h3 className="text-2xl font-bold">So fühlt sich „ezeyflow“ an</h3>
          <p className="mt-3 text-lg text-muted-foreground">
            Daten kommen rein (Formular, Webhook, CSV). Regeln entscheiden. Aktionen passieren automatisch.
            Dein Team arbeitet im Flow statt im Copy-&-Paste-Tunnel.
          </p>

          <ul className="mt-6 space-y-3 text-base">
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span><strong>Sofort sichtbar:</strong> KPIs aktualisieren sich, sobald neue Daten eintreffen.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary/60" />
              <span><strong>Teilbar auf Klick:</strong> Öffentlicher Link für Kunden/Stakeholder – jederzeit deaktivierbar.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60" />
              <span><strong>Anpassbar:</strong> Felder, Regeln & Aktionen passen wir exakt an deinen Prozess an.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
