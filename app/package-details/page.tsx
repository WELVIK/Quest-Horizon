"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight } from "lucide-react"

const packageData: Record<string, any> = {
  standard: {
    id: "standard",
    title: "Enhanced / Medical Support",
    price: 1500,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop",
    overview:
      "A comprehensive package designed for clients seeking enhanced medical support and personalised experiences during their stay in Marrakech.",
    highlights: [
      " 24/7 medical support with qualified professionals",
      "Personal wellness consultations",
      "Customized activity schedules",
      "Daily therapeutic sessions",
      "Priority accommodation",
    ],
    included: [
      "Luxury accommodation (5 nights)",
      "Daily meals (breakfast, lunch, dinner)",
      "Airport transfers",
      "24/7 medical support",
      "Wellness activities",
      "Travel insurance",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description: "Arrive in Marrakech, settle into accommodation, meet your care team",
      },
      {
        day: 2,
        title: "City Tour & Wellness",
        description: "Guided tour of Jemaa el-Fnaa square, wellness consultation, afternoon rest",
      },
      {
        day: 3,
        title: "Cultural Experience",
        description: "Visit traditional medina, spice market tour, therapeutic massage",
      },
      {
        day: 4,
        title: "Mountain Excursion",
        description: "Atlas Mountains trip, local village visit, guided nature walk",
      },
      { day: 5, title: "Relaxation & Reflection", description: "Spa treatments, meditation sessions, farewell dinner" },
      { day: 6, title: "Departure", description: "Final breakfast, airport transfer, departure" },
    ],
  },
  premium: {
    id: "premium",
    title: "Premium / VIP Experience",
    price: 3500,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop",
    overview:
      "Our premium package offers exclusive VIP treatment with top-tier medical professionals and bespoke experiences.",
    highlights: [
      "Specialist doctors on-call 24/7",
      "Private suite accommodation",
      "Michelin-star dining options",
      "Personal concierge service",
      "Exclusive activities & experiences",
    ],
    included: [
      "VIP suite accommodation (7 nights)",
      "Premium meals (breakfast, lunch, dinner + snacks)",
      "Private transportation",
      "Specialist medical consultations",
      "Concierge service",
      "Full travel insurance",
      "Wellness programs",
    ],
    itinerary: [
      { day: 1, title: "VIP Arrival", description: "Private airport transfer, VIP suite check-in, personal tour" },
      {
        day: 2,
        title: "Consultation & Relaxation",
        description: "Medical consultation with specialist, spa day, dinner at top restaurant",
      },
      {
        day: 3,
        title: "Private Cultural Tour",
        description: "Private medina tour with guide, exclusive shopping, traditional hammam",
      },
      {
        day: 4,
        title: "Luxury Mountain Experience",
        description: "Private mountain excursion, gourmet picnic, sunset viewing",
      },
      {
        day: 5,
        title: "Wellness Retreat",
        description: "Full-day wellness program, yoga, meditation, holistic treatments",
      },
      {
        day: 6,
        title: "Leisure & Adventure",
        description: "Desert quad biking or hot air balloon, Moroccan cooking class",
      },
      {
        day: 7,
        title: "Departure Preparation",
        description: "Final consultations, souvenir shopping, gourmet farewell dinner",
      },
    ],
  },
  deluxe: {
    id: "deluxe",
    title: "Deluxe / Royal Treatment",
    price: 5500,
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=600&fit=crop",
    overview:
      "The ultimate luxury experience - our deluxe package provides royal treatment with exclusive amenities and personalized care.",
    highlights: [
      "Royal palace-style accommodation",
      "Private medical team",
      "Michelin-star private chef",
      "Bespoke itineraries",
      "Unlimited VIP services",
    ],
    included: [
      "Royal suite accommodation (10 nights)",
      "Private chef & meals prepared daily",
      "Private jet-style transportation",
      "Dedicated medical team",
      "Personal assistant 24/7",
      "Full luxury travel insurance",
      "Unlimited experiences & activities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Welcome",
        description: "Private aviation arrival, royal palace suite, personal staff orientation",
      },
      {
        day: 2,
        title: "Executive Health Assessment",
        description: "Comprehensive health check with top medical team, bespoke wellness plan",
      },
      {
        day: 3,
        title: "Exclusive Private Tour",
        description: "Royal gardens, private palace visits, exclusive artisan workshops",
      },
      {
        day: 4,
        title: "Culinary Masterclass",
        description: "Private chef cooking lesson, market tour, gourmet tasting menu",
      },
      { day: 5, title: "Desert Luxury", description: "Private desert safari, luxury tent experience, Berber feast" },
      { day: 6, title: "Wellness Immersion", description: "Full spa day, personal yoga sessions, holistic treatments" },
      {
        day: 7,
        title: "Adventure & Exploration",
        description: "Hot air balloon ride, mountain lodge experience, exclusive dining",
      },
      {
        day: 8,
        title: "Culture & Arts",
        description: "Private museum tours, artist meetings, exclusive gallery visits",
      },
      {
        day: 9,
        title: "Rejuvenation",
        description: "Extended spa treatments, meditation retreats, personal wellness consultations",
      },
      { day: 10, title: "Royal Farewell", description: "Final dinners, souvenir collection, departure preparations" },
    ],
  },
}

