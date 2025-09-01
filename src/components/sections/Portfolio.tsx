"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"

type Project = {
  id: string
  tag: string
  title: string
  result: string
  summary: string
  media?: string // /public/portfolio/*.gif (optional)
  bullets: string[]
}

const projects: Project[] = [
  {
    id: "lead-meeting",
    tag: "Automation",
    title: "Lead → Meeting (End-to-End)",
    result: "Reaktionszeit ↓ 80%",
    summary:
      "Leads automatisch qualifizieren, E-Mail + Kalendereinladung erzeugen und ins CRM übernehmen.",
    bullets: ["Antwortzeit von Tagen auf Minuten", "No-Shows ↓ durch klare Terminabfolge", "Kein Copy/Paste – CRM wird sauber gepflegt"],
  },
  {
    id: "ops-dash",
    tag: "Dashboard",
    title: "Operations-Dashboard mit Share-Link",
    result: "Transparenz ohne Nachfragen",
    summary:
      "KPIs live für Teams/Kunden teilen – jederzeit wieder privat schalten.",
    bullets: ["Sofortiger Status für Stakeholder", "Weniger Rückfragen im Team", "Sharing/Unsharing per Klick"],
  },
  {
    id: "invoice-erp",
    tag: "Integrationen",
    title: "Invoice → ERP (Parser & Export)",
    result: "Erfassungszeit ↓ 70%",
    summary:
      "Rechnungen automatisch auslesen, Felder mappen und als Buchungsvorschlag exportieren.",
    bullets: ["Erfassung in Sekunden statt Minuten", "Fehler durch Regeln stark reduziert", "Export in DATEV/CSV/API"],
  },
  {
    id: "repurpose-ai",
    tag: "AI",
    title: "Post Repurposer (AI)",
    result: "Content-Produktion in Minuten",
    summary:
      "LinkedIn-Post analysieren und als IG-Caption + Story-Snippets neu ausspielen.",
    bullets: ["1 Quelle → 3 Formate", "Konsistente Brand-Voice", "Publish mit Review-Step"],
  },
]



export default function Portfolio() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Project | null>(null)

  const openCase = (p: Project) => {
    setActive(p)
    setOpen(true)
  }

  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24">
      <motion.h2
        className="text-2xl md:text-3xl font-bold"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
      >
        Ausgewählte Projekte
      </motion.h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => openCase(p)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group text-left rounded-2xl border bg-card/60 shadow focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
              {/* Standard: Brand-Gradient */}
              <div className="h-full w-full bg-brand-gradient" />
              {/* Optionales Bild (wenn später media gesetzt ist) */}
              {p.media && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.media}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
                />
              )}
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
            </div>


            <div className="p-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full border bg-background">{p.tag}</span>
                <span className="text-muted-foreground">{p.result}</span>
              </div>
              <div className="mt-2 text-base font-semibold leading-snug">{p.title}</div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.result}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl overflow-hidden border bg-card/60">
                  {active.media ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={active.media} alt={active.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-48 bg-brand-gradient" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{active.summary}</p>
                  <ul className="mt-3 list-disc pl-5 space-y-1">
                    {active.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                *Firmen & vertrauliche Details auf Wunsch anonymisiert.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
