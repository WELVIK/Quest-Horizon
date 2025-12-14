"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(14)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-48 md:h-64 lg:h-96 w-full mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* Booking Details */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-20">
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-[#E8956F] text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-3">ENHANCED PACKAGE</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">
            Enhanced / Medical Support
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <p className="text-[#0B2B3E] font-semibold text-sm mb-1">Price</p>
              <p className="text-[#6B7280] text-sm sm:text-base">From £2,500</p>
            </div>
            <div>
              <p className="text-[#0B2B3E] font-semibold text-sm mb-1">Duration</p>
              <p className="text-[#6B7280] text-sm sm:text-base">7-14 days</p>
            </div>
            <div>
              <p className="text-[#0B2B3E] font-semibold text-sm mb-1">Availability</p>
              <p className="text-[#6B7280] text-sm sm:text-base">Year-round</p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2B3E] mb-3 sm:mb-4">Your Overview</h2>
          <p className="text-[#6B7280] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
            Experience a transformative journey with our Enhanced Medical Support package, designed for those seeking
            specialized care combined with leisurely exploration. Our team provides round-the-clock medical supervision
            and wellness programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-4 sm:mt-6">
            <div>
              <h3 className="font-semibold text-[#0B2B3E] mb-2 sm:mb-3 text-sm sm:text-base">Key Highlights</h3>
              <ul className="space-y-2 text-[#6B7280] text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#E8956F] mt-0.5 flex-shrink-0">✓</span>
                  <span>24/7 medical professional on call</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E8956F] mt-0.5 flex-shrink-0">✓</span>
                  <span>Personalized wellness consultations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E8956F] mt-0.5 flex-shrink-0">✓</span>
                  <span>Therapeutic activities and relaxation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E8956F] mt-0.5 flex-shrink-0">✓</span>
                  <span>Premium accommodation with healthcare setup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="pb-3 sm:pb-4 border-b border-[#E5E7EB]">
                <p className="font-semibold text-[#0B2B3E] mb-1 sm:mb-2 text-sm sm:text-base">Accommodation</p>
                <p className="text-[#6B7280] text-xs sm:text-sm">
                  5-star healthcare-equipped hotel with accessible rooms
                </p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-[#E5E7EB]">
                <p className="font-semibold text-[#0B2B3E] mb-1 sm:mb-2 text-sm sm:text-base">Medical Support</p>
                <p className="text-[#6B7280] text-xs sm:text-sm">Certified nurses and doctors available 24/7</p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-[#E5E7EB]">
                <p className="font-semibold text-[#0B2B3E] mb-1 sm:mb-2 text-sm sm:text-base">Meals</p>
                <p className="text-[#6B7280] text-xs sm:text-sm">Nutritionist-planned meals tailored to health needs</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="pb-3 sm:pb-4 border-b border-[#E5E7EB]">
                <p className="font-semibold text-[#0B2B3E] mb-1 sm:mb-2 text-sm sm:text-base">Activities</p>
                <p className="text-[#6B7280] text-xs sm:text-sm">Guided cultural tours and wellness sessions</p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-[#E5E7EB]">
                <p className="font-semibold text-[#0B2B3E] mb-1 sm:mb-2 text-sm sm:text-base">Transportation</p>
                <p className="text-[#6B7280] text-xs sm:text-sm">Private vehicle with medical equipment on board</p>
              </div>
              <div className="pb-3 sm:pb-4 border-b border-[#E5E7EB]">
                <p className="font-semibold text-[#0B2B3E] mb-1 sm:mb-2 text-sm sm:text-base">Insurance</p>
                <p className="text-[#6B7280] text-xs sm:text-sm">Comprehensive travel and medical insurance included</p>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">Itinerary</h2>
          <div className="space-y-4 sm:space-y-6">
            {[
              { day: "Day 1-2", title: "Arrival & Assessment", desc: "Welcome and medical check-up" },
              { day: "Day 3-5", title: "Wellness Week", desc: "Spa treatments and wellness sessions" },
              { day: "Day 6-7", title: "Cultural Exploration", desc: "Guided tours with medical staff" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 border-l-4 border-[#00A8A8] bg-[#F0FFF4] animate-in fade-in slide-in-from-left duration-500"
                style={{ animationDelay: `${300 + idx * 100}ms` }}
              >
                <div>
                  <p className="font-semibold text-[#0B2B3E] text-sm sm:text-base">{item.day}</p>
                  <p className="font-bold text-[#0B2B3E] text-sm sm:text-base">{item.title}</p>
                  <p className="text-[#6B7280] text-xs sm:text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">
            Availability Calendar
          </h2>
          <div className="bg-[#F9F5F0] p-4 sm:p-6 md:p-8 rounded-lg overflow-x-auto">
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6 min-w-max">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold text-[#0B2B3E] text-xs sm:text-sm w-8 sm:w-10">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-max">
              {Array.from({ length: 30 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(idx + 1)}
                  className={`p-1 sm:p-2 rounded text-xs sm:text-sm font-medium transition-all w-8 sm:w-10 h-8 sm:h-10 ${
                    selectedDate === idx + 1
                      ? "bg-[#00A8A8] text-white scale-110"
                      : "bg-white text-[#0B2B3E] hover:bg-[#E8956F] hover:text-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#00A8A8] text-white rounded-lg font-semibold hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base">
            Book Now
          </button>
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#00A8A8] text-[#00A8A8] rounded-lg font-semibold hover:bg-[#F0FFF4] transition-all text-sm sm:text-base">
            Download Details
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
