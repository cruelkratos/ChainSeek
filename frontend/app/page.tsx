import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import FAQ from "./components/FAQ"
import CTA from "./components/CTA"
import CompileButton from "./components/CompileButton"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <CTA />
      {/* <CompileButton /> */}
    </div>
  )
}

