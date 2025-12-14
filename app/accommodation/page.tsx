"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Wifi, Tv, Coffee, Dumbbell, Shield, Users, Wind, Accessibility } from "lucide-react"

const amenities = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Tv, label: "Smart TV" },
  { icon: Coffee, label: "Mini Bar" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Users, label: "Lounge Area" },
  { icon: Wind, label: "AC/Heating" },
  { icon: Accessibility, label: "Wheelchair Access" },
]

export default function AccommodationPage() {
  const [activeImage, setActiveImage] = useState(0)

  const roomImages = [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop",
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - CHANGE: Updated background image */}
      <section className="relative h-48 md:h-64 lg:h-96 w-full mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=500&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              ACCOMMODATION
              <br />
              SECTION
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24">
        {/* Room Showcase - CHANGE: Added real hotel room pictures */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden mb-3 sm:mb-4 shadow-lg">
            <img
              src={roomImages[activeImage] || "/placeholder.svg"}
              alt="Hotel Room"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {roomImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-12 sm:h-16 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === idx ? "border-[#226D68] scale-105" : "border-gray-200"
                }`}
              >
                <img src={img || "/placeholder.svg"} alt={`Room ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#226D68] mb-3 sm:mb-4">
            Premium Room Experience
          </h2>
          <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
            Our luxury accommodations are designed with your comfort and wellness in mind. Each room features premium
            furnishings, modern healthcare amenities, and stunning views of the Moroccan landscape. We provide 24/7 room
            service and personalized assistance to ensure your stay is unforgettable.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h3 className="text-xl sm:text-2xl font-bold text-[#226D68] mb-6 sm:mb-8">Room Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon
              return (
                <div
                  key={idx}
                  className="p-3 sm:p-6 bg-[#226D68]/5 rounded-lg flex flex-col items-center justify-center text-center hover:shadow-lg hover:bg-[#226D68]/10 transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#226D68] mb-2 sm:mb-3" />
                  <p className="font-semibold text-gray-800 text-xs sm:text-sm">{amenity.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
