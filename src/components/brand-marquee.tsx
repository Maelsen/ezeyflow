"use client"

type Brand = {
  label: string
  href: string
  logo: string
  imgClassName?: string // individuelle Skalierung je Logo
}

const BRANDS: Brand[] = [
  {
    label: "OpenAI",
    href: "https://openai.com",
    logo: "/brands/openai.png",
  },
  {
    label: "Google Cloud",
    href: "https://cloud.google.com",
    logo: "/brands/google-cloud.png",
  },
  {
    label: "Shopify",
    href: "https://www.shopify.com",
    logo: "/brands/shopify.png",
    imgClassName: "scale-105 md:scale-110",
  },
  {
    label: "WooCommerce",
    href: "https://woocommerce.com",
    logo: "/brands/woocommerce.png",
  },
  {
    label: "Brevo",
    href: "https://www.brevo.com",
    logo: "/brands/brevo.png",
  },
  {
    label: "Zapier",
    href: "https://zapier.com",
    logo: "/brands/zapier.png",
  },
  {
    label: "Python",
    href: "https://www.python.org",
    logo: "/brands/python.png",
  },
  {
    label: "WordPress",
    href: "https://wordpress.org",
    logo: "/brands/wordpress.png",
  },
]

// 🔁 Track viermal hintereinander → nahtloserer Loop
const TRACK = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS]

export function BrandMarquee() {
  return (
    <section className="relative py-10">
      <div className="container">
        <div className="group relative mask-fade-x overflow-hidden">
          <ul className="ezey-animate-marquee flex gap-3">
            {TRACK.map((b, i) => (
              <li key={`${b.label}-${i}`} className="shrink-0">
                <a
                  className="group/item relative logo-pill"
                  href={b.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={b.label}
                >
                  <img
                    src={b.logo}
                    alt={`${b.label} Logo`}
                    loading="lazy"
                    className={`h-6 md:h-7 w-auto object-contain opacity-80 transition-opacity duration-200 group-hover/item:opacity-100 ${
                      b.imgClassName ?? ""
                    }`}
                  />
                  <span className="tooltip">{b.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
