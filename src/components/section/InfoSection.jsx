'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import CustomButton from '@/@core/components/mui/Button'

import frontCommonStyles from '@views/front-pages/styles.module.css'

const companyData = [
  {
    id: 1,
    name: 'PT DIMENSI PROCIPTA INDONESIA (DP HAUS)',
    location: 'Panglima Polim Raya 107B Jakarta Selatan',
    phone: '(021) 7399606',
    actionButtons: [
      { text: 'View Location', type: 'location' },
      { text: 'Contact Us', type: 'contact' }
    ]
  },
  {
    id: 2,
    name: 'PT ALAS MULIA',
    location: 'Jl. Otto Iskandar Dinata No. 357 Bandung',
    phone: '(022) 4208111',
    actionButtons: [
      { text: 'View Location', type: 'location' },
      { text: 'Contact Us', type: 'contact' }
    ]
  },
  {
    id: 3,
    name: 'PT GRAHA PELANGI JAYA',
    location: 'Perkantoran THD Blok A No. 25 Semarang',
    phone: '(024) -3553001',
    actionButtons: [
      { text: 'View Location', type: 'location' },
      { text: 'Contact Us', type: 'contact' }
    ]
  },
  {
    id: 4,
    name: 'PT BERKAT PUTRA BUANA',
    location: 'Jalan Baliwerti 55 Surabaya',
    phone: '(031) 5350519',
    actionButtons: [
      { text: 'View Location', type: 'location' },
      { text: 'Contact Us', type: 'contact' }
    ]
  },
  {
    id: 5,
    name: 'PT. GADING MAS MULTI PRIMA',
    location: 'Jl. Taman Griya Pratama Blok 7 No. 41 Pegangsaan Dua Kelapa Gading Jakarta Utara',
    phone: '(021) 22468888',
    actionButtons: [
      { text: 'View Location', type: 'location' },
      { text: 'Contact Us', type: 'contact' }
    ]
  }
]

const styles = {
  container: {
    padding: '36px 0'
  }
}

const ButtonInfo = ({ text, isActive, onClick }) => {
  return (
    <Box
      sx={{
        border: `2px solid ${isActive ? '#BB8B05' : '#E0E0E0'}`,
        color: isActive ? '#BB8B05' : '#E0E0E0',
        height: '56px',
        fontSize: '18px',
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: '#FFFFFF'
      }}
      onClick={onClick}
    >
      {text}
    </Box>
  )
}

const BoxItem = ({ data }) => {
  return (
    <Box sx={{ borderRadius: '10px', backgroundColor: '#FFFFFF' }}>
      <Box sx={{ padding: '12px 24px' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#212121' }}>{data?.name}</Typography>
      </Box>
      <Divider />
      <Grid container spacing={5} sx={{ padding: '12px 24px' }}>
        <Grid item sm={7} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              marginBottom: 2,
              '& img': { height: '14px', width: 'auto' },
              '& p': { fontSize: '14px', color: '#494949', marginLeft: 2, lineHeight: 1.2 }
            }}
          >
            <Box component={'img'} src='/icons/distance.svg' />
            <Typography>{data?.location}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& img': { height: '14px', width: 'auto' },
              '& p': { fontSize: '14px', color: '#494949', marginLeft: 2 }
            }}
          >
            <Box component={'img'} src='/icons/call.svg' />
            <Typography>{data?.phone}</Typography>
          </Box>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <CustomButton>View Location</CustomButton>
            </Grid>
            <Grid item sm={6}>
              <CustomButton>Contact Us</CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const InfoSection = () => {
  const isMobile = useMediaQuery('(max-width:768px)')

  const [selectedInfo, setSelectedInfo] = useState('distributor')

  return (
    <Container maxWidth='lg' sx={styles.container} className={frontCommonStyles.layoutSpacing}>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <ButtonInfo
            text={'Our Distributors'}
            isActive={selectedInfo === 'distributor'}
            onClick={() => setSelectedInfo('distributor')}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <ButtonInfo
            text={'Our Stores'}
            isActive={selectedInfo === 'store'}
            onClick={() => setSelectedInfo('store')}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={3}>
        {companyData.map(data => (
          <Grid item sm={12} key={data?.id}>
            <BoxItem data={data} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default InfoSection
