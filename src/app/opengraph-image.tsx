/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const runtime = "edge"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          color: "white",
          background:
            "linear-gradient(135deg, #0B1220 0%, #111a2e 50%, #0B1220 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 10% -10%, rgba(0,209,255,0.25), transparent 60%), radial-gradient(500px 250px at 90% -10%, rgba(122,60,255,0.22), transparent 60%)",
          }}
        />
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1 }}>
          ezeyflow
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg,#00D1FF,#2B6CFF,#7A3CFF)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginLeft: 8,
            }}
          >
            automates
          </span>
        </div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: 0.9, maxWidth: 900 }}>
          KI-gestützte, maßgeschneiderte Automationen, Dashboards & APIs – in 1–2 Wochen live.
        </div>
      </div>
    ),
    { ...size }
  )
}
