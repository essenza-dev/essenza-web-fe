'use client'

import { useState, useMemo } from 'react'

// MUI Components
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import CustomTextField from '@/@core/components/custom-inputs/TextField'

// Default blank banner
const defaultData = {
  title: '',
  subtitle: '',
  image: '',
  link_url: '',
  order_no: 1,
  is_active: true
}

const BannersForm = ({ isEdit, onSubmit, onCancel }) => {
  const [data, setData] = useState(defaultData)
  const [preview, setPreview] = useState(defaultData.image || '')

  const fields = useMemo(
    () => [
      { name: 'title', label: 'Title', placeholder: 'Banner Title', size: 6, required: true },
      { name: 'subtitle', label: 'Subtitle', placeholder: 'Sub Title Banner', size: 6 },
      { name: 'link_url', label: 'Link URL', placeholder: 'https://example.com', size: 6, required: true },
      { name: 'order_no', label: 'Order No', type: 'number', size: 4 }
    ],
    []
  )

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = e => {
    setData(prev => ({ ...prev, is_active: e.target.checked }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setPreview(imageUrl)
      setData(prev => ({ ...prev, image: file }))
    }
  }

  return (
    <Card className='shadow'>
      <CardHeader
        title={defaultData.id ? 'Edit Banner' : 'Add New Banner'}
        subheader='Isi semua informasi banner di bawah ini.'
      />
      <Divider />

      <form onSubmit={onSubmit}>
        <CardContent>
          <Grid container spacing={5} className='mbe-5'>
            {fields.map(field => (
              <CustomTextField
                key={field.name}
                {...field}
                type={field.type || 'text'}
                value={data[field.name] || ''}
                onChange={handleChange}
                inputProps={field.type === 'number' ? { min: 1 } : {}}
              />
            ))}

            <Grid item xs={12} sm={2}>
              <FormControlLabel
                control={<Switch checked={data.is_active} onChange={handleSwitchChange} />}
                label='Active'
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Banner Image
              </Typography>

              {preview ? (
                <Box className='relative inline-block'>
                  <img src={preview} alt='Preview' className='w-[220px] h-[120px] object-cover rounded border' />
                  <IconButton
                    color='error'
                    size='small'
                    className='absolute top-1 right-1 bg-white shadow'
                    onClick={() => {
                      setPreview('')
                      setData(prev => ({ ...prev, image: '' }))
                    }}
                  >
                    <i className='ri-delete-bin-line text-red-500 text-lg' />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant='outlined'
                  component='label'
                  startIcon={<i className='ri-upload-2-line text-lg' />}
                  color='primary'
                >
                  Upload Image
                  <input type='file' hidden accept='image/*' onChange={handleImageChange} />
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box className='flex justify-between gap-3 p-4'>
          <Button
            variant='contained'
            className='w-1/4'
            color='warning'
            startIcon={<i className='ri-close-line text-lg' />}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            className='w-1/4'
            color='success'
            startIcon={<i className='ri-save-3-line text-lg' />}
          >
            {defaultData.id ? 'Update' : 'Save'}
          </Button>
        </Box>
      </form>
    </Card>
  )
}

export default BannersForm
