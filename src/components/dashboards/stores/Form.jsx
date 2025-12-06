'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'

import CustomTextField from '@/@core/components/custom-inputs/TextField'

import { getStoreById, updateStore, createStore } from '@/services/stores'
import FormActions from '@/components/FormActions'
import useSnackbar from '@/@core/hooks/useSnackbar'

import BackdropLoading from '@/components/BackdropLoading'
import { handleApiResponse } from '@/utils/handleApiResponse'

const defaultData = {
  name: '',
  address: '',
  phone: '',
  email: '',
  latitude: '',
  longitude: ''
}

const StoreForm = ({ id }) => {
  const router = useRouter()
  const isEdit = !!id

  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(false)

  const { success, error, SnackbarComponent } = useSnackbar()

  const fields = useMemo(() => [
    { name: 'name', label: 'Name', placeholder: 'Store Name', size: 6, required: true },
    { name: 'phone', label: 'Phone', placeholder: '+6281234567890', size: 6, required: true },
    { name: 'email', label: 'Email', placeholder: 'store@email.com', size: 6, required: true },
    {
      name: 'address',
      label: 'Address',
      placeholder: 'Store Address',
      size: 12,
      multiline: true,
      rows: 3,
      required: true
    },
    { name: 'latitude', label: 'Latitude', placeholder: '-6.184171439657108106', size: 6 },
    { name: 'longitude', label: 'Longitude', placeholder: '10.184171439657108', size: 6 }
  ])

  useEffect(() => {
    if (isEdit) {
      getStoreById(id).then(data => setData(data))
    }
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    await handleApiResponse(() => (id ? updateStore(id, data) : createStore(data)), {
      success: msg => success(msg),
      error: msg => error(msg),
      onSuccess: () =>
        setTimeout(() => {
          router.push('/esse-panel/stores')
        }, 2000),
      onError: () => {
        setLoading(false)
      }
    })
  }

  const fetchStore = useCallback(
    async id => {
      setLoading(true)

      try {
        const res = await getStoreById(id)

        setData(res.data)
      } catch {
        error('Failed to load store details.')
      } finally {
        setLoading(false)
      }
    },
    [error]
  )

  useEffect(() => {
    if (id) fetchStore(id)
  }, [id, fetchStore])

  return (
    <>
      <Card className='shadow'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <CardHeader title={isEdit ? 'Edit Store' : 'Add Store'} />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
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
            </Grid>
          </CardContent>
          <Divider />
          <FormActions onCancel={() => router.push('/esse-panel/stores')} isEdit={isEdit} />
        </form>
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default StoreForm
