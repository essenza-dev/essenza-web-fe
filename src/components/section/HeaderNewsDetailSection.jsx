import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import classnames from 'classnames'

import frontCommonStyles from '@views/front-pages/styles.module.css'

const HeaderNewsDetailSection = ({ thumbnail }) => {
  const styles = {
    container: {
      width: '100vw',
      height: '90vh',
      position: 'relative',
      marginTop: '-115px',
      paddingTop: 36,
      background: 'linear-gradient(180deg, #404040 0%, #131313 100%)'
    },
    thumbnail: {
      width: '100%',
      height: '530px',
      objectFit: 'cover',
      borderRadius: '7px'
    }
  }

  return (
    <>
      <Box sx={styles.container}>
        <Box className={classnames(frontCommonStyles.layoutSpacing)}>
          <Box>
            <Box component={'img'} src={thumbnail} sx={styles.thumbnail} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HeaderNewsDetailSection
