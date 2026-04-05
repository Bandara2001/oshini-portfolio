import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import FeaturedProjects from "@/components/FeaturedProjects"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}