import { Button } from "@/components/ui/button"
import CodeToUi from "@/components/hero/CodeToUi"
import ValueProp from "@/components/sections/ValueProp"
import Portfolio from "@/components/sections/Portfolio"


export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* dezenter Gradient-Glow im Hintergrund */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 20% 10%, hsla(var(--brand-start)/0.20), transparent 60%), radial-gradient(50% 50% at 80% 10%, hsla(var(--brand-end)/0.16), transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground">Automationen • Dashboards • APIs • AI Workflows</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              <span className="text-brand-gradient">
                KI-gestützte Automatisierungen &amp; Dashboards
              </span>{" "}
              die hunderte Stunden sparen.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Benutzerfreundlich, visuell beeindruckend und in 1–2 Wochen einsatzbereit.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-xl" asChild>
                <a href="#funnel">Kostenloses Erstgespräch buchen</a>
              </Button>
              <Button variant="outline" className="rounded-xl" asChild>
                <a href="#portfolio">Projekte ansehen</a>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div>
              <CodeToUi />
            </div>

            <div className="md:pl-2">
              <h3 className="text-2xl md:text-3xl font-bold">
                Von komplexem Code zu klaren Workflows.
              </h3>
              <p className="mt-3 text-lg text-muted-foreground">
                Wir übersetzen technische Logik in benutzerfreundliche Anwendungen –
                damit Teams schneller arbeiten, weniger Fehler machen und messbar Zeit sparen.
              </p>

              <ul className="mt-6 space-y-3 text-base">
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span><strong>Lead → Regeln → Aktionen:</strong> aus Formularen/Webhooks werden automatisch Aufgaben, E-Mails und CRM-Updates.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary/60" />
                  <span><strong>Skalierbar &amp; nachvollziehbar:</strong> jeder Schritt ist sichtbar und jederzeit erweiterbar.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60" />
                  <span><strong>In 1–2 Wochen live:</strong> Fokus auf wertschöpfenden MVP statt langem Projekt.</span>
                </li>
              </ul>
            </div>
          </div>
        </div> {/* <-- fehlendes schließendes DIV hier */}
      </section>

      <ValueProp />
      <Portfolio />
      <section id="funnel" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-2xl font-bold">Erstgespräch (bald)</h2>
      </section>
    </main>
  )
}
