import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import classnames from 'classnames'

import frontCommonStyles from '@views/front-pages/styles.module.css'

const data = [
  { id: 1, label: 'Marble Series', image: '/images/illustrations/photos/category-1.jpg' },
  { id: 2, label: 'Marble Series', image: '/images/illustrations/photos/category-2.jpg' },
  { id: 3, label: 'Marble Series', image: '/images/illustrations/photos/category-3.jpg' },
  { id: 4, label: 'Marble Series', image: '/images/illustrations/photos/category-4.jpg' },
  { id: 5, label: 'Marble Series', image: '/images/illustrations/photos/category-5.jpg' },
  { id: 6, label: 'Marble Series', image: '/images/illustrations/photos/category-6.jpg' }
]

const CategorySection = () => {
  return (
    <Box className={classnames('pb-6', frontCommonStyles.layoutSpacing)}>
      <Typography>Marble</Typography>
      <Grid container spacing={3}>
        {data.map(data => (
          <Grid key={data.id} item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                borderRadius: '6px',
                opacity: 0.5,
                height: '360px',
                position: 'relative',
                overflow: 'hidden',

                '& img': {
                  height: '360px',
                  width: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 5
                }
              }}
            >
              <img src={data?.image} alt={data.label} />

              <Typography
                sx={{
                  zIndex: 10,
                  fontSize: '24px',
                  position: 'absolute',
                  top: '47%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  width: '100%',
                  color: '#FFFFFF'
                }}
              >
                {data?.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CategorySection
