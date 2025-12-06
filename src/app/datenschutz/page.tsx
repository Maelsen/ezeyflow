export const metadata = { title: "Datenschutzerklärung" }

export default function Page() {
  return (
    <div className="container py-16">
      <h1 className="font-display text-3xl font-semibold">Datenschutzerklärung</h1>

      <p className="mt-6 text-sm text-white/80">
        Verantwortlicher: <em>Dein Name / ezeyflow (Platzhalter)</em> – hi@ezeyflow.com
      </p>

      <h2 className="mt-8 text-xl font-semibold">Hosting</h2>
      <p className="mt-2 text-sm text-white/70">
        Diese Website wird bei Vercel gehostet. Beim Aufruf werden technisch erforderliche Daten
        (z. B. IP-Adresse, Zeitpunkt, User-Agent) verarbeitet, um die Seite auszuliefern.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Kontaktformular</h2>
      <p className="mt-2 text-sm text-white/70">
        Bei Nutzung des Kontaktformulars verarbeiten wir die von dir eingegebenen Daten
        (Name, E-Mail, Firma, Nachricht) zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2 className="mt-6 text-xl font-semibold">E-Mail-Versand (Resend)</h2>
      <p className="mt-2 text-sm text-white/70">
        Für die Zustellung von Kontaktanfragen per E-Mail kann Resend als Dienstleister eingesetzt werden.
        Dabei werden die zur Zustellung notwendigen Daten verarbeitet.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Integrationen & Embeds</h2>
      <p className="mt-2 text-sm text-white/70">
        Bei Nutzung des eingebetteten Calendly-Widgets können Daten (z. B. IP-Adresse, Interaktionen)
        an den Anbieter übermittelt werden. Bitte beachte die Hinweise des Anbieters.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Rechtsgrundlagen & Speicherdauer</h2>
      <p className="mt-2 text-sm text-white/70">
        Soweit nicht anders angegeben, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. b/f DSGVO.
        Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Betroffenenrechte</h2>
      <ul className="mt-2 list-disc pl-6 text-sm text-white/70">
        <li>Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung</li>
        <li>Datenübertragbarkeit</li>
        <li>Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen</li>
        <li>Beschwerderecht bei einer Aufsichtsbehörde</li>
      </ul>

      <p className="mt-6 text-xs text-white/50">
        Hinweis: Diese Vorlage ist ein Platzhalter und ersetzt keine Rechtsberatung. Bitte mit echten Angaben ersetzen.
      </p>
    </div>
  )
}
