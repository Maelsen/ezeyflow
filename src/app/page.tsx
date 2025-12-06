"use client"

import { Hero } from "@/components/hero"
import { BrandMarquee } from "@/components/brand-marquee"
import ShowcaseTypingOnly from "@/components/showcase-code-ui.tsx"
import { UspGrid } from "@/components/usp-grid"
import { CaseStudies } from "@/components/case-studies"
import ProcessTimeline from "@/components/process-timeline"
import { AboutMe } from "@/components/about-me"
import { ContactSection } from "@/components/contact-section"
import { FAQ } from "@/components/faq"
import { PackagesSection } from "@/components/packages-section"

export default function HomePage() {
  return (
    <div>
      {/* Hero oben */}
      <Hero />

      {/* Logos / Integrationen */}
      <section aria-label="Integrationen" className="pb-12">
        <div className="container">
          <BrandMarquee />
          <ShowcaseTypingOnly />
          <UspGrid />
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" className="scroll-mt-24">
        <PackagesSection />
      </section>

            {/* Prozess */}
      <section id="prozess" className="scroll-mt-24">
        <ProcessTimeline />
      </section>

      {/* Projekte */}
      <section id="projekte" className="scroll-mt-24">
        <CaseStudies />
      </section>


      {/* Über mich */}
      <section id="about" className="scroll-mt-24">
        <AboutMe />
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24">
        <FAQ />
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="scroll-mt-24">
        <ContactSection />
      </section>
    </div>
  )
}
