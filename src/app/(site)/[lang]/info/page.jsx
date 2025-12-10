'use client'

import { useMediaQuery } from '@mui/material'

import HeaderPageSection from '@/components/section/HeaderPageSection'
import InfoSection from '@/components/section/InfoSection'
import EndSection from '@/components/section/EndSection'

const InfoPage = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <>
      <HeaderPageSection height={isMobile ? '160px' : '160px'} bgImage={'/images/background/bg-header.png'} />
      <InfoSection />
      <EndSection />
    </>
  )
}

export default InfoPage
