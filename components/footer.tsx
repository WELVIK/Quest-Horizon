"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { VisaIcon, MastercardIcon, DiscoverIcon, PayPalIcon, JCBIcon } from "./payment-icons"

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand - CHANGE: Updated to QUEST & HORIZON with brand colors */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              <span className="text-[#226D68]">QUEST</span>
              <span className="text-[#F0BE86]"> & HORIZON</span>
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Specialised care and personalised experiences for clients.
            </p>
          </div>

          {/* Company - CHANGE: Updated links to work properly */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h4 className="font-bold text-slate-900 mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/care-packages"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/care-services"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Care Services
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodation"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Accommodation
                </Link>
              </li>
            </ul>
          </div>

          {/* Support - CHANGE: Updated links including Terms and Privacy PDFs */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h4 className="font-bold text-slate-900 mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link
                  href="/terms-and-conditions.pdf"
                  target="_blank"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy.pdf"
                  target="_blank"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#226D68] transition-all duration-300 hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className={`sm:col-span-2 md:col-span-1 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h4 className="font-bold text-slate-900 mb-4 text-sm sm:text-base">Join Our Newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 text-xs sm:text-sm rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#226D68] transition-all duration-300"
              />
              <button className="px-3 sm:px-4 py-2 bg-[#F0BE86] text-gray-900 font-semibold rounded hover:bg-[#e5b079] transition-all duration-300 text-xs sm:text-sm whitespace-nowrap hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">Will send you weekly updates for your better tour packages.</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left order-2 md:order-1">
              Copyright © 2025. All Rights Reserved. Quest & Horizon.
            </p>
            <div className="flex gap-2 sm:gap-4 items-center order-1 md:order-2">
              {[VisaIcon, MastercardIcon, DiscoverIcon, PayPalIcon, JCBIcon].map((Icon, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 transform hover:scale-110 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
