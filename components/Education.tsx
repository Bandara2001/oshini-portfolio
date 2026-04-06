"use client"

import { useEffect, useRef, useState } from "react"

const HIGHLIGHTS = [
  "Software Development",
  "Data Structures",
  "Algorithms",
  "System Design",
  "AI & ML",
  "Embedded Systems",
]

function GpaBar({ gpa, visible }: { gpa: number; visible: boolean }) {
  const pct = (gpa / 4.0) * 100
  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: "8px",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          OGPA Progress
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "#00ff88", textShadow: "var(--glow-green)", fontWeight: 700 }}>
          {gpa} / 4.0
        </span>
      </div>
      <div style={{
        height: "6px", borderRadius: "3px",
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        border: "1px solid rgba(0,245,255,0.1)",
      }}>
        <div style={{
          height: "100%",
          width: visible ? `${pct}%` : "0%",
          background: "linear-gradient(90deg, #00f5ff, #00ff88)",
          borderRadius: "3px",
          boxShadow: "0 0 12px rgba(0,255,136,0.5)",
          transition: "width 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
        }} />
      </div>
    </div>
  )
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [cardHovered, setCardHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{ padding: "120px 24px", maxWidth: "900px", margin: "0 auto", position: "relative" }}
    >
      {/* ── Section label ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <span className="section-label">03 // education</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,245,255,0.3), transparent)" }} />
      </div>

      {/* ── Heading ── */}
      <div style={{
        marginBottom: "56px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.1s",
      }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
          My{" "}
          <span style={{ color: "var(--accent-cyan)", textShadow: "var(--glow-cyan)" }}>Education</span>
        </h2>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "12px", letterSpacing: "0.03em" }}>
          <span style={{ color: "var(--accent-green)" }}>&gt;</span>{" "}
          Academic foundation in Computer Engineering.
        </p>
      </div>

      {/* ── Degree card ── */}
      <div
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        style={{
          padding: "40px",
          background: cardHovered ? "var(--bg-card-hover)" : "var(--bg-card)",
          border: `1px solid ${cardHovered ? "rgba(0,245,255,0.3)" : "var(--border-subtle)"}`,
          borderRadius: "var(--radius-lg)",
          position: "relative", overflow: "hidden",
          boxShadow: cardHovered ? "var(--glow-cyan), 0 20px 40px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.3)",
          transition: "all 0.4s ease",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
          maxWidth: "680px",
        }}
      >
        {/* Corner decoration */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: "120px", height: "120px",
          background: "linear-gradient(225deg, rgba(0,245,255,0.07), transparent)",
          borderBottomLeftRadius: "120px",
          pointerEvents: "none",
        }} />

        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, #00f5ff, transparent)",
          opacity: cardHovered ? 1 : 0.3, transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }} />

        {/* Left accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
          background: "linear-gradient(180deg, #00f5ff, #00ff88, transparent)",
          opacity: cardHovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
          borderRadius: "3px 0 0 3px",
          pointerEvents: "none",
        }} />

        {/* Enrolled badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "4px 14px", marginBottom: "24px",
          background: "rgba(0,245,255,0.06)",
          border: "1px solid rgba(0,245,255,0.15)",
          borderRadius: "20px",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#00f5ff",
            animation: "blink 2s ease-in-out infinite",
          }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#00f5ff", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Currently Enrolled
          </span>
        </div>

        {/* Degree title */}
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800,
          color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "12px",
        }}>
          Bachelor of Science in Computer Engineering
        </h3>

        {/* University */}
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "#00f5ff", marginBottom: "2px", letterSpacing: "0.03em" }}>
          Faculty of Engineering
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "24px", letterSpacing: "0.02em" }}>
          University of Ruhuna
        </p>

        {/* Period row */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
            2022 — 2028
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.6rem",
            color: "#00ff88", background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "4px", padding: "2px 8px", letterSpacing: "0.1em",
          }}>
            IN PROGRESS
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "0.92rem",
          color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "0",
        }}>
          Building a strong foundation across software development, data structures,
          algorithms, and system design — with a focus on AI-driven and scalable solutions.
        </p>

        {/* GPA bar */}
        <GpaBar gpa={3.457} visible={visible} />

        {/* Highlight tags */}
        <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {HIGHLIGHTS.map((h) => (
            <span key={h} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              letterSpacing: "0.05em", color: "var(--text-muted)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "4px", padding: "4px 10px",
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px", marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border-subtle)",
        }}>
          {[
            { label: "Year",     value: "3rd",  accent: "#00f5ff" },
            { label: "Modules",  value: "75+",  accent: "#00ff88" },
            { label: "OGPA",     value: "3.46", accent: "#00f5ff" },
            { label: "Grad",     value: "2028", accent: "#00ff88" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "1.2rem", fontWeight: 700,
                color: s.accent, textShadow: `0 0 12px ${s.accent}60`,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                color: "var(--text-muted)", letterSpacing: "0.12em",
                textTransform: "uppercase", marginTop: "4px",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom divider ── */}
      <div style={{ marginTop: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)" }} />
    </section>
  )
}