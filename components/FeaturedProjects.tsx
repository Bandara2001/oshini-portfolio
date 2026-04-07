"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"

interface Project {
  id: string
  title: string
  desc: string
  img: string
  tags: string[]
  accent: string
  year: string
  category: string
  status: string
}

const PROJECTS: Project[] = [
  {
    id: "proj-01",
    title: "Pink Aura",
    desc: "AI-powered beauty assistant detecting skin tone and recommending suitable foundation, lip, and outfit palettes. Features virtual try-on, personalized QR code, and Cherry Blossom–themed aesthetic interface.",
    img: "/pink-aura.jpeg",
    tags: ["AI", "React", "Next.js", "TensorFlow"],
    accent: "#ff6ec7",
    year: "2026",
    category: "AI / ML",
    status: "Live",
  },
  {
    id: "proj-02",
    title: "Cozy Cup",
    desc: "Integrates a web app for reservations, menu browsing, and online ordering with a desktop app for inventory, employee, and sales management. Built with ReactJS and REST API for enhanced cafe efficiency.",
    img: "/cozy-cup.png",
    tags: ["React", "REST API", "MySQL", "Desktop App"],
    accent: "#ffa500",
    year: "2025",
    category: "Full Stack",
    status: "Complete",
  },
  {
    id: "proj-03",
    title: "Blockchain Bidding",
    desc: "Decentralized auction platform ensuring transparent, secure, and tamper-proof bidding using blockchain. Combines web frontend, backend REST API, and Ethereum smart contracts for trustworthy auctions.",
    img: "/blockchain-bidding.png",
    tags: ["Blockchain", "Ethereum", "Solidity", "React"],
    accent: "#00ff88",
    year: "2025",
    category: "Web3",
    status: "Complete",
  },
]

