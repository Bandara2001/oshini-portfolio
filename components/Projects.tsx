"use client"

import { motion } from "framer-motion"

const projects = [
  {
    title: "Car Rental System",
    desc: "Desktop application with booking and vehicle management.",
    img: "/project1.jpeg",
  },
  {
    title: "Blockchain Bidding System",
    desc: "Secure decentralized bidding platform using smart contracts.",
    img: "/project2.jpeg",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 max-w-6xl mx-auto">
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center"
      >
        Projects
      </motion.h2>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-all duration-300"
          >
            {/* Optional Image */}
            {p.img && (
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 mt-2">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}