import AboutUsSection from '@/components/section/AboutUsSection'
import DiscoverSection from '@/components/section/DiscoverSection'
import EndSection from '@/components/section/EndSection'
import HeaderPageSection from '@/components/section/HeaderPageSection'
import AwardSection from '@/components/section/AwardSection'
import VisionSection from '@/components/section/VisionSection'

const AboutUsPage = () => {
  return (
    <>
      <HeaderPageSection
        title={'World Class Porcelain Tile'}
        subTitle={'Since 1990’s'}
        bgImage={'/images/illustrations/photos/banner-1.png'}
      />
      <AboutUsSection />
      <AwardSection />
      <VisionSection />
      <DiscoverSection />
      <EndSection />
    </>
  )
}

export default AboutUsPage
