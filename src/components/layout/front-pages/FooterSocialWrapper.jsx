import { getPubSocialMedias } from '@/services/socialMedia'
import Footer from './Footer'

const FooterSocialWrapper = async () => {
  const res = await getPubSocialMedias()

  let socialMediaData = []

  if (res?.data?.length > 0) {
    socialMediaData = res.data.map(item => ({
      ...item,
      icon: `/icons/${item.icon}.svg`,
      href: item.url || ''
    }))
  }

  return <Footer initialSocialMedia={socialMediaData} />
}

export default FooterSocialWrapper
