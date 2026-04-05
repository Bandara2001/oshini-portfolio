"use client"

import { useEffect, useRef, useState } from "react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const linkHoverStyle = {
    transition: "all 0.3s ease",
    color: "var(--accent-cyan)",
  }

  return (
    <footer
      ref={footerRef}
      style={{
        background: "var(--bg-footer, #0a0a0a)",
        color: "var(--text-white, #fff)",
        padding: "80px 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.7s ease",
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gap: "40px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}>

        {/* Name & Summary */}
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px" }}>
            Oshini Bandara
          </h2>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted, #aaa)" }}>
            Computer Science student passionate about creating innovative web solutions and building impactful digital experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>Quick Links</h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["Home", "About", "Projects", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted, #aaa)", textDecoration: "none", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted, #aaa)")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "12px" }}>Get In Touch</h3>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted, #aaa)", marginBottom: "4px" }}>oshinibandara2001@gmail.com</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted, #aaa)", marginBottom: "4px" }}>Sri Lanka - Colombo</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--accent-green, #00ff88)", marginBottom: "12px" }}>Available for Freelance Projects</p>

          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { name: "GitHub", url: "https://github.com/Bandara2001" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/oshini-bandara/" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted, #aaa)", textDecoration: "underline", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted, #aaa)")}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}