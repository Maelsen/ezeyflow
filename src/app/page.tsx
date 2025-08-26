import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* dezenter Gradient-Glow im Hintergrund */}
        <div
          aria-hidden
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
                Wir bauen KI-gestützte Automatisierungen & Dashboards
              </span>{" "}
              die Unternehmen hunderte Stunden sparen.
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

          {/* Platzhalter für späteren Code→UI Effekt */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="h-44 rounded-xl border bg-card/40" />
            <div className="h-44 rounded-xl border bg-card/40" />
          </div>
        </div>
      </section>

      {/* Anker, damit CTAs funktionieren – Inhalte folgen später */}
      <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-2xl font-bold">Showcase (bald)</h2>
      </section>

      <section id="funnel" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-2xl font-bold">Erstgespräch (bald)</h2>
      </section>
    </main>
  )
}
