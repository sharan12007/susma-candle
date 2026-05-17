import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import HeroSection from '@/components/sections/hero-section'
import FeaturedProducts from '@/components/sections/featured-products'
import BestSellers from '@/components/sections/best-sellers'
import AboutSection from '@/components/sections/about-section'
import WhyChooseUs from '@/components/sections/why-choose-us'
import TestimonialsSection from '@/components/sections/testimonials-section'
import FragranceCollection from '@/components/sections/fragrance-collection'
import ProductCategories from '@/components/sections/product-categories'
import NewsletterSection from '@/components/sections/newsletter-section'
import FAQSection from '@/components/sections/faq-section'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <BestSellers />
      <AboutSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <FragranceCollection />
      <ProductCategories />
      <NewsletterSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
