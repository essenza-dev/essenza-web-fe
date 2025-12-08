'use client'

import { useState, useMemo, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import { createBrochure, getBrochureById, updateBrochure } from '@/services/brochures'

import useSnackbar from '@/@core/hooks/useSnackbar'
import CustomTextField from '@/@core/components/custom-inputs/TextField'
import FormActions from '@/components/FormActions'

import { handleApiResponse } from '@/utils/handleApiResponse'
import BackdropLoading from '@/components/BackdropLoading'

const defaultData = {
  title: '',
  file: null
}

const BrochuresForm = ({ id }) => {
  const router = useRouter()
  const isEdit = !!id
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(defaultData.file || '')

  const { success, error, SnackbarComponent } = useSnackbar()

  const fields = useMemo(
    () => [{ name: 'title', label: 'Title', placeholder: 'Brochure Title', size: 6, required: true }],
    []
  )

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    await handleApiResponse(() => (isEdit ? updateBrochure(id, data) : createBrochure(data)), {
      success: msg => success(msg),
      error: msg => error(msg),
      onSuccess: () =>
        setTimeout(() => {
          router.push('/esse-panel/brochures')
        }, 1000),
      onError: () => {
        setLoading(false)
      }
    })
  }

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]

    if (file) {
      setData(prev => ({ ...prev, file }))
      setPreview(file.name)
    }
  }

  const handleRemoveFile = () => {
    setData(prev => ({ ...prev, file: null, file_url: '' }))
    setPreview('')
  }

  const fetchBrochure = async id => {
    try {
      const res = await getBrochureById(id)

      setData(res.data)
      if (res.data?.file_url) {
        const fileName = res.data.file_url.split('/').pop() || res.data.file_url
        setPreview(fileName)
      }
    } catch {
      error('Failed to load Brochure')
    }
  }

  useEffect(() => {
    setPreview('')
    if (id) fetchBrochure(id)
  }, [id])

  return (
    <>
      <Card className='shadow'>
        <CardHeader title={defaultData.id ? 'Edit Brochure' : 'Add Brochure'} />
        <Divider />

        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={4}>
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

              {/* File Upload */}
              <Grid item xs={12}>
                <Typography variant='subtitle2' className='mb-2'>
                  File PDF
                </Typography>

                {preview ? (
                  <Box className='flex items-center justify-between border rounded p-3'>
                    {isEdit ? (
                      <a
                        href={data.file_url}
                        target='_blank'
                        rel='noopener noreferrer'
                        style={{ color: 'blue', textDecoration: 'underline' }}
                      >
                        <Typography variant='body2'>{preview}</Typography>
                      </a>
                    ) : (
                      <Typography variant='body2'>{preview}</Typography>
                    )}
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
          <FormActions onCancel={() => router.push('/esse-panel/brochures')} isEdit={isEdit} />
        </form>
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default BrochuresForm
