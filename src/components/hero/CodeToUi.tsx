"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

type Phase = "code" | "morph" | "ui"

const SOURCE = `
export async function handler(req, res) {
  const body = await parse(req)
  const lead = normalize(body)
  const score = scoreLead(lead)
  if (score > 60) {
    await sendEmail({
      to: lead.email,
      subject: "Termin?",
      text: createInviteText(lead)
    })
    await createCalendarInvite(lead)
  }
  await upsertCRM(lead, { score })
  res.status(200).json({ ok: true })
}
`.trim().split("\n")

export default function CodeToUi() {
  const [phase, setPhase] = useState<Phase>("code")
  const [lines, setLines] = useState<string[]>([])

  // Code rattern lassen
  useEffect(() => {
    if (phase !== "code") return
    let i = 0
    const id = setInterval(() => {
      setLines((prev) => (i < SOURCE.length ? [...prev, SOURCE[i++]] : prev))
      if (i >= SOURCE.length) {
        clearInterval(id)
        setTimeout(() => setPhase("morph"), 600) // kurzer Atemzug
        setTimeout(() => setPhase("ui"), 1400)
      }
    }, 90)
    return () => clearInterval(id)
  }, [phase])

  const codeText = useMemo(() => lines.join("\n"), [lines])

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Linke Fläche: Code → Morph */}
      <div className="relative rounded-2xl border bg-card/40 p-0 overflow-hidden">
        {/* Soft-fade Ränder via CSS mask */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(120% 120% at 50% 20%, black 60%, transparent 100%)",
            maskImage:
              "radial-gradient(120% 120% at 50% 20%, black 60%, transparent 100%)",
          }}
        />
        <motion.pre
          initial={{ opacity: 0.9 }}
          animate={{ opacity: phase === "code" ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="m-0 max-h-64 overflow-hidden p-4 text-xs leading-relaxed md:max-h-72 md:text-sm"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
{codeText}
        </motion.pre>

        {/* Morph-Overlay */}
        {phase !== "code" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "morph" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-brand-gradient opacity-50"
          />
        )}
      </div>

      {/* Rechte Fläche: resultierende UI */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: phase === "ui" ? 1 : 0, y: phase === "ui" ? 0 : 8 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border bg-card/60 p-5 shadow"
      >
        <div className="text-sm text-muted-foreground">Workflow</div>
        <div className="mt-3 grid gap-3">
          <div className="rounded-xl border bg-background p-3">
            <div className="text-xs text-muted-foreground">Eingang</div>
            <div className="font-semibold">Lead erfasst (Form/Webhook)</div>
          </div>
          <div className="rounded-xl border bg-background p-3">
            <div className="text-xs text-muted-foreground">Regeln</div>
            <div className="font-semibold">Scoring & Routing</div>
          </div>
          <div className="rounded-xl border bg-background p-3">
            <div className="text-xs text-muted-foreground">Aktionen</div>
            <ul className="list-disc pl-5">
              <li>E-Mail mit Terminvorschlägen</li>
              <li>Kalendereinladung</li>
              <li>CRM aktualisieren</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {/* Erklärung bewusst kurz gehalten */}
          Komplexer Code wird zu einer klaren UI – Teams arbeiten im Flow.
        </p>
      </motion.div>
    </div>
  )
}
