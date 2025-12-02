import Link from 'next/link'

export default function StorySection() {
  const services = [
    {
      title: 'Hormone Therapy',
      description: 'Boost energy, clarity, and vitality for men and women.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Peptide Therapy',
      description: 'Pioneers in Colorado unlock the future of wellness.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Medical Weight Loss',
      description: 'Sustainable results with a personalized approach.',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Telemedicine',
      description: 'Healthcare anywhere.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        {/* Story header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="max-w-2xl">
            <h3 className="text-secondary font-semibold mb-2">Learn Our Story</h3>
            <p className="text-gray-600">
              At <span className="font-semibold text-primary">Revitalized Health</span>, we&apos;re a family-owned team of Medical Professionals who left traditional medicine to put patients first. Since 2018, we&apos;ve helped men and women across the U.S. feel young again with hormone therapy, peptide treatments, and medical weight loss.
            </p>
          </div>
          <Link href="#about" className="btn-outline whitespace-nowrap">
            Learn About Us
          </Link>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-gray-200 text-sm">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
