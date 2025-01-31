import { ArrowRight } from "lucide-react"
import Link from "next/link"
const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden purple-gradient">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <span className="text-primary">Version 2.0 is here</span>
            <span className="text-white/50">•</span>
            <a href="#" className="text-white/70 hover:text-white transition-colors group">
              Read More
              <ArrowRight className="inline-block ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gradient">
            Smart Contracts deserve
            <br />
            Smarter Insurance
          </h1>

          <p className="text-xl text-white/70 max-w-2xl mb-12">
          Insuring the future of smart contracts—assess, protect, and secure with Web3 innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href = "/tool">
            <button className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-md font-medium transition-colors">
              Get started
            </button>
            </Link>
            <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium border border-white/10 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

