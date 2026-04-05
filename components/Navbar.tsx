"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"]

    const handleScroll = () => {
      let current = "home"
      sections.forEach((section) => {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 100) {
          current = section
        }
      })
      setActive(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const linkStyle = (id: string) =>
    `cursor-pointer ${
      active === id ? "text-blue-500 font-semibold" : "text-gray-500"
    }`

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between p-4">
        <h1 className="font-bold text-lg">Oshini</h1>

        <div className="space-x-6 text-sm">
          <a href="#home" className={linkStyle("home")}>Home</a>
          <a href="#about" className={linkStyle("about")}>About</a>
          <a href="#projects" className={linkStyle("projects")}>Projects</a>
          <a href="#contact" className={linkStyle("contact")}>Contact</a>
        </div>
      </div>
    </nav>
  )
}