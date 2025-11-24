import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const HeaderPageSection = ({ title, subTitle, bgImage }) => {
  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      marginTop: '-115px'
    },
    title: {
      fontWeight: 500,
      fontSize: '48px',
      color: '#FFFFFF',
      textAlign: 'center',
      width: '100%',
      position: 'absolute',
      top: '45vh'
    },
    subTitle: {
      fontSize: '24px',
      fontWeight: 300,
      color: '#FFFFFF',
      textAlign: 'center',
      width: '100%',
      position: 'absolute',
      top: '52vh'
    },
    image: {
      height: '100vh',
      width: '100vw',
      objectFit: 'cover'
    }
  }

  return (
    <>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.subTitle}>{subTitle}</Typography>
        <Box component='img' src={bgImage} alt={`Page ${title}`} sx={styles.image} />
      </Box>
    </>
  )
}

export default HeaderPageSection
