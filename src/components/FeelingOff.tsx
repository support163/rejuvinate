import Link from 'next/link'
import { Check } from 'lucide-react'

export default function FeelingOff() {
  const symptoms = [
    'Fatigue',
    'Brain Fog',
    'Weight Gain',
    'Joint Pain',
  ]

  return (
    <section className="bg-primary py-16">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              FEELING OFF?
            </h2>
            <p className="text-xl text-secondary mb-6">
              It Could Be Your Hormones
            </p>
            <Link
              href="#symptoms"
              className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Explore Symptoms & Solutions
            </Link>
          </div>

          {/* Right side - symptoms */}
          <div className="grid grid-cols-2 gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
