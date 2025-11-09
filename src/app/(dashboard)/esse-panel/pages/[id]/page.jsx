'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, Button, Divider, Grid, Typography, Box } from '@mui/material'

import { getPageById, deletePage } from '@/services/pages'
import DetailField from '@/components/DetailField'

const PageDetail = () => {
  const { id } = useParams()
  const router = useRouter()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      getPageById(id)
        .then(data => setPage(data))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleDelete = async () => {
    if (confirm('Delete this page?')) {
      await deletePage(id)
      alert('Page deleted successfully!')
      router.push('/esse-panel/pages')
    }
  }

  if (loading) return <p className='p-6'>Loading...</p>
  if (!page) return <p className='p-6'>Page not found</p>

  return (
    <div className='p-6'>
      <Card className='shadow'>
        <CardHeader>
          <CardTitle>Page Detail</CardTitle>
        </CardHeader>
        <Divider />

        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Title' value={page.title} />
            <DetailField label='Slug' value={page.slug} />
            <DetailField label='Template' value={page.template} />
            <DetailField label='Status' value={page.is_active ? 'Active' : 'Inactive'} />
            <DetailField label='Meta Title' value={page.meta_title} xs={12} />
            <DetailField label='Meta Description' value={page.meta_description} xs={12} />
            <DetailField label='Meta Keywords' value={page.meta_keywords} xs={12} />
            <DetailField label='Created At' value={page.created_at} />
            <DetailField label='Updated At' value={page.updated_at} />
            <DetailField label='Content' value={page.content} xs={12} />
          </Grid>
        </CardContent>

        <Divider />

        <Box className='flex justify-between items-center p-4 gap-3'>
          <Button
            variant='outlined'
            startIcon={<i className='ri-arrow-left-line text-lg' />}
            onClick={() => router.push('/esse-panel/pages')}
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
              onClick={() => router.push(`/esse-panel/pages/${id}/edit`)}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default PageDetail
