import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/whatsapp-button"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quest & Horizon - Premium Healthcare Travel Experiences in Marrakech",
  description:
    "Discover premium healthcare travel experiences in Marrakech with Quest & Horizon. Personalized medical support, care coordination, and authentic cultural encounters. Specialized care packages include 24/7 medical support, wellness consultations, and therapeutic services.",
  keywords: [
    "healthcare travel Morocco",
    "medical travel Marrakech",
    "Quest & Horizon",
    "care packages Morocco",
    "wellness retreat Marrakech",
    "medical tourism Morocco",
    "supported holidays Marrakech",
    "specialized care travel",
    "healthcare tourism",
    "medical vacation Morocco",
  ],
  authors: [{ name: "Quest & Horizon", url: "https://questhorizon.com" }],
  creator: "Quest & Horizon",
  publisher: "Quest & Horizon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://questhorizon.com",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://questhorizon.com",
    title: "Quest & Horizon - Premium Healthcare Travel in Marrakech",
    description: "Personalized healthcare travel packages in Marrakech with 24/7 medical support and wellness services",
    siteName: "Quest & Horizon",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Quest & Horizon Healthcare Travel Marrakech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quest & Horizon - Premium Healthcare Travel",
    description: "Personalized healthcare travel in Marrakech with 24/7 support",
    creator: "@questhorizon",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#226D68" },
    { media: "(prefers-color-scheme: dark)", color: "#226D68" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
