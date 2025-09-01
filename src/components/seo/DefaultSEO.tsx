"use client"
import { DefaultSeo } from "next-seo"

export default function DefaultSEO() {
  return (
    <DefaultSeo
      titleTemplate="%s | ezeyflow"
      defaultTitle="ezeyflow – Automatisierungen & Dashboards"
      description="KI-gestützte Workflows, die Teams hunderte Stunden sparen."
      openGraph={{
        type: "website",
        locale: "de_DE",
        url: "https://ezeyflow.com",
        siteName: "ezeyflow",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ezeyflow" }],
      }}
      twitter={{ cardType: "summary_large_image" }}
    />
  )
}
