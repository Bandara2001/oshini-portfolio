"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function Navbar() {
  const [active, setActive] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const navRef = useRef<HTMLDivElement>(null)

  // Separate scroll selector and Next.js link
  const navItems = [
    { name: "home", label: "Home", href: "#home", link: "/#home" },
    { name: "about", label: "About", href: "#about", link: "/#about" },
    { name: "projects", label: "Projects", href: "#projects", link: "/#projects" },
    { name: "contact", label: "Contact", href: "#contact", link: "/#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      navItems.forEach((item) => {
        const section = document.querySelector(item.href)
        if (section && scrollY >= (section as HTMLElement).offsetTop - 120) {
          setActive(item.name)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        setMouseX(((e.clientX - rect.left) / rect.width) * 100)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');

        .nav-root { position: fixed; top:0; left:0; width:100%; z-index:9999; font-family: 'Syne', sans-serif; }
        .nav-bg { transition: all 0.4s ease; border-bottom: 1px solid transparent; }
        .nav-bg.scrolled { background: rgba(2,6,15,0.92); border-bottom-color: rgba(0,255,200,0.12); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 4px 40px rgba(0,255,180,0.06); }
        .nav-bg.top { background: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent); backdrop-filter: blur(4px); }
        .nav-bg::after { content: ''; position:absolute; left:0; right:0; height:1px; bottom:0; background: linear-gradient(to right, transparent 0%, rgba(0,255,180,0.5) var(--mx,50%), transparent 100%); transition: opacity 0.3s; opacity:0; }
        .nav-bg.scrolled::after { opacity:1; }
        .nav-inner { max-width:1280px; margin:0 auto; padding:0 2rem; height:68px; display:flex; justify-content:space-between; align-items:center; position:relative; }
        .logo { font-family:'Space Mono', monospace; font-weight:700; font-size:1.1rem; color:white; text-decoration:none; letter-spacing:0.04em; display:flex; align-items:center; gap:10px; position:relative; z-index:1; }
        .logo-bracket { color:#00ffc8; font-size:1.3rem; transition: transform 0.3s ease; display:inline-block; }
        .logo:hover .logo-bracket { transform: scaleX(1.4); }
        .logo-name { background: linear-gradient(90deg,#fff 0%,#00ffc8 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .logo-cursor { display:inline-block; width:2px; height:1.1rem; background:#00ffc8; margin-left:2px; vertical-align:middle; animation: blink 1.1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        .nav-links { display:flex; gap:4px; align-items:center; }
        @media (max-width:768px){ .nav-links{ display:none; } }
        .nav-link { position:relative; padding:7px 18px; font-size:0.88rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; color:rgba(200,210,220,0.75); border-radius:4px; transition:color 0.25s ease; overflow:hidden; }
        .nav-link::before { content:''; position:absolute; inset:0; border-radius:4px; background:rgba(0,255,200,0.07); opacity:0; transition:opacity 0.25s ease; }
        .nav-link:hover::before, .nav-link.active::before { opacity:1; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%) scaleX(0); width:80%; height:2px; background: linear-gradient(90deg, transparent,#00ffc8, transparent); border-radius:2px; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .nav-link:hover::after, .nav-link.active::after { transform:translateX(-50%) scaleX(1); }
        .nav-link:hover, .nav-link.active { color:#fff; }
        .nav-link.active { color:#00ffc8; }
        .nav-link-dot { position:absolute; top:5px; right:6px; width:4px; height:4px; border-radius:50%; background:#00ffc8; box-shadow:0 0 6px #00ffc8; opacity:0; transition: opacity 0.2s ease; }
        .nav-link.active .nav-link-dot { opacity:1; animation:pulse-dot 2s ease-in-out infinite; }
        @keyframes pulse-dot { 0%,100%{ box-shadow:0 0 4px #00ffc8; } 50%{ box-shadow:0 0 10px #00ffc8,0 0 20px rgba(0,255,200,0.3); } }
        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:6px; z-index:10; }
        @media(max-width:768px){ .hamburger{ display:flex; } }
        .ham-line { width:24px; height:2px; background:#00ffc8; border-radius:2px; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); transform-origin:center; }
        .hamburger.open .ham-line:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .hamburger.open .ham-line:nth-child(2){ opacity:0; transform:scaleX(0); }
        .hamburger.open .ham-line:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }
        .mobile-menu { position:fixed; top:68px; left:0; right:0; background:rgba(2,6,15,0.97); backdrop-filter:blur(30px); border-bottom:1px solid rgba(0,255,200,0.15); padding:1rem 2rem 2rem; display:flex; flex-direction:column; gap:4px; transform:translateY(-110%); opacity:0; transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), opacity 0.3s ease; pointer-events:none; }
        .mobile-menu.open { transform:translateY(0); opacity:1; pointer-events:all; }
        .mobile-link { display:flex; align-items:center; gap:12px; padding:14px 16px; color:rgba(200,210,220,0.75); font-size:1rem; font-weight:600; font-family:'Syne',sans-serif; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; border-radius:6px; border:1px solid transparent; transition:all 0.25s ease; }
        .mobile-link:hover, .mobile-link.active { color:#00ffc8; border-color:rgba(0,255,200,0.2); background:rgba(0,255,200,0.05); }
        .mobile-link-num { font-family:'Space Mono',monospace; font-size:0.7rem; color:rgba(0,255,200,0.5); }
        .corner { position:absolute; width:10px; height:10px; opacity:0.5; }
        .corner-tl { top:10px; left:16px; border-top:1.5px solid #00ffc8; border-left:1.5px solid #00ffc8; }
        .corner-br { bottom:10px; right:16px; border-bottom:1.5px solid #00ffc8; border-right:1.5px solid #00ffc8; }
      `}</style>

      <nav className="nav-root" ref={navRef}>
        <div className={`nav-bg ${isScrolled ? "scrolled" : "top"}`} style={{ "--mx": `${mouseX}%` } as React.CSSProperties}>
          <div className="nav-inner">
            <span className="corner corner-tl" />
            <span className="corner corner-br" />

            <Link href="/#home" className="logo">
              <span className="logo-bracket">[</span>
              <span className="logo-name">Oshini Bandara</span>
              <span className="logo-bracket">]</span>
              <span className="logo-cursor" />
            </Link>

            <div className="nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link} // navigation link
                  className={`nav-link ${active === item.name ? "active" : ""}`}
                >
                  <span className="nav-link-dot" />
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="ham-line" />
              <span className="ham-line" />
              <span className="ham-line" />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navItems.map((item, i) => (
            <Link
              key={item.name}
              href={item.link} // navigation link
              className={`mobile-link ${active === item.name ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-link-num">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}