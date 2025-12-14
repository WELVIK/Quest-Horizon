"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Heart,
  Pill,
  ActivitySquare,
  Brain,
  Utensils,
  Stethoscope,
  Dumbbell,
  Smile,
  User,
  ChevronRight,
} from "lucide-react"

const services = [
  { icon: Heart, title: "Cardiac Care", desc: "Specialized heart health monitoring" },
  { icon: Pill, title: "Medication Mgmt", desc: "Professional prescription management" },
  { icon: ActivitySquare, title: "Physical Therapy", desc: "Rehabilitation and mobility support" },
  { icon: Brain, title: "Mental Wellness", desc: "Psychological support services" },
  { icon: Utensils, title: "Nutrition Plans", desc: "Customized dietary programs" },
  { icon: Stethoscope, title: "Daily Checkups", desc: "Regular health assessments" },
  { icon: Dumbbell, title: "Fitness Programs", desc: "Tailored exercise routines" },
  { icon: Smile, title: "Dental Care", desc: "Professional dental services" },
  { icon: User, title: "Personal Care", desc: "Assistance with daily living" },
]

export default function CareServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-48 md:h-64 lg:h-96 w-full mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=1200&h=500&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              CARE
              <br />
              SERVICES
            </h1>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#226D68] mb-8 sm:mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          Comprehensive Care Solutions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 sm:p-6 rounded-lg border-2 border-transparent hover:border-[#226D68] bg-[#F0FFF4] transition-all group cursor-pointer"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="mb-3 sm:mb-4 inline-block p-2 sm:p-3 bg-[#226D68] text-white rounded-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-bold text-[#226D68] mb-1 sm:mb-2 text-base sm:text-lg">{service.title}</h3>
                <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[#226D68] font-semibold text-xs sm:text-sm flex items-center gap-2 hover:gap-3">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
