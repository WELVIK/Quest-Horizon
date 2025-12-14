"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Heart, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-48 md:h-64 lg:h-96 w-full mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1578926078328-123456789012?w=1200&h=500&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              ABOUT
              <br />
              QUEST & HORIZON
            </h1>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#226D68] mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Who We Are
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <p className="text-[#6B7280] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Quest Horizon is a leading medical and wellness tourism provider specializing in specialized care
              experiences in Morocco. With over 15 years of expertise, we combine world-class healthcare with authentic
              cultural experiences.
            </p>
            <p className="text-[#6B7280] leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              Our mission is to provide personalized, compassionate care that transforms lives while allowing clients to
              experience the beauty and tranquility of Morocco.
            </p>
            <div className="space-y-2">
              <p className="font-semibold text-[#0B2B3E] text-sm sm:text-base">Our Goal:</p>
              <p className="text-[#6B7280] text-sm sm:text-base">
                Offer meaningful, stress-free holidays where wellbeing and discovery go hand in hand.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 animate-in fade-in slide-in-from-right duration-700 delay-200">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="h-28 sm:h-40 rounded-lg overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1494790108${idx}?w=400&h=400&fit=crop`}
                  alt={`Team ${idx}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care & Safety Section */}
      <section className="bg-[#F0FFF4] py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#226D68] mb-8 sm:mb-12 text-center">
            Care & Safety
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Heart,
                title: "Patient-Centered",
                desc: "Your wellbeing is our priority at every step",
              },
              {
                icon: Shield,
                title: "Full Protection",
                desc: "Comprehensive insurance and 24/7 medical oversight",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Certified professionals with years of experience",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 sm:p-6 md:p-8 bg-white rounded-lg text-center hover:shadow-xl transition-shadow"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#226D68] mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-bold text-[#226D68] mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-[#6B7280] text-xs sm:text-sm">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#226D68] mb-8 sm:mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {[
            {
              title: "Personalized Planning",
              desc: "Every itinerary is customized to your specific needs and preferences.",
            },
            {
              title: "Medical Excellence",
              desc: "Access to top-tier Moroccan and international medical professionals.",
            },
            {
              title: "Cultural Immersion",
              desc: "Authentic experiences guided by locals who understand the destination.",
            },
            { title: "Complete Support", desc: "From booking to return, we handle all logistics and details." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-4 sm:pb-6 border-b-2 border-[#E5E7EB]"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h3 className="font-bold text-[#226D68] text-base sm:text-lg mb-2">{item.title}</h3>
              <p className="text-[#6B7280] leading-relaxed text-xs sm:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
