import { Shield, Brain, Calculator, Zap, RefreshCw, Lock } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Decentralized Protection",
    description: "Secure your smart contracts with our decentralized insurance solution, powered by blockchain technology.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "AI Risk Assessment",
    description: "State-of-the-art transformer models analyze and predict potential vulnerabilities in your contracts.",
  },
  {
    icon: <Calculator className="w-10 h-10 text-primary" />,
    title: "Dynamic Pricing",
    description: "Transparent premium calculations based on coverage amount and AI-assessed risk factors.",
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "Instant Claims",
    description: "Automated claim processing ensures immediate payout upon detection of covered vulnerabilities.",
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-primary" />,
    title: "Real-time Monitoring",
    description: "24/7 smart contract monitoring with continuous risk assessment and threat detection.",
  },
  {
    icon: <Lock className="w-10 h-10 text-primary" />,
    title: "Guaranteed Coverage",
    description: "Secure coverage with automated payouts stored in decentralized escrow contracts.",
  },
]

export default function FeaturesPage() {
  return (
    <section className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-2 p-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Smart Contract Protection
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto mb-16 text-lg">
            Our AI-powered decentralised insurance platform provides comprehensive protection for your smart contracts,
            combining cutting-edge risk assessment with instant, automated coverage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1a1a24] p-8 rounded-lg border border-white/5 hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
              <div className="relative z-10">
                <div className="mb-6 bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/tool">
          <button  className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity" >
            Get Started
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
