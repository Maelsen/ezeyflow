"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

type Phase = "code" | "ui"

// Basis-Codefragmente (werden bunt und vervielfacht)
const BASE = [
  'import { Router } from "server"',
  "const router = new Router()",
  "",
  "router.post('/automations/run', async (req, res) => {",
  "  const { lead } = req.body",
  "  const rules = await fetchRules(lead.industry)",
  "  const tasks = buildTasks(lead, rules) // normalize → enrich → queue",
  "  await Promise.all([ saveToCRM(lead), sendEmail(lead.email), createTasks(tasks) ])",
  "  res.json({ ok: true })",
  "})",
  "",
  "queue.on('completed', (job) => log(job.id))",
]

// bunte Zeilen erzeugen (VS-like)
function useColoredLines() {
  return useMemo(() => {
    const C = { kw: "text-emerald-300", fn: "text-sky-300", str: "text-fuchsia-300", num: "text-amber-300" }
    const lines: JSX.Element[] = []
    for (let i = 0; i < 140; i++) {
      const src = BASE[i % BASE.length]
      const tokenized = src
        .replaceAll("const", "<kw>const</kw>")
        .replaceAll("await", "<kw>await</kw>")
        .replaceAll("async", "<kw>async</kw>")
        .replaceAll("import", "<kw>import</kw>")
        .replaceAll(/([A-Za-z_]\w*)\(/g, "<fn>$1</fn>(")
        .replaceAll(/'([^']*)'/g, "<str>'$1'</str>")
        .replaceAll(/"([^"]*)"/g, '<str>"$1"</str>')
        .replaceAll(/\b\d+\b/g, "<num>$&</num>")
        .split(/(<kw>|<\/kw>|<fn>|<\/fn>|<str>|<\/str>|<num>|<\/num>)/)
      lines.push(
        <div key={i} className="whitespace-pre leading-relaxed">
          <span className="text-slate-500 mr-3">{String(i + 1).padStart(3, "0")}</span>
          {tokenized.map((t, idx, arr) => {
            const tag = arr[idx - 1]
            if (tag === "<kw>") return <span key={idx} className={C.kw}>{t}</span>
            if (tag === "<fn>") return <span key={idx} className={C.fn}>{t}</span>
            if (tag === "<str>") return <span key={idx} className={C.str}>{t}</span>
            if (tag === "<num>") return <span key={idx} className={C.num}>{t}</span>
            if (t?.startsWith("</")) return null
            return <span key={idx}>{t}</span>
          })}
        </div>
      )
    }
    return lines
  }, [])
}

export default function CodeToUi() {
  const prefersReduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("code")
  const lines = useColoredLines()

  useEffect(() => {
    if (prefersReduced) return setPhase("ui")
    const t = setTimeout(() => setPhase("ui"), 2400) // knapp 2.4s Matrix-Feeling
    return () => clearTimeout(t)
  }, [prefersReduced])

  return (
    <div className="relative">
      <AnimatePresence initial={false} mode="wait">
        {phase === "code" ? <CodePane key="code" lines={lines} /> : <UiPane key="ui" />}
      </AnimatePresence>
    </div>
  )
}

/** Full-bleed „Matrix“: schnelle Vertikalbewegung + weiche Ränder (oben/unten/links/rechts) */
function CodePane({ lines }: { lines: JSX.Element[] }) {
  return (
    <motion.div
      className="relative h-[380px] md:h-[440px] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
      transition={{ duration: 0.35 }}
      // Fades an allen Kanten via Overlays
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/85 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/85 to-transparent" />
      </div>

      {/* „Endloser“ Code-Stream */}
      <motion.div
        className="absolute inset-0 font-mono text-[13px] text-slate-100 px-8"
        initial={{ y: 0 }}
        animate={{ y: -320 }}
        transition={{ duration: 2.2, ease: "linear" }} // schneller, matrix-artig
      >
        {lines}
        <div className="mt-2 text-slate-500">// …</div>
        {lines.slice(0, 40)}
      </motion.div>
    </motion.div>
  )
}

/** UI erscheint nicht als „Slide“, sondern die Codefläche morpht zur Hauptkarte (layoutId). */
function UiPane() {
  return (
    <motion.div
      className="relative grid grid-cols-1 gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Haupt-„App“-Fenster */}
      <motion.div
        layoutId="pane"
        className="rounded-xl border bg-card/70 shadow p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold">Workflow Runner</div>
          <div className="text-xs text-muted-foreground">Live</div>
        </div>

        {/* Ein konkreter Workflow sichtbar */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border bg-background p-3">
            <div className="text-xs text-muted-foreground">Eingang</div>
            <div className="mt-1 font-medium">Lead erfasst</div>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <div className="text-xs text-muted-foreground">Regeln</div>
            <div className="mt-1 font-medium">Scoring & Routing</div>
          </div>
          <div className="rounded-lg border bg-background p-3">
            <div className="text-xs text-muted-foreground">Aktion</div>
            <div className="mt-1 font-medium">Mail & Aufgaben</div>
          </div>
        </div>

        {/* Weitere Workflows – bewusst unscharf (es gibt „mehr“) */}
        <div className="mt-4 space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-md border bg-background/60 px-3 py-2 text-sm text-muted-foreground blur-[1px] opacity-70"
            >
              Weitere Workflow {i} • [versteckt]
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
