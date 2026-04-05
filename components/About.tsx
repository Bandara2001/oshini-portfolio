"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { label: "Year", value: "3rd", suffix: "" },
  { label: "Projects", value: "12", suffix: "+" },
  { label: "Commits", value: "800", suffix: "+" },
  { label: "Coffee", value: "∞", suffix: "" },
]

const traits = [
  { icon: "⬡", label: "AI & Machine Learning" },
  { icon: "⬡", label: "Software Development" },
  { icon: "⬡", label: "Problem Solving" },
  { icon: "⬡", label: "System Design" },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [statCounts, setStatCounts] = useState(stats.map(() => 0))

  const fullText = "Computer Engineering Student"

  // Intersection Observer — trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (!visible) return
    let i = 0
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [visible])

  // Count-up animation for stats
  useEffect(() => {
    if (!visible) return
    const targets = [3, 12, 800, 99]
    const duration = 1500
    const steps = 40
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setStatCounts(targets.map((t) => Math.floor(t * eased)))
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [visible])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "120px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span className="section-label">02 // about_me</span>
        <div style={{
          flex: 1, height: "1px",
          background: "linear-gradient(90deg, rgba(0,245,255,0.3), transparent)"
        }} />
      </div>

      {/* Main grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center",
      }}>

        {/* ── Left: Text content ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-40px)",
          transition: "all 0.8s ease 0.2s",
        }}>

          {/* Heading */}
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}>
            About{" "}
            <span style={{
              color: "var(--accent-cyan)",
              textShadow: "var(--glow-cyan)",
            }}>
              Me
            </span>
          </h2>

          {/* Typewriter subtitle */}
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            color: "var(--accent-green)",
            marginBottom: "28px",
            letterSpacing: "0.05em",
            minHeight: "1.4em",
          }}>
            &gt; {typedText}
            <span style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "var(--accent-green)",
              marginLeft: "2px",
              verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
            }} />
          </div>

          {/* Bio paragraph */}
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            marginBottom: "32px",
          }}>
            I'm a{" "}
            <span style={{ color: "var(--accent-cyan)" }}>3rd-year Computer Engineering</span>{" "}
            student passionate about{" "}
            <span style={{ color: "var(--text-primary)" }}>AI, Machine Learning,</span>{" "}
            and{" "}
            <span style={{ color: "var(--text-primary)" }}>Software Development</span>.
            I enjoy building real-world applications and solving complex problems —
            turning ideas into systems that actually work.
          </p>

          {/* Traits list */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
            {traits.map((t, i) => (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.5s ease ${0.4 + i * 0.1}s`,
                }}
              >
                <span style={{
                  color: "var(--accent-cyan)",
                  fontSize: "0.7rem",
                  textShadow: "var(--glow-cyan)",
                }}>
                  {t.icon}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.03em",
                }}>
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Stats + visual ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.8s ease 0.4s",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}>

          {/* Rotating hex avatar placeholder */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              {/* Outer rotating ring */}
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid transparent",
                borderTopColor: "var(--accent-cyan)",
                borderRightColor: "var(--accent-cyan)",
                animation: "spin-slow 4s linear infinite",
                boxShadow: "var(--glow-cyan)",
              }} />
              {/* Inner counter-rotating ring */}
              <div style={{
                position: "absolute",
                inset: "12px",
                borderRadius: "50%",
                border: "1px dashed rgba(0,245,255,0.2)",
                animation: "spin-slow 7s linear infinite reverse",
              }} />
              {/* Center */}
              <div style={{
                position: "absolute",
                inset: "24px",
                borderRadius: "50%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2px",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.4rem",
                  color: "var(--accent-cyan)",
                  textShadow: "var(--glow-cyan)",
                }}>
                  CE
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                }}>
                  STUDENT
                </span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="cyber-card"
                style={{
                  padding: "20px 16px",
                  textAlign: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${0.6 + i * 0.1}s`,
                }}
              >
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  color: i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-green)",
                  textShadow: i % 2 === 0 ? "var(--glow-cyan)" : "var(--glow-green)",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}>
                  {stat.value === "∞"
                    ? "∞"
                    : `${statCounts[i]}${stat.suffix}`}
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal mini block */}
          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}>
            {/* Terminal top bar */}
            <div style={{
              padding: "8px 14px",
              background: "rgba(0,245,255,0.04)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              {["#ff5f57", "#ffbd2e", "#28ca41"].map((c) => (
                <div key={c} style={{
                  width: "8px", height: "8px",
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.8,
                }} />
              ))}
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                marginLeft: "8px",
                letterSpacing: "0.05em",
              }}>
                whoami.sh
              </span>
            </div>
            {/* Terminal body */}
            <div style={{
              padding: "14px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              lineHeight: 1.8,
            }}>
              <div style={{ color: "var(--text-muted)" }}>
                <span style={{ color: "var(--accent-green)" }}>~</span> whoami
              </div>
              <div style={{ color: "var(--text-secondary)", paddingLeft: "8px" }}>
                {">"} CE Student // Builder // Problem Solver
              </div>
              <div style={{ color: "var(--text-muted)", marginTop: "4px" }}>
                <span style={{ color: "var(--accent-green)" }}>~</span> interests
              </div>
              <div style={{ color: "var(--accent-cyan)", paddingLeft: "8px" }}>
                {">"} AI · ML · Systems · Fullstack
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom divider */}
      <div style={{
        marginTop: "80px",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)",
      }} />
    </section>
  )
}