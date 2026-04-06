"use client"

import { useEffect, useRef, useState } from "react"

interface Project {
  id: string
  title: string
  desc: string
  img: string
  github: string
  demo: string
  tech: string
  tags: string[]
  accent: string
}

const PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "AI Beauty Analyzer",
    desc: "Detects skin tone and recommends suitable lipstick and outfit colors with a real-time virtual try-on.",
    img: "/pink-aura.jpeg",
    github: "https://github.com/Bandara2001/pink-aura-beauty-analyzer.git",
    demo: "https://youtube.com/",
    tech: "AI / Computer Vision",
    tags: ["AI", "Computer Vision", "Python"],
    accent: "#ff6eb4",
  },
  {
    id: "proj-02",
    title: "Docker Book Management",
    desc: "Full-stack containerized application using Docker, MongoDB, and WSL with multi-container orchestration via Docker Compose.",
    img: "/project1.jpeg",
    github: "https://github.com/Bandara2001/devops-app.git",
    demo: "https://youtube.com/",
    tech: "DevOps / Docker",
    tags: ["Docker", "MongoDB", "AWS", "DevOps"],
    accent: "#00f5ff",
  },
  {
    id: "proj-03",
    title: "Cozy Cup",
    desc: "Integrates web and desktop apps for reservations, menu browsing, ordering, inventory, and employee management.",
    img: "/cozy-cup.jpeg",
    github: "https://github.com/Bandara2001/The_Cozy_Cup_-Cafe_Management_Website.git",
    demo: "https://youtube.com/",
    tech: "Full Stack",
    tags: ["ReactJS", "REST API", "GUI Design"],
    accent: "#ffaa00",
  },
  {
    id: "proj-04",
    title: "Blockchain Bidding",
    desc: "Decentralized auction platform with transparent, secure, and tamper-proof bidding using Ethereum smart contracts.",
    img: "/project2.jpeg",
    github: "https://github.com/Kavi-Z/blockchain-based-bidding-system.git",
    demo: "https://youtube.com/",
    tech: "Blockchain",
    tags: ["Blockchain", "Smart Contracts", "Web3"],
    accent: "#a78bfa",
  },
  {
    id: "proj-05",
    title: "Spotify Churn Prediction",
    desc: "Machine learning project predicting user churn using account and listening behavior data.",
    img: "/project2.jpeg",
    github: "https://github.com/Irasha-Senarathna/spotify-churn-prediction-ml.git",
    demo: "https://youtube.com/",
    tech: "Machine Learning",
    tags: ["Python", "ML", "Logistic Regression"],
    accent: "#00ff88",
  },
  {
    id: "proj-06",
    title: "Attendance System",
    desc: "Tracks employee attendance and shifts in real-time with secure login and offline support.",
    img: "/project1.jpeg",
    github: "https://github.com/Irasha-Senarathna/attendance_system.git",
    demo: "https://youtube.com/",
    tech: "Flutter / Firebase",
    tags: ["Firebase", "Flutter", "Web Technologies"],
    accent: "#00f5ff",
  },
  {
    id: "proj-07",
    title: "SnapShare",
    desc: "Real-time file sharing over LAN/WiFi with automatic host discovery and multithreaded transfer.",
    img: "/project1.jpeg",
    github: "https://github.com/Bandara2001/SnapShare.git",
    demo: "https://youtube.com/",
    tech: "Java Networking",
    tags: ["Java", "JavaFX", "Socket Programming"],
    accent: "#ffaa00",
  },
  {
    id: "proj-08",
    title: "Smart Baby-Following Robot",
    desc: "Autonomous robot that follows a baby safely using computer vision, sensors, and obstacle avoidance.",
    img: "/project2.jpeg",
    github: "https://github.com/Bandara2001",
    demo: "https://youtube.com/",
    tech: "Robotics / AI",
    tags: ["Python", "OpenCV", "Arduino", "Raspberry Pi"],
    accent: "#00ff88",
  },
]

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: hovered ? "var(--bg-card-hover)" : "var(--bg-card)",
        border: `1px solid ${hovered ? project.accent + "50" : "var(--border-subtle)"}`,
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(40px)",
        transition: `all 0.6s ease ${(index % 3) * 0.1}s`,
        boxShadow: hovered ? `0 0 40px ${project.accent}18, 0 24px 48px rgba(0,0,0,0.5)` : "0 4px 24px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 3,
      }} />

      {/* ── Image ── */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden", flexShrink: 0 }}>
        <img
          src={project.img}
          alt={project.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.7s ease",
            display: "block",
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)",
          transition: "background 0.4s ease",
        }} />
        {/* Glow overlay on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${project.accent}15, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* Tech badge */}
        <div style={{
          position: "absolute", top: "14px", left: "14px",
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 12px",
          fontFamily: "var(--font-mono)", fontSize: "0.65rem",
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: project.accent,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}40`,
          borderRadius: "20px",
          backdropFilter: "blur(8px)",
          zIndex: 2,
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: project.accent, flexShrink: 0 }} />
          {project.tech}
        </div>

        {/* ID watermark */}
        <div style={{
          position: "absolute", bottom: "12px", right: "14px",
          fontFamily: "var(--font-mono)", fontSize: "0.58rem",
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em",
          zIndex: 2,
        }}>
          {project.id}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700,
          color: "var(--text-primary)", marginBottom: "10px", lineHeight: 1.3,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "0.85rem",
          color: "var(--text-secondary)", lineHeight: 1.7,
          marginBottom: "16px", flex: 1,
        }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              letterSpacing: "0.05em",
              color: project.accent,
              background: `${project.accent}10`,
              border: `1px solid ${project.accent}25`,
              borderRadius: "4px", padding: "3px 8px",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "18px" }} />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
              padding: "9px 14px",
              fontFamily: "var(--font-mono)", fontSize: "0.72rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)"
              e.currentTarget.style.color = "var(--text-primary)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)"
              e.currentTarget.style.color = "var(--text-secondary)"
              e.currentTarget.style.borderColor = "var(--border-subtle)"
            }}
          >
            <GithubIcon />
            Code
          </a>

          
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "7px",
              padding: "9px 14px",
              fontFamily: "var(--font-mono)", fontSize: "0.72rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: project.accent,
              background: `${project.accent}10`,
              border: `1px solid ${project.accent}30`,
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = `${project.accent}22`
              e.currentTarget.style.boxShadow = `0 0 16px ${project.accent}30`
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = `${project.accent}10`
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <ExternalIcon />
            Demo
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: "120px 24px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}
    >
      {/* ── Section label ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}>
        <span className="section-label">05 // projects</span>
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
          Featured{" "}
          <span style={{ color: "var(--accent-cyan)", textShadow: "var(--glow-cyan)" }}>Projects</span>
        </h2>
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: "0.85rem",
          color: "var(--text-secondary)", marginTop: "12px", letterSpacing: "0.03em",
        }}>
          <span style={{ color: "var(--accent-green)" }}>&gt;</span>{" "}
          {PROJECTS.length} projects spanning AI, DevOps, Blockchain, and more.
        </p>
      </div>

      {/* ── Grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
      }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} visible={visible} />
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