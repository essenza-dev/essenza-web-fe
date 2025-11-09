'use client'

import { useState } from 'react'

// MUI Components
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Default blank brochure
const defaultBrochure = {
  title: '',
  description: '',
  file: null,
  file_url: ''
}

const BrochuresForm = ({ initialData = defaultBrochure, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialData)
  const [preview, setPreview] = useState(initialData.file_url || '')

  // Handle text changes
  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Handle file input
  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setForm(prev => ({ ...prev, file }))
      setPreview(file.name)
    }
  }

  // Handle remove file
  const handleRemoveFile = () => {
    setForm(prev => ({ ...prev, file: null, file_url: '' }))
    setPreview('')
  }

  // Handle submit
  const handleSubmit = e => {
    e.preventDefault()
    if (onSubmit) onSubmit(form)
  }

  return (
    <Card className='shadow'>
      <CardHeader
        title={initialData.id ? 'Edit Brochure' : 'Add New Brochure'}
        subheader='Isi semua informasi brosur di bawah ini.'
      />
      <Divider />

      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={4}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size='small'
                label='Title'
                name='title'
                value={form.title}
                onChange={handleChange}
                placeholder='Judul brosur'
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                size='small'
                label='Description'
                name='description'
                value={form.description}
                onChange={handleChange}
                placeholder='Deskripsi brosur'
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                File PDF
              </Typography>

              {preview ? (
                <Box className='flex items-center justify-between border rounded p-3'>
                  <Typography variant='body2'>{preview}</Typography>
                  <IconButton color='error' size='small' onClick={handleRemoveFile} className='bg-white shadow'>
                    <i className='ri-delete-bin-line text-red-500 text-lg' />
                  </IconButton>
                </Box>
              ) : (
                <Button variant='outlined' component='label' startIcon={<i className='ri-upload-2-line text-lg' />}>
                  Upload PDF
                  <input type='file' hidden accept='application/pdf' onChange={handleFileChange} />
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        {/* Footer Buttons */}
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

export default BrochuresForm
