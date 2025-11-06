'use client'

import HeroSection from '@/components/section/home/HeroSection'
import UsefulFeature from '@/components/section/home/UsefulFeature'
import CustomerReviews from '@/components/section/home/CustomerReviews'
import OurTeam from '@/components/section/home/OurTeam'
import PricingPlan from '@/components/section/home/Pricing'
import ProductStat from '@/components/section/home/ProductStat'
import Faqs from '@/components/section/home/Faqs'
import GetStarted from '@/components/section/home/GetStarted'
import ContactUs from '@/components/section/home/ContactUs'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <UsefulFeature />
      <CustomerReviews />
      <OurTeam />
      <PricingPlan />
      <ProductStat />
      <Faqs />
      <GetStarted />
      <ContactUs />
    </>
  )
}

export default HomePage
