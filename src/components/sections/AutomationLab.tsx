"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"          
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader2, Play } from "lucide-react"  

type UseCaseId = "lead" | "repurpose" | "invoice"

const USE_CASES: Record<UseCaseId, {
  name: string
  desc: string
  steps: string[]
  makeOutput: (v: string) => { title: string; items: { label: string; value: string }[]; blueprint: string }
}> = {
  lead: {
    name: "Lead → Meeting",
    desc: "Eingang erfassen, Regeln anwenden, Mail & Kalendereinladung automatisch erstellen.",
    steps: ["Eingang verarbeiten", "Regeln anwenden", "E-Mail entwerfen", "Kalender erstellen", "CRM aktualisieren"],
    makeOutput: (v) => {
      const who = v || "Beispiel GmbH"
      const blueprint = [
        "# Blueprint – Lead → Meeting",
        "- Eingang: Webhook/Formular",
        "- Regeln: Segmentierung, Scoring, Routing",
        "- Aktionen:",
        "  1) Person in CRM anlegen/aktualisieren",
        "  2) E-Mail mit Terminvorschlägen",
        "  3) Kalender-Event nach Bestätigung",
        "",
        "Metriken: Reaktionszeit ↓, No-Shows ↓, Conversion ↑"
      ].join("\n")
      return {
        title: "Artefakte",
        items: [
          { label: "E-Mail-Entwurf", value: `Betreff: Willkommen ${who}\n\nHallo ${who},\nkurz & konkret: Hier drei Terminvorschläge ...` },
          { label: "Kalendereinladung", value: "Titel: Kennenlernen • 30 Min\nOrt: Google Meet\nTeilnehmer: sales@firma.de, lead@example.com" },
          { label: "CRM-Preview", value: `Firma: ${who}\nStage: Qualify\nOwner: Sales Bot` },
        ],
        blueprint,
      }
    }
  },
  repurpose: {
    name: "Post Repurposer",
    desc: "LinkedIn-Post analysieren, IG-Caption & Story-Snippets erstellen.",
    steps: ["Post analysieren", "Kernaussagen extrahieren", "IG-Caption schreiben", "Story-Slides bauen", "Hashtags & CTA"],
    makeOutput: (v) => {
      const topic = v || "AI-Automatisierung spart Zeit"
      const blueprint = [
        "# Blueprint – Content Repurposing",
        "- Eingang: LinkedIn-URL/Text",
        "- Schritte: Analyse → Hook → Caption → Story → Hashtags",
        "- Ausspielung: IG Feed + Story, optional Scheduler",
        "",
        "Metriken: Produktionszeit ↓, Konsistenz ↑"
      ].join("\n")
      return {
        title: "Assets",
        items: [
          { label: "IG-Caption", value: `Hook: ${topic} 🚀\n\nSo setzt du das in 3 Schritten um: ...\nCTA: Mehr Beispiele auf ezeyflow.com` },
          { label: "Story-Bullets", value: "Slide 1: Problem → Chaos\nSlide 2: Lösung → Workflow\nSlide 3: CTA → Link in Bio" },
          { label: "Hashtags", value: "#automation #nocode #operations #growth" },
        ],
        blueprint,
      }
    }
  },
  invoice: {
    name: "Invoice → ERP",
    desc: "Rechnung auslesen, Felder mappen, Buchung vorbereiten.",
    steps: ["Datei einlesen", "OCR/Parser", "Felder prüfen", "Konten mappen", "Buchung exportieren"],
    makeOutput: (v) => {
      const inv = v || "RE-2025-1024"
      const blueprint = [
        "# Blueprint – Invoice → ERP",
        "- Eingang: PDF/CSV",
        "- Parser: Betrag, Datum, Lieferant, Positionen",
        "- Regeln: Konto, Kostenstelle, Steuer",
        "- Export: DATEV/CSV/API",
        "",
        "Metriken: Erfassungszeit ↓, Fehler ↓"
      ].join("\n")
      return {
        title: "Buchung",
        items: [
          { label: "Beleg-Nr.", value: inv },
          { label: "Betrag", value: "1.240,00 € (netto 1.042,02 €)" },
          { label: "Konto", value: "4930 (Sonstige Aufw.) • Kostenstelle: MKT" },
        ],
        blueprint,
      }
    }
  },
}

function useRunner(steps: string[]) {
  const [idx, setIdx] = useState(-1)
  useEffect(() => {
    setIdx(-1)
    const timers = steps.map((_, i) =>
      setTimeout(() => setIdx(i), 350 + i * 380)
    )
    return () => timers.forEach(clearTimeout)
  }, [steps])
  return idx
}

export default function AutomationLab() {
  const [caseId, setCaseId] = useState<UseCaseId>("lead")
  const [input, setInput] = useState("")
  const steps = USE_CASES[caseId].steps
  const progressIdx = useRunner(steps)
  const output = useMemo(() => USE_CASES[caseId].makeOutput(input), [caseId, input])

  const download = () => {
    const blob = new Blob([output.blueprint], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${caseId}-blueprint.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
      <motion.h2
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
      >
        Automation Lab – probier’s aus
      </motion.h2>
      <p className="mt-2 text-muted-foreground">
        Wähle einen Use-Case, gib einen Beispielwert ein und sieh den Workflow laufen. Am Ende kannst du den Blueprint herunterladen.
      </p>

      {/* Auswahl */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["lead","repurpose","invoice"] as UseCaseId[]).map((id) => (
          <Button
            key={id}
            variant={caseId === id ? "default" : "outline"}
            className="rounded-xl"
            onClick={() => setCaseId(id)}
          >
            {USE_CASES[id].name}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        {/* Links: Workflow Runner */}
        <div className="rounded-2xl border bg-card/60 p-5 shadow">
          <div className="flex items-center gap-3">
            <Input
              placeholder={
                caseId === "lead" ? "Firmenname (z. B. Beispiel GmbH)" :
                caseId === "repurpose" ? "Thema/URL (z. B. LinkedIn-Post)" :
                "Rechnungs-Nr. (z. B. RE-2025-1024)"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="md:max-w-md"
            />
            <Button className="rounded-xl" onClick={() => setInput((s) => s.trim() || (caseId === "lead" ? "Beispiel GmbH" : caseId === "repurpose" ? "AI-Automatisierung spart Zeit" : "RE-2025-1024"))}>
              <Play className="mr-2 h-4 w-4" /> Ausführen
            </Button>
          </div>

          {/* Timeline / Schritte */}
          <ul className="mt-6 space-y-2">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border bg-background">
                  {i <= progressIdx ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : i === progressIdx + 1 ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted inline-block" />
                  )}
                </span>
                <span className={i <= progressIdx ? "opacity-100" : "opacity-60"}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rechts: Ergebnisse */}
        <div className="md:pl-2">
          <h3 className="text-2xl font-bold">{USE_CASES[caseId].desc}</h3>

          <div className="mt-4 grid gap-3">
            {output.items.map((it) => (
              <div key={it.label} className="rounded-xl border bg-background p-3">
                <div className="mb-1 text-xs text-muted-foreground">{it.label}</div>
                <pre className="whitespace-pre-wrap text-sm">{it.value}</pre>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button className="rounded-xl" onClick={download}>Blueprint herunterladen</Button>
            <Button variant="outline" className="rounded-xl" asChild>
              <a href="#funnel">Dieses Projekt starten</a>
            </Button>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Demo zeigt das Prinzip. Live-Systeme bauen wir exakt für euren Prozess.
          </p>
        </div>
      </div>
    </section>
  )
}
