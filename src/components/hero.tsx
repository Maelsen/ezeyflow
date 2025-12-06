"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
// Neue, modernere Icons importiert
import { Bot, LineChart, Fingerprint, LayoutGrid, ArrowRight } from "lucide-react"
import HeroLogoWave from "@/components/hero-logo-wave"
import Magnetic from "@/components/effects/magnetic"

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="container relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* Logo rechts */}
          <HeroLogoWave
            className="
              pointer-events-none
              absolute
              top-2
              right-[3%]
              hidden
              lg:block
              w-[200px]
              xl:w-[260px]
              2xl:w-[300px]
              opacity-90
            "
          />

          {/* Textbereich links */}
          <div className="relative lg:pr-[240px] xl:pr-[300px] 2xl:pr-[360px]">
            {/* Headline - Modernisiert: tracking-tighter für kompakteren Look */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.1] tracking-tighter"
            >
              Individuelle Automatisierungen, die Ihre Prozesse vereinfachen –{" "}
              <span className="headline-accent">
                schneller als jede Agentur.
              </span>
            </motion.h1>

            {/* Subheadline – dein „Buchsatz“ */}
            <motion.p
              variants={item}
              className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-white/80 font-medium relative pl-4"
            >
              {/* feiner Gradient-Strich links */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1 h-[70%] w-[2px] bg-brand-gradient rounded-full"
              />
              Ich baue maßgeschneiderte Automationen, Dashboards und
              API-Integrationen, die kleinen Unternehmen jede Woche 10–30
              Arbeitsstunden sparen.
            </motion.p>

            {/* Feature-Flow: 5–14 Tage · Messbar · Zuverlässig & ohne Risiko */}
            <motion.div variants={item} className="mt-6">
              {/* Desktop: horizontale Flow-Linie mit Brand-Sternen */}
              <div className="relative hidden sm:block">
                {/* Gradient-Linie */}
                <div className="pointer-events-none absolute inset-x-4 top-4 h-[2px] rounded-full bg-brand-gradient opacity-80" />

                <div className="relative grid grid-cols-3 gap-6 pt-6">
                  {/* 5–14 Tage */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative flex flex-col items-center text-center text-white/70 text-[0.8rem] group/star"
                  >
                    <span className="hero-star" />
                    <div className="mt-6 text-[0.78rem] font-semibold tracking-[0.18em] uppercase text-white/80">
                      5–14 Tage
                    </div>
                    <div className="mt-1 text-[0.72rem] text-white/55">
                      Von Kickoff bis Livegang
                    </div>
                  </motion.div>

                  {/* Messbar */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative flex flex-col items-center text-center text-white/70 text-[0.8rem] group/star"
                  >
                    <span className="hero-star" />
                    <div className="mt-6 text-[0.78rem] font-semibold tracking-[0.18em] uppercase text-white/80">
                      Messbar
                    </div>
                    <div className="mt-1 text-[0.72rem] text-white/55">
                      Kennzahlen & Einsparungen klar sichtbar
                    </div>
                  </motion.div>

                  {/* Zuverlässig & ohne Risiko */}
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative flex flex-col items-center text-center text-white/70 text-[0.8rem] group/star"
                  >
                    <span className="hero-star" />
                    <div className="mt-6 text-[0.78rem] font-semibold tracking-[0.18em] uppercase text-white/80">
                      Zuverlässig &amp; ohne Risiko
                    </div>
                    <div className="mt-1 text-[0.72rem] text-white/55">
                      Stabile Setups statt 08/15-Experimenten
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Mobile: typografisch untereinander */}
              <div className="sm:hidden mt-5 space-y-3 text-xs text-white/70">
                <div>
                  <div className="text-sm font-semibold text-brand-gradient">
                    5–14 Tage
                  </div>
                  <div className="text-sm text-white/60">
                    Von Kickoff bis Livegang
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-gradient">
                    Messbar
                  </div>
                  <div className="text-sm text-white/60">
                    Kennzahlen & Einsparungen klar sichtbar
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-gradient">
                    Zuverlässig &amp; ohne Risiko
                  </div>
                  <div className="text-sm text-white/60">
                    Stabile Setups statt 08/15-Experimenten
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button
                  size="lg"
                  variant="primary"
                  asChild
                  className="text-base px-6 py-5 group"
                >
                  <Link href="#kontakt" className="flex items-center gap-2">
                    Kostenlose Prozess-Analyse buchen
                    {/* ArrowRight ist moderner Standard bei CTAs */}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </Magnetic>

              <Magnetic strength={8}>
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="backdrop-blur px-6 py-5 text-base"
                >
                  <Link href="#projekte" className="flex items-center gap-2">
                    {/* LayoutGrid wirkt moderner als Folder */}
                    <LayoutGrid className="h-4 w-4" />
                    Projekte ansehen
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Value-Cards unten */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <div className="card flex items-center gap-3 p-5">
              {/* Bot Icon statt ListChecks */}
              <Bot className="h-5 w-5 text-brand-cyan" />
              <div>
                <div className="text-sm font-medium">Weniger manuelle Aufgaben</div>
                <div className="text-xs text-white/70">
                  Automationen übernehmen repetitive Arbeit
                </div>
              </div>
            </div>

            <div className="card flex items-center gap-3 p-5">
              {/* LineChart statt BarChart3 */}
              <LineChart className="h-5 w-5 text-brand-violet" />
              <div>
                <div className="text-sm font-medium">
                  Mehr Übersicht durch Dashboards
                </div>
                <div className="text-xs text-white/70">
                  Kennzahlen klar & jederzeit abrufbar
                </div>
              </div>
            </div>

            <div className="card flex items-center gap-3 p-5">
              {/* Fingerprint statt WandSparkles */}
              <Fingerprint className="h-5 w-5 text-brand-blue" />
              <div>
                <div className="text-sm font-medium">
                  Maßgeschneiderte Lösungen
                </div>
                <div className="text-xs text-white/70">
                  Keine teuren 08/15-Agentur-Workflows
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}