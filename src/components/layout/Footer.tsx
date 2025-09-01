import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground">Tech-Stack</div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-md border bg-background px-2 py-1">OpenAI</span>
              <span className="rounded-md border bg-background px-2 py-1">Google Cloud</span>
              <span className="rounded-md border bg-background px-2 py-1">Next.js</span>
              <span className="rounded-md border bg-background px-2 py-1">Tailwind</span>
              <span className="rounded-md border bg-background px-2 py-1">Zapier/Make</span>
            </div>
          </div>
          <div className="md:text-right">
            <div>© {new Date().getFullYear()} ezeyflow</div>
            <div className="mt-2 space-x-4 text-sm">
              <Link href="/impressum" className="opacity-80 hover:opacity-100">Impressum</Link>
              <Link href="/datenschutz" className="opacity-80 hover:opacity-100">Datenschutz</Link>
              <a href="mailto:hi@ezeyflow.com" className="opacity-80 hover:opacity-100">hi@ezeyflow.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
