"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, Circle } from "lucide-react"

export default function PaymentsPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const steps = ["Payment Info", "Verification", "Confirmation"]

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="max-w-2xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24 mt-16 md:mt-20">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(idx)}
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all flex-shrink-0 ${
                    idx <= currentStep ? "bg-[#00A8A8] text-white" : "bg-[#E5E7EB] text-[#6B7280]"
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
          <div className="flex justify-between gap-2">
            {steps.map((step, idx) => (
              <p
                key={idx}
                className={`text-xs sm:text-sm font-semibold ${idx <= currentStep ? "text-[#0B2B3E]" : "text-[#9CA3AF]"}`}
              >
                {step}
              </p>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-[#F9F5F0] p-4 sm:p-6 md:p-8 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          {currentStep === 0 && (
            <form className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-4 sm:mb-6">Enter Payment Details</h2>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm sm:text-base">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[#0B2B3E] font-semibold mb-2 text-sm">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base"
              >
                Continue
              </button>
            </form>
          )}

          {currentStep === 1 && (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#00A8A8] mx-auto mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-3 sm:mb-4">Verification</h2>
              <p className="text-[#6B7280] mb-4 sm:mb-6 text-sm sm:text-base">
                Please check your email for the verification code.
              </p>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                maxLength="6"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-[#E5E7EB] rounded-lg focus:border-[#00A8A8] focus:outline-none transition-colors mb-4 sm:mb-6 text-center text-xl sm:text-2xl tracking-widest"
              />
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all hover:scale-105 text-sm sm:text-base"
              >
                Verify
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center py-6 sm:py-8">
              <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#00A8A8] mx-auto mb-3 sm:mb-4 animate-bounce" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B3E] mb-3 sm:mb-4">Payment Successful!</h2>
              <p className="text-[#6B7280] mb-4 sm:mb-6 text-sm sm:text-base">
                Your booking has been confirmed. A confirmation email has been sent to your inbox.
              </p>
              <div className="bg-white p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border-2 border-[#E5E7EB]">
                <p className="text-xs sm:text-sm text-[#6B7280]">Reference Number</p>
                <p className="text-lg sm:text-xl font-bold text-[#0B2B3E]">QH-2024-123456</p>
              </div>
              <button className="w-full py-2.5 sm:py-3 bg-[#00A8A8] text-white font-semibold rounded-lg hover:bg-[#008888] transition-all text-sm sm:text-base">
                Return to Home
              </button>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-[#F0FFF4] rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <p className="text-xs sm:text-sm text-[#6B7280]">
            ✓ All payments are secure and encrypted. We accept Visa, Mastercard, PayPal, and more.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