// 3D tilt card hook
function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-1, 1], [strength, -strength])
  const rotateY = useTransform(x, [-1, 1], [-strength, strength])

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 2)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 2)
  }
  const onMouseLeave = () => { x.set(0); y.set(0) }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const tilt = useTilt(8)

  const statusColor = project.status === "Live" ? "#00ffc8" : "rgba(180,200,210,0.5)"

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false) }}
        style={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformStyle: "preserve-3d",
          transition: hovered ? "box-shadow 0.3s ease, border-color 0.3s ease" : "all 0.5s ease",
          borderRadius: "16px",
          overflow: "hidden",
          background: hovered
            ? `linear-gradient(135deg, ${project.accent}0d 0%, #0a0f1a 100%)`
            : "linear-gradient(135deg, #0d1420 0%, #060a10 100%)",
          border: `1px solid ${hovered ? project.accent + "60" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered
            ? `0 0 60px ${project.accent}20, 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 ${project.accent}20`
            : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* Scan line overlay on hover */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.accent}04 2px, ${project.accent}04 4px)`,
            borderRadius: "16px",
          }} />
        )}

        {/* Image area */}
        <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.6s ease, filter 0.4s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              filter: hovered ? "brightness(0.9) saturate(1.1)" : "brightness(0.75) saturate(0.9)",
            }}
          />

          {/* Gradient overlay on image */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(to bottom, ${project.accent}18 0%, rgba(6,10,16,0.6) 100%)`,
          }} />

          {/* Category chip — top left */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: project.accent,
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}35`,
            padding: "4px 10px",
            borderRadius: "4px",
            backdropFilter: "blur(8px)",
          }}>
            {project.category}
          </div>

          {/* Year + status — top right */}
          <div style={{
            position: "absolute", top: 14, right: 14,
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px",
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.5)",
              background: "rgba(0,0,0,0.55)",
              padding: "3px 8px",
              borderRadius: "4px",
              backdropFilter: "blur(6px)",
            }}>{project.year}</span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.62rem",
              color: statusColor,
              display: "flex", alignItems: "center", gap: "5px",
              background: "rgba(0,0,0,0.55)",
              padding: "3px 8px",
              borderRadius: "4px",
              backdropFilter: "blur(6px)",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: statusColor,
                boxShadow: project.status === "Live" ? `0 0 6px ${statusColor}` : "none",
                animation: project.status === "Live" ? "blink-status 1.5s ease-in-out infinite" : "none",
              }} />
              {project.status}
            </span>
          </div>

          {/* Project number watermark */}
          <div style={{
            position: "absolute", bottom: 12, right: 16,
            fontFamily: "'Space Mono', monospace",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: `${project.accent}15`,
            lineHeight: 1,
            userSelect: "none",
          }}>
            {project.id.split("-")[1]}
          </div>
        </div>

        {/* Accent top border */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${project.accent} 50%, transparent 100%)`,
          opacity: hovered ? 0.9 : 0.3,
          transition: "opacity 0.4s ease",
        }} />

        {/* Left accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "3px",
          background: `linear-gradient(180deg, ${project.accent} 0%, transparent 100%)`,
          opacity: hovered ? 0.8 : 0.25,
          transition: "opacity 0.4s ease",
        }} />

        {/* Content */}
        <div style={{ padding: "22px 24px 24px" }}>
          {/* Title row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              transition: "color 0.3s ease",
              ...(hovered && { color: project.accent }),
            }}>
              {project.title}
            </h3>
            {/* Arrow indicator */}
            <motion.span
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              style={{ color: project.accent, fontSize: "1.1rem", marginLeft: "8px", flexShrink: 0 }}
            >
              →
            </motion.span>
          </div>

          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.84rem",
            color: "rgba(180,200,215,0.65)",
            lineHeight: 1.7,
            marginBottom: "16px",
          }}>
            {project.desc}
          </p>

          {/* Tag pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.06em",
                color: project.accent,
                background: `${project.accent}12`,
                border: `1px solid ${project.accent}30`,
                padding: "4px 10px",
                borderRadius: "4px",
                transition: "all 0.25s ease",
                ...(hovered && {
                  background: `${project.accent}20`,
                  border: `1px solid ${project.accent}55`,
                  boxShadow: `0 0 8px ${project.accent}20`,
                }),
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Animated section number counter
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = Math.ceil(value / 30)
        const interval = setInterval(() => {
          start += step
          if (start >= value) { setCount(value); clearInterval(interval) }
          else setCount(start)
        }, 40)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}</span>
}

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        padding: "120px 24px 140px",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 20% 50%, #050d18 0%, #000000 70%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@600;800&display=swap');

        @keyframes blink-status {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes grid-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>

      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(0,255,180,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,180,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        animation: "grid-drift 20s linear infinite",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }} />

      {/* Glow orb */}
      <div style={{
        position: "absolute", top: "10%", right: "-10%", zIndex: 0, pointerEvents: "none",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,180,0.04) 0%, transparent 65%)",
        filter: "blur(40px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto" }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}
        >
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            color: "rgba(0,255,180,0.55)",
            textTransform: "uppercase",
          }}>
            02 // projects
          </span>
          <div style={{
            flex: 1, height: "1px",
            background: "linear-gradient(90deg, rgba(0,255,180,0.3) 0%, transparent 100%)",
          }} />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: "16px" }}
        >
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.05,
          }}>
            Featured{" "}
            <span style={{
              color: "#00ffc8",
              textShadow: "0 0 40px rgba(0,255,180,0.4)",
            }}>
              Projects
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.95rem",
            color: "rgba(180,200,215,0.55)",
            marginBottom: "64px",
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          A showcase of AI, blockchain, and full-stack projects built with real-world impact in mind.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex", gap: "0", marginBottom: "56px",
            border: "1px solid rgba(0,255,180,0.1)",
            borderRadius: "10px",
            overflow: "hidden",
            width: "fit-content",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          {[
            { num: 3, label: "Featured Projects", suffix: "" },
            { num: 5, label: "Tech Domains", suffix: "+" },
            { num: 2, label: "Years Building", suffix: "+" },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: "16px 28px",
              borderRight: i < 2 ? "1px solid rgba(0,255,180,0.1)" : "none",
              display: "flex", flexDirection: "column", gap: "2px",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "#00ffc8",
                textShadow: "0 0 16px rgba(0,255,180,0.4)",
              }}>
                <AnimatedCounter value={s.num} />{s.suffix}
              </span>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(180,200,210,0.45)",
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gap: "24px",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "72px" }}
        >
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 36px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#000",
              background: "#00ffc8",
              borderRadius: "4px",
              textDecoration: "none",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              boxShadow: "0 0 32px rgba(0,255,180,0.35), 0 0 64px rgba(0,255,180,0.1)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 48px rgba(0,255,180,0.6), 0 0 96px rgba(0,255,180,0.2)"
              e.currentTarget.style.transform = "translateY(-2px)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 32px rgba(0,255,180,0.35), 0 0 64px rgba(0,255,180,0.1)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <span>View All Projects</span>
            <span style={{ fontSize: "1rem" }}>→</span>
          </Link>
          <p style={{
            marginTop: "14px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            color: "rgba(0,255,180,0.35)",
            letterSpacing: "0.1em",
          }}>
            // more projects on GitHub
          </p>
        </motion.div>
      </div>
    </section>
  )
}