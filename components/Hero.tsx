"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState, useRef } from "react"

// Animated typewriter hook
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && display === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && display === "") {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(() => {
        setDisplay(deleting ? current.slice(0, display.length - 1) : current.slice(0, display.length + 1))
      }, deleting ? speed / 2 : speed)
    }
    return () => clearTimeout(timeout)
  }, [display, deleting, wordIndex, words, speed, pause])

  return display
}

// Particle canvas background
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    let animId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Node grid
    const cols = Math.floor(window.innerWidth / 90)
    const rows = Math.floor(window.innerHeight / 90)
    const nodes: { x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number; opacity: number }[] = []

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = (i / cols) * canvas.width
        const y = (j / rows) * canvas.height
        nodes.push({
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        if (Math.abs(n.x - n.ox) > 18) n.vx *= -1
        if (Math.abs(n.y - n.oy) > 18) n.vy *= -1
      })

      // Draw edges
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x
          const dy = nodes[a].y - nodes[b].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(nodes[a].x, nodes[a].y)
            ctx.lineTo(nodes[b].x, nodes[b].y)
            ctx.strokeStyle = `rgba(0,255,180,${(1 - dist / 110) * 0.12})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,180,${n.opacity})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
}

// Glitch text effect
function GlitchName({ name }: { name: string }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=Syne:wght@800&display=swap');

        .glitch-wrap {
          position: relative;
          display: inline-block;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }

        .glitch-main {
          background: linear-gradient(135deg, #ffffff 0%, #a8f0e0 40%, #00ffc8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 2;
        }

        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          width: 100%;
          overflow: hidden;
        }

        .glitch-wrap::before {
          color: #00ffc8;
          opacity: 0.25;
          animation: glitch1 4s infinite linear;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
        }

        .glitch-wrap::after {
          color: #ff006e;
          opacity: 0.18;
          animation: glitch2 3.5s infinite linear;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
        }

        @keyframes glitch1 {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-3px, 1px); }
          94% { transform: translate(3px, -1px); }
          96% { transform: translate(-2px, 2px); }
          98% { transform: translate(2px, -2px); }
        }

        @keyframes glitch2 {
          0%, 88%, 100% { transform: translate(0); }
          90% { transform: translate(3px, -2px); }
          93% { transform: translate(-3px, 2px); }
          96% { transform: translate(2px, 1px); }
        }

        .typewriter-row {
          font-family: 'Space Mono', monospace;
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: #00ffc8;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 1.5rem;
        }

        .tw-prefix {
          color: rgba(0,255,180,0.45);
        }

        .tw-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #00ffc8;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.9s step-end infinite;
          box-shadow: 0 0 8px #00ffc8;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-desc {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: rgba(200, 218, 230, 0.8);
          max-width: 560px;
          line-height: 1.75;
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .hero-desc strong {
          color: #00ffc8;
          font-weight: 700;
        }

        /* CTA buttons */
        .btn-primary {
          position: relative;
          padding: 13px 32px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000;
          background: #00ffc8;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }

        .btn-primary:hover {
          box-shadow: 0 0 24px rgba(0,255,200,0.6), 0 0 48px rgba(0,255,200,0.2);
          transform: translateY(-2px);
        }

        .btn-primary:hover::before {
          transform: translateX(100%);
        }

        .btn-secondary {
          position: relative;
          padding: 13px 32px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00ffc8;
          background: transparent;
          border: 1px solid rgba(0,255,200,0.4);
          border-radius: 4px;
          text-decoration: none;
          transition: all 0.3s ease;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }

        .btn-secondary:hover {
          background: rgba(0,255,200,0.08);
          border-color: #00ffc8;
          box-shadow: 0 0 18px rgba(0,255,200,0.2);
          transform: translateY(-2px);
        }

        /* Scroll indicator */
        .scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(0,255,180,0.45);
          text-transform: uppercase;
        }

        .scroll-mouse {
          width: 22px;
          height: 34px;
          border: 1.5px solid rgba(0,255,180,0.35);
          border-radius: 11px;
          position: relative;
          overflow: hidden;
        }

        .scroll-wheel {
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 6px;
          background: #00ffc8;
          border-radius: 2px;
          animation: scroll-down 1.6s ease-in-out infinite;
          box-shadow: 0 0 6px #00ffc8;
        }

        @keyframes scroll-down {
          0% { opacity: 1; top: 5px; }
          100% { opacity: 0; top: 20px; }
        }

        /* Ambient glow orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(0,255,180,0.07) 0%, transparent 70%);
          top: -100px; right: -100px;
        }

        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(0,100,255,0.06) 0%, transparent 70%);
          bottom: -50px; left: -80px;
        }

        /* Stats row */
        .stats-row {
          display: flex;
          gap: 2.5rem;
          margin-top: 3rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          position: relative;
        }

        .stat-item::after {
          content: '';
          position: absolute;
          right: -1.25rem;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0,255,180,0.15);
        }

        .stat-item:last-child::after { display: none; }

        .stat-num {
          font-family: 'Space Mono', monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: #00ffc8;
          text-shadow: 0 0 20px rgba(0,255,180,0.4);
        }

        .stat-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(180,200,210,0.55);
        }
      `}</style>

      <span className="glitch-wrap" data-text={name}>
        <span className="glitch-main">{name}</span>
      </span>
    </>
  )
}

export default function Hero() {
  const roles = [
    "Computer Engineering Undergraduate",
    "AI & ML Enthusiast",
    "Full-Stack Developer",
    "Problem Solver",
  ]
  const typed = useTypewriter(roles)

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 60% 40%, #020c18 0%, #000000 70%)" }}
    >
      {/* Animated particle network */}
      <ParticleField />

      {/* Ambient glow orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Noise grain overlay */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 1, opacity: 0.025, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 16px", marginBottom: "2rem",
            border: "1px solid rgba(0,255,180,0.25)",
            borderRadius: "100px",
            background: "rgba(0,255,180,0.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: "#00ffc8",
            boxShadow: "0 0 8px #00ffc8",
            animation: "pulse-dot 2s ease-in-out infinite"
          }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "rgba(0,255,180,0.85)", letterSpacing: "0.12em" }}>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", lineHeight: 1.05, marginBottom: "1.2rem" }}
        >
          <GlitchName name="Oshini Bandara" />
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="typewriter-row"
        >
          <span className="tw-prefix">&gt;&gt;</span>
          <span>{typed}</span>
          <span className="tw-cursor" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="hero-desc"
        >
          Passionate about <strong>AI & Machine Learning</strong>, crafting intelligent systems
          and building <strong>impactful digital experiences</strong> that bridge engineering and creativity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}
        >
          <a href="#contact" className="btn-primary">Work With Me</a>
          <a href="#projects" className="btn-secondary">View Projects</a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="stats-row"
        >
          {[
            { num: "10+", label: "Projects Built" },
            { num: "3+", label: "Years Coding" },
            { num: "5+", label: "Tech Stacks" },
          ].map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-hint">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}