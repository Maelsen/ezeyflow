"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  CalendarCheck2, 
  Search, 
  Wrench, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react"
import Magnetic from "@/components/effects/magnetic"
import TiltCard from "@/components/effects/tilt-card"
import { cn } from "@/lib/utils"

/* --- DATEN --- */
const STEPS = [
  {
    id: "analyse",
    number: "01",
    phase: "Analyse",
    title: "Kostenlose Prozess-Analyse",
    duration: "30–45 Min.",
    description: "Wir starten nicht mit Technik, sondern mit Ihrem Geschäft. In einem intensiven Screening identifizieren wir genau die manuellen Bremsen, die Sie jeden Tag Zeit kosten.",
    result: "Sie wissen sofort, wo Automatisierungen messbar Zeit und Kosten sparen.",
    ctaText: "Analyse buchen",
    icon: <CalendarCheck2 className="h-4 w-4" />,
    // Styles (identisch zu Packages Starter)
    colorClass: "text-brand-cyan",
    activeBorder: "border-brand-cyan/60 shadow-[0_20px_60px_rgba(0,209,255,0.25)]",
    iconBg: "bg-brand-cyan/10 text-brand-cyan",
    btnVariant: "primary" // Standard Primary Button
  },
  {
    id: "konzept",
    number: "02",
    phase: "Konzept",
    title: "Technisches Konzept",
    duration: "2–3 Tage",
    description: "Ich erstelle einen klaren Ablaufplan und definiere die Logik. Wir verbinden Ihre Tools (CRM, Mail, Shop) auf dem Papier, volle Transparenz vor dem Start.",
    result: "Sie sehen vorab genau, wie die Lösung aussieht und welche Schritte wir gehen.",
    ctaText: "Konzept anfragen",
    icon: <Search className="h-4 w-4" />,
    // Styles (identisch zu Packages Business)
    colorClass: "text-brand-blue",
    activeBorder: "border-brand-blue/60 shadow-[0_20px_60px_rgba(43,108,255,0.35)]",
    iconBg: "bg-brand-blue/10 text-brand-blue",
    btnVariant: "primary"
  },
  {
    id: "umsetzung",
    number: "03",
    phase: "Umsetzung",
    title: "Entwicklung & Setup",
    duration: "5–14 Tage",
    description: "Ich baue Ihre Automationen, API-Integrationen und Dashboards. Jeder Schritt wird isoliert getestet, um Fehlerquoten von Anfang an auf nahe Null zu drücken.",
    result: "Fertige, funktionierende Automationen, die sofort Arbeit abnehmen.",
    ctaText: "Projekt starten",
    icon: <Wrench className="h-4 w-4" />,
    // Styles (identisch zu Packages Premium)
    colorClass: "text-brand-violet",
    activeBorder: "border-brand-violet/60 shadow-[0_20px_60px_rgba(122,60,255,0.35)]",
    iconBg: "bg-brand-violet/10 text-brand-violet",
    btnVariant: "primary"
  },
  {
    id: "golive",
    number: "04",
    phase: "Go-Live",
    title: "Start & Optimierung",
    duration: "Support",
    description: "Nach dem Start überwache ich alle Abläufe in der Hypercare-Phase, fange Edge-Cases ab und optimiere die Performance im echten Betrieb.",
    result: "Stabile Prozesse, weniger manuelle Arbeit und klare Kennzahlen.",
    ctaText: "Jetzt automatisieren",
    icon: <Rocket className="h-4 w-4" />,
    // Special Style
    colorClass: "text-white",
    activeBorder: "border-white/40 shadow-[0_20px_60px_rgba(255,255,255,0.15)]",
    iconBg: "bg-white/10 text-white",
    btnVariant: "primary"
  },
]

