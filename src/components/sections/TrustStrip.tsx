export default function TrustStrip() {
  const items = ["OpenAI", "Google Cloud", "Next.js", "Tailwind", "Zapier", "Make", "Vercel"]
  return (
    <section aria-label="Tech-Stack" className="mx-auto max-w-7xl px-6 pb-8">
      <div className="flex flex-wrap items-center justify-center gap-3 opacity-80">
        {items.map((t) => (
          <span key={t} className="rounded-md border bg-background px-2.5 py-1 text-xs">{t}</span>
        ))}
      </div>
    </section>
  )
}
