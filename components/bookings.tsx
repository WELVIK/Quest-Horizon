"use client"

import { useEffect, useState, useRef } from "react"

export default function Bookings() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setVisibleSteps([true, true, true])
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      emoji: "📦",
      title: "Choose Your pack",
      description: "Find the experience that fits your needs, your pace, and your journey.",
      bgColor: "bg-yellow-400",
    },
    {
      emoji: "📅",
      title: "Check Availability",
      description:
        "Tell us your preferred dates, and our team will confirm the best options available for your stay and care program.",
      bgColor: "bg-orange-500",
    },
    {
      emoji: "✈️",
      title: "Let's Go",
      description: "Embark on your journey of healing, discovery, and well-being.",
      bgColor: "bg-blue-600",
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
          {/* Left Content */}
          <div>
            <p className="text-orange-500 font-semibold mb-2 uppercase text-xs sm:text-sm animate-in fade-in slide-in-from-left-4 duration-700">
              Fast & Easy
            </p>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 sm:mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              Get Your Favourite Resort Bookings
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 transition-all duration-700 transform hover:translate-x-2 ${
                    visibleSteps[idx] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 sm:w-12 h-10 sm:h-12 ${step.bgColor} rounded-lg flex items-center justify-center font-bold text-lg sm:text-xl transition-transform duration-300 hover:scale-110`}
                    >
                      {step.emoji}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">{step.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image with Card */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full hidden lg:flex items-center justify-center">
            {/* Main Image */}
            <div
              className={`absolute inset-0 bg-blue-500 rounded-2xl overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <img
                src="/marrakech-marketplace-sunset-with-traditional-buil.jpg"
                alt="Trip to Marrakech"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Floating Plane */}
            <div
              className={`absolute -top-12 -right-12 w-40 h-40 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"
              }`}
            >
              <img
                src="/airplane-in-sky-white-plane.jpg"
                alt="Airplane"
                className="w-full h-full object-contain filter drop-shadow-lg animate-bounce"
              />
            </div>

            {/* Floating Card */}
            <div
              className={`absolute bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs transition-all duration-700 transform hover:shadow-3xl hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg"></div>
                <h4 className="font-semibold text-slate-900 text-sm">Trip to Marrakech</h4>
              </div>
              <p className="text-xs text-gray-600 mb-4">14-29 June | by JR Martin</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                  <span className="text-xs font-semibold">Trip to rome</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>

              <p className="text-xs text-orange-500 font-semibold mb-3">40% completed</p>
              <div className="text-xs text-gray-600">
                <p>60 people are interested</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
