'use client'

import { useEffect, useState, useCallback } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import useSnackbar from '@/@core/hooks/useSnackbar'
import { getUserById, deleteUser } from '@/services/users'
import DetailField from '@/components/DetailField'
import BackdropLoading from '@/components/BackdropLoading'
import DetailActions from '@/components/DetailActions'

const UserDetailPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const { success, error, SnackbarComponent } = useSnackbar()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id)

        if (res?.data) {
          setUser(res.data)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Failed to fetch User:', err)
        error('Gagal memuat detail proyek.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchUser()
  }, [id, error])

  const handleDelete = useCallback(async () => {
    setLoading(true)

    try {
      await deleteUser(id)

      success('Berhasil dihapus!')
      router.push('/esse-panel/Users')
    } catch (err) {
      console.error('Delete failed:', err)
      error('Gagal menghapus: ' + (err.message || 'Terjadi kesalahan server.'))
      setLoading(false)
    }
  }, [id, success, error, router])

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardHeader title='User Detail' />
        <Divider />
        <CardContent>
          <Grid container spacing={4}>
            <DetailField label='Name' value={user?.name} />
            <DetailField label='Username' value={user?.username} />
            <DetailField label='Email' value={user?.email} />
            <DetailField label='Role' value={user?.role?.label} />
            <DetailField
              label={'Status'}
              value={
                user?.is_active ? (
                  <Chip label='Active' size='small' color='success' variant='tonal' sx={{ borderRadius: 1 }} />
                ) : (
                  <Chip label='Inactive' size='small' color='error' variant='tonal' sx={{ borderRadius: 1 }} />
                )
              }
            />
          </Grid>
        </CardContent>
        <Divider />

        <DetailActions
          id={id}
          href='users'
          onConfirm={() => {
            handleDelete()
          }}
        />
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </Box>
  )
}

export default UserDetailPage
