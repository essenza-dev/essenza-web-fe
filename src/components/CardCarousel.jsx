'use client'

import { Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import classnames from 'classnames'

import frontCommonStyles from '@views/front-pages/styles.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const styles = {
  containerBox: bgColor => ({
    padding: { xs: '12px 0', sm: '24px 0' },
    background: bgColor || 'white'
  }),
  bannerBox: {
    width: '100%',
    overflow: 'visible',
    '& .banner-swiper': {
      paddingTop: { xs: 0, sm: '56px' },
      paddingBottom: { xs: '48px', sm: 0 },
      marginTop: { xs: '52px', sm: 'unset' }
    },
    '& .banner-swiper .swiper-pagination': {
      bottom: { xs: '14px !important', sm: '36px !important' },
      left: { xs: '-4px !important', sm: '24px !important' },
      textAlign: 'left !important',
      width: 'auto !important'
    },
    '& .banner-swiper .swiper-pagination .swiper-pagination-bullet': {
      backgroundColor: 'black',
      border: '1px solid white'
    },
    '& .banner-swiper .swiper-pagination .swiper-pagination-bullet-active': {
      borderColor: '#BD8100',
      backgroundColor: '#BD8100'
    },
    '& .banner-swiper .swiper-button-next, & .banner-swiper .swiper-button-prev': {
      width: { xs: '25px', sm: '35px' },
      height: { xs: '25px', sm: '35px' },
      background: 'transparent',
      color: '#212121',
      zIndex: 99,
      position: 'absolute',
      top: { xs: 'unset', sm: '30px' },
      bottom: { xs: '12px', sm: 'unset' }
    },
    '& .banner-swiper .swiper-button-next': {
      borderTop: '1px solid #212121',
      borderBottom: '1px solid #212121',
      borderRight: '1px solid #212121',
      padding: '6px',
      borderRadius: '0 6px 6px 0'
    },
    '& .banner-swiper .swiper-button-prev': {
      borderTop: '1px solid #212121',
      borderBottom: '1px solid #212121',
      borderLeft: '1px solid #212121',
      padding: '6px',
      borderRadius: '6px 0 0 6px',
      left: { xs: 'calc(100% - 54px)', sm: 'calc(100% - 74px)' }
    },
    '& .banner-swiper .swiper-button-next::before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1px',
      height: '70%',
      background: '#212121'
    },
    '& .banner-swiper .swiper-button-next::after, & .banner-swiper .swiper-button-prev::after': {
      fontSize: '16px'
    }
  },
  titleBanner: {
    fontSize: { xs: '14px', md: '24px' },
    margin: '12px 0',
    width: '100%',
    color: '#212121',
    marginBottom: '-48px'
  },
  descriptionBanner: {
    fontSize: { xs: '12px', md: '16px' }
  },
  bannerImage: {
    width: '100%',
    height: { xs: '150px', md: '360px' },
    objectFit: 'cover',
    borderRadius: '10px'
  }
}

const defData = [
  { id: 1, src: '/images/illustrations/photos/banner-1.png', title: 'Banner 1' },
  { id: 2, src: '/images/illustrations/photos/banner-2.png', title: 'Banner 2' },
  { id: 3, src: '/images/illustrations/photos/banner-3.png', title: 'Banner 3' },
  { id: 4, src: '/images/illustrations/photos/banner-4.jpg', title: 'Banner 4' },
  { id: 5, src: '/images/illustrations/photos/banner-5.jpg', title: 'Banner 5' }
]

const CardCarousel = ({ data = defData, title, bgColor, duration = 1000 }) => {
  return (
    <Box sx={styles.containerBox(bgColor)}>
      <Box className={classnames(frontCommonStyles.layoutSpacing)} sx={styles.bannerBox}>
        <Typography sx={styles.titleBanner}>{title}</Typography>
        <Swiper
          className='banner-swiper'
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: duration }}
          loop
          slidesPerView={3}
          spaceBetween={10}
          breakpoints={{
            0: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            }
          }}
        >
          {data.map((img, i) => (
            <SwiperSlide key={i}>
              <Box component='img' src={img.src} alt={`Banner ${img.src}`} sx={styles.bannerImage} />
              <Typography sx={styles.descriptionBanner}>{img.title}</Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

export default CardCarousel
