"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "This platform provides insurance for smart contracts. We assess the vulnerability of smart contracts using machine learning models, decide a premium based on the assessment, track the contract's performance on-chain, and compensate users in case of a contract failure.",
  },
  {
    question: "How does your platform ensure the reliability of the vulnerability assessment?",
    answer:
      "Our machine learning model is trained on a dataset of past smart contract exploits and vulnerabilities. It uses various risk metrics to predict the likelihood of a failure, ensuring a data-driven and reliable assessment.",
  },
  {
    question: "Is this platform decentralized?",
    answer:
      "Yes, our insurance operations and claim validations are executed on the blockchain to ensure transparency, immutability, and security.",
  },
  {
    question: "What kind of vulnerabilities do you detect?",
    answer:
      "We assess vulnerabilities like reentrancy attacks, integer overflows/underflows, access control issues, and other known exploit patterns.",
  },
  {
    question : "What happens if the insured contract is exploited?",
    answer : "If our on-chain monitoring detects a failure or exploit, the coverage amount will be automatically sent to the insured party after verification."
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-black purple-gradient">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Frequently asked questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-card hover:bg-muted transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-primary" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-black/50">
                  <p className="text-white/70">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

