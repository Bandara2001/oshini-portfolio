"use client"

import { motion } from "framer-motion"

export default function Experience() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-neutral-900">
      <h2 className="text-3xl font-bold text-center">Experience</h2>

      <div className="max-w-3xl mx-auto mt-10 space-y-8">
        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white dark:bg-black rounded-xl shadow">
          <h3 className="font-semibold text-lg">Software Projects</h3>
          <p className="text-gray-500">
            Built full-stack systems using React, Next.js and MySQL.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="p-6 bg-white dark:bg-black rounded-xl shadow">
          <h3 className="font-semibold text-lg">AI & Machine Learning</h3>
          <p className="text-gray-500">
            Working on intelligent systems and ML models.
          </p>
        </motion.div>
      </div>
    </section>
  )
}