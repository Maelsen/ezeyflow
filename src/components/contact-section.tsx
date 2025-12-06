"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { 
  Send, 
  Calendar, 
  HelpCircle, 
  CheckCircle2, 
  Loader2,
  Clock,
  Sparkles
} from "lucide-react"

// --- STYLING CONSTANTS ---
const inputClasses = "w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-medium"
const labelClasses = "block text-sm font-medium text-slate-400 mb-1.5 ml-1"

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" })

  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 })

  // Calendly Link (Fallback wenn ENV nicht gesetzt)
  const calendlyUrl = "https://calendly.com/ezeyflow-info/30min" 

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (formData.website) return // Honeypot trap
    
    setStatus("sending")
    
    // Simulation API Call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Hier echte Logik einfügen (z.B. fetch('/api/contact', ...))
    setStatus("success")
    setFormData({ name: "", email: "", message: "", website: "" })
    
    setTimeout(() => setStatus("idle"), 4000)
  }

  return (
    <section id="kontakt" className="relative py-24 overflow-hidden bg-transparent">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* 1. HEADLINE & SUBHEADLINE */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Lass uns deinen Prozess <br className="hidden md:block" /> 
            in wenigen Tagen <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">automatisieren.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Schreib mir kurz oder buche direkt einen Call – ich beantworte jede Nachricht persönlich.
          </p>
        </motion.div>

        {/* 2. MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-24">
          
          {/* LINKS: Kontaktformular (Simple) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl h-full flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Nachricht schreiben</h3>
              <p className="text-slate-400 text-sm">Fülle einfach das Formular aus.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 flex-grow">
              {/* Honeypot */}
              <input 
                type="text" 
                className="hidden" 
                value={formData.website} 
                onChange={(e) => setFormData({...formData, website: e.target.value})} 
              />

              <div>
                <label htmlFor="name" className={labelClasses}>Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Dein Name"
                  className={inputClasses}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>E-Mail</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@firma.de"
                  className={inputClasses}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClasses}>Nachricht</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Welcher Prozess raubt dir aktuell am meisten Zeit?"
                  className={`${inputClasses} resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <div className="pt-2 mt-auto">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="w-full inline-flex items-center justify-center h-12 px-6 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)] hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Senden...</>
                  ) : status === "success" ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Gesendet!</>
                  ) : (
                    <>Nachricht senden <Send className="ml-2 h-4 w-4" /></>
                  )}
                </button>
              </div>
              
              {/* Status Messages */}
              {status === "success" && (
                <p className="text-emerald-400 text-sm text-center mt-2 bg-emerald-500/10 py-2 rounded border border-emerald-500/20">
                  Danke! Ich melde mich in Kürze bei dir.
                </p>
              )}
            </form>
          </motion.div>

          {/* RECHTS: Calendly / Termin buchen */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            {/* Premium Card Style für Termin */}
            <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-2 md:p-3 shadow-2xl flex-grow flex flex-col overflow-hidden">
              
              <div className="bg-slate-900/50 rounded-xl flex-grow overflow-hidden relative">
                 {/* Calendly iFrame */}
                 <iframe
                  src={`${calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0f172a&text_color=ffffff&primary_color=06b6d4`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Calendly Terminbuchung"
                  className="min-h-[550px] w-full"
                ></iframe>
              </div>

              {/* Trust Badge unter Calendly */}
              <div className="mt-3 px-2 py-2 flex justify-between items-center text-xs text-slate-500 font-medium">
                 <div className="flex items-center gap-1.5 text-emerald-400/90">
                    <Clock className="w-3 h-3" />
                    <span>Dauert 30 Min</span>
                 </div>
                 <div className="flex items-center gap-1.5 text-violet-400/90">
                    <Sparkles className="w-3 h-3" />
                    <span>Kostenlos</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3. MINI FAQ (Trust Trigger) */}
        <div className="border-t border-white/5 pt-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <h4 className="text-white font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Was passiert im Call?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Wir schauen uns deinen Prozess an und ich sage dir ehrlich, ob eine Automatisierung Sinn macht – und was sie kosten würde.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                Brauche ich Vorkenntnisse?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Nein, gar keine. Du erklärst mir einfach, wie du aktuell arbeitest (z.B. "Ich bekomme eine Mail und tippe das in Excel ab").
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-violet-400" />
                Ist das wirklich kostenlos?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ja, zu 100%. Es ist ein Kennenlerngespräch, um herauszufinden, ob wir zusammenpassen. Kein Verkaufsdruck.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}