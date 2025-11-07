'use client'

import { useState } from 'react'

// MUI Components
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Default blank banner
const defaultBanner = {
  title: '',
  subtitle: '',
  image: '',
  link_url: '',
  order_no: 1,
  is_active: true
}

const BannersForm = ({ initialData = defaultBanner, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialData)
  const [preview, setPreview] = useState(initialData.image || '')

  const handleChange = e => {
    const { name, value } = e.target

    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = e => {
    setForm(prev => ({ ...prev, is_active: e.target.checked }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)

      setPreview(imageUrl)
      setForm(prev => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (onSubmit) onSubmit(form)
  }

  return (
    <Card>
      <CardHeader
        title={initialData.id ? 'Edit Banner' : 'Add New Banner'}
        subheader='Isi semua informasi banner di bawah ini.'
      />
      <Divider />

      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Title'
                name='title'
                value={form.title}
                onChange={handleChange}
                placeholder='Judul banner'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Subtitle'
                name='subtitle'
                value={form.subtitle}
                onChange={handleChange}
                placeholder='Subjudul banner'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Link URL'
                name='link_url'
                value={form.link_url}
                onChange={handleChange}
                placeholder='https://example.com'
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                size='small'
                type='number'
                label='Order No'
                name='order_no'
                value={form.order_no}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={<Switch checked={form.is_active} onChange={handleSwitchChange} />}
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
                      setForm(prev => ({ ...prev, image: '' }))
                    }}
                  >
                    <i className='ri-delete-bin-line text-red-500 text-lg' />
                  </IconButton>
                </Box>
              ) : (
                <Button variant='outlined' component='label' startIcon={<i className='ri-upload-2-line text-lg' />}>
                  Upload Image
                  <input type='file' hidden accept='image/*' onChange={handleImageChange} />
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box className='flex justify-end gap-3 p-4'>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<i className='ri-close-line text-lg' />}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='success'
            startIcon={<i className='ri-save-3-line text-lg' />}
          >
            {initialData.id ? 'Update' : 'Save'}
          </Button>
        </Box>
      </form>
    </Card>
  )
}

export default BannersForm
