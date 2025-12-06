import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./globals.css"
import { Manrope, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import  SiteHeader  from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import BrandBackground from "@/components/brand-background"
import CursorGlow from "@/components/cursor-glow"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ezeyflow – Automationen & Dashboards",
    template: "%s | ezeyflow",
  },
  description:
    "KI-gestützte, maßgeschneiderte Automationen, personalisierte Videos, Zertifikate, Dashboards & APIs – in 1–2 Wochen live.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ezeyflow",
    title: "ezeyflow – Automationen & Dashboards",
    description:
      "KI-gestützte, maßgeschneiderte Automationen, personalisierte Videos, Zertifikate, Dashboards & APIs – in 1–2 Wochen live.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ezeyflow" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ezeyflow – Automationen & Dashboards",
    description:
      "KI-gestützte, maßgeschneiderte Automationen, personalisierte Videos, Zertifikate, Dashboards & APIs – in 1–2 Wochen live.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/" },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${manrope.variable} ${space.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative min-h-screen">
            <BrandBackground />
            <SiteHeader />
            <main className="relative">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

