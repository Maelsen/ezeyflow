import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Timer,
  BarChart3,
  Zap,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Cpu,
  Layers,
  Activity,
  ArrowRight
} from "lucide-react";

// --- UTIL COMPONENTS ---

// Helper for conditional classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// 1. MAGNETIC BUTTON (Unverändert)
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// 2. GLOW CARD (UPDATED: Reduzierter Glow Radius)
const GlowCard = ({ children, className, color = "cyan" }) => {
  // Mapping für die Farben
  const colorMap = {
    cyan: "34, 211, 238", // cyan-400
    blue: "59, 130, 246",  // blue-500
    violet: "139, 92, 246" // violet-500
  };

  const rgb = colorMap[color] || colorMap.cyan;

  return (
    <div
      className={cn(
        "group relative w-full h-full", 
        className
      )}
    >
      {/* AURA EFFECT LAYER:
          Radius angepasst: "Weniger weit"
      */}
      <div 
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none"
        style={{
          // Hintergrund-Schein etwas subtiler
          background: `rgba(${rgb}, 0.10)`,
          // Der "Engels-Glow" - Radius drastisch reduziert (von 80px auf 40px) und Spread auf 0
          boxShadow: `0 0 40px 0px rgba(${rgb}, 0.6)`
        }}
      />
      
      {/* Border Glow (Scharfer Rand beim Hover) */}
      <div 
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `1px solid rgba(${rgb}, 0.5)`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// 3. STYLED BUTTON (Unverändert)
const Button = ({ children, variant = "primary", size = "default", className, asChild, ...props }) => {
  const Comp = asChild ? "div" : "button";
  
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] hover:scale-[1.02] border border-transparent",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-base"
  };

  return (
    <Comp 
      className={cn(baseStyle, variants[variant], sizes[size], className)} 
      {...props}
    >
      {children}
    </Comp>
  );
};

// --- DATA ---

const packages = [
  {
    id: "starter",
    label: "Paket 01",
    name: 'Prozess-Automation „Starter“',
    tagline: "Für den Einstieg in messbare Automatisierung.",
    forWhom: "Ideal für kleine Unternehmen, die einen wiederholenden Ablauf automatisieren möchten.",
    includes: [
      "Analyse eines bestehenden Prozesses",
      "1 maßgeschneiderte Automation (End-to-End)",
      "Einbindung von bis zu 2 Tools (z. B. CRM + E-Mail)",
      "Basic-Dashboard für Überblick",
      "Fehlerüberwachung & Testphase",
      "Lieferung in 5–10 Tagen",
    ],
    result: "Weniger manuelle Arbeit, sofort spürbare Zeitersparnis.",
    price: "650 €",
    priceHint: "Projektbasiert, einmalige Investition",
    icon: <Cpu className="h-5 w-5" />,
    color: "cyan",
    glow: "from-cyan-400 to-teal-400"
  },
  {
    id: "business",
    label: "Paket 02",
    name: 'Prozess-Suite „Business“',
    tagline: "Meist gebucht – verbindet 2–3 Kernprozesse.",
    forWhom: "Für Unternehmen, die mehrere Abläufe automatisieren und ihre Systeme sauber verbinden wollen.",
    includes: [
      "Analyse mehrerer Abläufe",
      "2–3 individuelle Automationen",
      "API-Integrationen zwischen Ihren wichtigsten Tools",
      "Smartes Dashboard mit KPIs (Zeiteinsparnis, Fehlerquote)",
      "Automatische Dokumenterstellung (z. B. Angebote)",
      "14 Tage Monitoring & Optimierung nach Go-Live",
      "Lieferung in 7–14 Tagen",
    ],
    result: "Klare Prozesse, weniger Fehler – alles fließt automatisch.",
    price: "1.200 €",
    priceHint: "Typisch für kleine und mittlere Unternehmen",
    highlight: true,
    icon: <Layers className="h-5 w-5" />,
    color: "blue",
    glow: "from-blue-500 to-violet-500"
  },
  {
    id: "premium",
    label: "Paket 03",
    name: 'Operations-Automation „Premium“',
    tagline: "Für Unternehmen, die Automatisierung strategisch nutzen wollen.",
    forWhom: "Perfekt für Hotels, Shops, Agenturen, SaaS oder Unternehmen mit vielen wiederholenden Abläufen.",
    includes: [
      "Ende-zu-Ende Prozessanalyse Ihrer wichtigsten Abläufe",
      "4+ Automationen, komplett individuell auf Ihr Setup zugeschnitten",
      "Erweiterte API-Integrationen & Datenflüsse",
      "Intelligentes Dashboard (Live-Status, Erfolgsrate)",
      "Automatische Kommunikationen (E-Mails, Dokumente, Reports)",
      "Wöchentliche Updates & Optimierungen",
      "Priorisierter Support",
    ],
    result: "Volle Automatisierung kritischer Prozesse – maximale Effizienz und Stabilität.",
    price: "2.500 €",
    priceHint: "Ankerpreis – individuelle Angebote nach Umfang",
    icon: <Zap className="h-5 w-5" />,
    color: "violet",
    glow: "from-violet-500 to-fuchsia-500"
  },
];

// --- MAIN SECTION COMPONENT ---

