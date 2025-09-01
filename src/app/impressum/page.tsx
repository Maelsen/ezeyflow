export const metadata = { title: "Impressum – ezeyflow" }

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold">Impressum</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Hinweis: Platzhalter – bitte mit deinen tatsächlichen Angaben ersetzen. Dies ist keine Rechtsberatung.
      </p>

      <section className="mt-8 space-y-1 text-sm">
        <h2 className="text-lg font-semibold">Angaben gemäß § 5 TMG</h2>
        <p><strong>ezeyflow</strong></p>
        <p>[Straße & Hausnummer]</p>
        <p>[PLZ] [Ort]</p>
        <p>[Land]</p>

        <div className="mt-4">
          <h3 className="font-medium">Vertreten durch</h3>
          <p>[Name des Verantwortlichen]</p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Kontakt</h3>
          <p>E-Mail: <a className="underline underline-offset-4" href="mailto:hi@ezeyflow.com">hi@ezeyflow.com</a></p>
          <p>Telefon: [optional]</p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Umsatzsteuer-ID</h3>
          <p>USt-IdNr.: [falls vorhanden]</p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Aufsichtsbehörde / Register</h3>
          <p>[Handelsregister & Nummer, falls vorhanden]</p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
          <p>[Name, Anschrift wie oben]</p>
        </div>

        <div className="mt-6">
          <h3 className="font-medium">Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
            übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf
            eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
            können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist
            stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
            des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-medium">EU-Streitschlichtung</h3>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a className="underline underline-offset-4" href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>.
          </p>
        </div>
      </section>
    </main>
  )
}
