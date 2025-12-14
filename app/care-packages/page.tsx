"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Check } from "lucide-react"

const packages = [
  {
    id: "standard",
    name: "Standard",
    price: "£1,500",
    highlight: false,
    features: [
      "Basic accommodation",
      "Daily meals (3)",
      "Standard activities",
      "Emergency support",
      "Travel assistance",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "£3,500",
    highlight: true,
    features: [
      "Luxury accommodation",
      "24/7 medical support",
      "Wellness programs",
      "Premium meals (5)",
      "Private transportation",
      "Concierge service",
      "Travel insurance",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe",
    price: "£5,500",
    highlight: false,
    features: [
      "5-star accommodation",
      "Specialist doctors",
      "VIP experiences",
      "Michelin meals",
      "Private jet transfer",
      "Personal assistant",
      "Full insurance",
    ],
  },
]

export default function CarePackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState(1)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-48 md:h-64 lg:h-96 w-full mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=500&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              CARE
              <br />
              PACKAGES
            </h1>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#226D68] mb-8 sm:mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          Choose Your Perfect Package
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPackage(idx)}
              className={`animate-in fade-in slide-in-from-bottom-4 duration-700 rounded-lg overflow-hidden transition-all cursor-pointer ${
                selectedPackage === idx ? "ring-2 ring-[#226D68] md:scale-105" : ""
              } ${pkg.highlight ? "bg-[#226D68] text-white md:scale-105" : "bg-white border-2 border-[#E5E7EB]"}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="p-4 sm:p-6 md:p-8">
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    pkg.highlight ? "text-[#F0BE86]" : "text-[#226D68]"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 ${
                    pkg.highlight ? "text-white" : "text-[#226D68]"
                  }`}
                >
                  {pkg.price}
                </p>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {pkg.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 sm:gap-3">
                      <Check
                        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                          pkg.highlight ? "text-[#F0BE86]" : "text-[#226D68]"
                        }`}
                      />
                      <span className={`text-xs sm:text-sm ${pkg.highlight ? "text-gray-200" : "text-[#6B7280]"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href={`/package-details?package=${pkg.id}`}>
                  <button
                    className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-all hover:scale-105 text-sm sm:text-base ${
                      pkg.highlight
                        ? "bg-[#F0BE86] text-gray-900 hover:bg-[#e5b079]"
                        : "bg-[#226D68] text-white hover:bg-[#1a5450]"
                    }`}
                  >
                    Select Package
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
