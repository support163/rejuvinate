import Hero from '@/components/Hero'
import ProsBanner from '@/components/ProsBanner'
import StorySection from '@/components/StorySection'
import WhyUsSection from '@/components/WhyUsSection'
import Testimonials from '@/components/Testimonials'
import HowItWorks from '@/components/HowItWorks'
import FeelingOff from '@/components/FeelingOff'
import ProductsSection from '@/components/ProductsSection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProsBanner />
      <StorySection />
      <WhyUsSection />
      <Testimonials />
      <HowItWorks />
      <FeelingOff />
      <ProductsSection />
    </>
  )
}
