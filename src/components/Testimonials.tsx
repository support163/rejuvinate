import Link from 'next/link'

export default function Testimonials() {
  const testimonials = [
    {
      text: "Office staff are friendly and helpful, I have seen Andy, my first time seeing John and I was really impressed with his bedside manner with hormones.",
      author: "Sarah, CO",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      text: "I Love this place! First time in a long time I've been listened to by my medical professionals. Admin is amazing and his acute family helped me take my personal health in my own hands.",
      author: "Tamara Whiteland",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      text: "For years I went to primary care doctors without sympathy. It was until my levels kept going up and down that the first time I felt heard and seen and got answers to why. Hands down below normal or barely in the normal range. A year later I feel better all the way! I did at 30!",
      author: "Amanda Bagan",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          TESTIMONIALS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 text-6xl text-secondary/20 font-serif">
                &ldquo;
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm mb-4 relative z-10">
                {testimonial.text}
              </p>

              {/* Author */}
              <p className="font-semibold text-primary text-sm">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="#testimonials"
            className="inline-block border-2 border-primary text-primary font-semibold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-all duration-200"
          >
            Read More Stories
          </Link>
        </div>
      </div>
    </section>
  )
}
