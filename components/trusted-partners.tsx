export default function TrustedPartners() {
  const partners = [
    { name: "Emirates", color: "text-gray-600" },
    { name: "Trivago", color: "text-red-500" },
    { name: "Airbnb", color: "text-rose-500" },
    { name: "National Car Rental", color: "text-gray-600" },
    { name: "Swiss", color: "text-red-600" },
  ]

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm mb-8">Trusted by leading partners</p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {partners.map((partner, i) => (
            <div key={i} className={`text-center ${partner.color} font-bold text-lg`}>
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
