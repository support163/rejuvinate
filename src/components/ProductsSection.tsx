import Link from 'next/link'

export default function ProductsSection() {
  const products = [
    {
      title: 'Initial Consultation',
      price: '$49.00',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Inflammatory Lab Panel',
      price: '$50.00',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Lipid Lab Panel',
      price: '$50.00',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Comprehensive Thyroid Lab Panel',
      price: '$75.00',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Follow-Up Female Lab Panel',
      price: '$165.00',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Follow-Up Male Lab Panel',
      price: '$100.00',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Female Initial Full Lab Panel',
      price: '$205.00',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Male Initial Full Lab Panel',
      price: '$225.00',
      image: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ]

  return (
    <section id="shop" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ENHANCE YOUR WELLNESS AT HOME
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse patient-specific scripts and supplements and order online securely.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-primary text-sm mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-secondary font-bold mb-3">{product.price}</p>
                <button className="w-full bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="#shop"
            className="inline-block border-2 border-secondary text-secondary font-semibold py-3 px-10 rounded-lg hover:bg-secondary hover:text-white transition-all duration-200"
          >
            Shop All
          </Link>
        </div>
      </div>
    </section>
  )
}
