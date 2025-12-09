'use client'

import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import BackdropLoading from '@/components/BackdropLoading'
import useSnackbar from '@/@core/hooks/useSnackbar'

const MenuForm = () => {
  const { success, error, SnackbarComponent } = useSnackbar()

  const [loading, setLoading] = useState(null)

  return (
    <>
      <Card>
        <CardHeader title='Menu Settings' />
        <Divider />
        <CardContent></CardContent>
        <Divider />
        <Box className='p-4'>
          <Button startIcon={<i className='ri-save-line' />} variant='contained' color='success' size='small'>
            Update Menu
          </Button>
        </Box>
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default MenuForm
