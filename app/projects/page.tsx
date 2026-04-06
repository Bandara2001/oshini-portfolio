"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Projects from "@/components/Projects"

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />

      {/* spacing because navbar is fixed */}
      <div className="pt-28 px-6">
        <Projects />
      </div>

      <Footer />
    </main>
  )
}