export default function PackageDetailsPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package") || "standard"
  const pkg = packageData[packageId] || packageData.standard

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Generate available dates (next 3 months)
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const days = []
  const firstDay = getFirstDayOfMonth(currentMonth)
  const daysCount = getDaysInMonth(currentMonth)

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysCount; i++) {
    days.push(i)
  }

  const monthYear = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-20 mt-16 md:mt-20">
        {/* Package Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2B3E] mb-3 sm:mb-4">{pkg.title}</h1>
          <p className="text-[#6B7280] text-base sm:text-lg">{pkg.overview}</p>
        </div>

        {/* Hero Image */}
        <div className="rounded-lg overflow-hidden mb-8 sm:mb-12 h-48 sm:h-64 md:h-96 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-full object-cover" />
        </div>

        {/* Your Highlights */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">Your Highlights</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {pkg.highlights.map((highlight: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-[#6B7280] text-sm sm:text-base">
                <span className="text-[#E8956F] font-bold flex-shrink-0">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What's Included */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {pkg.included.map((item: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-[#F0FFF4] rounded-lg">
                <span className="text-[#00A8A8] text-xl flex-shrink-0">✓</span>
                <span className="text-[#0B2B3E] text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">Itinerary</h2>
          <div className="space-y-3 sm:space-y-4">
            {pkg.itinerary.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-4 p-3 sm:p-4 border-l-4 border-[#E8956F] bg-[#FFF5F0] rounded">
                <div className="bg-[#E8956F] text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold">
                  {item.day}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#0B2B3E] text-sm sm:text-base">{item.title}</h4>
                  <p className="text-[#6B7280] text-xs sm:text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Calendar */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B3E] mb-6 sm:mb-8">Availability Calendar</h2>

          <div className="bg-white border-2 border-[#E5E7EB] rounded-lg p-4 sm:p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={handlePrevMonth} className="p-2 hover:bg-[#F3F4F6] rounded">
                <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
              </button>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B2B3E]">{monthYear}</h3>
              <button onClick={handleNextMonth} className="p-2 hover:bg-[#F3F4F6] rounded">
                <ChevronRight className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-semibold text-[#6B7280] text-xs sm:text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    day &&
                    setSelectedDate(
                      `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
                    )
                  }
                  className={`aspect-square rounded-lg text-sm font-semibold transition-all ${
                    !day
                      ? "bg-transparent"
                      : selectedDate ===
                          `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                        ? "bg-[#00A8A8] text-white hover:bg-[#008888]"
                        : "bg-[#F3F4F6] text-[#0B2B3E] hover:bg-[#E5E7EB]"
                  }`}
                  disabled={!day}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="mt-6 p-4 sm:p-6 bg-[#F0FFF4] border-2 border-[#00A8A8] rounded-lg">
              <p className="text-[#0B2B3E] font-semibold mb-4">
                Selected Date: <span className="text-[#00A8A8]">{new Date(selectedDate).toLocaleDateString()}</span>
              </p>
              <Link href={`/care-needs?package=${packageId}&date=${selectedDate}`}>
                <button className="w-full py-3 bg-[#E8956F] text-white font-semibold rounded-lg hover:bg-[#D87E5C] transition-all hover:scale-105">
                  Proceed to Booking
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 flex gap-3 sm:gap-4">
          <Link href="/care-packages" className="flex-1">
            <button className="w-full py-2.5 sm:py-3 border-2 border-[#00A8A8] text-[#00A8A8] font-semibold rounded-lg hover:bg-[#F0FFF4] transition-all text-sm sm:text-base">
              Back to Packages
            </button>
          </Link>
          <div className="flex-1 bg-[#F0BE86] text-white p-3 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm opacity-90">Total Price</p>
            <p className="text-2xl sm:text-3xl font-bold">£{pkg.price}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
