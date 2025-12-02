import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProsBanner from '@/components/ProsBanner'
import StorySection from '@/components/StorySection'
import WhyUsSection from '@/components/WhyUsSection'
import Testimonials from '@/components/Testimonials'
import HowItWorks from '@/components/HowItWorks'
import FeelingOff from '@/components/FeelingOff'
import ProductsSection from '@/components/ProductsSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProsBanner />
        <StorySection />
        <WhyUsSection />
        <Testimonials />
        <HowItWorks />
        <FeelingOff />
        <ProductsSection />
      </main>
      <Footer />
    </>
  )
}
