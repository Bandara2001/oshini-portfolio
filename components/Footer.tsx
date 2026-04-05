export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-xl font-bold">Oshini Bandara</h2>
          <p className="mt-4 text-gray-400">
            Computer Science student passionate about creating innovative web solutions and building impactful digital experiences.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Get In Touch</h3>
          <p className="mt-4 text-gray-400">oshinibandara2001@gmail.com</p>
          <p className="text-gray-400">Sri Lanka - Colombo</p>
          <p className="text-green-400 mt-2">Available for Freelance Projects</p>

          <div className="mt-4 space-x-4">
            <a href="#" className="underline">GitHub</a>
            <a href="#" className="underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}