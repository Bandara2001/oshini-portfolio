import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio | Computer Engineering",
  description: "Personal portfolio of a Computer Engineering student — projects, experience, and contact.",
  keywords: ["portfolio", "computer engineering", "developer", "software"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Fixed ambient background layers */}
        <div className="grid-bg" aria-hidden="true" />
        <div className="scanline-overlay" aria-hidden="true" />

        {/* Ambient glow orbs */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: "10%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            bottom: "5%",
            right: "-8%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,136,255,0.025) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}