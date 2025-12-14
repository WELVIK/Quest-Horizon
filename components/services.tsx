"use client"

import { useEffect, useState, useRef } from "react"

export default function Services() {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: "👤",
      title: "Personalised Care & Assistance",
      description: "Tailored support delivered by trained UK & Moroccan professionals.",
    },
    {
      icon: "✈️",
      title: "Daily Wellness Activities",
      description: "Gentle routines, mindfulness sessions, and therapeutic moments",
    },
    {
      icon: "🌟",
      title: "24/7 Supervision & Safety",
      description: "Around-the-clock staff ensuring confidence, care, and complete peace of mind.",
    },
    {
      icon: "🎭",
      title: "Cultural Experiences",
      description: "Guided visits, local discovery, and authentic Moroccan hospitality.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleItems(services.map(() => true))
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-slate-900 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          We Offer Best Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center px-2 transition-all duration-700 transform hover:scale-105 hover:shadow-xl p-6 rounded-lg hover:bg-gray-50 ${
                visibleItems[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 hover:scale-125">
                {service.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
