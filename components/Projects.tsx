export default function Projects() {
  return (
    <section id="projects" className="py-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="p-6 border rounded-xl shadow">
          <h3 className="text-xl font-semibold">Car Rental System</h3>
          <p className="text-gray-500 mt-2">
            Desktop application with booking and vehicle management.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow">
          <h3 className="text-xl font-semibold">Blockchain Bidding System</h3>
          <p className="text-gray-500 mt-2">
            Secure decentralized bidding platform using smart contracts.
          </p>
        </div>
      </div>
    </section>
  )
}