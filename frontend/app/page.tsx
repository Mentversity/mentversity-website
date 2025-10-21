import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import ValueSection from '@/components/ValueSection'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export const metadata = {
  alternates: {
    canonical: "https://www.mentversity.com",
  },
};


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero />
      <Features />
      <ValueSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}