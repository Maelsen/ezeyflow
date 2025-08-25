import "./globals.css"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" })

export const metadata: Metadata = {
  title: "ezeyflow – Automatisierungen & Dashboards",
  description: "KI-gestützte Workflows, die Teams hunderte Stunden sparen.",
  metadataBase: new URL("https://ezeyflow.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
