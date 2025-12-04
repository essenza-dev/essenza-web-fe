'use client'

import { useMediaQuery } from '@mui/material'

import EndSection from '@/components/section/EndSection'
import HeaderPageSection from '@/components/section/HeaderPageSection'
import ProductSection from '@/components/section/ProductSection'

const ProductPage = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <>
      <HeaderPageSection height={isMobile ? '250px' : '360px'} bgImage={'/images/background/bg-header.png'} />
      <ProductSection />
      <EndSection />
    </>
  )
}

export default ProductPage
