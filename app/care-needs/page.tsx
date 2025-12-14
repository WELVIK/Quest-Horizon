"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Circle } from "lucide-react"

export default function CareNeedsPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package") || "standard"
  const selectedDate = searchParams.get("date") || ""

  const [formData, setFormData] = useState({
    careNeeds: "",
    dietaryRequirements: "",
    medicalInfo: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    // Save to session storage for payment step
    sessionStorage.setItem("careNeeds", JSON.stringify(formData))

    // Navigate to payment flow
    const params = new URLSearchParams({
      package: packageId,
      date: selectedDate,
      step: "2",
    })
    window.location.href = `/payment-flow?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-20 mt-16 md:mt-20">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            {[
              { num: 1, label: "Details" },
              { num: 2, label: "Care Needs" },
              { num: 3, label: "Payment" },
            ].map((step) => (
              <div key={step.num} className="flex items-center flex-1">
                <button
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all flex-shrink-0 ${
                    step.num <= 2 ? "bg-[#00A8A8] text-white cursor-pointer" : "bg-[#E5E7EB] text-[#6B7280]"
                  }`}
                >
                  {step.num < 2 ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Circle className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
                {step.num < 3 && (
                  <div className={`h-1 flex-1 mx-2 sm:mx-3 ${step.num < 2 ? "bg-[#00A8A8]" : "bg-[#E5E7EB]"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <p className="text-xs sm:text-sm font-semibold text-[#0B2B3E]">Details</p>
            <p className="text-xs sm:text-sm font-semibold text-[#0B2B3E]">Care Needs</p>
            <p className="text-xs sm:text-sm font-semibold text-[#9CA3AF]">Payment</p>
          </div>
        </div>

        {/* Care Needs Form */}
        <div className="bg-[#F9F5F0] p-4 sm:p-6 md:p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-6 sm:mb-8">Care Needs & Requirements</h2>

          <form className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">
                Care Needs & Support Requirements *
              </label>
              <textarea
                name="careNeeds"
                placeholder="Please describe the care needs, support requirements, and any specific accommodations needed..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors resize-none"
                rows={5}
                value={formData.careNeeds}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">
                Dietary Requirements
              </label>
              <textarea
                name="dietaryRequirements"
                placeholder="Any dietary restrictions, allergies, or preferences..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors resize-none"
                rows={4}
                value={formData.dietaryRequirements}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">
                Medical Information
              </label>
              <textarea
                name="medicalInfo"
                placeholder="Any medical conditions, medications, or health information we should be aware of..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors resize-none"
                rows={4}
                value={formData.medicalInfo}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">
                  Emergency Contact Name *
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  placeholder="Emergency contact name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">
                  Emergency Contact Phone *
                </label>
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  placeholder="+44 20 XXXX XXXX"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.emergencyContactPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 rounded">
              <p className="text-xs sm:text-sm text-[#0B2B3E]">
                ✓ Your information is secure and will only be used to provide better care and support during your stay.
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link href={`/package-details?package=${packageId}`} className="flex-1">
                <button
                  type="button"
                  className="w-full py-2.5 sm:py-3 border-2 border-[#00A8A8] text-[#00A8A8] font-semibold rounded-lg hover:bg-[#F0FFF4] transition-all text-sm sm:text-base"
                >
                  Back
                </button>
              </Link>
              <button
                type="button"
                onClick={handleContinue}
                className="flex-1 py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
