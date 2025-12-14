"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full overflow-hidden pt-0">
      <div className="relative h-screen sm:h-[600px] md:h-[700px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/marrakech-medina-marketplace-sunset-golden-hour.jpg")',
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 animate-in fade-in duration-1000"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 text-balance transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ fontFamily: "cursive" }}
          >
            Supported Holidays in Marrakech
          </h1>
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mb-6 sm:mb-8 text-balance transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Specialised care and personalised experiences for clients
          </p>
          <Link href="/care-packages">
            <button
              className={`px-6 sm:px-8 py-2 sm:py-3 bg-[#226D68] hover:bg-[#1a5450] text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base hover:scale-105 hover:shadow-lg delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              View Packages
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
