"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function PaymentConfirmationPage() {
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    // Get booking data from URL params or session storage
    const params = new URLSearchParams(window.location.search)
    const referenceNumber = params.get("ref")

    const booking = sessionStorage.getItem("currentBooking")
    if (booking) {
      setBookingData(JSON.parse(booking))
    }
  }, [])

  if (!bookingData) {
    return null
  }

  const remainingBalance = bookingData.totalAmount - bookingData.depositAmount

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-3xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-20 mt-16 md:mt-20">
        <div className="text-center py-8 sm:py-12 animate-in fade-in scale-in duration-500">
          <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-[#00A8A8] mx-auto mb-6 sm:mb-8 animate-bounce" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2B3E] mb-3 sm:mb-4">
            Booking Request Received!
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Thank you for your booking request. Our team will review your information and contact you within 24 hours to
            confirm your reservation and discuss next steps.
          </p>

          {/* What Happens Next */}
          <div className="bg-[#F9F5F0] p-6 sm:p-8 rounded-lg mb-8 sm:mb-12 text-left animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <h2 className="text-xl sm:text-2xl font-bold text-[#E8956F] mb-6 text-center">What Happens Next?</h2>
            <ol className="space-y-4 sm:space-y-5">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#00A8A8] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  1
                </span>
                <div className="text-left">
                  <p className="font-semibold text-[#0B2B3E] text-sm sm:text-base">Review Your Care Needs</p>
                  <p className="text-[#6B7280] text-sm">
                    Our team will review your care needs and travel requirements in detail
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#00A8A8] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  2
                </span>
                <div className="text-left">
                  <p className="font-semibold text-[#0B2B3E] text-sm sm:text-base">Confirmation Contact</p>
                  <p className="text-[#6B7280] text-sm">
                    We'll contact you to confirm details and answer any questions you may have
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#00A8A8] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  3
                </span>
                <div className="text-left">
                  <p className="font-semibold text-[#0B2B3E] text-sm sm:text-base">Final Confirmation & Invoice</p>
                  <p className="text-[#6B7280] text-sm">
                    You'll receive a detailed booking confirmation with payment instructions for the remaining 70%
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#00A8A8] text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  4
                </span>
                <div className="text-left">
                  <p className="font-semibold text-[#0B2B3E] text-sm sm:text-base">Pre-Trip Planning</p>
                  <p className="text-[#6B7280] text-sm">
                    We'll begin pre-trip planning including medical coordination and risk assessment
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Booking Summary */}
          <div className="bg-white border-2 border-[#E5E7EB] p-6 sm:p-8 rounded-lg mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <h3 className="text-lg sm:text-xl font-bold text-[#0B2B3E] mb-6">Booking Summary</h3>

            <div className="space-y-4 sm:space-y-5">
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280] text-sm sm:text-base">Reference Number</span>
                <span className="font-bold text-[#0B2B3E] text-sm sm:text-base">{bookingData.referenceNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280] text-sm sm:text-base">Package</span>
                <span className="font-bold text-[#0B2B3E] text-sm sm:text-base">{bookingData.packageName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280] text-sm sm:text-base">Travel Date</span>
                <span className="font-bold text-[#0B2B3E] text-sm sm:text-base">
                  {new Date(bookingData.bookingDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#E5E7EB]">
                <span className="text-[#6B7280] text-sm sm:text-base">Total Amount</span>
                <span className="font-bold text-[#0B2B3E] text-sm sm:text-base">£{bookingData.totalAmount}</span>
              </div>
              <div className="flex justify-between py-3 bg-green-50 px-3 sm:px-4 rounded">
                <span className="text-[#0B2B3E] font-semibold text-sm sm:text-base">Deposit Paid (30%)</span>
                <span className="font-bold text-green-600 text-sm sm:text-base">£{bookingData.depositAmount}</span>
              </div>
              <div className="flex justify-between py-3 bg-amber-50 px-3 sm:px-4 rounded">
                <span className="text-[#0B2B3E] font-semibold text-sm sm:text-base">Remaining Balance (70%)</span>
                <span className="font-bold text-amber-600 text-sm sm:text-base">£{remainingBalance}</span>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 sm:p-6 rounded mb-8 sm:mb-12">
            <p className="text-sm sm:text-base text-[#0B2B3E]">
              A confirmation email has been sent to <span className="font-bold">{bookingData.clientEmail}</span>. Please
              check your inbox and spam folder.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Link href="/" className="flex-1">
              <button className="w-full py-3 sm:py-4 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base">
                Return to Home
              </button>
            </Link>
            <Link href="/care-packages" className="flex-1">
              <button className="w-full py-3 sm:py-4 border-2 border-[#00A8A8] text-[#00A8A8] font-semibold rounded-lg hover:bg-[#F0FFF4] transition-all text-sm sm:text-base">
                View More Packages
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
