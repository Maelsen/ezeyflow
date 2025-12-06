"use client"

import { Mail, Linkedin, Github } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-edge relative mt-20">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand / Claim */}
          <div className="md:col-span-2">
            <div className="text-xl font-bold">
              <span className="text-brand-gradient">ezeyflow</span>
            </div>
            <p className="mt-2 max-w-md text-white/70">
              Individuelle Automatisierungen, die Ihre Prozesse vereinfachen.{" "}
              <strong>Schneller als jede Agentur.</strong>
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a className="footer-link inline-flex items-center gap-2" href="mailto:info@ezeyflow.com">
                <Mail className="h-4 w-4" /> info@ezeyflow.com
              </a>


            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-sm font-semibold mb-2">Navigation</div>
            <ul className="space-y-1 text-sm">
              <li><a className="footer-link" href="#leistungen">Leistungen</a></li>
              <li><a className="footer-link" href="#projekte">Projekte</a></li>
              <li><a className="footer-link" href="#about">Über mich</a></li>
              <li><a className="footer-link" href="#kontakt">Kontakt</a></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <div className="text-sm font-semibold mb-2">Rechtliches</div>
            <ul className="space-y-1 text-sm">
              <li><a className="footer-link" href="/impressum">Impressum</a></li>
              <li><a className="footer-link" href="/datenschutz">Datenschutzerklärung</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-4 md:flex-row md:items-center">
          <p className="text-xs text-white/60">
            © {year} ezeyflow. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-white/50">
            Made with ♥ — KI-gestützt & individuell.
          </p>
        </div>
      </div>
    </footer>
  )
}
