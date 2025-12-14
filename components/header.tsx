"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const leftNav = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Care Packages", href: "/care-packages" },
  ]

  const rightNav = [
    { label: "Accommodation", href: "/accommodation" },
    { label: "Care Services", href: "/care-services" },
    { label: "Contact", href: "/contact" },
  ]

  const allNav = [...leftNav, ...rightNav]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#F0BE86] shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        {/* Left Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {leftNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${
                isScrolled ? "text-gray-800 hover:text-[#226D68]" : "text-white hover:text-[#F0BE86]"
              } font-medium text-sm transition-all duration-300 hover:scale-105`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Center Logo - CHANGE: Updated to "QUEST & HORIZON" */}
        <Link href="/" className="flex-1 flex justify-center cursor-pointer">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-300">
            <span className={isScrolled ? "text-[#226D68]" : "text-white"}>QUEST</span>
            <span className={isScrolled ? "text-gray-700" : "text-[#F0BE86]"}> & HORIZON</span>
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {rightNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${
                isScrolled ? "text-gray-800 hover:text-[#226D68]" : "text-white hover:text-[#F0BE86]"
              } font-medium text-sm transition-all duration-300 hover:scale-105`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden transition-all duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#226D68]/95 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
            {allNav.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-white hover:text-[#F0BE86] font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
