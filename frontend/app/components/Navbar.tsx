"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="py-4 px-6 bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary/20 rounded-md flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-sm" />
          </div>
          <span className="text-xl font-bold text-gradient">Web3App</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="text-muted-foreground hover:text-white transition-colors">
            About
          </Link>
          <Link href="#features" className="text-muted-foreground hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#updates" className="text-muted-foreground hover:text-white transition-colors">
            Updates
          </Link>
          <Link href="#help" className="text-muted-foreground hover:text-white transition-colors">
            Help
          </Link>
          <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-md border border-white/5 transition-colors">
            Get for free
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

