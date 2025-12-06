export const metadata = { title: "Impressum" }

export default function Page() {
  return (
    <div className="container py-16">
      <h1 className="font-display text-3xl font-semibold">Impressum</h1>
      <p className="mt-6 text-white/80">
        <strong>Angaben gemäß § 5 TMG</strong>
      </p>

      {/* TODO: Deine echten Daten eintragen */}
      <div className="mt-4 space-y-2 text-sm text-white/80">
        <p>Firmenname: <em>ezeyflow (Platzhalter)</em></p>
        <p>Vertreten durch: <em>Dein Name (Platzhalter)</em></p>
        <p>Adresse: <em>Straße Nr., PLZ Ort (Platzhalter)</em></p>
        <p>E-Mail: hi@ezeyflow.com</p>
        <p>Telefon: <em>+49 … (optional)</em></p>
        <p>USt-IdNr.: <em>DE… (falls vorhanden)</em></p>
        <p>Registereintrag: <em>Amtsgericht … HRB … (falls vorhanden)</em></p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Haftung für Inhalte</h2>
      <p className="mt-2 text-sm text-white/70">
        Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. …
      </p>

      <h2 className="mt-6 text-xl font-semibold">Haftung für Links</h2>
      <p className="mt-2 text-sm text-white/70">
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. …
      </p>

      <h2 className="mt-6 text-xl font-semibold">Urheberrecht</h2>
      <p className="mt-2 text-sm text-white/70">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. …
      </p>

      <h2 className="mt-6 text-xl font-semibold">EU-Streitschlichtung</h2>
      <p className="mt-2 text-sm text-white/70">
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        <a className="ml-1 underline" href="https://ec.europa.eu/consumers/odr" target="_blank">ec.europa.eu/consumers/odr</a>.
      </p>
    </div>
  )
}
