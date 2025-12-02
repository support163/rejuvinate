import Link from 'next/link'
import { Calendar, ClipboardCheck, Heart } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      step: 'Step 1:',
      title: 'BOOK A VISIT',
      description: 'Schedule a TeleVisit or In-Person Consult in Minutes.',
      highlightText: 'Consult in Minutes',
    },
    {
      icon: ClipboardCheck,
      step: 'Step 2:',
      title: 'GET ANSWERS',
      description: 'We Analyze Your Bloodwork to Find the Root Cause.',
      highlightText: 'Root Cause',
    },
    {
      icon: Heart,
      step: 'Step 3:',
      title: 'FEEL REVITALIZED',
      description: 'Start Your Custom Treatment and Reclaim Your Energy.',
      highlightText: 'Reclaim Your Energy',
    },
  ]

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          HOW IT WORKS
        </h2>

        <div className="max-w-3xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-6 mb-8 last:mb-0"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center border-2 border-secondary">
                <item.icon className="w-8 h-8 text-secondary" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                  <span className="text-sm text-secondary font-semibold">{item.step}</span>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                </div>
                <p className="text-gray-600">
                  {item.description.split(item.highlightText)[0]}
                  <span className="text-secondary font-semibold">{item.highlightText}</span>
                  {item.description.split(item.highlightText)[1]}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="#appointments"
            className="inline-block bg-secondary hover:bg-secondary-dark text-white font-semibold py-4 px-10 rounded-lg transition-all duration-200 text-lg"
          >
            Start Now
          </Link>
        </div>
      </div>
    </section>
  )
}
