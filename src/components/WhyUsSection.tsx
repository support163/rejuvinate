import { Check } from 'lucide-react'

export default function WhyUsSection() {
  const features = [
    {
      text: 'Family-owned, not a franchise',
      highlight: '— your care comes first.',
    },
    {
      text: 'Treating both men and women,',
      highlight: 'unlike most hormone clinics.',
    },
    {
      text: 'Simple process:',
      highlight: 'Get seen in days, get answers, get solutions.',
    },
    {
      text: 'Nationwide telemedicine',
      highlight: '— help wherever you are.',
    },
  ]

  return (
    <section className="bg-secondary py-12">
      <div className="container-custom px-4">
        <h3 className="text-white text-2xl font-bold mb-8 text-center">
          Why Revitalized Health Stands Out
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-white text-sm">
                <span className="font-semibold">{feature.text}</span>{' '}
                <span className="text-white/90">{feature.highlight}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