export function PackagesSection() {
  return (
    <section id="pakete" className="section-anchor relative py-24 md:py-32 bg-transparent text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Background Ambience removed for transparency */}

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto md:mx-0 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 mb-6"
          >
             <Activity className="w-3 h-3" />
             <span>Die 3 Pakete</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6"
          >
            Drei Pakete –{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
              ein klares Ergebnis:
            </span>{" "}
            <br className="hidden md:block" />
            weniger manuelle Arbeit.
          </motion.h2>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="relative pl-6 border-l-2 border-slate-800"
          >
            <div className="absolute left-[-2px] top-0 h-10 w-0.5 bg-gradient-to-b from-cyan-500 to-transparent" />
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Alle Pakete verbinden schnelle Umsetzung (5–14 Tage), messbare Ergebnisse und klare Prozesse – ohne überflüssigen Tech-Speak.
            </p>
            
            <div className="flex flex-wrap gap-3">
               {[
                 { icon: Timer, text: "Schnelle Umsetzung" },
                 { icon: BarChart3, text: "Messbare Ergebnisse" },
                 { icon: Workflow, text: "Dokumentierte Prozesse" }
               ].map((chip, idx) => (
                 <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-slate-300 font-medium">
                    <chip.icon className="w-3.5 h-3.5 text-cyan-400" />
                    {chip.text}
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {packages.map((pkg, index) => {
            const isFeatured = pkg.highlight;
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`h-full ${isFeatured ? 'md:-mt-8 relative z-20' : 'relative z-10'}`}
              >
                <GlowCard color={pkg.color}>
                  <div className={`h-full group relative flex flex-col rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300
                    ${isFeatured 
                      ? 'bg-slate-900/80 border-blue-500/50' 
                      : 'bg-slate-900/40 border-white/10'
                    }
                    group-hover:bg-slate-900/30
                  `}
                  >
                    
                    {/* Highlight Badge */}
                    {isFeatured && (
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
                    )}

                    <div className="p-6 md:p-8 flex flex-col h-full relative">
                      
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-3">
                           {/* Tech Label */}
                           <div className="flex items-center gap-3">
                             <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border bg-white/5 text-${pkg.color}-400 ${isFeatured ? 'border-blue-500/30' : 'border-white/10'}`}>
                               {pkg.icon}
                             </span>
                             <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
                               {pkg.label}
                             </span>
                           </div>
                           
                           <h3 className={`text-xl font-bold leading-tight transition-colors duration-300 ${isFeatured ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                             {pkg.name}
                           </h3>
                        </div>

                        {/* Popular Badge */}
                        {isFeatured && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] font-bold uppercase tracking-wider text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                            <Sparkles className="w-3 h-3" />
                            Favorit
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-slate-400 uppercase tracking-wider font-medium mb-6 border-b border-white/5 pb-6">
                        {pkg.tagline}
                      </p>

                      {/* Content Body */}
                      <div className="space-y-6 flex-grow">
                        <div className="text-sm text-slate-300 leading-relaxed">
                          {pkg.forWhom}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                             <ShieldCheck className="w-3.5 h-3.5" /> Enthält
                          </div>
                          <ul className="space-y-3">
                            {pkg.includes.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
                                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 text-${pkg.color}-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Result Box */}
                      <div className={`mt-8 p-3 rounded-lg bg-black/40 border border-white/5 text-sm text-slate-300 transition-colors duration-300 group-hover:border-${pkg.color}-500/30`}>
                          <span className={`block text-[10px] font-bold uppercase tracking-widest mb-1 text-${pkg.color}-400`}>
                            Ergebnis
                          </span>
                          {pkg.result}
                      </div>

                      {/* Footer: Price & CTA */}
                      <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="mb-6">
                           <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                             Investition
                           </div>
                           <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-bold text-white tracking-tight">
                               ab {pkg.price}
                             </span>
                             <span className="text-xs font-mono text-slate-500">zzgl. MwSt.</span>
                           </div>
                           {pkg.priceHint && (
                             <div className="text-xs text-slate-500 mt-1">{pkg.priceHint}</div>
                           )}
                        </div>

                        <Magnetic>
                          <Button 
                            size="lg"
                            variant={isFeatured ? "primary" : "secondary"}
                            asChild
                            // HIER FIX: whitespace-nowrap verhindert Umbruch, text-sm macht es passend, px-4 etwas weniger padding
                            className="btn-shine w-full justify-center px-4 py-5 text-sm whitespace-nowrap"
                          >
                            <a href="#kontakt" className="flex items-center gap-1">
                               Kostenlose Analyse starten <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                            </a>
                          </Button>
                        </Magnetic>

                        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-600">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Fixer Scope, transparente Kosten</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA / Help Box */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-dashed border-white/10 bg-slate-900/50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-colors duration-500">
             {/* Background glow for this box */}
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="relative z-10 max-w-xl text-center md:text-left">
               <div className="text-xs font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-3">
                 Unsicher bei der Auswahl?
               </div>
               <p className="text-slate-300 leading-relaxed">
                  In der kostenlosen Prozess-Analyse schauen wir uns Ihre Abläufe an und entscheiden gemeinsam, welches Setup den größten Hebel bringt. <span className="text-white">Konkret, praxisnah und ohne Risiko.</span>
               </p>
             </div>

             <div className="relative z-10 shrink-0">
               <Magnetic>
                 <Button variant="secondary" size="lg" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 shadow-lg hover:shadow-cyan-500/20 whitespace-nowrap">
                   Welches Paket passt?
                 </Button>
               </Magnetic>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}