'use client'

import { useState } from 'react'

import { Divider, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'

import CustomButton from '@/@core/components/mui/Button'

const productSpecs = [
  {
    icon: 'box-gold',
    label: 'Dimensions',
    value: '60–120 cm, 90–90 cm'
  },
  {
    icon: 'texture-gold',
    label: 'Texture',
    value: 'Graniti'
  },
  {
    icon: 'border-gold',
    label: 'Thickness',
    value: '10 mm'
  },
  {
    icon: 'texture-add-gold',
    label: 'Material',
    value: 'Slab'
  },
  {
    icon: 'widget-gold',
    label: 'Applications',
    value: 'Floor, Indoor & Outdoor'
  },
  {
    icon: 'encrypted-gold',
    label: 'Anti-Slip',
    value: 'R10'
  },
  {
    icon: 'workspace-premium-gold',
    label: 'Certifications',
    value: 'ISO 9001, Greyguard Gold'
  }
]

const productFeatures = [
  {
    icon: 'color-fill',
    label: 'Colors',
    value: 'Black'
  },
  {
    icon: 'humidity-percentage',
    label: 'Water Absorbtion',
    value: '≤ 0.05%'
  },
  {
    icon: 'border',
    label: 'Thickness',
    value: '9.8'
  },
  {
    icon: 'widget',
    label: 'Number Of Face',
    value: '1 Faces'
  }
]

const styles = {
  gridContainer: {
    margin: '56px 0',
    width: '100%'
  },
  boxImg: {
    height: { xs: '327px', sm: '460px' },
    width: { xs: '327px', sm: '460px' },
    objectFit: 'cover',
    borderRadius: '6px'
  },
  boxSpec: {
    borderRadius: '6px',
    boxShadow: ' 0px 0.75px 2.25px 0.75px #00000026',
    boxShadow: ' 0px 0.75px 1.5px 0px #0000004D'
  },
  title: {
    fontSize: '45px',
    fontWeight: 700,
    color: '#212121'
  },
  subTitle: {
    fontSize: '21px',
    fontWeight: 500,
    color: '#C1A658',
    mt: 1
  },
  tagline: {
    fontSize: '24px',
    fontWeight: 400,
    color: '#494949',
    mt: 10
  },
  boxButton: {
    width: '240px',
    mt: 3,
    '& button': {
      padding: { xs: '10px !important' },
      fontSize: { xs: '12px', sm: '16px' }
    }
  },
  boxTitleSpec: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSpec: {
    m: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 500,
    color: '#212121'
  },
  descSpec: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#494949',
    ml: 1
  }
}

const SpecItem = ({ data }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 3, '& img': { height: '14px' } }}>
      <Box component={'img'} src={`/icons/${data?.icon}.svg`} />
      <Typography sx={styles.descSpec}>
        {data?.title}: {data?.value}
      </Typography>
    </Box>
  )
}

const FeatureItem = ({ data }) => {
  return (
    <Box sx={{ width: '124px', textAlign: 'center', '& img': { height: '24px', width: 'auto' } }}>
      <Box component={'img'} src={`/icons/${data?.icon}.svg`} />
      <Typography sx={{ color: '#212121', fontWeight: 500, fontSize: '14px', mt: 1 }}>{data?.label}</Typography>
      <Divider sx={{ color: '#212121', mt: 1 }} />
      <Typography sx={{ color: '#212121', fontWeight: 500, fontSize: '12px', mt: 1 }}>{data?.value}</Typography>
    </Box>
  )
}

const ProductDetailSection = () => {
  const [dataDetail, setDataDetail] = useState(null)
  const isMobile = useMediaQuery('(max-width:768px)')

  return (
    <Container maxWidth='lg'>
      <Grid container sx={styles.gridContainer} spacing={4}>
        <Grid item sm={5} xs={12}>
          <Box sx={styles.boxImg} component={'img'} src='/images/product/sample-2.jpg' />
        </Grid>
        <Grid item sm={7} xs={12}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Typography sx={styles.title}>{dataDetail?.title || 'Carbon'}</Typography>
              <Typography sx={styles.subTitle}>{dataDetail?.subTitle || 'Graniti'}</Typography>
              <Typography sx={styles.tagline}>
                Timeless Luxury <br />
                In Every Surfaces
              </Typography>
              <Box mt={8} />
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, gap: { xs: 2, sm: 2 } }}>
                <Box sx={styles.boxButton}>
                  <CustomButton borderColor='#BB8B05'>Request a Sample</CustomButton>
                </Box>
                <Box sx={styles.boxButton}>
                  <CustomButton borderColor='#BB8B05'>
                    {isMobile ? 'Download Catalogue' : 'Download All Catalogue'}
                  </CustomButton>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={styles.boxSpec}>
                <Box sx={styles.boxTitleSpec}>
                  <Typography sx={styles.titleSpec}>TECHNICAL SPECIFICATIONS</Typography>
                </Box>
                <Divider />
                <Box p='20px 48px'>
                  {productSpecs.map((item, i) => (
                    <SpecItem data={item} key={i} />
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 12 }}>
                {productFeatures.map((item, i) => (
                  <FeatureItem data={item} key={i} />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetailSection
