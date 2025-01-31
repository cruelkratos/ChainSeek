import { Shield, Zap, LinkIcon } from "lucide-react"

const features = [
  {
    icon: <LinkIcon className="w-10 h-10 text-primary" />,
    title: "Integration Ecosystem",
    description: "Enhance your productivity by connecting with your tools, keeping your essentials in one place.",
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "Goal Setting and Tracking",
    description:
      "Define and track your goals, breaking down objectives into achievable tasks to keep your targets in sight.",
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Secure Data Encryption",
    description: "With end-to-end encryption, your data is securely stored and protected from unauthorized access.",
  },
]

const Features = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">Everything you need</h2>
        <p className="text-white/70 text-center max-w-3xl mx-auto mb-16 text-lg">
          Enjoy customizable lists, team work tools, and smart tracking all in one place. Set tasks, get reminders, and
          see your progress simply and quickly.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg border border-white/5 hover:border-primary/20 transition-all duration-300"
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

