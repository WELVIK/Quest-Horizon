"use client"

import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Circle, X } from "lucide-react"

const packageDetails: Record<string, any> = {
  standard: {
    name: "Enhanced / Medical Support",
    price: 1500,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop",
  },
  premium: {
    name: "Premium / VIP Experience",
    price: 3500,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop",
  },
  deluxe: {
    name: "Deluxe / Royal Treatment",
    price: 5500,
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=500&fit=crop",
  },
}

export default function PaymentFlowPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get("package") || "standard"
  const selectedDate = searchParams.get("date") || ""
  const [currentStep, setCurrentStep] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [careNeeds, setCareNeeds] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    const stored = sessionStorage.getItem("careNeeds")
    if (stored) {
      setCareNeeds(JSON.parse(stored))
    }
  }, [])

  const packageInfo = packageDetails[packageId] || packageDetails.standard

  const totalPrice = packageInfo.price
  const depositPrice = Math.round(totalPrice * 0.3)
  const remainingBalance = totalPrice - depositPrice

  const steps = ["Personal Info", "Booking Review", "Payment Details", "Confirmation"]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompletePayment = async () => {
    setIsSubmitting(true)
    try {
      const referenceNumber = `QH-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000)}`

      const bookingData = {
        referenceNumber,
        clientName: `${formData.firstName} ${formData.lastName}`,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        packageName: packageInfo.name,
        packageId,
        bookingDate: selectedDate,
        totalAmount: totalPrice,
        depositAmount: depositPrice,
        careNeeds: careNeeds?.careNeeds || "",
        dietaryRequirements: careNeeds?.dietaryRequirements || "",
        medicalInfo: careNeeds?.medicalInfo || "",
        emergencyContactName: careNeeds?.emergencyContactName || "",
        emergencyContactPhone: careNeeds?.emergencyContactPhone || "",
        bookingStatus: "pending_confirmation",
        createdAt: new Date().toISOString(),
      }

      // Save booking to database
      const saveBookingRes = await fetch("/api/save-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      if (!saveBookingRes.ok) throw new Error("Failed to save booking")

      // Send emails to client and admin
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail: formData.email,
          clientName: formData.firstName,
          packageName: packageInfo.name,
          depositAmount: depositPrice,
          totalAmount: totalPrice,
          bookingDate: new Date(selectedDate).toLocaleDateString(),
          referenceNumber,
          careNeeds: careNeeds?.careNeeds || "",
          medicalInfo: careNeeds?.medicalInfo || "",
          emergencyContact: {
            name: careNeeds?.emergencyContactName || "",
            phone: careNeeds?.emergencyContactPhone || "",
          },
        }),
      })

      if (!emailRes.ok) throw new Error("Failed to send emails")

      // Store booking data for confirmation page
      sessionStorage.setItem("currentBooking", JSON.stringify(bookingData))

      // Proceed to confirmation
      handleNext()
    } catch (error) {
      console.error("Payment error:", error)
      alert("There was an error processing your booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-20 mt-16 md:mt-20">
        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full animate-in fade-in scale-in duration-300">
              <button onClick={() => setShowConfirmation(false)} className="float-right">
                <X className="w-6 h-6 text-[#6B7280] hover:text-[#0B2B3E]" />
              </button>
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#00A8A8] mx-auto mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] text-center mb-3 sm:mb-4">Ready to Book?</h2>
              <p className="text-[#6B7280] text-center mb-4 sm:mb-6 text-sm sm:text-base">
                You're about to book the {packageInfo.name} for {new Date(selectedDate).toLocaleDateString()}. Only 30%
                (£{depositPrice}) is due now, the remaining 70% (£{remainingBalance}) will be due after our
                confirmation.
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all"
              >
                Let's Continue
              </button>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <button
                  onClick={() => idx <= currentStep && setCurrentStep(idx)}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all flex-shrink-0 ${
                    idx <= currentStep ? "bg-[#00A8A8] text-white cursor-pointer" : "bg-[#E5E7EB] text-[#6B7280]"
                  }`}
                >
                  {idx < currentStep ? (
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Circle className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
                {idx < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 sm:mx-3 ${idx < currentStep ? "bg-[#00A8A8]" : "bg-[#E5E7EB]"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            {steps.map((step, idx) => (
              <p
                key={idx}
                className={`text-xs sm:text-sm font-semibold ${
                  idx <= currentStep ? "text-[#0B2B3E]" : "text-[#9CA3AF]"
                }`}
              >
                {step}
              </p>
            ))}
          </div>
        </div>

        {/* Forms */}
        <div className="bg-[#F9F5F0] p-4 sm:p-6 md:p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          {currentStep === 0 && (
            <form className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">
                Step 1: Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+44 1234 567890"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base disabled:opacity-50"
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">Step 2: Booking Review</h2>

              <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-[#E5E7EB]">
                <h3 className="font-semibold text-[#0B2B3E] mb-3 sm:mb-4 text-base sm:text-lg">Booking Summary</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-[#6B7280]">Package:</span>
                    <span className="font-semibold text-[#0B2B3E]">{packageInfo.name}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-[#6B7280]">Start Date:</span>
                    <span className="font-semibold text-[#0B2B3E]">{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-[#6B7280]">Guest:</span>
                    <span className="font-semibold text-[#0B2B3E]">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-[#6B7280]">Email:</span>
                    <span className="font-semibold text-[#0B2B3E]">{formData.email}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-[#6B7280]">Phone:</span>
                    <span className="font-semibold text-[#0B2B3E]">{formData.phone}</span>
                  </div>

                  {careNeeds && (
                    <>
                      <div className="border-t border-[#E5E7EB] pt-3 sm:pt-4 mt-3 sm:mt-4">
                        <h4 className="font-semibold text-[#0B2B3E] mb-2 text-sm sm:text-base">Care Needs</h4>
                        {careNeeds.careNeeds && (
                          <div className="text-xs sm:text-sm text-[#6B7280] mb-2">
                            <span className="font-semibold">Support Required:</span> {careNeeds.careNeeds}
                          </div>
                        )}
                        {careNeeds.dietaryRequirements && (
                          <div className="text-xs sm:text-sm text-[#6B7280] mb-2">
                            <span className="font-semibold">Dietary:</span> {careNeeds.dietaryRequirements}
                          </div>
                        )}
                        {careNeeds.medicalInfo && (
                          <div className="text-xs sm:text-sm text-[#6B7280] mb-2">
                            <span className="font-semibold">Medical Info:</span> {careNeeds.medicalInfo}
                          </div>
                        )}
                        {careNeeds.emergencyContactName && (
                          <div className="text-xs sm:text-sm text-[#6B7280]">
                            <span className="font-semibold">Emergency Contact:</span> {careNeeds.emergencyContactName} (
                            {careNeeds.emergencyContactPhone})
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="border-t border-[#E5E7EB] pt-3 sm:pt-4 mt-3 sm:mt-4 space-y-2">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span className="text-[#0B2B3E]">Total Price:</span>
                      <span className="text-[#00A8A8]">£{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-[#E8956F] font-semibold">
                      <span>Deposit Due Now (30%):</span>
                      <span>£{depositPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-[#6B7280]">
                      <span>Remaining Balance (70%):</span>
                      <span>£{remainingBalance}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-[#0B2B3E]">
                  ✓ Please review the booking details above. If everything looks correct, proceed to payment for the 30%
                  deposit.
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 py-2.5 sm:py-3 border-2 border-[#00A8A8] text-[#00A8A8] font-semibold rounded-lg hover:bg-[#F0FFF4] transition-all text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <form className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">Step 3: Payment Details</h2>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4 rounded mb-6">
                <p className="text-xs sm:text-sm text-[#0B2B3E] font-semibold">Deposit Amount Due: £{depositPrice}</p>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                  Remaining balance of £{remainingBalance} will be due after we confirm your booking.
                </p>
              </div>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 rounded">
                <p className="text-xs sm:text-sm text-[#0B2B3E]">
                  ✓ Your payment is secure and encrypted. We accept Visa, Mastercard, PayPal, and more.
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 py-2.5 sm:py-3 border-2 border-[#00A8A8] text-[#00A8A8] font-semibold rounded-lg hover:bg-[#F0FFF4] transition-all text-sm sm:text-base"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompletePayment}
                  disabled={
                    isSubmitting || !formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv
                  }
                  className="flex-1 py-2.5 sm:py-3 bg-[#E8956F] text-white font-semibold rounded-lg hover:bg-[#D87E5C] transition-all hover:scale-105 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : `Pay £${depositPrice}`}
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <div className="text-center py-6 sm:py-8">
              <Link href="/payment-confirmation">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#00A8A8] mx-auto mb-3 sm:mb-4 animate-bounce" />
              </Link>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B3E] mb-2 sm:mb-4">Payment Received!</h2>
              <p className="text-[#6B7280] mb-4 sm:mb-6 text-sm sm:text-base">
                Your deposit has been received. A confirmation email has been sent to{" "}
                <span className="font-semibold">{formData.email}</span>.
              </p>

              <Link href="/payment-confirmation">
                <button className="w-full py-3 sm:py-4 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all text-sm sm:text-base">
                  View Booking Confirmation
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
