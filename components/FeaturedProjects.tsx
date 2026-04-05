"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const projects = [
  {
    title: "Car Rental System",
    desc: "Full system with booking and vehicle management",
    img: "/project1.jpg",
  },
  {
    title: "Blockchain Bidding System",
    desc: "Secure smart contract-based bidding platform",
    img: "/project2.jpg",
  },
]

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center">
        Featured Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-900"
          >
            <img src={p.img} className="w-full h-48 object-cover" />

            <div className="p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-500 mt-2">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/projects" className="px-6 py-3 bg-black text-white rounded-xl">
          View All Projects
        </Link>
      </div>
    </section>
  )
}