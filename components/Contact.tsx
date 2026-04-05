"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface Social {
  label: string
  handle: string
  href: string
  icon: ReactNode
  color: string
  glow: string
  isEmail: boolean
}

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const socials: Social[] = [
  {
    label: "LinkedIn",
    handle: "oshini-bandara",
    href: "https://www.linkedin.com/in/oshini-bandara-01968b330",
    icon: <LinkedInIcon />,
    color: "var(--accent-blue)",
    glow: "var(--glow-blue)",
    isEmail: false,
  },
  {
    label: "GitHub",
    handle: "Bandara2001",
    href: "https://github.com/Bandara2001",
    icon: <GitHubIcon />,
    color: "var(--accent-cyan)",
    glow: "var(--glow-cyan)",
    isEmail: false,
  },
  {
    label: "Email",
    handle: "oshinibandara2001",
    href: "mailto:oshinibandara2001@gmail.com",
    icon: <EmailIcon />,
    color: "var(--accent-green)",
    glow: "var(--glow-green)",
    isEmail: true,
  },
]

// ── Extracted card component to avoid map JSX corruption ──
interface SocialCardProps {
  social: Social
  index: number
  isHovered: boolean
  isVisible: boolean
  onEnter: () => void
  onLeave: () => void
}

function SocialCard({ social, index, isHovered, isVisible, onEnter, onLeave }: SocialCardProps) {
  return (
    <a
      href={social.href}
      target={social.isEmail ? undefined : "_blank"}
      rel="noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        padding: "32px 20px",
        background: isHovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${isHovered ? social.color : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-lg)",
        textDecoration: "none",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(30px)",
        transition: `all 0.5s ease ${0.3 + index * 0.1}s`,
        boxShadow: isHovered
          ? `0 0 30px ${social.color}33, 0 20px 40px rgba(0,0,0,0.4)`
          : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top shimmer line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${social.color}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Icon circle */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: `${social.color}15`,
          border: `1px solid ${social.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: social.color,
          boxShadow: isHovered ? social.glow : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {social.icon}
      </div>

      {/* Label + handle */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}
        >
          {social.label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: social.color,
            letterSpacing: "0.04em",
            opacity: 0.8,
          }}
        >
          @{social.handle}
        </div>
      </div>

      {/* Arrow reveal */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateY(0)" : "translateY(6px)",
          transition: "all 0.25s ease",
        }}
      >
        OPEN →
      </div>
    </a>
  )
}

// ── Main component ──
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText("oshinibandara2001@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "120px 24px",
        maxWidth: "900px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Section label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}
      >
        <span className="section-label">04 // contact</span>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(90deg, rgba(0,245,255,0.3), transparent)",
          }}
        />
      </div>

      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.1s",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "var(--text-primary)",
          }}
        >
          Get In{" "}
          <span
            style={{
              color: "var(--accent-cyan)",
              textShadow: "var(--glow-cyan)",
            }}
          >
            Touch
          </span>
        </h2>
      </div>

      {/* Subtext */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          marginBottom: "60px",
          letterSpacing: "0.04em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}
      >
        <span style={{ color: "var(--accent-green)" }}>&gt;</span>{" "}
        Open to internships, freelance projects, and collaborations.
      </p>

      {/* Social cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "48px",
        }}
      >
        {socials.map((social, i) => (
          <SocialCard
            key={social.label}
            social={social}
            index={i}
            isHovered={hoveredCard === i}
            isVisible={visible}
            onEnter={() => setHoveredCard(i)}
            onLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>

      {/* CTA email bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "20px 28px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.6s",
          flexWrap: "wrap",
        }}
      >
        {/* Email + status dot */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--accent-green)",
              boxShadow: "var(--glow-green)",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
            }}
          >
            oshinibandara2001@gmail.com
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: copied ? "var(--accent-green)" : "var(--text-secondary)",
              background: "transparent",
              border: `1px solid ${copied ? "rgba(0,255,136,0.3)" : "var(--border-subtle)"}`,
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {copied ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </>
              )}
            </svg>
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Send message link */}
          <a
            href="mailto:oshinibandara2001@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-cyan)",
              background: "rgba(0,245,255,0.07)",
              border: "1px solid rgba(0,245,255,0.25)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.15)"
              e.currentTarget.style.boxShadow = "var(--glow-cyan)"
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "rgba(0,245,255,0.07)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
            Send Message
          </a>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        style={{
          marginTop: "80px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)",
        }}
      />
    </section>
  )
}