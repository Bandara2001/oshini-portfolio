"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const skills = [
  { name: "Java",       category: "language", icon: "☕", level: 85 },
  { name: "Python",     category: "language", icon: "🐍", level: 90 },
  { name: "TypeScript", category: "language", icon: "𝕋",  level: 80 },
  { name: "React",      category: "frontend", icon: "⚛",  level: 88 },
  { name: "Next.js",    category: "frontend", icon: "▲",  level: 82 },
  { name: "Tailwind",   category: "frontend", icon: "🌊", level: 85 },
  { name: "Node.js",    category: "backend",  icon: "⬡",  level: 78 },
  { name: "REST API",   category: "backend",  icon: "⇌",  level: 83 },
  { name: "MySQL",      category: "data",     icon: "🗄",  level: 75 },
  { name: "Git",        category: "tools",    icon: "⑂",  level: 88 },
]

const categories = ["all", "language", "frontend", "backend", "data", "tools"]

const categoryColors: Record<string, string> = {
  language: "#00ffc8",
  frontend: "#00aaff",
  backend:  "#ff6b6b",
  data:     "#ffd166",
  tools:    "#c77dff",
}

// Hexagon SVG cell
function HexCard({ skill, index, active }: {
  skill: typeof skills[0]
  index: number
  active: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const color = categoryColors[skill.category]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, type: "spring", stiffness: 120 }}
      style={{ opacity: active ? 1 : 0.18, transition: "opacity 0.35s ease" }}
      className="hex-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="hex-cell"
        style={{
          "--clr": color,
          boxShadow: hovered
            ? `0 0 32px ${color}55, 0 0 64px ${color}22, inset 0 0 20px ${color}11`
            : `0 0 12px ${color}22, inset 0 0 8px ${color}08`,
          borderColor: hovered ? color : `${color}40`,
          background: hovered
            ? `linear-gradient(135deg, ${color}18 0%, #00000088 100%)`
            : `linear-gradient(135deg, ${color}08 0%, #00000060 100%)`,
          transform: hovered ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)",
        } as React.CSSProperties}
      >
        {/* Corner brackets */}
        <span className="hex-corner tl" style={{ borderColor: color }} />
        <span className="hex-corner br" style={{ borderColor: color }} />

        <div className="hex-icon" style={{ color }}>{skill.icon}</div>
        <div className="hex-name">{skill.name}</div>

        {/* Progress arc ring */}
        <svg className="hex-ring" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="none" stroke={`${color}18`} strokeWidth="3" />
          <motion.circle
            cx="30" cy="30" r="26"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 26}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
            whileInView={{
              strokeDashoffset: 2 * Math.PI * 26 * (1 - skill.level / 100)
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.06 + 0.3, ease: "easeOut" }}
            style={{
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              filter: hovered ? `drop-shadow(0 0 4px ${color})` : "none",
            }}
          />
        </svg>

        <div className="hex-pct" style={{ color: `${color}99` }}>{skill.level}%</div>
        <div className="hex-cat" style={{ color: `${color}66` }}>{skill.category}</div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [filter, setFilter] = useState("all")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Subtle floating dot grid background
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let frame: number
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const spacing = 36
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const wave = Math.sin(t * 0.8 + i * 0.4 + j * 0.4) * 0.5 + 0.5
          ctx.beginPath()
          ctx.arc(i * spacing, j * spacing, 0.9, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,255,180,${wave * 0.07 + 0.03})`
          ctx.fill()
        }
      }
      t += 0.018
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize) }
  }, [])

  const filtered = skills.filter(s => filter === "all" || s.category === filter)

  return (
    <section id="skills" style={{ position: "relative", padding: "7rem 1rem", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@600;800&display=swap');

        .skills-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .skills-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Section label */
        .skills-label {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          color: rgba(0,255,180,0.55);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .skills-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.2rem);
          color: #fff;
          margin-bottom: 0.5rem;
          position: relative;
          display: inline-block;
        }

        .skills-title-accent {
          color: #00ffc8;
        }

        .skills-title-underline {
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00ffc8, transparent);
          border-radius: 2px;
        }

        .skills-sub {
          font-family: 'Syne', sans-serif;
          color: rgba(180,200,215,0.6);
          font-size: 1rem;
          margin-bottom: 3rem;
          margin-top: 1rem;
        }

        /* Filter tabs */
        .filter-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 3.5rem;
        }

        .filter-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 7px 18px;
          border-radius: 4px;
          border: 1px solid rgba(0,255,180,0.2);
          background: transparent;
          color: rgba(180,210,200,0.6);
          cursor: pointer;
          transition: all 0.25s ease;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }

        .filter-btn:hover {
          border-color: rgba(0,255,180,0.5);
          color: #00ffc8;
          background: rgba(0,255,180,0.06);
        }

        .filter-btn.active {
          background: rgba(0,255,180,0.12);
          border-color: #00ffc8;
          color: #00ffc8;
          box-shadow: 0 0 14px rgba(0,255,180,0.2);
        }

        /* Hex grid */
        .hex-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 18px;
        }

        .hex-wrap {
          width: 130px;
        }

        .hex-cell {
          position: relative;
          border: 1px solid;
          border-radius: 12px;
          padding: 1.5rem 0.8rem 0.9rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .hex-corner {
          position: absolute;
          width: 8px;
          height: 8px;
          border-style: solid;
          opacity: 0.7;
        }

        .hex-corner.tl {
          top: 6px; left: 6px;
          border-width: 1.5px 0 0 1.5px;
          border-radius: 2px 0 0 0;
        }

        .hex-corner.br {
          bottom: 6px; right: 6px;
          border-width: 0 1.5px 1.5px 0;
          border-radius: 0 0 2px 0;
        }

        .hex-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          opacity: 0.4;
          pointer-events: none;
        }

        .hex-icon {
          font-size: 1.7rem;
          position: relative;
          z-index: 2;
          line-height: 1;
        }

        .hex-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          color: #fff;
          letter-spacing: 0.04em;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .hex-pct {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          position: relative;
          z-index: 2;
        }

        .hex-cat {
          font-family: 'Space Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          z-index: 2;
        }

        /* Legend */
        .legend {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 3rem;
          padding: 1rem 2rem;
          border: 1px solid rgba(0,255,180,0.1);
          border-radius: 8px;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Space Mono', monospace;
          font-size: 0.68rem;
          color: rgba(180,200,210,0.65);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      `}</style>

      <canvas ref={canvasRef} className="skills-canvas" />

      <div className="skills-inner">
        {/* Heading */}
        <p className="skills-label">// capabilities</p>
        <h2 className="skills-title">
          Tech <span className="skills-title-accent">Stack</span>
          <span className="skills-title-underline" />
        </h2>
        <p className="skills-sub">Tools & technologies I build with</p>

        {/* Filter tabs */}
        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? "active" : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <div className="hex-grid">
  {filtered.map((skill, i) => (
    <HexCard
      key={skill.name}
      skill={skill}
      index={i}
      active={true}
    />
  ))}
</div>

        {/* Legend */}
        <div className="legend">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="legend-item">
              <span className="legend-dot" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
              {cat}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}