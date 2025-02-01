import { Shield, Brain, Calculator, Zap, RefreshCw, Lock,LinkIcon } from 'lucide-react'

const features = [
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Decentralized Protection",
    description: "Secure your smart contracts with our decentralized insurance solution, powered by blockchain technology.",
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
]

const Features = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 p-2 text-gradient">Everything you need</h2>
        <p className="text-white/70 text-center max-w-3xl mx-auto mb-16 text-lg">
          Use the state of the art smart contract insurance app with Machine Learning driven pricing.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg border border-white/5 hover:border-primary/20 transition-all duration-300 purple-gradient"
            >
              <div className="mb-6 bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

