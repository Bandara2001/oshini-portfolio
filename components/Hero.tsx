"use client"

import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center relative bg-gradient-to-br from-gray-100 to-gray-300 dark:from-black dark:to-gray-900"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold"
      >
        Hi, I'm Oshini 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-gray-500 max-w-xl"
      >
        Computer Engineering Undergraduate passionate about AI, ML and building impactful digital experiences.
      </motion.p>

      <motion.a
        href="#projects"
        whileHover={{ scale: 1.1 }}
        className="mt-6 px-6 py-3 bg-black text-white rounded-xl shadow-lg"
      >
        View Projects
      </motion.a>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 text-gray-500"
      >
        ↓ Scroll
      </motion.div>
    </section>
  )
}