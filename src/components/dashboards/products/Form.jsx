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
import MenuItem from '@mui/material/MenuItem'

// Default blank product
const defaultProduct = {
  name: '',
  lang: 'id',
  model: '',
  size: '',
  description: '',
  type: 'lantai',
  image: '',
  gallery: [],
  brochure_id: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  slug: '',
  is_active: true
}

const ProductForm = ({ initialData = defaultProduct, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialData)
  const [preview, setPreview] = useState(initialData.image || '')
  const [galleryPreview, setGalleryPreview] = useState(initialData.gallery || [])

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

  const handleGalleryChange = e => {
    const files = Array.from(e.target.files)
    const urls = files.map(file => URL.createObjectURL(file))
    setGalleryPreview(prev => [...prev, ...urls])
    setForm(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...files] }))
  }

  const handleRemoveGalleryImage = index => {
    setGalleryPreview(prev => prev.filter((_, i) => i !== index))
    setForm(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (onSubmit) onSubmit(form)
  }

  return (
    <Card className='shadow'>
      <CardHeader
        title={initialData.id ? 'Edit Product' : 'Add New Product'}
        subheader='Isi semua informasi produk di bawah ini.'
      />
      <Divider />

      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Product Name'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder='Nama produk'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                size='small'
                label='Language'
                name='lang'
                value={form.lang}
                onChange={handleChange}
              >
                <MenuItem value='id'>Indonesia</MenuItem>
                <MenuItem value='en'>English</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Model Code'
                name='model'
                value={form.model}
                onChange={handleChange}
                placeholder='Kode/model produk'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Size'
                name='size'
                value={form.size}
                onChange={handleChange}
                placeholder='Misal: 60x60'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                size='small'
                label='Product Type'
                name='type'
                value={form.type}
                onChange={handleChange}
              >
                <MenuItem value='lantai'>Lantai</MenuItem>
                <MenuItem value='dinding'>Dinding</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Slug'
                name='slug'
                value={form.slug}
                onChange={handleChange}
                placeholder='contoh: keramik-lantai-motif-kayu'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size='small'
                multiline
                rows={4}
                label='Description'
                name='description'
                value={form.description}
                onChange={handleChange}
                placeholder='Deskripsi produk'
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Main Image
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

            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Gallery Images
              </Typography>
              <Box className='flex flex-wrap gap-3'>
                {galleryPreview.map((src, index) => (
                  <Box key={index} className='relative inline-block'>
                    <img
                      src={src}
                      alt={`Gallery ${index}`}
                      className='w-[120px] h-[80px] object-cover rounded border'
                    />
                    <IconButton
                      color='error'
                      size='small'
                      className='absolute top-1 right-1 bg-white shadow'
                      onClick={() => handleRemoveGalleryImage(index)}
                    >
                      <i className='ri-delete-bin-line text-red-500 text-lg' />
                    </IconButton>
                  </Box>
                ))}
                <Button variant='outlined' component='label' startIcon={<i className='ri-upload-2-line text-lg' />}>
                  Add Images
                  <input type='file' hidden accept='image/*' multiple onChange={handleGalleryChange} />
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Meta Title'
                name='meta_title'
                value={form.meta_title}
                onChange={handleChange}
                placeholder='SEO Title'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size='small'
                label='Meta Keywords'
                name='meta_keywords'
                value={form.meta_keywords}
                onChange={handleChange}
                placeholder='Keyword1, Keyword2'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                size='small'
                multiline
                rows={3}
                label='Meta Description'
                name='meta_description'
                value={form.meta_description}
                onChange={handleChange}
                placeholder='SEO Description'
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControlLabel
                control={<Switch checked={form.is_active} onChange={handleSwitchChange} />}
                label='Active'
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        <Box className='flex justify-between gap-3 p-4'>
          <Button
            variant='outlined'
            className='w-1/4'
            color='secondary'
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
            {initialData.id ? 'Update' : 'Save'}
          </Button>
        </Box>
      </form>
    </Card>
  )
}

export default ProductForm
