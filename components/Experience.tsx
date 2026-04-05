"use client"

import { useEffect, useRef, useState } from "react"

interface ExperienceItem {
  id: string
  category: string
  title: string
  period: string
  description: string
  tags: string[]
  status: "active" | "completed"
  accent: string
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-01",
    category: "Software Engineering",
    title: "Full-Stack Development",
    period: "2022 — Present",
    description:
      "Built full-stack systems using React, Next.js and MySQL. Designed REST APIs, implemented authentication flows, and deployed production-ready applications with responsive UI/UX.",
    tags: ["React", "Next.js", "MySQL", "REST API", "TypeScript"],
    status: "active",
    accent: "#00f5ff",
  },
  {
    id: "exp-02",
    category: "Artificial Intelligence",
    title: "AI & Machine Learning",
    period: "2023 — Present",
    description:
      "Working on intelligent systems and ML models including classification, regression, and neural networks. Exploring real-world applications of AI in data-driven solutions.",
    tags: ["Python", "TensorFlow", "scikit-learn", "NumPy", "Pandas"],
    status: "active",
    accent: "#00ff88",
  },
  {
    id: "exp-03",
    category: "Academic",
    title: "Computer Engineering — BSc",
    period: "2022 — Present",
    description:
      "3rd-year undergraduate student covering core CE disciplines: algorithms, data structures, computer architecture, operating systems, and embedded systems.",
    tags: ["Algorithms", "Data Structures", "OS", "Embedded", "Networks"],
    status: "active",
    accent: "#0088ff",
  },
]

function TagPill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      fontFamily: "var(--font-mono)",
      fontSize: "0.68rem",
      letterSpacing: "0.05em",
      color: color,
      background: `${color}12`,
      border: `1px solid ${color}30`,
      borderRadius: "4px",
    }}>
      {label}
    </span>
  )
}

function ExperienceCard({
  item,
  index,
  visible,
}: {
  item: ExperienceItem
  index: number
  visible: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s ease ${index * 0.15}s`,
      }}
    >
      {/* ── Timeline column ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "6px" }}>
        {/* Dot */}
        <div style={{
          width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
          background: hovered ? item.accent : "var(--bg-card)",
          border: `2px solid ${item.accent}`,
          boxShadow: hovered ? `0 0 16px ${item.accent}80` : "none",
          transition: "all 0.3s ease",
          zIndex: 2,
        }} />
        {/* Line */}
        {index < EXPERIENCES.length - 1 && (
          <div style={{
            width: "1px", flex: 1, marginTop: "8px",
            background: `linear-gradient(180deg, ${item.accent}40, transparent)`,
            minHeight: "80px",
          }} />
        )}
      </div>

      {/* ── Card ── */}
      <div style={{
        marginBottom: index < EXPERIENCES.length - 1 ? "40px" : "0",
        padding: "24px 28px",
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${hovered ? item.accent + "50" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-lg)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: hovered ? `0 0 40px ${item.accent}15, 0 16px 32px rgba(0,0,0,0.3)` : "none",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}>
        {/* Left accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
          background: `linear-gradient(180deg, ${item.accent}, transparent)`,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.3s ease",
          borderRadius: "3px 0 0 3px",
        }} />

        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            {/* Category label */}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.68rem",
              color: item.accent, letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: "6px",
              opacity: 0.8,
            }}>
              {item.category}
            </div>
            {/* Title */}
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "1.15rem",
              fontWeight: 700, color: "var(--text-primary)", margin: 0,
            }}>
              {item.title}
            </h3>
          </div>

          {/* Period + status badge */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.72rem",
              color: "var(--text-muted)", letterSpacing: "0.05em",
            }}>
              {item.period}
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              padding: "2px 8px",
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: item.accent,
              background: `${item.accent}12`,
              border: `1px solid ${item.accent}30`,
              borderRadius: "20px",
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: item.accent,
                boxShadow: `0 0 6px ${item.accent}`,
                animation: "blink 2s ease-in-out infinite",
              }} />
              {item.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "0.9rem",
          color: "var(--text-secondary)", lineHeight: 1.75,
          marginBottom: "16px", margin: "0 0 16px 0",
        }}>
          {item.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {item.tags.map((tag) => (
            <TagPill key={tag} label={tag} color={item.accent} />
          ))}
        </div>

        {/* ID watermark */}
        <div style={{
          position: "absolute", bottom: "16px", right: "20px",
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          color: "var(--text-muted)", letterSpacing: "0.1em",
          opacity: 0.3,
        }}>
          {item.id}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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
      id="experience"
      ref={sectionRef}
      style={{ padding: "120px 24px", maxWidth: "900px", margin: "0 auto", position: "relative" }}
    >
      {/* ── Section label ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <span className="section-label">03 // experience</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,245,255,0.3), transparent)" }} />
      </div>

      {/* ── Heading ── */}
      <div style={{
        marginBottom: "64px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s ease 0.1s",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1,
        }}>
          My{" "}
          <span style={{ color: "var(--accent-cyan)", textShadow: "var(--glow-cyan)" }}>
            Experience
          </span>
        </h2>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.85rem",
          color: "var(--text-secondary)", marginTop: "12px", letterSpacing: "0.03em",
        }}>
          <span style={{ color: "var(--accent-green)" }}>&gt;</span>{" "}
          Building skills across software, AI, and academic research.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div style={{ position: "relative" }}>
        {EXPERIENCES.map((item, i) => (
          <ExperienceCard key={item.id} item={item} index={i} visible={visible} />
        ))}
      </div>

      {/* ── Bottom divider ── */}
      <div style={{
        marginTop: "80px", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)",
      }} />
    </section>
  )
}