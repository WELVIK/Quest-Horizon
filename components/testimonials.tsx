"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Christine Beckam",
      role: "Designer",
      content:
        "Vel officiis dolor ea illo aut eligendi ullam non laudantium magnam et recusandoe molestiae sit iure unde aut voluptate quaerat. Id sunt provident quo possimus impedit vel doloremque obcaecati qui illum consectetur et ipsum omnis.",
      rating: 5,
    },
    {
      name: "John Smith",
      role: "Business Owner",
      content:
        "Amazing experience with professional service. The team was responsive and attentive to all our needs. Highly recommend their services!",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Travel Enthusiast",
      content:
        "Unforgettable journey! Every detail was perfectly planned. The local guides were knowledgeable and friendly.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const next = () => {
    setActiveIndex((activeIndex + 1) % testimonials.length)
  }

  const prev = () => {
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[activeIndex]

  return (
    <section
      className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden border-4 border-blue-400"
      ref={sectionRef}
    >
      {/* Decorative Elements - hidden on mobile */}
      <div className="absolute left-4 sm:left-8 top-8 sm:top-12 w-16 sm:w-24 h-16 sm:h-24 opacity-40 hidden sm:block animate-in fade-in slide-in-from-left-8 duration-1000">
        <img src="/seashell-ocean-shell-beige.jpg" alt="" className="w-full h-full" />
      </div>

      <div className="absolute right-4 sm:right-8 top-1/3 w-20 sm:w-32 h-20 sm:h-32 opacity-40 hidden sm:block animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
        <img src="/polaroid-photos-stacked-yellow.jpg" alt="" className="w-full h-full" />
      </div>

      <div className="absolute left-0 bottom-8 sm:bottom-12 w-20 sm:w-32 h-20 sm:h-32 opacity-30 hidden sm:block animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
        <img src="/travel-items-hat-camera-headphones-tropical.jpg" alt="" className="w-full h-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-orange-500 font-semibold mb-2 uppercase text-xs sm:text-sm animate-in fade-in duration-700">
          Promotion
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          See What Our Clients Say About Us
        </h2>

        <div
          className={`bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 mt-8 sm:mt-12 transition-all duration-500 transform hover:shadow-2xl ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed italic text-sm sm:text-base md:text-lg animate-in fade-in duration-500">
            "{current.content}"
          </p>

          {/* Client Info */}
          <div className="flex flex-col items-center">
            <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 mb-4 flex items-center justify-center animate-in zoom-in duration-500">
              <span className="text-xl sm:text-2xl">👩</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{current.name}</h3>
            <p className="text-gray-600 text-xs sm:text-sm">{current.role}</p>
          </div>

          {/* Rating */}
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(current.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-400 text-yellow-400 animate-in zoom-in duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-6">
          <button
            onClick={prev}
            className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-500 text-white hover:bg-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={next}
            className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-500 text-white hover:bg-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-orange-500 scale-125" : "bg-gray-300 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
