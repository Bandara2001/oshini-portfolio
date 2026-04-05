"use client"

import { motion } from "framer-motion"

export default function Contact() {
  return (
    <section id="contact" className="py-20 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-3xl font-bold"
      >
        Get In Touch
      </motion.h2>

      <p className="mt-4 text-gray-500">
        Open to internships, freelance, and collaborations.
      </p>

      <motion.a
        whileHover={{ scale: 1.1 }}
        href="mailto:oshinibandara2001@gmail.com"
        className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl shadow"
      >
        Email Me
      </motion.a>
    </section>
  )
}