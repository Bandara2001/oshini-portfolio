export default function Skills() {
  const skills = ["Java", "Python", "React", "Next.js", "MySQL", "Tailwind"]

  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold">Skills</h2>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-gray-200 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}