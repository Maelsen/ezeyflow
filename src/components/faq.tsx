"use client"

import { useState, useRef, ReactNode } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { 
  Plus, 
  Minus, 
  MessageSquare, 
  Cpu, 
  ShieldCheck, 
  Search,
  ArrowRight
} from "lucide-react"

// --- INTERNE HILFSKOMPONENTEN (Damit keine Import-Fehler entstehen) ---

// 1. Magnetic Effect (Nachgebaut für Preview)
function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Leichter magnetischer Effekt (Faktor 0.2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); 
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative", display: "inline-block" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

// 2. Button Component (Shadcn-Style Inline)
const Button = ({ children, className, variant, size, asChild, ...props }: any) => {
  const Comp = asChild ? "div" : "button"
  return (
    <Comp 
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer
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

// --- DATEN ---

const CATEGORIES = [
  {
    id: "collab",
    label: "Zusammenarbeit & Ablauf",
    icon: <MessageSquare className="w-4 h-4" />,
    color: "cyan"
  },
  {
    id: "tech",
    label: "Technik & Tools",
    icon: <Cpu className="w-4 h-4" />,
    color: "blue"
  },
  {
    id: "cost",
    label: "Kosten & Sicherheit",
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "violet"
  }
]

const FAQ_ITEMS = [
  // KATEGORIE 1: ZUSAMMENARBEIT
  {
    category: "collab",
    question: "Wie läuft die Zusammenarbeit ab?",
    answer: (
      <div className="space-y-4">
        <p>Wir starten mit einer <strong>kostenlosen Prozess-Analyse</strong>. Dabei schauen wir uns gemeinsam an, wo in deinem Unternehmen Zeit verloren geht, und welcher Prozess den größten Hebel hat.</p>
        <div className="pl-4 border-l-2 border-cyan-500/30 space-y-2 text-slate-300">
          <p>Danach bekommst du ein klar definiertes Setup:</p>
          <ul className="list-disc list-inside space-y-1 ml-1 text-sm">
            <li>Was wird automatisiert</li>
            <li>Wie die Lösung aussieht</li>
            <li>Wie viel Zeit & Kosten du einsparst</li>
          </ul>
        </div>
        <p>Sobald du freigibst, baue ich die Automation End-to-End – inkl. API-Logik, Datenstruktur, Trigger, Fehlerhandling und Monitoring.</p>
      </div>
    )
  },
  {
    category: "collab",
    question: "Wie lange dauert es, bis eine Automation fertig ist?",
    answer: (
      <div className="space-y-3">
        <p>Je nach Komplexität zwischen <strong>1 und 2 Wochen</strong>.</p>
        <p className="text-sm bg-slate-900/50 p-3 rounded border border-white/5 text-slate-400">
          <span className="text-cyan-400 font-mono text-xs uppercase mr-2">[Insight]</span>
          Meine Case-Studies haben gezeigt: Die meisten Systeme baue ich in wenigen Tagen.
        </p>
        <p>Ich arbeite hochfokussiert und liefere extrem schnell, oft schneller als interne Teams überhaupt Feedback geben können.</p>
      </div>
    )
  },
  {
    category: "collab",
    question: "Wie viel Zeit muss ich selbst investieren?",
    answer: (
      <div className="space-y-3">
        <p className="font-medium text-white">Sehr wenig.</p>
        <p>Du musst nur:</p>
        <ul className="list-none space-y-2">
          <li className="flex items-start gap-2 text-sm text-slate-300">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"/> 
            mir Zugriff auf die relevanten Tools geben
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-300">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"/> 
            kurz erklären, wie der Prozess aktuell funktioniert
          </li>
        </ul>
        <div className="flex items-center gap-2 text-sm font-mono text-cyan-400 mt-2">
          <span>Analyse</span> 
          <ArrowRight className="w-3 h-3" /> 
          <span>Architektur</span> 
          <ArrowRight className="w-3 h-3" /> 
          <span>Umsetzung</span>
        </div>
      </div>
    )
  },
  {
    category: "collab",
    question: "Muss ich schon wissen, was automatisiert werden soll?",
    answer: (
      <div className="space-y-3">
        <p className="font-bold text-white">Nein.</p>
        <p>Viele Kunden wissen nur: <span className="italic text-slate-400">„Wir verschwenden zu viel Zeit.“</span></p>
        <p>Ich finde für dich heraus, welche Prozesse sich lohnen, welche den größten Impact haben und welche wir sofort automatisieren können.</p>
        <p className="text-sm text-blue-300">Du brauchst keinen technischen Hintergrund.</p>
      </div>
    )
  },

  // KATEGORIE 2: TECHNIK
  {
    category: "tech",
    question: "Mit welchen Tools und Systemen arbeitest du?",
    answer: (
      <div className="space-y-4">
        <p>Ich arbeite <strong>tool-unabhängig</strong>. Das heißt: Ich wähle immer die Lösung, die für deinen Prozess am sinnvollsten ist, nicht die, die gerade im Trend ist.</p>
        <div className="flex flex-wrap gap-2">
          {["TypeScript", "Node.js", "Python", "Google Cloud Run", "Webhooks", "APIs", "WooCommerce", "Brevo API", "SQL", "Serverless"].map((tag, i) => (
            <span key={i} className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-slate-400">Wenn du Tools hast, die du schon verwendest, integriere ich sie in deine bestehende Systemlandschaft.</p>
      </div>
    )
  },
  {
    category: "tech",
    question: "Kannst du auch komplexe Prozesse automatisieren?",
    answer: (
      <div className="space-y-3">
        <p>Ja – das ist sogar mein <strong>Spezialgebiet</strong> (APIs, Datenbanken, Render-Pipelines).</p>
        <p>Ich automatisiere nicht nur einfache „Klick-Workflows“, sondern baue komplette Systeme:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-300">
          <li className="flex items-center gap-2"><Cpu className="w-3 h-3 text-blue-500"/> personalisierte Videos</li>
          <li className="flex items-center gap-2"><Cpu className="w-3 h-3 text-blue-500"/> API-basierte Engines</li>
          <li className="flex items-center gap-2"><Cpu className="w-3 h-3 text-blue-500"/> PMS-Integrationen</li>
          <li className="flex items-center gap-2"><Cpu className="w-3 h-3 text-blue-500"/> Echtzeit-Dashboards</li>
        </ul>
        <p className="font-medium text-blue-400">Wenn es komplex ist → perfekt.</p>
      </div>
    )
  },
  {
    category: "tech",
    question: "Funktioniert die Automation auch, wenn wir später wachsen?",
    answer: (
      <div className="space-y-3">
        <p className="font-bold text-white">Ja.</p>
        <p>Alle Systeme sind <strong>skalierbar</strong> gebaut. Ob du 10 Bestellungen am Tag hast oder 10.000, die Architektur bleibt stabil, schnell und fehlerfrei.</p>
        <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-sm text-blue-200">
          Das ist einer der großen Unterschiede zu einfachen „No-Code Automationen“.
        </div>
      </div>
    )
  },

  // KATEGORIE 3: KOSTEN & SICHERHEIT
  {
    category: "cost",
    question: "Wie viel kostet eine Automation?",
    answer: (
      <div className="space-y-4">
        <p>Das hängt vom Umfang ab. Hier eine grobe Einordnung:</p>
        <div className="grid gap-3">
          <div className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
            <span className="text-sm text-slate-300">Kleine Systeme</span>
            <span className="text-violet-400 font-mono font-bold">ab 650 €</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
            <span className="text-sm text-slate-300">Mittlere Systeme</span>
            <span className="text-violet-400 font-mono font-bold">ab 1.200 €</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
            <span className="text-sm text-slate-300">Komplexe Setups</span>
            <span className="text-violet-400 font-mono font-bold">ab 2.500 €</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">Alle Preise sind Fixpreise ohne Überraschungen – du weißt vorab genau, was du bekommst.</p>
      </div>
    )
  },
  {
    category: "cost",
    question: "Gibt es laufende Kosten?",
    answer: (
      <div className="space-y-3">
        <p>Oft: <strong className="text-white">Nein</strong>.</p>
        <p>Viele meiner Systeme sind komplett <strong>serverless</strong> und laufen für 0 € bis wenige Cent im Monat.</p>
        <p className="text-sm text-slate-400">Falls ein System externe Dienste nutzt (z. B. spezielle Render-Services), besprechen wir das transparent vorher.</p>
      </div>
    )
  },
  {
    category: "cost",
    question: "Sind die Daten sicher und DSGVO-konform?",
    answer: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-400 font-bold">
          <ShieldCheck className="w-5 h-5" /> Ja.
        </div>
        <p>Ich arbeite ausschließlich mit sicheren Servern, verschlüsselten Datenstrukturen und minimaler Datenspeicherung.</p>
        <p className="text-sm text-slate-400">Systeme wie PMS-Integrationen wurden explizit unter strengen Datenschutzvorgaben entwickelt.</p>
      </div>
    )
  }
]

// --- UI KOMPONENTEN ---

const TabButton = ({ active, onClick, children, color }: any) => (
  <button
    onClick={onClick}
    className={`
      relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none
      ${active ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
    `}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className={`absolute inset-0 rounded-full bg-gradient-to-r opacity-100 ${
          color === 'cyan' ? 'from-cyan-500 to-blue-500' :
          color === 'blue' ? 'from-blue-500 to-indigo-500' :
          'from-indigo-500 to-violet-600'
        }`}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
)

const AccordionItem = ({ item, isOpen, onClick }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`
        group border rounded-xl overflow-hidden transition-all duration-300
        ${isOpen 
          ? 'bg-slate-800 border-cyan-500/50 shadow-[0_0_30px_-10px_rgba(6,182,212,0.2)]' // Sanftes geöffnetes Blau
          : 'bg-slate-900 border-white/10 hover:border-white/20 hover:bg-slate-800/50'} // Solides dunkles Geschlossen
      `}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
          {item.question}
        </span>
        <div className={`
          p-2 rounded-full transition-all duration-300
          ${isOpen ? 'bg-cyan-500 text-white rotate-180' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white'}
        `}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
              <div className="pt-4">
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState("collab")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })

  const filteredItems = FAQ_ITEMS.filter(item => item.category === activeCategory)
  const activeColor = CATEGORIES.find(c => c.id === activeCategory)?.color

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-transparent" id="faq-section">
      
      {/* Background Ambience - passend zum About Me */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header - Angepasst an ProcessTimeline Style (Linksbündig) */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 18 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-white">
            Häufige <span className="text-brand-gradient">Fragen.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/85 relative pl-4">
            <span 
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1 h-[70%] w-[2px] bg-brand-gradient rounded-full" 
            />
            Alles zu Ablauf, Technik und Kosten. Transparent und direkt.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-start gap-2 mb-12">
          <div className="p-1 rounded-full bg-slate-900 border border-white/10 backdrop-blur-sm flex flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <TabButton 
                key={cat.id} 
                active={activeCategory === cat.id} 
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                color={cat.color}
              >
                {cat.icon}
                {cat.label}
              </TabButton>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 min-h-[400px]">
            {filteredItems.map((item, index) => (
              <AccordionItem 
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
            
            {/* Fallback Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center text-slate-500 py-10">
                Keine Fragen in dieser Kategorie gefunden.
              </div>
            )}
        </div>

        {/* Bottom CTA - Button Style von ProcessTimeline übernommen */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col items-center text-center">
            <p className="text-slate-400 mb-6">
              Deine Frage war nicht dabei?
            </p>
            
            <div className="w-full max-w-xs">
              <Magnetic>
                <Button 
                  size="lg" 
                  variant="primary"
                  asChild 
                  className="btn-shine w-full justify-center px-6 py-5 text-sm md:text-base shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)]"
                >
                  <a href="#kontakt">
                    Persönlich fragen 
                  </a>
                </Button>
              </Magnetic>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}