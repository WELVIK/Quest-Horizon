import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Bookings from "@/components/bookings"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Bookings />
      <Testimonials />
      <Footer />
    </main>
  )
}
