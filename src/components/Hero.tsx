import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center pt-32 pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary/70"></div>
      </div>

      <div className="container-custom relative z-10 px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            REGAIN THE ENERGY
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-6">
            YOU ONCE HAD
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Personalized Hormone Therapies, Peptide Treatments, Telemedicine & More
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#appointments" className="btn-primary">
              Book a Telehealth
            </Link>
            <Link href="#how-it-works" className="btn-secondary">
              See How it Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
