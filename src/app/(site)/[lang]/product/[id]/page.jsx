'use client'

import { useMediaQuery } from '@mui/material'

import HeaderPageSection from '@/components/section/HeaderPageSection'
import ProductDetailSection from '@/components/section/ProductDetailSection'

const ProductDetailPage = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <>
      <HeaderPageSection height={isMobile ? '160px' : '160px'} bgImage={'/images/background/bg-header.png'} />
      <ProductDetailSection />
    </>
  )
}

export default ProductDetailPage