export default function ProcessTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = STEPS[activeIndex]
  
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} id="ablauf" className="section-anchor relative py-20 md:py-24">
      <div className="container relative">
        
        {/* Aurora Hintergrund (Konsistent mit USP Grid) */}
        <div className="pointer-events-none absolute inset-x-0 top-[50%] -z-10 flex justify-center">
          <div 
            className="h-[400px] w-full max-w-5xl rounded-[40px] blur-3xl opacity-60"
            style={{ background: "radial-gradient(circle at center, rgba(43,108,255,0.25), transparent 65%)" }}
          />
        </div>

        {/* Header - EXAKT wie Hero / USP Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            Wie es <span className="text-brand-gradient">funktioniert.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/85 relative pl-4">
            <span 
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1 h-[70%] w-[2px] bg-brand-gradient rounded-full" 
            />
            Kein Agentur-Wirrwarr, sondern ein klarer Ablauf: von der ersten Analyse bis zu stabil laufenden Automationen.
          </p>
        </motion.div>

        {/* Stepper Leiste (Desktop) - MIT DER "AUFBAU"-ANIMATION */}
        <div className="relative mb-10 hidden md:block">
          {/* Hintergrund Linie */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-white/10 rounded-full" />
          
          {/* Animierte Linie (Assembly Effekt) */}
          <motion.div 
             className="absolute top-6 left-0 h-0.5 bg-brand-gradient rounded-full origin-left"
             initial={{ scaleX: 0 }}
             animate={isInView ? { scaleX: activeIndex / (STEPS.length - 1) + 0.1 } : { scaleX: 0 }} // +0.1 damit sie etwas vorauseilt
             transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-4 gap-4 relative z-10">
            {STEPS.map((step, index) => {
              const isActive = index === activeIndex
              const isPast = index <= activeIndex // Past includes active for coloring

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.button
                    onClick={() => setActiveIndex(index)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2, type: "spring" }} // Staggered Pop-In
                    className="group flex flex-col items-center text-center focus:outline-none"
                  >
                    {/* Circle */}
                    <div 
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 bg-surface-900 relative z-10",
                        isActive 
                          ? `border-brand-blue scale-110 shadow-[0_0_20px_rgba(43,108,255,0.4)]` 
                          : isPast 
                            ? "border-brand-cyan text-brand-cyan"
                            : "border-white/10 text-white/30 group-hover:border-white/30"
                      )}
                    >
                      <span className={cn("text-sm font-bold", isActive ? "text-white" : "text-current")}>
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <span className={cn(
                      "mt-3 text-xs font-bold uppercase tracking-wider transition-colors",
                      isActive ? step.colorClass : "text-white/40 group-hover:text-white/60"
                    )}>
                      {step.phase}
                    </span>
                  </motion.button>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Mobile Stepper */}
        <div className="flex md:hidden justify-between mb-8 px-4 relative">
           <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2" />
           {STEPS.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setActiveIndex(i)}
               className={cn(
                 "relative h-3 w-3 rounded-full transition-all z-10",
                 i === activeIndex ? "bg-brand-blue scale-150 ring-4 ring-surface-900" : "bg-surface-700 ring-4 ring-surface-900"
               )}
             />
           ))}
        </div>

        {/* DETAIL CARD - Original Layout, aber optimierter Inhalt */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard>
                <div 
                  className={cn(
                    "card relative flex flex-col overflow-hidden border bg-surface-800/95 p-6 md:p-10",
                    activeStep.activeBorder
                  )}
                >
                  {/* Glow Background */}
                  <div className="pointer-events-none absolute inset-0 bg-brand-gradient-soft opacity-10" />

                  <div className="relative z-10 grid md:grid-cols-[1.5fr,1fr] gap-8 md:gap-12 items-start">
                    
                    {/* LINKS: Content */}
                    <div>
                      <div className="flex flex-col gap-2 mb-6">
                        {/* Icon + Label Pill */}
                        <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 w-fit text-[0.7rem] font-semibold uppercase tracking-[0.18em]", activeStep.iconBg)}>
                             {activeStep.icon}
                             <span>{activeStep.phase}</span>
                        </div>
                        
                        {/* H3 Headline - JETZT FARBIG (Dein Wunsch!) */}
                        <h3 className={cn("mt-2 font-display text-2xl md:text-3xl font-semibold leading-snug", activeStep.colorClass)}>
                          {activeStep.title}
                        </h3>
                      </div>

                      {/* Text Beschreibung (Narrativ, kein Bullet-Listen-Stil) */}
                      <p className="text-sm md:text-base leading-relaxed text-white/80 mb-6">
                        {activeStep.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-black/20 px-3 py-2 text-xs font-medium text-white/70 border border-white/5">
                        <span className={activeStep.colorClass}>Dauer:</span> {activeStep.duration}
                      </div>
                    </div>

                    {/* RECHTS: Ergebnis & CTA (Standard Layout) */}
                    <div className="flex flex-col h-full justify-between">
                        {/* Ergebnis Box */}
                        <div className="rounded-md bg-black/20 px-4 py-4 text-sm text-white/85 mb-6 border border-white/5">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gradient block mb-2">
                            Ergebnis
                          </span>
                          <p>{activeStep.result}</p>
                        </div>

                        {/* CTA Button - Standard Primary Style */}
                        <div className="mt-auto pt-2">
                          <Magnetic>
                            <Button 
                              size="lg" 
                              variant="primary" // Standard-Button
                              asChild 
                              className="btn-shine w-full justify-center px-6 py-5 text-sm md:text-base"
                            >
                              <a href="#kontakt">
                                {activeStep.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          </Magnetic>
                        </div>
                    </div>

                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}