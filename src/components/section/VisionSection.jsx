import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import frontCommonStyles from '@views/front-pages/styles.module.css'

const VisionSection = () => {
  const styles = {
    container: {
      background: 'linear-gradient(180deg, #EDEDED, #F9F9F9)',
      width: '100vw',
      padding: '100px 0'
    },
    containerNd: {
      background: '#FFFFFF',
      width: '100vw',
      padding: '50px 0'
    },
    image: {
      width: '100%',
      height: '420px',
      objectFit: 'cover',
      borderRadius: '10px'
    },
    containerText: {
      paddingTop: '0 !important',
      paddingRight: '2rem !important'
    },
    title: {
      fontSize: '24px',
      color: '#000000'
    },
    description: {
      fontSize: '18px',
      color: '#000000',
      marginTop: 6
    },
    divider: {
      width: '100%',
      height: '2px',
      color: '#000000',
      margin: '48px 0'
    }
  }

  const contentBottom = [
    'The pioneer porcelain tile manufacturer in Indonesia',
    'Indonesian leading brand for Porcelain Tile',
    'Trendsetter for design and quality'
  ]

  return (
    <>
      <Box sx={styles.container}>
        <Grid container className={classnames(frontCommonStyles.layoutSpacing)} sx={styles.bannerBox} spacing={3}>
          <Grid item xs={12} md={4.5} sx={styles.containerText}>
            <Typography sx={styles.title}>Vision</Typography>
            <Typography sx={styles.description}>
              To be the global most admired tile company for products, people, partnership, competitiveness and
              performance.
            </Typography>
            <Divider sx={styles.divider} />
            <Typography sx={styles.title}>Mision</Typography>
            <Typography sx={styles.description}>
              Our company continuously innovate products and services that offer leading revolutionary solution to
              society, and always create the best value to customers and shareholders.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              component='img'
              src={'/images/illustrations/photos/banner-category.jpg'}
              alt={`about us`}
              sx={styles.image}
            />
          </Grid>
          <Grid item xs={12} md={4.5}>
            <Box
              component='img'
              src={'/images/illustrations/photos/category-3.jpg'}
              alt={`about us`}
              sx={styles.image}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={styles.containerNd}>
        <Grid container className={classnames(frontCommonStyles.layoutSpacing)} sx={styles.bannerBox} spacing={3}>
          {contentBottom.map((content, index) => (
            <Grid
              key={content}
              item
              xs={12}
              md={4}
              sx={{
                ...styles.containerText,
                borderLeft: index >= contentBottom.length - 2 ? '1px solid #000000' : 'none',
                paddingLeft: index >= contentBottom.length - 2 ? '2.75rem !important' : 0
              }}
            >
              <Typography sx={styles.title}>{content}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default VisionSection
