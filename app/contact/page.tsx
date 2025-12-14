"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-48 md:h-64 lg:h-96 w-full mt-16 md:mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop")',
          }}
        >
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
              CONTACT US
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {/* Contact Info Cards - CHANGE: Updated to brand colors */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 sm:p-6 bg-[#226D68] text-white rounded-lg">
            <Phone className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-[#F0BE86]" />
            <h3 className="text-base sm:text-lg font-bold mb-2">Phone</h3>
            <p className="text-sm sm:text-base text-white/90">+212 600 000 000</p>
            <p className="text-xs sm:text-sm text-white/80">Available 24/7</p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 p-4 sm:p-6 bg-[#226D68] text-white rounded-lg">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-[#F0BE86]" />
            <h3 className="text-base sm:text-lg font-bold mb-2">Email</h3>
            <p className="text-sm sm:text-base text-white/90">info@questhorizon.com</p>
            <p className="text-xs sm:text-sm text-white/80">Response within 24 hours</p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 p-4 sm:p-6 bg-[#226D68] text-white rounded-lg">
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 text-[#F0BE86]" />
            <h3 className="text-base sm:text-lg font-bold mb-2">Location</h3>
            <p className="text-sm sm:text-base text-white/90">Marrakech, Morocco</p>
            <p className="text-xs sm:text-sm text-white/80">North Africa</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#226D68] p-4 sm:p-6 md:p-12 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Send className="w-6 h-6 sm:w-8 sm:h-8 text-[#F0BE86] flex-shrink-0" />
            Send us a Message
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/80 mb-6 sm:mb-8">
            We'd love to hear from you. Get in touch with our team.
          </p>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-3 text-white animate-in fade-in duration-500">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Your message has been sent successfully! We'll get back to you soon.</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-white animate-in fade-in duration-500">
              <p className="text-sm">Failed to send message. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white placeholder-gray-300 rounded-lg border border-white/20 focus:border-[#F0BE86] focus:outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white placeholder-gray-300 rounded-lg border border-white/20 focus:border-[#F0BE86] focus:outline-none transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white placeholder-gray-300 rounded-lg border border-white/20 focus:border-[#F0BE86] focus:outline-none transition-colors"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <input
                type="text"
                placeholder="Subject"
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white placeholder-gray-300 rounded-lg border border-white/20 focus:border-[#F0BE86] focus:outline-none transition-colors"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white/10 text-white placeholder-gray-300 rounded-lg border border-white/20 focus:border-[#F0BE86] focus:outline-none transition-colors resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#F0BE86] text-gray-900 font-semibold rounded-lg hover:bg-[#e5b079] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
