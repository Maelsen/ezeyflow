export const metadata = { title: "Seite nicht gefunden – ezeyflow" }

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-bold">Seite nicht gefunden</h1>
      <p className="mt-2 text-muted-foreground">Die Seite existiert nicht oder wurde verschoben.</p>
      <a href="/" className="mt-6 inline-block rounded-xl border bg-card/60 px-4 py-2">Zur Startseite</a>
    </main>
  )
}
