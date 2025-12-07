"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Cpu,
  Share2,
  Zap,
  LayoutTemplate,
  ArrowRight,
  CheckCircle2,
  Box,
  Fingerprint,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  Database,
  Code2,
  Workflow
} from "lucide-react"

// --- HILFSKOMPONENTEN (UI) ---

// Ein Button, der gut aussieht, falls die importierte UI Komponente fehlt
const Button = ({ children, className, variant, size, asChild, ...props }: any) => {
  const Comp = asChild ? "div" : "button"
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none 
      ${size === 'lg' ? 'h-12 px-8 text-base' : 'h-10 px-4 py-2'}
      ${variant === 'primary'
          ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] hover:scale-[1.02]'
          : 'bg-white/10 text-white hover:bg-white/20'}
      ${className}`}
      {...props}
    >
      {children}
    </Comp>
  )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ")

// --- DATEN ---

const IDENTITY_CARDS = [
  {
    title: "Engineering statt Klick-Bunti",
    text: "Ich entwickle APIs, Server-Systeme und Datenmodelle. Echte Software-Architektur statt wackeliger Zapier-Konstrukte.",
    icon: <Terminal className="h-6 w-6 text-cyan-400" />,
    color: "cyan",
    borderColor: "group-hover:border-cyan-500/50",
    shadowColor: "group-hover:shadow-cyan-500/20",
    bgGradient: "group-hover:bg-cyan-500/10"
  },
  {
    title: "Prozesse vor Tools",
    text: "Ein Tool ist nur Mittel zum Zweck. Ich starte immer beim Geschäftsmodell und baue darauf die passende Architektur.",
    icon: <Workflow className="h-6 w-6 text-blue-400" />,
    color: "blue",
    borderColor: "group-hover:border-blue-500/50",
    shadowColor: "group-hover:shadow-blue-500/20",
    bgGradient: "group-hover:bg-blue-500/10"
  },
  {
    title: "Speed & Präzision",
    text: "Implementierung in Tagen statt Wochen, durch modulare, getestete Code-Bausteine und jahrelange Erfahrung.",
    icon: <Zap className="h-6 w-6 text-violet-400" />,
    color: "violet",
    borderColor: "group-hover:border-violet-500/50",
    shadowColor: "group-hover:shadow-violet-500/20",
    bgGradient: "group-hover:bg-violet-500/10"
  },
  {
    title: "Tech + Design",
    text: "Implementierung in Tagen statt Wochen, durch modulare, getestete Code-Bausteine und jahrelange Erfahrung.",
    icon: <LayoutTemplate className="h-6 w-6 text-fuchsia-400" />,
    color: "fuchsia",
    borderColor: "group-hover:border-fuchsia-500/50",
    shadowColor: "group-hover:shadow-fuchsia-500/20",
    bgGradient: "group-hover:bg-fuchsia-500/10"
  }
]

const TIMELINE = [
  { year: "2024", role: "Einstieg in die Prozessautomatisierung", desc: "Start in einem nachhaltigen Tech-Unternehmen. Ich habe dort früh Verantwortung für interne Systeme übernommen, von Datenprozessen bis hin zu ersten Automationen, die reale, tägliche Probleme im Team gelöst haben.", color: "bg-cyan-500" },
  { year: "Anfang 2025", role: "Deep Tech & Ownership", desc: "Aufbau komplexerer Lösungen: APIs, serverlose Architekturen, Render-Pipelines, Webhooks, Dashboards. Ich wurde zur internen Anlaufstelle für alles, was automatisiert, stabil oder skalierbar werden musste.", color: "bg-blue-500" },
  { year: "Heute", role: "Independent Automation Engineer", desc: "Ich baue End-to-End-Automationen für Unternehmen, die ihre Prozesse vereinfachen, Kosten reduzieren und ohne Overhead skalieren wollen.", current: true, color: "bg-violet-500" }
]

const TECH_STACK = [
  { category: "Scripting", icon: <Code2 className="h-4 w-4" />, items: ["TypeScript / Node.js", "Python", "Bash"], color: "text-cyan-400", border: "hover:border-cyan-500/40", bg: "hover:bg-cyan-500/10" },
  { category: "Cloud", icon: <Cpu className="h-4 w-4" />, items: ["Google Cloud Run", "Serverless", "Webhooks"], color: "text-blue-400", border: "hover:border-blue-500/40", bg: "hover:bg-blue-500/10" },
  { category: "Connect", icon: <Share2 className="h-4 w-4" />, items: ["APIs", "CRMs", "WooCommerce"], color: "text-violet-400", border: "hover:border-violet-500/40", bg: "hover:bg-violet-500/10" },
  { category: "Data", icon: <Database className="h-4 w-4" />, items: ["SQL / JSON", "PDF Engines", "Storage"], color: "text-fuchsia-400", border: "hover:border-fuchsia-500/40", bg: "hover:bg-fuchsia-500/10" }
]

// --- ANIMATIONEN (PHYSICAL PAGE TURN) ---
// Identisch gelassen wie angefordert

const bookFlipVariants = {
  enter: (direction: number) => {
    if (direction > 0) {
      return { rotateY: 0, zIndex: 0, opacity: 1, transformOrigin: "left center" }
    } else {
      return { rotateY: -120, zIndex: 20, opacity: 0, transformOrigin: "left center" }
    }
  },
  center: {
    rotateY: 0,
    zIndex: 10,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }
  },
  exit: (direction: number) => {
    if (direction > 0) {
      return {
        rotateY: -120, zIndex: 20, opacity: 0, transformOrigin: "left center",
        transition: { duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }
      }
    } else {
      return {
        rotateY: 0, zIndex: 0, opacity: 0, transformOrigin: "left center",
        transition: { duration: 1.4 }
      }
    }
  }
}

const contentContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
}

const magicTextVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(6px)", scale: 0.98 },
  show: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.9, ease: "easeOut" } }
}

// --- HAUPTKOMPONENTE ---

export function AboutMe() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const totalPages = 5

  const paginate = (newDirection: number) => {
    const nextPage = page + newDirection
    if (nextPage >= 0 && nextPage < totalPages) {
      setDirection(newDirection)
      setPage(nextPage)
    } else if (nextPage >= totalPages) {
      setDirection(1)
      setPage(0)
    }
  }

  const goToPage = (index: number) => {
    setDirection(index > page ? 1 : -1)
    setPage(index)
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-transparent text-slate-100 font-sans" id="about-book">

      {/* Background Ambience WURDE HIER ENTFERNT */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        {/* Leere Div gelassen, falls du später etwas anderes einfügen willst, aber die Flecken sind weg */}
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">

        {/* HEADER (Original gelassen, nur Gradient angepasst) */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-4"
          >
            <BookOpen className="w-3 h-3" />
            <span>Meine Geschichte</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-semibold leading-tight text-white"
          >
            Wer ich bin – und warum ich <br className="hidden md:block" /> Systeme baue, die <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">skalieren.</span>
          </motion.h2>
        </div>

        {/* --- DAS BUCH --- */}
        <div className="relative mx-auto w-full aspect-[4/5] md:aspect-[16/9] min-h-[600px] md:min-h-[500px] perspective-2000">

          {/* Controls */}
          <div className="hidden md:flex absolute top-1/2 -left-16 -translate-y-1/2 z-30">
            <button
              onClick={() => paginate(-1)}
              disabled={page === 0}
              className="p-3 rounded-full border border-white/10 bg-slate-800/50 hover:bg-blue-600 hover:border-blue-500 text-white/50 hover:text-white transition-all disabled:opacity-0 disabled:cursor-not-allowed group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="hidden md:flex absolute top-1/2 -right-16 -translate-y-1/2 z-30">
            <button
              onClick={() => paginate(1)}
              className="p-3 rounded-full border border-white/10 bg-slate-800/50 hover:bg-blue-600 hover:border-blue-500 text-white/50 hover:text-white transition-all group"
            >
              {page === totalPages - 1 ? <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" /> : <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </div>

          {/* Book Body - Hülle */}
          <div className="relative w-full h-full rounded-2xl md:rounded-r-3xl md:rounded-l-lg border-r-[12px] md:border-r-[20px] border-b-[12px] md:border-b-[20px] border-white/5 bg-slate-900 shadow-2xl overflow-hidden">

            {/* "Binding" */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black/60 via-slate-900 to-transparent z-30 pointer-events-none" />

            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-0" />

            {/* Progress Bar Top - Mit Logo Farben */}
            <div className="absolute top-0 left-8 md:left-12 right-0 h-1 bg-white/5 z-20 flex">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div key={i} className="flex-1 h-full relative border-r border-slate-900/50">
                  <div className={cn("absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 transition-all duration-500", i <= page ? "opacity-100" : "opacity-0")} />
                </div>
              ))}
            </div>

            {/* PAGES ANIMATION LAYER */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">

              {/* 1. INTRO PAGE */}
              {page === 0 && (
                <motion.div
                  key="page0"
                  custom={direction}
                  variants={bookFlipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 left-8 md:left-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-y-auto md:overflow-hidden origin-left shadow-[inset_0_0_40px_rgba(59,130,246,0.1)]"
                  style={{
                    backfaceVisibility: "hidden",
                    backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(59, 130, 246, 0.05) 100%)"
                  }}
                >
                  <motion.div
                    variants={contentContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex-1 space-y-6 text-slate-300 text-base md:text-lg leading-relaxed"
                  >
                    <motion.div variants={magicTextVariants}>
                      <span className="text-sm font-bold tracking-wider uppercase text-cyan-400 mb-2 block">Einleitung</span>
                      <h3 className="text-4xl font-bold text-white mb-2">
                        Hi, ich bin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Marlin</span>.
                      </h3>
                    </motion.div>

                    <motion.div variants={magicTextVariants} className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" />

                    <motion.p variants={magicTextVariants}>
                      Ich entwickle Automationen, integrierte Systeme und datengetriebene Workflows, die <span className="text-white font-medium border-b border-cyan-500/50 pb-0.5">manuelle Arbeit eliminieren</span>.
                    </motion.p>
                    <motion.p variants={magicTextVariants}>
                      Seit über einem Jahr löse ich komplexe technische Probleme für ein schnell wachsendes Tech-Unternehmen – von <span className="text-blue-300">personalisierten Video-Pipelines</span> bis hin zu <span className="text-violet-300">vollautomatischen API-Systemen</span>.
                    </motion.p>

                    {/* Zitat Box Redesign */}
                    <motion.div variants={magicTextVariants} className="relative mt-6 group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-lg opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
                      <div className="relative p-5 rounded-lg bg-slate-900 border border-white/10 italic text-slate-200">
                        <span className="text-4xl absolute -top-4 -left-2 text-blue-500 opacity-50">"</span>
                        Ich verbinde Engineering, Design und Prozessdenken, und baue Lösungen, die 24/7 funktionieren.
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={magicTextVariants}
                    className="w-full md:w-[280px] shrink-0"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shadow-2xl rotate-3 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 group">

                      {/* PORTRAIT IMAGE REPLACEMENT */}
                      <img
                        src="/potrait.png"
                        alt="Marlin Portrait"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Overlay Effekt */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 z-10" />

                      {/* Text unten im Bild */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <div className="text-white font-bold text-xl">Marlin</div>
                        <div className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">System Architect</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}


              {/* 2. IDENTITY PAGE - Redesigned Cards */}
              {page === 1 && (
                <motion.div
                  key="page1"
                  custom={direction}
                  variants={bookFlipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 left-8 md:left-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 flex flex-col justify-center overflow-y-auto origin-left"
                  style={{ backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(59, 130, 246, 0.05) 100%)" }}
                >
                  <motion.div
                    variants={contentContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="h-full flex flex-col justify-center"
                  >
                    <motion.div variants={magicTextVariants} className="text-center mb-8">
                      <h3 className="text-3xl font-bold mb-2 text-white">Was mich unterscheidet</h3>
                      <p className="text-slate-400">Die meisten bauen Automationen. <span className="text-cyan-400">Ich baue Systeme.</span></p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {IDENTITY_CARDS.map((card, i) => (
                        <motion.div
                          key={i}
                          variants={magicTextVariants}
                          className={`group relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 ${card.borderColor} ${card.shadowColor} hover:shadow-lg ${card.bgGradient}`}
                        >
                          <div className="flex items-start gap-4 relative z-10">
                            <div className={`mt-1 p-2.5 rounded-lg bg-slate-950 border border-white/10 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                              {card.icon}
                            </div>
                            <div>
                              <h4 className={`font-bold text-base mb-1.5 text-white group-hover:text-${card.color}-400 transition-colors`}>{card.title}</h4>
                              <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{card.text}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}


              {/* 3. TIMELINE PAGE - Neon Style */}
              {page === 2 && (
                <motion.div
                  key="page2"
                  custom={direction}
                  variants={bookFlipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 left-8 md:left-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 overflow-y-auto origin-left"
                  style={{ backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(59, 130, 246, 0.05) 100%)" }}
                >
                  <motion.div
                    variants={contentContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 gap-12 h-full items-center"
                  >
                    {/* Timeline */}
                    <div className="flex flex-col justify-center">
                      <motion.h3 variants={magicTextVariants} className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                        <span className="w-1.5 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                        Mein Weg
                      </motion.h3>

                      {/* Durchgehende Gradient Linie */}
                      <div className="space-y-10 pl-6 relative border-l-2 border-transparent">
                        <div className="absolute left-[-2px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-500 opacity-30"></div>

                        {TIMELINE.map((item, i) => (
                          <motion.div key={i} variants={magicTextVariants} className="relative group">
                            {/* Punkt auf der Linie */}
                            <div className={cn(
                              "absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-slate-900 transition-all duration-300 z-10",
                              item.current
                                ? "border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)] scale-110"
                                : "border-slate-700 group-hover:border-white/50"
                            )}>
                              {item.current && <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-75" />}
                            </div>

                            <div className={cn("text-xs font-bold uppercase tracking-wider mb-1", item.current ? "text-violet-400" : "text-slate-500")}>
                              {item.year}
                            </div>
                            <div className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{item.role}</div>
                            <div className="text-sm text-slate-400">{item.desc}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Philosophy Box */}
                    <motion.div variants={magicTextVariants} className="bg-slate-900/80 rounded-2xl p-8 border border-white/10 relative overflow-hidden shadow-2xl group">
                      {/* Ambient Glow */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-[50px] group-hover:bg-cyan-500/30 transition-all" />
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/20 rounded-full blur-[50px] group-hover:bg-violet-500/30 transition-all" />

                      <div className="absolute top-4 right-4 opacity-10 rotate-12">
                        <Box className="w-24 h-24 text-white" />
                      </div>

                      <h3 className="text-xl font-bold mb-6 relative z-10 text-white">Philosophie</h3>
                      <div className="space-y-6 relative z-10">
                        {[
                          { t: "Reduce to the Core", d: "Erst verstehen, dann radikal vereinfachen.", c: "text-cyan-400", check: "text-cyan-500" },
                          { t: "Automate End-to-End", d: "Keine manuellen Eingriffe mehr.", c: "text-blue-400", check: "text-blue-500" },
                          { t: "Build for Scale", d: "Lösungen gebaut für 10x Volumen.", c: "text-violet-400", check: "text-violet-500" }
                        ].map((p, k) => (
                          <div key={k} className="flex items-start gap-4">
                            <div className={`mt-0.5 p-1 rounded-full bg-white/5 ${p.check} shadow-[0_0_10px_-3px_currentColor]`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <div className={`font-bold ${p.c}`}>{p.t}</div>
                              <p className="text-sm text-slate-400">{p.d}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}


              {/* 4. TECH STACK PAGE - Modern Chips */}
              {page === 3 && (
                <motion.div
                  key="page3"
                  custom={direction}
                  variants={bookFlipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 left-8 md:left-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 flex flex-col justify-center overflow-y-auto origin-left"
                  style={{ backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(59, 130, 246, 0.05) 100%)" }}
                >
                  <motion.div
                    variants={contentContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="h-full flex flex-col justify-center"
                  >
                    <motion.div variants={magicTextVariants} className="text-center mb-10">
                      <h3 className="text-3xl font-bold text-white mb-2">Mein Werkzeugkasten</h3>
                      <p className="text-slate-400">Ausgewählte Technologien für <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 font-medium">robuste Systeme</span>.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      {TECH_STACK.map((stack, i) => (
                        <motion.div key={i} variants={magicTextVariants} className={`bg-slate-950/50 border border-white/5 rounded-xl p-5 transition-all duration-300 backdrop-blur-md group ${stack.border} ${stack.bg}`}>
                          <div className={`flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider ${stack.color}`}>
                            {stack.icon} {stack.category}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {stack.items.map((item, k) => (
                              <span key={k} className="px-2.5 py-1.5 rounded-md bg-white/5 text-sm text-slate-300 border border-white/5 group-hover:border-white/10 group-hover:text-white transition-colors">
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}


              {/* 5. CTA PAGE - High Impact */}
              {page === 4 && (
                <motion.div
                  key="page4"
                  custom={direction}
                  variants={bookFlipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 left-8 md:left-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 flex flex-col items-center justify-center text-center origin-left shadow-[inset_0_0_50px_rgba(59,130,246,0.1)]"
                  style={{ backgroundImage: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(59, 130, 246, 0.05) 100%)" }}
                >
                  <motion.div
                    variants={contentContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="max-w-md mx-auto relative z-10"
                  >
                    {/* Logo Container - FIXED SIZE 2.5x */}
                    <motion.div variants={magicTextVariants} className="relative w-64 h-32 mx-auto mb-8 flex items-center justify-center">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-violet-600/30 blur-3xl rounded-full opacity-50 pointer-events-none" />

                      {/* Logo - Scaled Fixed to 2.5x */}
                      <img
                        src="/logo.png"
                        alt="ezeyflow Logo"
                        className="relative z-10 object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                        style={{
                          width: '100%',
                          height: '100%',
                          transform: 'scale(2.5)'
                        }}
                      />
                    </motion.div>

                    <motion.h3 variants={magicTextVariants} className="text-3xl font-bold mb-4 text-white">
                      Bereit für den <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">nächsten Schritt?</span>
                    </motion.h3>
                    <motion.p variants={magicTextVariants} className="text-slate-300 mb-10 leading-relaxed">
                      Wir haben identifiziert, wer ich bin und wie ich arbeite. Jetzt lass uns herausfinden, was ich für <strong>dich</strong> tun kann.
                    </motion.p>

                    <motion.div variants={magicTextVariants} className="space-y-6">
                      <Button size="lg" variant="primary" className="w-full text-lg shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)]" asChild>
                        <a href="#kontakt">
                          Kostenlose Analyse buchen
                        </a>
                      </Button>

                      <button
                        onClick={() => { setDirection(1); setPage(0); }}
                        className="text-sm text-slate-500 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors duration-300 hover:scale-105"
                      >
                        <RotateCcw className="w-3 h-3" /> Buch von vorne lesen
                      </button>
                    </motion.div>
                  </motion.div>

                  {/* Background Flares */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-b from-blue-600/10 to-transparent blur-[100px] pointer-events-none -z-10" />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Pagination Dots - Colors added */}
          <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  page === i
                    ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}