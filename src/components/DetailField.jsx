import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const DetailField = ({ label, value, xs = 12, sm = 6 }) => {
  return (
    <Grid item xs={xs} sm={sm}>
      <Typography variant='subtitle2'>{label}</Typography>
      <Typography variant='body1'>{value !== undefined && value !== null && value !== '' ? value : '-'}</Typography>
    </Grid>
  )
}

export default DetailField
