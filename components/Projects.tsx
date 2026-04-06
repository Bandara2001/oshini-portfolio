"use client"

import { motion } from "framer-motion"

const projects = [
  {
    title: "Pink Aura",
    desc: "AI-powered beauty assistant with virtual try-on and personalized recommendations.",
    img: "/pink-aura.jpeg",
    tags: ["AI", "Next.js", "TensorFlow"],
  },
  {
    title: "Cozy Cup",
    desc: "Full-stack café management system with web + desktop integration.",
    img: "/cozy-cup.jpeg",
    tags: ["React", "MySQL", "REST API"],
  },
  {
    title: "Blockchain Bidding",
    desc: "Secure decentralized auction system using Ethereum smart contracts.",
    img: "/project2.jpeg",
    tags: ["Blockchain", "Solidity", "React"],
  },
]

export default function Projects() {
  return (
    <section className="max-w-6xl mx-auto py-20">
      
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        All <span className="text-cyan-400">Projects</span>
      </motion.h2>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            {/* Image */}
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">
                {p.title}
              </h3>

              <p className="text-gray-400 mt-2 text-sm">
                {p.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}