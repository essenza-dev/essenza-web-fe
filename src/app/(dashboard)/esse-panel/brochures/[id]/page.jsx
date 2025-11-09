'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, Button, Divider, Grid, Typography, Box } from '@mui/material'

import { getBrochureById, deleteBrochure } from '@/services/brochure'

const BrochureDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [brochure, setBrochure] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const data = await getBrochureById(id)
        setBrochure(data)
      } catch (err) {
        console.error('Failed to fetch brochure:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBrochure()
  }, [id])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this brochure?')) {
      try {
        await deleteBrochure(id)
        alert('Brochure deleted successfully!')
        router.push('/esse-panel/brochures')
      } catch (err) {
        console.error('Delete failed:', err)
      }
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!brochure) return <p className='p-6'>Brochure not found.</p>

  return (
    <div className='p-6'>
      <Card className='w-full mx-auto shadow'>
        <CardHeader>
          <CardTitle>Brochure Detail</CardTitle>
        </CardHeader>
        <Divider />

        <CardContent>
          <Grid container spacing={4}>
            {/* Title */}
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Title</Typography>
              <Typography variant='body1'>{brochure.title}</Typography>
            </Grid>

            {/* Created At */}
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2'>Created At</Typography>
              <Typography variant='body1'>{new Date(brochure.created_at).toLocaleString('id-ID')}</Typography>
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body1'>{brochure.description || '-'}</Typography>
            </Grid>

            {/* File URL */}
            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Brochure File
              </Typography>

              {brochure.file_url ? (
                <Box className='flex items-center gap-3'>
                  <Button
                    variant='outlined'
                    color='primary'
                    startIcon={<i className='ri-file-pdf-line text-lg' />}
                    onClick={() => window.open(brochure.file_url, '_blank')}
                  >
                    View PDF
                  </Button>
                  <Typography variant='body2' color='textSecondary'>
                    {brochure.file_url}
                  </Typography>
                </Box>
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No file uploaded
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>

        <Divider />

        {/* Action Buttons */}
        <Box className='flex justify-between items-center p-4 gap-3'>
          <Button
            variant='outlined'
            color='secondary'
            className='w-1/4'
            startIcon={<i className='ri-arrow-left-line text-lg' />}
            onClick={() => router.push('/esse-panel/brochures')}
          >
            Back
          </Button>

          <Box className='flex gap-3 w-1/2 justify-end'>
            <Button
              variant='contained'
              color='error'
              className='w-1/2'
              startIcon={<i className='ri-delete-bin-6-line text-lg' />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              className='w-1/2'
              startIcon={<i className='ri-pencil-line text-lg' />}
              onClick={() => router.push(`/esse-panel/brochures/${id}/edit`)}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default BrochureDetailPage
