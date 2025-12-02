export default function ProsBanner() {
  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-8">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-secondary shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Derek Wolfert"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Go Where the Pros Go
            </h2>
            <p className="text-gray-600">
              Newest member to the Revitalized Health family: <span className="font-semibold text-primary">DEREK WOLFERT</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
