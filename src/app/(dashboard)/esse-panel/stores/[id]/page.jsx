'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, Button, Divider, Grid, Typography, Box } from '@mui/material'
import { getStoreById, deleteStore } from '@/services/stores'
import DetailField from '@/components/DetailField'

const StoreDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getStoreById(id)
        .then(data => setStore(data))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleDelete = async () => {
    if (confirm('Delete this Store?')) {
      await deleteStore(id)
      alert('Deleted successfully!')
      router.push('/esse-panel/stores')
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!store) return <p className='p-6'>Store not found</p>

  return (
    <div className='p-6'>
      <Card className='shadow'>
        <CardHeader>
          <CardTitle>Store Detail</CardTitle>
        </CardHeader>
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Title' value={store.title} />
            <DetailField label='Location' value={store.location} />
            <DetailField label='Slug' value={store.slug} />
            <DetailField label='Status' value={store.is_active ? 'Active' : 'Inactive'} />
            <DetailField label='Description' value={store.description} xs={12} />
            <DetailField label='Meta Title' value={store.meta_title} />
            <DetailField label='Meta Description' value={store.meta_description} xs={12} />
            <DetailField label='Meta Keywords' value={store.meta_keywords} xs={12} />

            <Grid item xs={12}>
              <Typography variant='subtitle2' className='mb-2'>
                Main Image
              </Typography>
              {store.image ? (
                <img src={store.image} alt={store.title} className='w-[240px] h-[140px] object-cover rounded border' />
              ) : (
                <Typography variant='body2' color='textSecondary'>
                  No image uploaded
                </Typography>
              )}
            </Grid>

            {store.gallery?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant='subtitle2' className='mb-2'>
                  Gallery
                </Typography>
                <div className='flex gap-3 flex-wrap'>
                  {store.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Gallery ${i}`}
                      className='w-[120px] h-[80px] object-cover rounded border'
                    />
                  ))}
                </div>
              </Grid>
            )}
          </Grid>
        </CardContent>

        <Divider />

        <Box className='flex justify-between items-center p-4 gap-3'>
          <Button
            variant='outlined'
            startIcon={<i className='ri-arrow-left-line text-lg' />}
            onClick={() => router.push('/esse-panel/stores')}
          >
            Back
          </Button>

          <Box className='flex gap-3'>
            <Button
              variant='contained'
              color='error'
              startIcon={<i className='ri-delete-bin-line text-lg' />}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              startIcon={<i className='ri-pencil-line text-lg' />}
              onClick={() => router.push(`/esse-panel/stores/${id}/edit`)}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default StoreDetailPage
